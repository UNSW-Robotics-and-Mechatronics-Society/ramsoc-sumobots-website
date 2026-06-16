"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { LuSettings2 } from "react-icons/lu";
import Navbar from "../_components/Nav/Navbar";
import Footer from "../_components/Footer";
import FadeIn from "../_components/ui/FadeIn";
import Path from "@/app/path";
import Feed from "./_components/feed";
import { getFeedPosts } from "./_data/mockBlog";

export default function BlogPage() {
  const [isFooterVisible, setFooterVisible] = useState(false);
  const posts = getFeedPosts();

  return (
    <Fragment>
      <Navbar isFooterVisible={isFooterVisible} />
      <section className="min-h-screen py-24">
        <div className="flex min-h-screen w-full flex-col items-center bg-black/30 px-4 pt-12">
          <FadeIn className="mb-10 flex max-w-xl flex-col items-center text-center">
            <h1>Robot Feed</h1>
            <p className="font-main mt-2 text-sm text-gray-400">
              Build updates, wins and glorious failures from this year&apos;s
              Sumobots teams.
            </p>
            <Link
              href={Path[2026].Blog.Manage}
              className="font-main mt-5 inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            >
              <LuSettings2 className="h-4 w-4" />
              Manage your posts
            </Link>
          </FadeIn>

          <Feed posts={posts} />
        </div>
      </section>
      <Footer setFooterVisible={setFooterVisible} />
    </Fragment>
  );
}
