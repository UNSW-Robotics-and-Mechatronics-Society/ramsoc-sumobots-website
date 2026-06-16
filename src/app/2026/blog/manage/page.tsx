"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LuArrowLeft, LuPlus } from "react-icons/lu";
import Navbar from "../../_components/Nav/Navbar";
import Footer from "../../_components/Footer";
import FadeIn from "../../_components/ui/FadeIn";
import Path from "@/app/path";
import BioEditor from "../_components/BioEditor";
import PostComposer from "../_components/PostComposer";
import Post from "../_components/post";
import {
  getMyTeam,
  getTeamPosts,
  createPost,
  updatePost,
  deletePost,
} from "../_actions/blog";
import type { BlogPostWithTeam, BlogTeamProfile } from "../_types";

export default function ManageBlogPage() {
  const [isFooterVisible, setFooterVisible] = useState(false);

  // The signed-in user's team (shared by all its members) and its posts,
  // loaded from Supabase. `team` is null while loading or if not on a team.
  const [team, setTeam] = useState<BlogTeamProfile | null>(null);
  const [posts, setPosts] = useState<BlogPostWithTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [composing, setComposing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const refreshPosts = useCallback(async (teamId: string) => {
    setPosts(await getTeamPosts(teamId));
  }, []);

  useEffect(() => {
    getMyTeam().then(async (t) => {
      setTeam(t);
      if (t) await refreshPosts(t.teamId);
      setLoading(false);
    });
  }, [refreshPosts]);

  // Keep each post's embedded team profile in sync when the bio is edited.
  const decoratedPosts = useMemo(
    () => (team ? posts.map((p) => ({ ...p, team })) : posts),
    [posts, team],
  );
  const editingPost = decoratedPosts.find((p) => p.id === editingId);

  async function handleCreate(data: {
    caption: string;
    imageUrl: string | null;
  }) {
    if (!team) return;
    const res = await createPost(data);
    if (res.success) await refreshPosts(team.teamId);
    setComposing(false);
  }

  async function handleUpdate(data: {
    caption: string;
    imageUrl: string | null;
  }) {
    if (!team || !editingId) return;
    const res = await updatePost(editingId, data);
    if (res.success) await refreshPosts(team.teamId);
    setEditingId(null);
  }

  async function handleDelete(post: BlogPostWithTeam) {
    if (!team) return;
    const res = await deletePost(post.id);
    if (res.success) await refreshPosts(team.teamId);
  }

  return (
    <Fragment>
      <Navbar isFooterVisible={isFooterVisible} />
      <section className="min-h-screen py-24">
        <div className="flex min-h-screen w-full flex-col items-center bg-black/30 px-4 pt-12">
          <div className="w-full max-w-xl">
            <Link
              href={Path[2026].Blog.Root}
              className="font-main mb-4 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <LuArrowLeft className="h-4 w-4" />
              Back to feed
            </Link>

            <FadeIn className="mb-8">
              <h1>Manage your posts</h1>
              <p className="font-main mt-2 text-sm text-gray-400">
                {team ? (
                  <>
                    Editing as{" "}
                    <span className="text-white">{team.teamName}</span>. Update
                    your team&apos;s profile and share new robot updates.
                  </>
                ) : (
                  "Update your team's profile and share new robot updates."
                )}
              </p>
            </FadeIn>

            {loading ? (
              <p className="font-main text-sm text-gray-400">Loading…</p>
            ) : !team ? (
              <p className="font-main text-sm text-gray-400">
                You need to be on a team to manage a blog. Join or create one
                first.
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                <BioEditor team={team} onSave={setTeam} />

                {/* New post */}
                {composing ? (
                  <PostComposer
                    team={team}
                    onSubmit={handleCreate}
                    onCancel={() => setComposing(false)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setComposing(true)}
                    className="font-main flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 py-4 text-sm text-gray-300 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <LuPlus className="h-4 w-4" />
                    New post
                  </button>
                )}

                {/* Existing posts */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    Your posts ({decoratedPosts.length})
                  </h3>
                  {decoratedPosts.length === 0 ? (
                    <p className="font-main text-sm text-gray-400">
                      You haven&apos;t posted anything yet.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {decoratedPosts.map((post) =>
                        editingId === post.id && editingPost ? (
                          <PostComposer
                            key={post.id}
                            team={team}
                            editing={editingPost}
                            onSubmit={handleUpdate}
                            onCancel={() => setEditingId(null)}
                          />
                        ) : (
                          <Post
                            key={post.id}
                            post={post}
                            owned
                            onEdit={() => setEditingId(post.id)}
                            onDelete={handleDelete}
                          />
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer setFooterVisible={setFooterVisible} />
    </Fragment>
  );
}
