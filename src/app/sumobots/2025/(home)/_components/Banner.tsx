import Link from "next/link";

export const Banner = () => {
  return (
    <div
      id="banner"
      className="container flex h-[100vh] flex-col items-center justify-center gap-8"
    >
      <div className="w-fit">
        <h1 className="font-display col-span-full flex w-fit flex-col items-center leading-none">
          <span className="self-start text-[0.8rem] md:text-[1rem] xl:text-[1.5rem]">
            RAMSOC UNSW PRESENTS
          </span>
          <span className="xs:text[4rem] text-[3rem] sm:text-[5.5rem] md:text-[7rem] xl:text-[8rem]">
            SUMOBOTS
          </span>
        </h1>
        <div className="flex w-full flex-row justify-between pt-4">
          <p className="text-[1rem] md:text-[1.5rem] xl:text-[1.7rem]">
            2nd JUNE, <span className="text-rose-600">2025</span>
          </p>
          <p className="text-[1rem] md:text-[1.5rem] xl:text-[1.7rem]">
            9 WEEKS EVENT
          </p>
        </div>
        <div className="mt-7 flex h-fit w-full flex-col gap-2 bg-gray-800/50 p-4">
          <h3 className="mb-0 text-[1.5rem] sm:text-[2rem]">
            Join the robot battle.
          </h3>
          <p className="text-[0.8rem] md:text-[1rem] xl:text-[1.2rem]">
            Applications open on May 25th. Fill out our EOI form to stay
            updated.
          </p>
          <Link className="button text-[1rem]" href="/sumobots/2025/eoi">
            EXPRESS INTEREST.
          </Link>
        </div>
      </div>
    </div>
  );
};
