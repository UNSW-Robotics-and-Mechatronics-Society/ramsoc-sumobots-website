"use client"

import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import { Timetable } from "./_components/Timetable";

export default function Page() {

  return (
    <Fragment>
      <div id="banner" className="container flex h-[100vh] flex-col items-center justify-center gap-8">
        <h1 className="font-display col-span-full flex w-full flex-col items-center leading-none">
          <span className="text-[8vw] md:text-[6.5vw] xl:text-[4.5vw]">
            RAMSOC UNSW PRESENTS
          </span>
          <span className="text-[12.57vw] text-blue-400 md:text-[10.3vw] xl:text-[7.2vw]">
            SUMOBOTS 2025
          </span>
        </h1>
      </div>
      <div className="min-h-screen w-full pt-12 bg-black/30">
        <section id="about" className="container">
          <h2 className="font-display col-span-full">What is SUMOBOTS.</h2>
          <div className="col-span-full flex flex-col-reverse items-center md:flex-row gap-8 mt-8">
            <div className="md:w-[60%]">
              <p>
                Sumobots is a sport in which two robots attempt to push each other
                out of a circle. You will be competing in a team of 1-6 people to
                build a robot that can defeat other bots. The competition is
                divided into the basic and the advanced stream, depending on your
                experience.
              </p>
              <Link
                className="button mt-8"
                href={"/sumobots/2025/resources/2024 Sumobots Formal Rules.pdf"}
                target="_blank"
              >
                2024 RULEBOOK
              </Link>
            </div>
            <div className="w-[70%] md:h-full md:w-[40%]">
              <Image
                width={445}
                height={250}
                src={"/sumobots/2025/VR_005.gif"}
                alt="silly gif of robot"
                unoptimized={true}
              ></Image>
            </div>
          </div>
        </section>
        <section id="timeline" className="container">
          <h2 className="col-span-full">Timeline.</h2>
          <div className="col-span-full flex justify-center items-center mt-5">
            <Timetable/>
          </div>
        </section>
        <section id="sponsor" className="container pb-24">
          <h2 className="col-span-full">Let&apos;s host a great event, together.</h2>
          <p className="col-span-full">
            Our sponsors allow us to host hundreds of students every year and provide them with great learning opportunities and fun experiences.<br />
            If you would like to help us do the same this year, contact us at{" "}
            <a className="text-link" href="mailto:industry@ramsocunsw.org">industry@ramsocunsw.org</a>, today!
          </p>
        </section>
      </div>
    </Fragment>
  );
}
