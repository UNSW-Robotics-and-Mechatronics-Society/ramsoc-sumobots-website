import type {
  BlogTeamProfile,
  BlogPost,
  BlogPostWithTeam,
  BlogComment,
} from "../_types";

// ---------------------------------------------------------------------------
// MOCK DATA
//
// This is sample data so the feed and manage pages can be previewed without a
// backend. Replace these with Supabase queries (server actions in
// `_actions/blog.ts`) when the database is ready. The shapes match `_types.ts`.
// ---------------------------------------------------------------------------

/**
 * The team the "current user" belongs to. The manage page uses this to pretend
 * the signed-in user is a member of this team. Once auth is wired up, derive
 * this from `getMyTeam()` instead.
 */
export const MOCK_CURRENT_TEAM_ID = "team-bolt";

export const mockTeamProfiles: BlogTeamProfile[] = [
  {
    teamId: "team-bolt",
    teamName: "Bolt Brigade",
    category: "standard",
    bio: "First-year mech students building a wedge bot from scratch. Powered by caffeine and questionable wiring.",
    avatarUrl: null,
    robotName: "Lightning Bolt",
  },
  {
    teamId: "team-crusher",
    teamName: "Circuit Crushers",
    category: "open",
    bio: "Returning champions. We weld, we solder, we win.",
    avatarUrl: null,
    robotName: "The Anvil",
  },
  {
    teamId: "team-spark",
    teamName: "Spark Squad",
    category: "standard",
    bio: "Two friends, one robot, zero prior experience. Learning as we go!",
    avatarUrl: null,
    robotName: "Sparky",
  },
];

export const mockPosts: BlogPost[] = [
  {
    id: "post-1",
    teamId: "team-bolt",
    imageUrl: null,
    caption:
      "Day 1 of the build! Chassis is cut and the motors arrived. Lightning Bolt is officially in progress ⚡",
    likes: 24,
    comments: [
      {
        id: "comment-1",
        postId: "post-1",
        author: "Circuit Crushers",
        body: "Clean cuts! What did you use for the chassis?",
        createdAt: "2026-06-08T10:05:00Z",
      },
      {
        id: "comment-2",
        postId: "post-1",
        author: "Spark Squad",
        body: "Looking sharp already, good luck! ⚡",
        createdAt: "2026-06-08T11:20:00Z",
      },
    ],
    createdAt: "2026-06-08T09:30:00Z",
  },
  {
    id: "post-2",
    teamId: "team-crusher",
    imageUrl: null,
    caption:
      "The Anvil's new self-righting arm passed its first test. Flip us over, we dare you.",
    likes: 58,
    comments: [
      {
        id: "comment-3",
        postId: "post-2",
        author: "Bolt Brigade",
        body: "Challenge accepted 😤",
        createdAt: "2026-06-07T19:00:00Z",
      },
    ],
    createdAt: "2026-06-07T18:15:00Z",
  },
  {
    id: "post-3",
    teamId: "team-spark",
    imageUrl: null,
    caption:
      "We may have wired the battery backwards. We may have learned something. Both things can be true.",
    likes: 41,
    comments: [],
    createdAt: "2026-06-07T12:00:00Z",
  },
  {
    id: "post-4",
    teamId: "team-bolt",
    imageUrl: null,
    caption: "First test drive in the hallway. It moves! Mostly in circles, but it moves.",
    likes: 33,
    comments: [],
    createdAt: "2026-06-06T20:45:00Z",
  },
];

// ---------------------------------------------------------------------------
// Query helpers — these stand in for the server actions you'll add in
// `_actions/blog.ts` later. The component code calls these so swapping in real
// Supabase queries is a one-file change.
// ---------------------------------------------------------------------------

export function getTeamProfile(teamId: string): BlogTeamProfile | undefined {
  return mockTeamProfiles.find((t) => t.teamId === teamId);
}

function joinTeam(post: BlogPost): BlogPostWithTeam | null {
  const team = getTeamProfile(post.teamId);
  return team ? { ...post, team } : null;
}

/** All posts, newest first, with their author team joined. */
export function getFeedPosts(): BlogPostWithTeam[] {
  return mockPosts
    .map(joinTeam)
    .filter((p): p is BlogPostWithTeam => p !== null)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

/** Posts for a single team, newest first. */
export function getTeamPosts(teamId: string): BlogPostWithTeam[] {
  return getFeedPosts().filter((p) => p.teamId === teamId);
}

/**
 * Append a comment to a post and return the created comment. Stand-in for an
 * `addComment` server action — for now it mutates the in-memory mock so the
 * comment persists for the rest of the session.
 */
export function addComment(
  postId: string,
  author: string,
  body: string,
): BlogComment {
  const comment: BlogComment = {
    id: `comment-${Date.now()}`,
    postId,
    author: author.trim(),
    body: body.trim(),
    createdAt: new Date().toISOString(),
  };
  const post = mockPosts.find((p) => p.id === postId);
  post?.comments.push(comment);
  return comment;
}
