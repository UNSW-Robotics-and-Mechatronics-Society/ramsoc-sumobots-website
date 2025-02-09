"use client"

import Link from "next/link";
import { Fragment } from "react";
import { SponsorData } from "../_data/SponsorsData";
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
      <div className="min-h-screen w-full bg-black pt-12">
        <section id="about" className="container">
          <h2 className="font-display col-span-full">What is Sumobots</h2>
          <div className="col-span-full lg:col-span-7">
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
              Rulebook
            </Link>
          </div>
          <div className="col-span-5 hidden h-full items-center overflow-hidden lg:flex">
            <Image
              width={445}
              height={250}
              src={"/sumobots/2025/VR_005.gif"}
              alt="silly gif of robot"
              unoptimized={true}
            ></Image>
          </div>
        </section>
        <section id="timeline" className="container">
          <h2 className="col-span-full">Timeline</h2>
            <p className="col-span-full">
            Join our workshops from Week 1 - Week 4 on CAD, Arduino, soldering, and more. Check our{" "}
            <Link className="text-link" href={"https://shorturl.at/yJMCJ"}>
              info pack
            </Link>{" "}
            for details. Workshops are held twice weekly on Tuesday and Thursday from 6-8pm. Attend one session per week. Pre-recorded sessions are available. Food and drinks provided.
            </p>
          <Timetable/>
          {/* <table className="col-span-full border-separate border-spacing-y-8">
            <thead className="text-blue-400">
              <tr>
                <th className="font-semibold">Week</th>
                <th className="font-semibold">Topics</th>
                <th className="font-semibold">Date</th>
                <th className="font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {TimelineData.map((data, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center text-xl text-white text-opacity-70"
                  >
                    <td>{data.week}</td>
                    <td>{data.topics}</td>
                    <td>{data.date}</td>
                    <td>{data.location}</td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </section>
        <section id="sponsor" className="container pb-24">
          <h2 className="col-span-full">Proudly Sponsored By</h2>
          <div className="col-span-full grid h-full grid-cols-8 justify-items-center gap-8">
            {SponsorData.map((data) => (
              <div
                key={data.name}
                className="col-span-4 aspect-square w-full overflow-hidden rounded-full lg:col-span-2"
              >
                <Image
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                  src={`/sumobots/2025${data.src}`}
                  alt={`${data.name} logo`}
                ></Image>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Fragment>
  );
}
