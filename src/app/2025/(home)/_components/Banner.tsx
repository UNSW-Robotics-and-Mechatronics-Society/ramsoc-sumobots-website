"use client";
import { useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import TypingAnimation from "./TypeWriter";
import {
  INTER_UNI_SIGNUP_FORM_URL,
  UNSW_ONLY_SIGNUP_FORM_URL,
} from "@/app/constants";

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
      className="relative flex h-[100vh] min-h-[30rem] flex-col items-center justify-center"
    >
      <div className="absolute left-[50vw] top-1/2 -translate-x-1/2 -translate-y-1/4">
        <h1 ref={titleRef} className="leading-none">
          <span className="self-start text-[0.8rem] md:text-[1rem] xl:text-[1.5rem]">
            <span className="text-rose-600">2025</span> RAMSOC UNSW PRESENTS
          </span>
          <span className="block text-[12vw] sm:text-[5.5rem] md:text-[7rem] xl:text-[8rem]">
            SUMOBOTS
          </span>
        </h1>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-row justify-between pt-4">
            <TypingAnimation
              words={["Learn.", "Build.", "Battle."]}
              className="pr-4 text-right align-top text-[1rem] text-gray-300 md:text-[1.5rem] xl:text-[1.7rem]"
            />
            <p className="text-[1rem] md:text-[1.5rem] xl:text-[1.7rem]">
              INTER-UNI COMPETITION
            </p>
          </div>
          <div className="mt-7 flex w-full flex-col gap-3 bg-gray-800/50 p-4">
            <h3 className="mb-0 text-[1rem] leading-normal sm:text-[2rem]">
              Join the robot battle.
            </h3>
            <p>
              <strong>OPEN</strong> and <strong>STANDARD</strong> streams are
              live! Sign up now to secure your spot in the largest robotics
              competition in UNSW. Sign-up closes on{" "}
              <strong>31st MAY 2025</strong>.
            </p>
            <div className="flex w-fit flex-row items-center justify-start gap-4 rounded-md border bg-gray-800/50 p-3">
              <Link
                className="button-white bg-white text-[.7rem] leading-snug text-black sm:text-[1rem]"
                href={INTER_UNI_SIGNUP_FORM_URL}
              >
                INTER UNI SIGN UP
              </Link>
              <Link
                className="button-white bg-white text-[.7rem] leading-snug text-black sm:text-[1rem]"
                href={UNSW_ONLY_SIGNUP_FORM_URL}
              >
                UNSW ONLY SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
