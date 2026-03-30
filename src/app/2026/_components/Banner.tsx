"use client";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import TypingAnimation from "./TypeWriter";
import Social from "./Social";
import Path from "@/app/path";

export const Banner = ({
  setPageTitleVisible,
}: {
  setPageTitleVisible: (visible: boolean) => void;
}) => {
  const { isSignedIn } = useAuth();
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, {
    amount: "all",
    margin: "80px 0px 0px 0px",
  });

  useEffect(() => {
    setPageTitleVisible(isTitleInView);
  }, [isTitleInView, setPageTitleVisible]);

  return (
    <div
      id="banner"
      className="relative flex h-[100vh] min-h-[50rem] flex-col items-center justify-center"
    >
      <div className="absolute top-1/2 left-[50vw] -translate-x-1/2 -translate-y-1/4">
        <h1 ref={titleRef} className="leading-none">
          <span className="self-start text-[0.8rem] md:text-[1rem] xl:text-[1.5rem]">
            <span className="text-rose-600">2026</span> RAMSOC UNSW PRESENTS
          </span>
        </h1>
        <Image
          src="/2026/banner_text.svg"
          alt="2026 RAMSOC UNSW SUMOBOTS banner"
          width={800}
          height={250}
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-row justify-between pt-4">
            <TypingAnimation
              words={["Learn.", "Build.", "Battle."]}
              className="pr-4 text-right align-top text-[1rem] text-gray-300 md:text-[1.5rem] xl:text-[1.7rem]"
            />
            <span className="text-[1rem] md:text-[1.5rem] xl:text-[1.7rem]">
              INTER-UNI COMPETITION
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Social socialName="instagram" variant="pill" size={20} />
            <Social socialName="facebook" variant="pill" size={20} />
            <Social socialName="discord" variant="pill" size={20} />
          </div>
          <Link
            href="https://discord.gg/rK6pcQZWrb"
            target="_blank"
            className="mt-2 flex items-center gap-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 transition-colors hover:bg-indigo-500/20"
          >
            <span className="text-indigo-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
              </svg>
            </span>
            <span className="font-main text-sm text-white">
              All updates and announcements will be through our Discord — join now!
            </span>
          </Link>
          <Link
            href={Path[2026].Dashboard}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-rose-600 px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-rose-500 active:translate-y-px"
          >
            {isSignedIn ? "Go to Dashboard" : "Register Now"}
          </Link>
        </div>
      </div>
    </div>
  );
};
