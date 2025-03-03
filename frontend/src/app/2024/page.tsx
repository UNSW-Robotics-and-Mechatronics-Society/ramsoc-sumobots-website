import Link from "next/link";
import { Fragment } from "react";
import { TimelineData } from "./_data/TimelineData";
import {
  AdvancedWinnersData,
  AestheticWinnersData,
  ParticipantData,
  StandardWinnersData,
} from "./_data/ParticipantData";
import WinnersCard from "./_components/ParticipantCard/WinnersCard";
import ParticipantCard from "./_components/ParticipantCard/ParticipantCard";
import { SponsorData } from "./_data/SponsorsData";
import Image from "next/image";

export default function Page() {
  return (
    <Fragment>
      <div className="container flex h-[66vh] flex-col items-center justify-center gap-8">
        <h1 className="font-display col-span-full flex w-full flex-col items-center leading-none">
          <span className="text-[8vw] md:text-[6.5vw] xl:text-[4.5vw]">
            UNSW MTRNSOC PRESENTS
          </span>
          <span className="text-[12.57vw] text-blue-400 md:text-[10.3vw] xl:text-[7.2vw]">
            SUMOBOTS 2024
          </span>
        </h1>
        <span className="font-display col-span-full flex w-full flex-col items-center leading-snug">
          <span className="text-[7.27vw] md:text-[5vw] xl:text-[3vw]">
            EVENT CONCLUDED
          </span>
          <span className="text-[6.85vw] md:text-[4.7vw] xl:text-[2.85vw]">
            SEE YOU NEXT YEAR!
          </span>
        </span>
      </div>
      <div className="min-h-screen w-full bg-black pt-12">
        <section className="container">
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
              href={"/resources/2024/2024 Sumobots Formal Rules.pdf"}
              target="_blank"
            >
              Rulebook
            </Link>
          </div>
          <div className="col-span-5 hidden h-full items-center overflow-hidden lg:flex">
            <Image
              width={445}
              height={250}
              src={"/2024/VR_005.gif"}
              alt="silly gif of robot"
            ></Image>
          </div>
        </section>
        <section className="container">
          <h2 className="col-span-full">Watch Our Live Stream</h2>
          <div className="col-span-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/rF5C53Vflls"
              width="1120"
              height="630"
              title="A YouTube video"
              allowFullScreen
              className="h-full w-full"
            ></iframe>
          </div>
        </section>
        <section className="container">
          <h2 className="col-span-full">Timeline</h2>
          <p className="col-span-full">
            From Week 1 - Week 4 we will be hosting workshops on CAD, Arduino,
            soldering, laser cutting, etc (check our{" "}
            <Link className="text-link" href={"https://shorturl.at/yJMCJ"}>
              info pack
            </Link>{" "}
            for more details). We host the same workshops twice a week on
            Tuesday and Thursday 6-8pm, so attend the day that suits you best
            (you will only need to attend one day a week). We also provide
            pre-recorded workshops if you are unable to attend. Pizza and drinks
            will be provided.
          </p>
          <table className="col-span-full border-separate border-spacing-y-8">
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
          </table>
        </section>
        <section className="container">
          <h2 className="col-span-full">2024 Advanced Stream Winners</h2>
          <div className="col-span-full my-8 grid grid-cols-12 justify-around gap-8">
            {AdvancedWinnersData.map((data, i) => {
              return (
                <WinnersCard
                  key={data.title}
                  color={i}
                  title={data.title}
                ></WinnersCard>
              );
            })}
          </div>
        </section>
        <section className="container">
          <h2 className="col-span-full">2024 Standard Stream Winners</h2>
          <div className="col-span-full my-8 grid min-h-96 grid-cols-12 justify-around gap-8">
            {StandardWinnersData.map((data, i) => {
              return (
                <WinnersCard
                  key={data.title}
                  color={i}
                  title={data.title}
                ></WinnersCard>
              );
            })}
          </div>
        </section>
        <section className="container">
          <h2 className="col-span-full">
            Most Aesthetic Bot and People&apos;s Choice Winners
          </h2>
          <div className="col-span-full my-8 grid min-h-96 grid-cols-12 justify-around gap-8">
            {AestheticWinnersData.map((data) => {
              return (
                <WinnersCard
                  key={data.title}
                  color={3}
                  title={data.title}
                ></WinnersCard>
              );
            })}
          </div>
        </section>
        <section className="container">
          <h2 className="col-span-full">Participants</h2>
          <div className="col-span-full my-8 flex flex-wrap justify-around gap-x-4 gap-y-16">
            {ParticipantData.map((data) => {
              return (
                <ParticipantCard key={data.title} data={data}></ParticipantCard>
              );
            })}
          </div>
        </section>

        <section className="container">
          <h2 className="col-span-full">Resources</h2>
          <div className="col-span-full">
            <p>
              Dive deeper into the world of SumoBots with our curated collection
              of resources. Find tutorials on designing and building your own
              robot warrior, learn essential programming skills, and explore the
              rules and regulations of sumo competitions. Whether you&apos;re a
              beginner or a seasoned veteran, these resources will equip you
              with the knowledge and inspiration to conquer the ring.
            </p>
            <Link className="button mt-8" href={"/2024/resources"}>
              Learn More
            </Link>
          </div>
        </section>
        <section className="container pb-24">
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
                  src={`/2024${data.src}`}
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
