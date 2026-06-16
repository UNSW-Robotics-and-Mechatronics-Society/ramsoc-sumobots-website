"use client";

import { Fragment, use, useEffect, useState } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import Navbar from "../../../_components/Nav/Navbar";
import Footer from "../../../_components/Footer";
import FadeIn from "../../../_components/ui/FadeIn";
import Card from "../../../_components/ui/Card";
import Badge from "../../../_components/ui/Badge";
import Post from "../../_components/post";
import { TeamAvatar } from "../../_components/teamProfile";
import { getBlogProfile, getTeamPosts, getTeamMembers } from "../../_actions/blog";
import type { BlogPostWithTeam, BlogTeamProfile } from "../../_types";
import type { TeamMemberProfile } from "../../_actions/blog";

export default function TeamProfilePage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = use(params);
  const [isFooterVisible, setFooterVisible] = useState(false);
  const [team, setTeam] = useState<BlogTeamProfile | null>(null);
  const [posts, setPosts] = useState<BlogPostWithTeam[]>([]);
  const [members, setMembers] = useState<TeamMemberProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      const [profile, teamPosts, teamMembers] = await Promise.all([
        getBlogProfile(teamId),
        getTeamPosts(teamId),
        getTeamMembers(teamId),
      ]);
      if (!profile) {
        setNotFound(true);
      } else {
        setTeam(profile);
        setPosts(teamPosts);
        setMembers(teamMembers);
      }
      setLoading(false);
    })();
  }, [teamId]);

  return (
    <Fragment>
      <Navbar isFooterVisible={isFooterVisible} />
      <section className="min-h-screen py-24">
        <div className="flex min-h-screen w-full flex-col items-center bg-black/30 px-4 pt-12">
          <div className="w-full max-w-xl">
            <Link
              href="/2026/linkedbots"
              className="font-main mb-6 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <LuArrowLeft className="h-4 w-4" />
              Back to feed
            </Link>

            {loading ? (
              <div className="flex flex-col gap-6">
                <ProfileSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </div>
            ) : notFound ? (
              <p className="font-main text-sm text-gray-400">
                Team not found.
              </p>
            ) : team ? (
              <div className="flex flex-col gap-6">
                <FadeIn>
                  <TeamProfileCard team={team} postCount={posts.length} members={members} />
                </FadeIn>

                {posts.length > 0 ? (
                  <>
                    <h2 className="text-lg font-semibold text-white">
                      Posts ({posts.length})
                    </h2>
                    {posts.map((post, i) => (
                      <FadeIn key={post.id} delay={Math.min(i * 0.06, 0.3)}>
                        <Post post={post} />
                      </FadeIn>
                    ))}
                  </>
                ) : (
                  <p className="font-main py-8 text-center text-sm text-gray-400">
                    This team hasn&apos;t posted anything yet.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <Footer setFooterVisible={setFooterVisible} />
    </Fragment>
  );
}

function MemberAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10">
      <span className="font-main text-xs font-semibold text-white">{initials}</span>
    </div>
  );
}

function TeamProfileCard({
  team,
  postCount,
  members,
}: {
  team: BlogTeamProfile;
  postCount: number;
  members: TeamMemberProfile[];
}) {
  return (
    <Card className="flex flex-col items-center gap-5 py-8 text-center">
      <TeamAvatar team={team} size={96} />
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-white">{team.teamName}</h1>
          <Badge variant={team.category === "open" ? "info" : "default"}>
            {team.category}
          </Badge>
        </div>
        {team.robotName && (
          <p className="font-main text-sm text-rose-400">
            Building {team.robotName}
          </p>
        )}
        <p className="font-main text-xs text-gray-500">
          {postCount} {postCount === 1 ? "post" : "posts"}
        </p>
      </div>
      {team.bio && (
        <p className="font-main max-w-sm text-sm text-gray-300">{team.bio}</p>
      )}

      {/* Team members */}
      {members.length > 0 && (
        <div className="w-full border-t border-white/10 pt-5">
          <p className="font-main mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
            Members
          </p>
          <ul className="flex flex-col gap-2">
            {members.map((m) => (
              <li key={m.id} className="flex items-center gap-3 px-2">
                <MemberAvatar name={m.fullName} />
                <span className="font-main text-sm text-gray-200">{m.fullName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

function ProfileSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="h-24 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-36 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
        </div>
        <div className="h-3 w-64 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-48 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}

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
