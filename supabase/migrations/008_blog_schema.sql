-- Robot blog / social feed.
-- Posts belong to a team; any signed-in user may comment and like.
-- Likes are a per-user table (not a counter) so each user can like a post
-- at most once and toggle it off — the count is derived via COUNT(*).

-- Per-team blog profile (bio, avatar, robot name). One row per team.
CREATE TABLE team_blog_profiles (
  team_id    UUID PRIMARY KEY REFERENCES teams(id) ON DELETE CASCADE,
  bio        TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  robot_name TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE blog_posts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id    UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  image_url  TEXT,
  caption    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX blog_posts_created_at_idx ON blog_posts (created_at DESC);

CREATE TABLE blog_comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id     UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  profile_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,            -- name snapshot at comment time
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX blog_comments_post_idx ON blog_comments (post_id, created_at);

-- One like per (post, user). The composite primary key enforces uniqueness,
-- so a duplicate like is rejected and "unlike" is a DELETE of the same row.
CREATE TABLE blog_post_likes (
  post_id    UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (post_id, profile_id)
);
