"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FadeIn from "@/app/2026/_components/ui/FadeIn";
import Post from "./post";
import { getFeedPosts } from "../_actions/blog";
import type { BlogPostWithTeam } from "../_types";

const PAGE_SIZE = 5;

function PostSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-xl">
      <div className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
          <div className="h-2.5 w-20 animate-pulse rounded bg-white/10" />
        </div>
      </div>
      <div className="aspect-[4/3] w-full animate-pulse bg-white/10" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-3">
          <div className="h-5 w-12 animate-pulse rounded bg-white/10" />
          <div className="h-5 w-12 animate-pulse rounded bg-white/10" />
        </div>
        <div className="h-3 w-full animate-pulse rounded bg-white/10" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}

/** Vertical, single-column social feed with infinite scroll and skeleton loading. */
export default function Feed() {
  const [posts, setPosts] = useState<BlogPostWithTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const offsetRef = useRef(0);

  const load = useCallback(async () => {
    if (isLoadingRef.current || !hasMoreRef.current) return;
    isLoadingRef.current = true;
    setLoading(true);

    const result = await getFeedPosts(offsetRef.current, PAGE_SIZE);
    setPosts((prev) => [...prev, ...result.posts]);
    hasMoreRef.current = result.hasMore;
    setHasMore(result.hasMore);
    offsetRef.current += result.posts.length;

    isLoadingRef.current = false;
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) load();
      },
      { rootMargin: "300px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [load]);

  if (!loading && posts.length === 0) {
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
    <div className="flex w-full max-w-xl flex-col gap-6 pb-16">
      {posts.map((post, i) => (
        <FadeIn key={post.id} delay={Math.min(i * 0.06, 0.3)}>
          <Post post={post} />
        </FadeIn>
      ))}

      {loading && (
        <>
          <PostSkeleton />
          {posts.length === 0 && (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
        </>
      )}

      <div ref={sentinelRef} className="h-1" />

      {!hasMore && posts.length > 0 && (
        <p className="font-main -mt-10 text-center text-xs text-gray-600">
          All posts loaded
        </p>
      )}
    </div>
  );
}
