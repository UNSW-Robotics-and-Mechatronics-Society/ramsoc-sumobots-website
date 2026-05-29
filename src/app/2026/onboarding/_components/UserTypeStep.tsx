"use client";

import { motion } from "motion/react";

export type UserType = "unsw" | "other_uni" | "high_school";

const USER_TYPE_OPTIONS: {
  value: UserType;
  title: string;
  description: string;
}[] = [
  {
    value: "unsw",
    title: "UNSW Student",
    description: "Currently enrolled at UNSW",
  },
  {
    value: "other_uni",
    title: "Other University",
    description: "Enrolled at another university",
  },
  {
    value: "high_school",
    title: "High School Student",
    description: "Currently attending high school",
  },
];

export default function UserTypeStep({
  onSelect,
  standardOpen = true,
  openOpen = true,
}: {
  onSelect: (type: UserType) => void;
  standardOpen?: boolean;
  openOpen?: boolean;
}) {
  // UNSW students can still register as long as open is available (even after standard closes)
  const unswAvailable = standardOpen || openOpen;
  const nonUnswAvailable = openOpen;

  function isAvailable(type: UserType) {
    if (type === "unsw") return unswAvailable;
    return nonUnswAvailable;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="mb-2 text-2xl sm:text-3xl">Who are you?</h2>
        <p className="font-main text-sm text-gray-400">
          This helps us match you with the right competition division
        </p>
      </motion.div>

      <div className="flex w-full flex-col gap-3">
        {USER_TYPE_OPTIONS.map((opt, i) => {
          const available = isAvailable(opt.value);
          return (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => available && onSelect(opt.value)}
              disabled={!available}
              className={`font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border p-5 backdrop-blur-sm transition-colors ${
                available
                  ? "border-white/10 bg-white/5 text-white hover:border-rose-500 hover:bg-white/10"
                  : "cursor-not-allowed border-white/5 bg-white/[0.02] text-gray-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + i * 0.1,
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={available ? { scale: 1.01 } : {}}
              whileTap={available ? { scale: 0.98 } : {}}
            >
              <span className="font-display text-lg">{opt.title}</span>
              <span className={`text-sm ${available ? "text-gray-400" : "text-gray-600"}`}>
                {available ? opt.description : "Registration closed"}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
