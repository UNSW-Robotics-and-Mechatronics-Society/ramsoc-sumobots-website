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
