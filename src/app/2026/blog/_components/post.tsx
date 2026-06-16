"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { LuHeart, LuMessageCircle, LuPencil, LuTrash2 } from "react-icons/lu";
import Card from "@/app/2026/_components/ui/Card";
import { cn } from "@/app/_utils/cn";
import { addComment, toggleLike } from "../_actions/blog";
import { TeamAvatar } from "./teamProfile";
import type { BlogComment, BlogPostWithTeam } from "../_types";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

/**
 * A single feed post — Instagram-style: header (team), image, caption, likes.
 * When `owned` is true it shows edit/delete controls (used on the manage page).
 */
export default function Post({
  post,
  owned = false,
  onEdit,
  onDelete,
}: {
  post: BlogPostWithTeam;
  owned?: boolean;
  onEdit?: (post: BlogPostWithTeam) => void;
  onDelete?: (post: BlogPostWithTeam) => void;
}) {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likePending, setLikePending] = useState(false);

  async function handleToggleLike() {
    if (likePending) return;
    setLikePending(true);
    const next = !liked;
    // Optimistic update, reconciled with the server's canonical count.
    setLiked(next);
    setLikeCount((c) => c + (next ? 1 : -1));
    const res = await toggleLike(post.id);
    if (res.error) {
      setLiked(!next);
      setLikeCount((c) => c + (next ? -1 : 1));
    } else {
      setLiked(res.liked);
      setLikeCount(res.likes);
    }
    setLikePending(false);
  }

  const { user } = useUser();
  const authorName =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "";

  const [comments, setComments] = useState<BlogComment[]>(() => [
    ...post.comments,
  ]);
  const [body, setBody] = useState("");

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!authorName || !body.trim()) return;
    const res = await addComment(post.id, body);
    if (res.comment) {
      setComments((prev) => [...prev, res.comment!]);
      setBody("");
    }
  }

  return (
    <Card className="overflow-hidden p-0">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <TeamAvatar team={post.team} size={40} />
        <div className="flex flex-col">
          <span className="font-main text-sm font-semibold text-white">
            {post.team.teamName}
          </span>
          <span className="font-main text-xs text-gray-400">
            {post.team.robotName} · {timeAgo(post.createdAt)}
          </span>
        </div>
        {owned && (
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              aria-label="Edit post"
              onClick={() => onEdit?.(post)}
              className="rounded-md p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LuPencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Delete post"
              onClick={() => onDelete?.(post)}
              className="rounded-md p-2 text-gray-400 transition-colors hover:bg-rose-500/20 hover:text-rose-400"
            >
              <LuTrash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      {post.imageUrl ? (
        <div className="relative aspect-square w-full bg-black/40">
          <Image
            src={post.imageUrl}
            alt={post.caption}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 600px"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] w-full items-center justify-center bg-linear-to-br from-rose-500/10 to-blue-500/10">
          <span className="font-main text-xs tracking-wide text-gray-500 uppercase">
            No photo yet
          </span>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-4 text-gray-300">
          <button
            type="button"
            onClick={handleToggleLike}
            disabled={likePending}
            className="flex w-fit items-center gap-1.5 transition-colors hover:text-rose-400 disabled:opacity-60"
            aria-label={liked ? "Unlike" : "Like"}
          >
            <LuHeart
              className={cn("h-5 w-5", liked && "fill-rose-500 text-rose-500")}
            />
            <span className="font-main text-sm">{likeCount}</span>
          </button>
          <span className="flex w-fit items-center gap-1.5">
            <LuMessageCircle className="h-5 w-5" />
            <span className="font-main text-sm">{comments.length}</span>
          </span>
        </div>
        <p className="font-main text-sm text-gray-200">
          <span className="font-semibold text-white">{post.team.teamName}</span>{" "}
          {post.caption}
        </p>

        {/* Comments */}
        <div className="mt-1 flex flex-col gap-3 border-t border-white/10 pt-3">
          {comments.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {comments.map((comment) => (
                <li key={comment.id} className="font-main text-sm">
                  <span className="font-semibold text-white">
                    {comment.author}
                  </span>{" "}
                  <span className="text-gray-200">{comment.body}</span>
                  <span className="ml-1.5 text-xs text-gray-500">
                    {timeAgo(comment.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-main text-xs text-gray-500">
              No comments yet — be the first.
            </p>
          )}

          {authorName ? (
            <form onSubmit={handleAddComment} className="flex items-center gap-2">
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={300}
                placeholder={`Comment as ${authorName}…`}
                aria-label="Add a comment"
                className="font-main flex-1 rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
              <button
                type="submit"
                disabled={!body.trim()}
                className="font-main rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Post
              </button>
            </form>
          ) : (
            <p className="font-main text-xs text-gray-500">
              Sign in to leave a comment.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
