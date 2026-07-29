import Link from "next/link";

export default function PickabotsBanner() {
  return (
    <Link
      href="https://pickabots.ramsocunsw.org"
      target="_blank"
      className="group mx-auto mt-8 flex w-full max-w-3xl flex-col items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-6 py-4 text-center transition-colors hover:bg-rose-500/20"
    >
      <span className="font-main text-xs font-semibold uppercase tracking-wider text-rose-400">
        PickABots is live
      </span>
      <span className="font-main text-sm text-white md:text-base">
        Check when your team&apos;s matches are on today, and vote for your
        favourite bots in the fan voting competition.
      </span>
      <span className="font-main mt-1 flex items-center gap-1 text-sm font-semibold text-rose-400 group-hover:text-rose-300">
        Go to PickABots
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
  );
}
