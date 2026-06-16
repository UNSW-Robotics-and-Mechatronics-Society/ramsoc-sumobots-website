// Types for the robot blog / social feed.
//
// These mirror the data persisted in Supabase (see migration 008_blog_schema
// and the server actions in `_actions/blog.ts`). The `blog_posts`,
// `blog_comments`, `blog_post_likes` and `team_blog_profiles` tables map onto
// these shapes; team name/category are joined from `teams`.

export type BlogTeamProfile = {
  /** Team id (FK to `teams.id` once persisted). */
  teamId: string;
  /** Team display name. Fixed — always sourced from `teams.name`, not editable. */
  teamName: string;
  /** "standard" | "open" — mirrors team category. */
  category: "standard" | "open";
  /** Short tagline / bio shown on the team's profile header. */
  bio: string;
  /** Avatar image URL (Supabase Storage public URL once uploaded). */
  avatarUrl: string | null;
  /** Name of the robot this team is building. */
  robotName: string;
};

/** A comment left on a post. */
export type BlogComment = {
  /** Comment id (FK to `comments.id` once persisted). */
  id: string;
  /** The post this comment belongs to (FK to `posts.id`). */
  postId: string;
  /** Display name of whoever left the comment. */
  author: string;
  /** Comment body text. */
  body: string;
  /** ISO timestamp of when the comment was created. */
  createdAt: string;
};

export type BlogPost = {
  /** Post id (FK to `posts.id` once persisted). */
  id: string;
  /** Author team id (FK to `teams.id`). */
  teamId: string;
  /** Optional image (Supabase Storage public URL once uploaded). */
  imageUrl: string | null;
  /** Post caption / body text. */
  caption: string;
  /** Total like count, derived from the `blog_post_likes` table. */
  likes: number;
  /** Whether the current viewer has liked this post. */
  likedByMe: boolean;
  /** Comments left on this post, oldest first. */
  comments: BlogComment[];
  /** ISO timestamp of when the post was created. */
  createdAt: string;
};

/** A post joined with its author team's profile, for rendering in the feed. */
export type BlogPostWithTeam = BlogPost & {
  team: BlogTeamProfile;
};
