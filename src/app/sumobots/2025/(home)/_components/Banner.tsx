"use client";
import { useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

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
      className="container relative flex h-[100vh] min-h-[30rem] flex-col items-center justify-center"
    >
      <div className="absolute left-[50vw] top-1/2 -translate-x-1/2 -translate-y-1/4">
        <h1 ref={titleRef} className="leading-none">
          <span className="self-start text-[0.8rem] md:text-[1rem] xl:text-[1.5rem]">
            RAMSOC UNSW PRESENTS
          </span>
          <span className="block text-[12vw] sm:text-[5.5rem] md:text-[7rem] xl:text-[8rem]">
            SUMOBOTS
          </span>
        </h1>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-row justify-between pt-4">
            <p className="pr-4 text-[1rem] md:text-[1.5rem] xl:text-[1.7rem]">
              2nd JUNE, <span className="text-rose-600">2025</span>
            </p>
            <p className="text-right text-[1rem] md:text-[1.5rem] xl:text-[1.7rem]">
              9 WEEKS EVENT
            </p>
          </div>
          <div className="mt-7 flex w-full flex-col gap-3 bg-gray-800/50 p-4">
            <h3 className="mb-0 text-[1rem] leading-normal sm:text-[2rem]">
              Join the robot battle.
            </h3>
            <p>
              Applications open on May 25th. Fill out our EOI form to stay
              updated.
            </p>
            <Link
              className="button-white bg-white text-[.7rem] leading-snug text-black sm:text-[1rem]"
              href="/sumobots/2025/eoi"
            >
              EXPRESS INTEREST.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
