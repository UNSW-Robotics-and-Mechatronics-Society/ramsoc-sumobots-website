import Link from "next/link";
import Image from "next/image";

export const About = () => {
  return (
    <section id="about" className="container">
      <h2 className="font-display col-span-full">What is SUMOBOTS.</h2>
      <div className="mt-8 flex flex-col-reverse items-center gap-8 md:flex-row">
        <div className="flex flex-col gap-3 md:w-[60%]">
          <p>
            Sumobots is a sport in which two robots attempt to push each other
            out of a circle. You will be competing in a team of 1-6 people to
            build a robot that can defeat other bots. The competition is divided
            into the basic and the advanced stream, depending on your
            experience.
          </p>
          <Link
            className="button"
            href={"static/2024/2024_Sumobots_Formal_Rules.pdf"}
            target="_blank"
          >
            2024 RULEBOOK.
          </Link>
        </div>
        <div className="w-[70%] md:h-full md:w-[40%]">
          <Image
            width={445}
            height={250}
            src={"static/2025/VR_005.gif"}
            alt="silly gif of robot"
            unoptimized={true}
          ></Image>
        </div>
      </div>
    </section>
  );
};
