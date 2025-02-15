import Link from "next/link";
import Image from "next/image";

export const About = () => {
    return (
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
    );
}