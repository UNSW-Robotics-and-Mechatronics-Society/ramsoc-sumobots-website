"use client";

import { useState } from "react";
import Card from "@/app/2026/_components/ui/Card";

export default function JoinCodeDisplay({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="text-center">
      <p className="font-main mb-2 text-sm text-gray-400">
        Share this code with your teammates
      </p>
      <button
        onClick={handleCopy}
        className="mx-auto block rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 transition-colors hover:border-rose-500"
      >
        <span className="font-display text-3xl tracking-[0.3em]">{code}</span>
      </button>
      <p className="font-main mt-2 text-xs text-gray-500">
        {copied ? "Copied!" : "Tap to copy"}
      </p>
    </Card>
  );
}
