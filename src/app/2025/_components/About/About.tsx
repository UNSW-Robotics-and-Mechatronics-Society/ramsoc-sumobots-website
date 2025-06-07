import Image from "next/image";
import StreamSection from "./StreamSection";

export const About = () => {
  return (
    <section id="about" className="container">
      <h2 className="font-display">About SUMOBOTS.</h2>
      <div className="mt-8 flex flex-col-reverse items-center gap-8 md:flex-row">
        <div className="flex flex-col gap-3 md:w-[60%]">
          <p>
            <b>SUMOBOTS</b> is the ultimate test of engineering, strategy, and
            robotic combat. Your mission: design, build, and program an
            autonomous bot to push opponents out of the ring. This is not just
            any competition—it&apos;s a battleground where only the best
            survive.
          </p>
          <p>
            <b>For UNSW students, it starts here</b>. The <b>Standard Stream</b>{" "}
            is exclusive to UNSW, giving students a chance to develop their
            skills and battle it out among their peers. But the true test lies
            ahead — <b>The Open Stream is open to all universities</b>, bringing
            the best student engineers from other institutions into the ring.
          </p>
          <p>Will your bot rise to the challenge?</p>
        </div>
        <div className="w-[70%] md:h-full md:w-[40%]">
          <Image
            width={445}
            height={250}
            src={"2025/VR_005.gif"}
            alt="silly gif of robot"
            unoptimized={true}
          ></Image>
        </div>
      </div>
      <StreamSection />
    </section>
  );
};
