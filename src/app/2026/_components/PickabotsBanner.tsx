import Link from "next/link";

export default function PickabotsBanner() {
  return (
    <div className="w-full border-y-2 border-yellow-400 bg-yellow-400 py-6">
      <Link
        href="https://pickabots.ramsocunsw.org"
        target="_blank"
        className="group mx-auto flex w-full max-w-3xl flex-col items-center gap-2 px-6 text-center"
      >
        <span className="font-main text-xs font-bold uppercase tracking-widest text-black/70">
          PickABots is live
        </span>
        <span className="font-main text-xl font-extrabold text-black md:text-2xl">
          Everyone needs a PickABots account for Finals &amp; Game Day
        </span>
        <span className="font-main text-sm font-medium text-black/80 md:text-base">
          Create your account now to check when your team&apos;s matches are
          on today, and to vote in the fan voting competition. Use code{" "}
          <span className="font-bold underline underline-offset-2">
            SUMO26
          </span>{" "}
          to sign up.
        </span>
        <span className="font-main mt-2 flex items-center gap-2 rounded-full bg-black px-6 py-2 text-sm font-bold text-yellow-400 transition-transform group-hover:scale-105">
          Create your account
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
