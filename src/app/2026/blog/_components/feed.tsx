"use client";

import FadeIn from "@/app/2026/_components/ui/FadeIn";
import Post from "./post";
import type { BlogPostWithTeam } from "../_types";

/** Vertical, single-column social feed of robot posts. */
export default function Feed({ posts }: { posts: BlogPostWithTeam[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20 text-center">
        <p className="text-lg font-semibold text-white">No posts yet</p>
        <p className="font-main text-sm text-gray-400">
          Be the first team to share an update about your robot.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      {posts.map((post, i) => (
        <FadeIn key={post.id} delay={Math.min(i * 0.06, 0.4)}>
          <Post post={post} />
        </FadeIn>
      ))}
    </div>
  );
}
