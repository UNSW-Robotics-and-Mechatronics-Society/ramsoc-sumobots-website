"use client";
import { useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
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
      <div className="absolute top-1/2 left-[50vw] -translate-x-1/2 -translate-y-1/4">
        <h1 ref={titleRef} className="leading-none">
          <span className="self-start text-[0.8rem] md:text-[1rem] xl:text-[1.5rem]">
            <span className="text-rose-600">2025</span> RAMSOC UNSW PRESENTS
          </span>
        </h1>
        <Image
          src="/2025/banner_text.svg"
          alt="Banner Text"
          layout="responsive"
          width={800}
          height={250}
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
          <div className="mt-7 flex w-full flex-col gap-3 bg-gray-800/50 p-4">
            <span className="font-display text-[1.5rem] leading-normal">
              Join the robot battle.
            </span>
            <p>
              <strong>OPEN</strong> and <strong>STANDARD</strong> streams are
              now live! Sign up today to secure your place in UNSW’s largest
              robotics competition. Registrations close on{" "}
              <strong>31st May 2025</strong>.
            </p>
            <fieldset className="w-fit rounded-md border border-gray-500/50">
              <legend>WHO ARE YOU SIGNING UP AS?</legend>
              <div className="flex flex-row items-center justify-start gap-4 p-4">
                <Link
                  className="button-white bg-white text-[.7rem] leading-snug text-black sm:text-[1rem]"
                  href={UNSW_ONLY_SIGNUP_FORM_URL}
                >
                  I&apos;M A UNSW STUDENT
                </Link>
                <Link
                  className="button-white bg-white text-[.7rem] leading-snug text-black sm:text-[1rem]"
                  href={INTER_UNI_SIGNUP_FORM_URL}
                >
                  I&apos;M FROM ANOTHER UNI
                </Link>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};
