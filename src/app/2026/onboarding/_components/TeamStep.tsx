"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CreateTeamForm from "./CreateTeamForm";
import JoinTeamForm from "./JoinTeamForm";
import { markOnboarded } from "@/app/2026/_actions/profile";
import type { UserType } from "./UserTypeStep";
import type { TeamCategory } from "@/app/2026/_data/teamConfig";

export default function TeamStep({
  onComplete,
  onBack,
  hasTeam,
  userType,
  division,
}: {
  onComplete: () => void;
  onBack?: () => void;
  hasTeam: boolean;
  userType: UserType;
  division: TeamCategory;
}) {
  const isStandard = division === "standard";
  const [mode, setMode] = useState<"choose" | "create" | "join" | "solo">(
    hasTeam ? "create" : "choose",
  );
  const [delaying, setDelaying] = useState(false);
  const [delayError, setDelayError] = useState("");

  if (hasTeam) {
    onComplete();
    return null;
  }

  async function handleDecideLater() {
    setDelaying(true);
    setDelayError("");
    const result = await markOnboarded();
    if (result.success) {
      onComplete();
    } else {
      setDelaying(false);
      setDelayError(result.error || "Failed to skip team selection");
    }
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
            Create a team, join one with a code{!isStandard && ", or go it alone"}
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
          {!isStandard && (
            <motion.button
              type="button"
              onClick={() => setMode("solo")}
              className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm transition-colors hover:border-rose-500 hover:bg-white/10"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-display text-lg">Go Solo</span>
              <span className="text-sm text-gray-400">
                Compete on your own in the Open division
              </span>
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={handleDecideLater}
            disabled={delaying}
            className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm transition-colors hover:border-rose-500 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
            whileHover={{ scale: delaying ? 1 : 1.01 }}
            whileTap={{ scale: delaying ? 1 : 0.98 }}
          >
            <span className="font-display text-lg">
              {delaying ? "Saving..." : "Decide Later"}
            </span>
            <span className="text-sm text-gray-400">
              Skip for now and set up your team from the dashboard
            </span>
          </motion.button>
          {delayError && (
            <p className="text-center text-sm text-red-400">{delayError}</p>
          )}
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
          {mode === "create" && (
            <CreateTeamForm onComplete={onComplete} userType={userType} division={division} />
          )}
          {mode === "join" && (
            <JoinTeamForm onComplete={onComplete} userType={userType} />
          )}
          {mode === "solo" && (
            <CreateTeamForm onComplete={onComplete} userType={userType} division={division} solo />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
