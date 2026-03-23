"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/app/2026/_components/ui/Button";
import CreateTeamForm from "./CreateTeamForm";
import JoinTeamForm from "./JoinTeamForm";

export default function TeamStep({
  onComplete,
  hasTeam,
}: {
  onComplete: () => void;
  hasTeam: boolean;
}) {
  const [mode, setMode] = useState<"choose" | "create" | "join">(
    hasTeam ? "create" : "choose",
  );

  if (hasTeam) {
    // Already on a team — just proceed
    onComplete();
    return null;
  }

  if (mode === "choose") {
    return (
      <div className="flex flex-col gap-4">
        <p className="font-main text-center text-gray-400">
          Create a new team or join an existing one with a code
        </p>
        <motion.button
          type="button"
          onClick={() => setMode("create")}
          className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm transition-colors hover:border-rose-500 hover:bg-white/10"
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-display text-lg">Create a Team</span>
          <span className="text-sm text-gray-400">
            Start a new team and invite others
          </span>
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setMode("join")}
          className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm transition-colors hover:border-rose-500 hover:bg-white/10"
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-display text-lg">Join a Team</span>
          <span className="text-sm text-gray-400">
            Enter a join code from your captain
          </span>
        </motion.button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setMode("choose")}
        className="font-main mb-4 text-sm text-gray-400 hover:text-white"
      >
        &larr; Back
      </button>
      {mode === "create" ? (
        <CreateTeamForm onComplete={onComplete} />
      ) : (
        <JoinTeamForm onComplete={onComplete} />
      )}
    </div>
  );
}
