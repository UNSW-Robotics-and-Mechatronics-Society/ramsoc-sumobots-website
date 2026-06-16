// Types for the robot blog / social feed.
//
// These mirror the shape we intend to persist in Supabase later. For now the
// feed runs off mock data (see `_data/mockBlog.ts`). When the backend is wired
// up, the `posts` and `team_blog_profiles` tables should match these fields so
// the UI components can be reused without changes.

export type BlogTeamProfile = {
  /** Team id (FK to `teams.id` once persisted). */
  teamId: string;
  /** Team display name. */
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
  /** Number of likes — placeholder until a likes table exists. */
  likes: number;
  /** Comments left on this post, oldest first. */
  comments: BlogComment[];
  /** ISO timestamp of when the post was created. */
  createdAt: string;
};

/** A post joined with its author team's profile, for rendering in the feed. */
export type BlogPostWithTeam = BlogPost & {
  team: BlogTeamProfile;
};
