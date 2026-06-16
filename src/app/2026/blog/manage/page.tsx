"use client";

import { Fragment, useMemo, useState } from "react";
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
  MOCK_CURRENT_TEAM_ID,
  getTeamProfile,
  getTeamPosts,
} from "../_data/mockBlog";
import type { BlogPostWithTeam, BlogTeamProfile } from "../_types";

export default function ManageBlogPage() {
  const [isFooterVisible, setFooterVisible] = useState(false);

  // Front-end only: seed local state from mock data. Replace with the current
  // user's team + posts (server actions) once the backend is wired up.
  const [team, setTeam] = useState<BlogTeamProfile>(
    () => getTeamProfile(MOCK_CURRENT_TEAM_ID)!,
  );
  const [posts, setPosts] = useState<BlogPostWithTeam[]>(() =>
    getTeamPosts(MOCK_CURRENT_TEAM_ID),
  );
  const [composing, setComposing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Keep each post's embedded team profile in sync when the bio is edited.
  const decoratedPosts = useMemo(
    () => posts.map((p) => ({ ...p, team })),
    [posts, team],
  );
  const editingPost = decoratedPosts.find((p) => p.id === editingId);

  function handleCreate(data: { caption: string; imageUrl: string | null }) {
    const newPost: BlogPostWithTeam = {
      id: `post-${crypto.randomUUID()}`,
      teamId: team.teamId,
      caption: data.caption,
      imageUrl: data.imageUrl,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      team,
    };
    setPosts((prev) => [newPost, ...prev]);
    setComposing(false);
  }

  function handleUpdate(data: { caption: string; imageUrl: string | null }) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === editingId
          ? { ...p, caption: data.caption, imageUrl: data.imageUrl }
          : p,
      ),
    );
    setEditingId(null);
  }

  function handleDelete(post: BlogPostWithTeam) {
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
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
                Editing as <span className="text-white">{team.teamName}</span>.
                Update your team&apos;s profile and share new robot updates.
              </p>
            </FadeIn>

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
          </div>
        </div>
      </section>
      <Footer setFooterVisible={setFooterVisible} />
    </Fragment>
  );
}
