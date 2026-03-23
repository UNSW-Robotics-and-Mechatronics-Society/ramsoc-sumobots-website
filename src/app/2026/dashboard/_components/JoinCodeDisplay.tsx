"use client";

import { useState } from "react";
import Card from "@/app/2026/_components/ui/Card";

export default function JoinCodeDisplay({ code }: { code: string }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleClick() {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="text-center">
      <p className="font-main mb-2 text-sm text-gray-400">
        {revealed
          ? "Share this code with your teammates"
          : "Tap to reveal your team join code"}
      </p>
      <button
        onClick={handleClick}
        className="mx-auto block rounded-lg border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm transition-colors hover:border-rose-500"
      >
        <span className="font-display text-3xl tracking-[0.3em]">
          {revealed ? code : "\u2022\u2022\u2022\u2022\u2022\u2022"}
        </span>
      </button>
      <p className="font-main mt-2 text-xs text-gray-500">
        {revealed
          ? copied
            ? "Copied!"
            : "Tap to copy"
          : "Tap to reveal"}
      </p>
    </Card>
  );
}
