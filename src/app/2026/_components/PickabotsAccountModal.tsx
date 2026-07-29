"use client";

import { useState } from "react";
import Link from "next/link";

export default function PickabotsAccountModal({ show }: { show: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-md rounded-2xl border border-yellow-400/40 bg-zinc-900 p-6 text-center shadow-2xl">
        <button
          onClick={() => setDismissed(true)}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-500 transition-colors hover:text-white"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span className="font-main text-xs font-bold tracking-widest text-yellow-400 uppercase">
          One more thing
        </span>
        <h2 className="font-main mt-2 text-xl font-extrabold text-white">
          Set up your PickABots account
        </h2>
        <p className="font-main mt-3 text-sm text-gray-300">
          You&apos;ll need a PickABots account to check when your matches are
          on during Finals &amp; Game Day, and to vote in the fan voting
          competition. Use code{" "}
          <span className="font-bold text-yellow-400 underline underline-offset-2">
            SUMO26
          </span>{" "}
          to sign up.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="https://pickabots.ramsocunsw.org"
            target="_blank"
            onClick={() => setDismissed(true)}
            className="font-main rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            Create your account
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="font-main text-xs text-gray-500 transition-colors hover:text-gray-300"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
