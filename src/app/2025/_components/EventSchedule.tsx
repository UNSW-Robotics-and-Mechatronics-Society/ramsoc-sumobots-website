import Link from "next/link";
import Social from "./Social";

export const EventSchedule = () => {
  return (
    <section id="schedule" className="container">
      <h2 className="col-span-full">Event Schedule.</h2>
      <p>
        Get ready for the ultimate showdown! Teams will battle head-to-head,
        pushing their Sumobots to the limit in a test of strategy, speed, and
        control.
      </p>
      <div className="col-span-full mt-5 flex h-[520px] items-center justify-center rounded-xl border border-dashed border-gray-500 p-6">
        <div className="flex flex-col items-center justify-center rounded-md bg-gray-600/50 p-12 text-center">
          <h2 className="mt-0">Yet to be disclosed.</h2>
          <div className="max-w-96">
            <p className="leading-relaxed">
              Details are still being finalised—stay tuned!
            </p>
            <p>
              UNSW students can also explore our{" "}
              <Link
                href={"/2025/workshop"}
                className="underline-offset-2 hover:underline"
              >
                <b>workshops</b>
              </Link>{" "}
              to sharpen their skills before the competition.
            </p>
          </div>
          <h3 className="leading-relaxed">Meanwhile,</h3>
          <p>Follow us on our socials for our latest updates!</p>
          <div className="mt-6 flex flex-col justify-center gap-4">
            <div className="flex h-12 justify-center gap-8 text-white">
              <Social socialName="instagram" size={32} />
              <Social socialName="facebook" size={32} />
              <Social socialName="discord" size={32} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
