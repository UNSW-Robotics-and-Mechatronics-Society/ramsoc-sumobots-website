"use client";

import { motion } from "motion/react";
import type { TeamCategory } from "@/app/2026/_data/teamConfig";

const DIVISION_OPTIONS: {
  value: TeamCategory;
  title: string;
  description: string;
}[] = [
  {
    value: "standard",
    title: "Standard",
    description: "UNSW students only, 3-6 members per team",
  },
  {
    value: "open",
    title: "Open",
    description: "Any university or high school, 1-6 members (solo allowed)",
  },
];

export default function DivisionStep({
  onSelect,
  onBack,
}: {
  onSelect: (division: TeamCategory) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="mb-2 text-2xl sm:text-3xl">Which division?</h2>
        <p className="font-main text-sm text-gray-400">
          As a UNSW student you can compete in either division
        </p>
      </motion.div>

      <div className="flex w-full flex-col gap-3">
        {DIVISION_OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm transition-colors hover:border-rose-500 hover:bg-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + i * 0.1,
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-display text-lg">{opt.title}</span>
            <span className="text-sm text-gray-400">{opt.description}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onBack}
        className="font-main text-sm text-gray-400 transition-colors hover:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        &larr; Back
      </motion.button>
    </div>
  );
}
