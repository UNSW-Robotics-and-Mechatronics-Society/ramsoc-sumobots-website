"use server";

// Server actions for the robot blog.
//
// Access model: a team's blog is *shared* by everyone on that team. Anyone with
// a `team_members` row for the team can create/edit/delete the team's posts and
// edit the team profile (see `assertTeamMember`). Comments and likes are open to
// any signed-in user.
//
// The team's display name is NOT stored on the blog profile — it is always read
// from `teams.name`, so it stays fixed to whatever the team registered with.

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import type {
  BlogComment,
  BlogPostWithTeam,
  BlogTeamProfile,
} from "../_types";

const BLOG_PATH = "/2026/linkedbots";
const MANAGE_PATH = "/2026/linkedbots/manage";

type Caller = { userId: string; profileId: string; fullName: string };

/** Resolve the signed-in Clerk user to their profile row + display name. */
async function getCaller(): Promise<Caller | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const supabase = getSupabaseSecretClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("clerk_user_id", userId)
    .single();
  if (!profile) return null;

  const user = await currentUser();
  return {
    userId,
    profileId: profile.id,
    fullName: user?.fullName || profile.full_name || "Anonymous",
  };
}

/** True if the profile shares a team_members row with the team (shared access). */
async function isTeamMember(
  profileId: string,
  teamId: string,
): Promise<boolean> {
  const supabase = getSupabaseSecretClient();
  const { data } = await supabase
    .from("team_members")
    .select("id")
    .eq("profile_id", profileId)
    .eq("team_id", teamId)
    .maybeSingle();
  return !!data;
}

/**
 * The team the signed-in user belongs to (2026), as a blog profile. Returns
 * null if they aren't signed in or aren't on a team. The name comes straight
 * from `teams.name`.
 */
export async function getMyTeam(): Promise<BlogTeamProfile | null> {
  const caller = await getCaller();
  if (!caller) return null;

  const supabase = getSupabaseSecretClient();
  const { data: members } = await supabase
    .from("team_members")
    .select("team_id, teams!inner(competition_year)")
    .eq("profile_id", caller.profileId)
    .eq("teams.competition_year", 2026)
    .limit(1);

  const teamId = members?.[0]?.team_id;
  if (!teamId) return null;
  return getBlogProfile(teamId);
}

/** A team's blog profile: name/category fixed from `teams`, rest from the blog table. */
export async function getBlogProfile(
  teamId: string,
): Promise<BlogTeamProfile | null> {
  const supabase = getSupabaseSecretClient();
  const { data: team } = await supabase
    .from("teams")
    .select("id, name, category")
    .eq("id", teamId)
    .single();
  if (!team) return null;

  const { data: profile } = await supabase
    .from("team_blog_profiles")
    .select("bio, avatar_url, robot_name")
    .eq("team_id", teamId)
    .maybeSingle();

  return {
    teamId: team.id,
    teamName: team.name, // fixed — always from teams.name
    category: team.category as "standard" | "open",
    bio: profile?.bio ?? "",
    avatarUrl: profile?.avatar_url ?? null,
    robotName: profile?.robot_name ?? "",
  };
}

/** Members of a team, for display on the team profile page. */
export type TeamMemberProfile = {
  id: string;
  fullName: string;
};

export async function getTeamMembers(
  teamId: string,
): Promise<TeamMemberProfile[]> {
  const supabase = getSupabaseSecretClient();
  const { data } = await supabase
    .from("team_members")
    .select("id, profile:profiles(id, full_name)")
    .eq("team_id", teamId)
    .order("joined_at", { ascending: true });
  if (!data) return [];
  return data
    .map((m) => {
      const p = m.profile as { id: string; full_name: string } | null;
      if (!p) return null;
      return { id: p.id, fullName: p.full_name };
    })
    .filter((m): m is TeamMemberProfile => m !== null);
}

// ---------------------------------------------------------------------------
// Feed reads
// ---------------------------------------------------------------------------

type PostRow = {
  id: string;
  team_id: string;
  image_url: string | null;
  caption: string;
  created_at: string;
};

/** Join post rows with their team profile, comments and like counts. */
async function assemblePosts(
  postRows: PostRow[],
  viewerProfileId: string | null,
): Promise<BlogPostWithTeam[]> {
  if (postRows.length === 0) return [];

  const supabase = getSupabaseSecretClient();
  const teamIds = [...new Set(postRows.map((p) => p.team_id))];
  const postIds = postRows.map((p) => p.id);

  const [teamsRes, profilesRes, commentsRes, likesRes] = await Promise.all([
    supabase.from("teams").select("id, name, category").in("id", teamIds),
    supabase
      .from("team_blog_profiles")
      .select("team_id, bio, avatar_url, robot_name")
      .in("team_id", teamIds),
    supabase
      .from("blog_comments")
      .select("id, post_id, author_name, body, created_at")
      .in("post_id", postIds)
      .order("created_at", { ascending: true }),
    supabase
      .from("blog_post_likes")
      .select("post_id, profile_id")
      .in("post_id", postIds),
  ]);

  const teamById = new Map((teamsRes.data ?? []).map((t) => [t.id, t]));
  const profileByTeam = new Map(
    (profilesRes.data ?? []).map((p) => [p.team_id, p]),
  );
  const commentsByPost = new Map<string, BlogComment[]>();
  for (const c of commentsRes.data ?? []) {
    const list = commentsByPost.get(c.post_id) ?? [];
    list.push({
      id: c.id,
      postId: c.post_id,
      author: c.author_name,
      body: c.body,
      createdAt: c.created_at,
    });
    commentsByPost.set(c.post_id, list);
  }
  const likeRows = likesRes.data ?? [];

  return postRows
    .map((p): BlogPostWithTeam | null => {
      const team = teamById.get(p.team_id);
      if (!team) return null;
      const prof = profileByTeam.get(p.team_id);
      const postLikes = likeRows.filter((l) => l.post_id === p.id);
      return {
        id: p.id,
        teamId: p.team_id,
        imageUrl: p.image_url,
        caption: p.caption,
        likes: postLikes.length,
        likedByMe: viewerProfileId
          ? postLikes.some((l) => l.profile_id === viewerProfileId)
          : false,
        comments: commentsByPost.get(p.id) ?? [],
        createdAt: p.created_at,
        team: {
          teamId: team.id,
          teamName: team.name,
          category: team.category as "standard" | "open",
          bio: prof?.bio ?? "",
          avatarUrl: prof?.avatar_url ?? null,
          robotName: prof?.robot_name ?? "",
        },
      };
    })
    .filter((p): p is BlogPostWithTeam => p !== null);
}

/** Paginated posts feed, newest first, joined with their author team. */
export async function getFeedPosts(
  offset = 0,
  limit = 5,
): Promise<{ posts: BlogPostWithTeam[]; hasMore: boolean }> {
  const caller = await getCaller();
  const supabase = getSupabaseSecretClient();
  // Fetch one extra to determine whether more pages exist.
  const { data } = await supabase
    .from("blog_posts")
    .select("id, team_id, image_url, caption, created_at")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit);
  const hasMore = (data?.length ?? 0) > limit;
  const posts = await assemblePosts(
    (data ?? []).slice(0, limit),
    caller?.profileId ?? null,
  );
  return { posts, hasMore };
}

/** Posts for a single team, newest first. */
export async function getTeamPosts(
  teamId: string,
): Promise<BlogPostWithTeam[]> {
  const caller = await getCaller();
  const supabase = getSupabaseSecretClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, team_id, image_url, caption, created_at")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false });
  return assemblePosts(data ?? [], caller?.profileId ?? null);
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

type Result = { success: boolean; error?: string };

export async function createPost(input: {
  caption: string;
  imageUrl: string | null;
}): Promise<Result> {
  const caller = await getCaller();
  if (!caller) return { success: false, error: "Not authenticated" };

  const team = await getMyTeam();
  if (!team) return { success: false, error: "You're not on a team" };

  const supabase = getSupabaseSecretClient();
  const { error } = await supabase.from("blog_posts").insert({
    team_id: team.teamId,
    caption: input.caption.trim(),
    image_url: input.imageUrl,
  });
  if (error) return { success: false, error: error.message };

  revalidatePath(BLOG_PATH);
  revalidatePath(MANAGE_PATH);
  return { success: true };
}

export async function updatePost(
  postId: string,
  input: { caption: string; imageUrl: string | null },
): Promise<Result> {
  const caller = await getCaller();
  if (!caller) return { success: false, error: "Not authenticated" };

  const supabase = getSupabaseSecretClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("team_id")
    .eq("id", postId)
    .single();
  if (!post) return { success: false, error: "Post not found" };

  // Shared access: any member of the owning team may edit.
  if (!(await isTeamMember(caller.profileId, post.team_id))) {
    return { success: false, error: "Not your team's post" };
  }

  const { error } = await supabase
    .from("blog_posts")
    .update({ caption: input.caption.trim(), image_url: input.imageUrl })
    .eq("id", postId);
  if (error) return { success: false, error: error.message };

  revalidatePath(BLOG_PATH);
  revalidatePath(MANAGE_PATH);
  return { success: true };
}

export async function deletePost(postId: string): Promise<Result> {
  const caller = await getCaller();
  if (!caller) return { success: false, error: "Not authenticated" };

  const supabase = getSupabaseSecretClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("team_id")
    .eq("id", postId)
    .single();
  if (!post) return { success: false, error: "Post not found" };

  if (!(await isTeamMember(caller.profileId, post.team_id))) {
    return { success: false, error: "Not your team's post" };
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", postId);
  if (error) return { success: false, error: error.message };

  revalidatePath(BLOG_PATH);
  revalidatePath(MANAGE_PATH);
  return { success: true };
}

/**
 * Update the shared team blog profile (bio / avatar / robot name). The team
 * name is intentionally not accepted here — it stays fixed to `teams.name`.
 */
export async function updateBlogProfile(input: {
  bio: string;
  avatarUrl: string | null;
  robotName: string;
}): Promise<Result> {
  const caller = await getCaller();
  if (!caller) return { success: false, error: "Not authenticated" };

  const team = await getMyTeam();
  if (!team) return { success: false, error: "You're not on a team" };

  const supabase = getSupabaseSecretClient();
  const { error } = await supabase.from("team_blog_profiles").upsert(
    {
      team_id: team.teamId,
      bio: input.bio,
      avatar_url: input.avatarUrl,
      robot_name: input.robotName,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "team_id" },
  );
  if (error) return { success: false, error: error.message };

  revalidatePath(BLOG_PATH);
  revalidatePath(MANAGE_PATH);
  return { success: true };
}

export async function addComment(
  postId: string,
  body: string,
): Promise<{ comment?: BlogComment; error?: string }> {
  const caller = await getCaller();
  if (!caller) return { error: "Sign in to comment" };
  if (!body.trim()) return { error: "Comment is empty" };

  const supabase = getSupabaseSecretClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .insert({
      post_id: postId,
      profile_id: caller.profileId,
      author_name: caller.fullName, // derived server-side, never from the client
      body: body.trim(),
    })
    .select("id, post_id, author_name, body, created_at")
    .single();
  if (error || !data) return { error: error?.message ?? "Failed to comment" };

  revalidatePath(BLOG_PATH);
  return {
    comment: {
      id: data.id,
      postId: data.post_id,
      author: data.author_name,
      body: data.body,
      createdAt: data.created_at,
    },
  };
}

/** Toggle the caller's like on a post; returns the new state + total count. */
export async function toggleLike(
  postId: string,
): Promise<{ liked: boolean; likes: number; error?: string }> {
  const caller = await getCaller();
  if (!caller) return { liked: false, likes: 0, error: "Sign in to like" };

  const supabase = getSupabaseSecretClient();
  const { data: existing } = await supabase
    .from("blog_post_likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("profile_id", caller.profileId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("blog_post_likes")
      .delete()
      .eq("post_id", postId)
      .eq("profile_id", caller.profileId);
  } else {
    await supabase
      .from("blog_post_likes")
      .insert({ post_id: postId, profile_id: caller.profileId });
  }

  const { count } = await supabase
    .from("blog_post_likes")
    .select("post_id", { count: "exact", head: true })
    .eq("post_id", postId);

  revalidatePath(BLOG_PATH);
  return { liked: !existing, likes: count ?? 0 };
}
