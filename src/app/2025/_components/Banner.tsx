"use client";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import TypingAnimation from "./TypeWriter";
import Social from "./Social";

export const Banner = ({
  setPageTitleVisible,
}: {
  setPageTitleVisible: (visible: boolean) => void;
}) => {
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
            <span className="text-rose-600">2025</span> RAMSOC UNSW PRESENTS
          </span>
        </h1>
        <Image
          src="/2025/banner_text.svg"
          alt="2025 RAMSOC UNSW SUMOBOTS banner"
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
          <div className="mt-4 rounded-md border border-amber-500/50 bg-amber-900/30 p-3 text-amber-200">
            <p className="text-sm">
              <strong>Note:</strong> This website contains information from
              Sumobots 2025. Details for 2026 are subject to change.
            </p>
          </div>
          <div className="mt-3 flex w-full flex-col gap-3 bg-gray-800/50 p-4">
            <span className="font-display text-[1.5rem] leading-normal">
              Sumobots 2026 is coming!
            </span>
            <p>
              Registrations for <strong>Sumobots 2026</strong> will open soon.
              Keep an eye out for updates on our socials!
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Social socialName="instagram" variant="pill" size={20} />
              <Social socialName="facebook" variant="pill" size={20} />
              <Social socialName="discord" variant="pill" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
