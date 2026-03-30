"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CreateTeamForm from "./CreateTeamForm";
import JoinTeamForm from "./JoinTeamForm";
import type { UserType } from "./UserTypeStep";

export default function TeamStep({
  onComplete,
  hasTeam,
  userType,
}: {
  onComplete: () => void;
  hasTeam: boolean;
  userType: UserType;
}) {
  const [mode, setMode] = useState<"choose" | "create" | "join">(
    hasTeam ? "create" : "choose",
  );

  if (hasTeam) {
    onComplete();
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {mode === "choose" && (
        <motion.div
          key="choose"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-4"
        >
          <p className="font-main text-center text-gray-400">
            Create a new team or join an existing one with a code
          </p>
          <motion.button
            type="button"
            onClick={() => setMode("create")}
            className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm transition-colors hover:border-rose-500 hover:bg-white/10"
            whileHover={{ scale: 1.01 }}
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
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-display text-lg">Join a Team</span>
            <span className="text-sm text-gray-400">
              Enter a join code from your captain
            </span>
          </motion.button>
        </motion.div>
      )}

      {mode !== "choose" && (
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <button
            type="button"
            onClick={() => setMode("choose")}
            className="font-main mb-4 text-sm text-gray-400 transition-colors hover:text-white"
          >
            &larr; Back
          </button>
          {mode === "create" ? (
            <CreateTeamForm onComplete={onComplete} userType={userType} />
          ) : (
            <JoinTeamForm onComplete={onComplete} userType={userType} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
