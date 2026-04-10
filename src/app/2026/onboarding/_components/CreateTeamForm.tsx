"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { createTeam } from "@/app/2026/_actions/team";
import { markOnboarded } from "@/app/2026/_actions/profile";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";
import { Button } from "@/app/2026/_components/ui/Button";
import type { UserType } from "./UserTypeStep";

const ALL_CATEGORY_OPTIONS = [
  {
    value: "standard",
    label: "Standard (UNSW only, 3-6 members)",
  },
  {
    value: "open",
    label: "Open (Inter-uni, 1-6 members)",
  },
];

function Field({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function CreateTeamForm({
  onComplete,
  userType,
  solo = false,
}: {
  onComplete: () => void;
  userType: UserType;
  solo?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [joinCode, setJoinCode] = useState<string | null>(null);

  const canJoinStandard = userType === "unsw" && !solo;
  const categoryOptions = canJoinStandard
    ? ALL_CATEGORY_OPTIONS
    : ALL_CATEGORY_OPTIONS.filter((opt) => opt.value === "open");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await createTeam({
      name: form.get("team_name") as string,
      category: solo ? "open" : (form.get("category") as "standard" | "open"),
    });

    setLoading(false);

    if (result.success && result.join_code) {
      setJoinCode(result.join_code);
      await markOnboarded();
    } else {
      setError(result.error || "Something went wrong");
    }
  }

  if (joinCode) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="mb-2">{solo ? "You're all set!" : "Team Created!"}</h3>
          <p className="text-gray-400">
            {solo
              ? "Keep this code in case you want to add teammates later"
              : "Share this code with your teammates"}
          </p>
        </motion.div>
        <motion.div
          className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-sm transition-colors hover:border-rose-500"
          onClick={() => navigator.clipboard.writeText(joinCode)}
          title="Click to copy"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="font-display text-4xl tracking-[0.3em]">
            {joinCode}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <p className="text-xs text-gray-500">Tap the code to copy</p>
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button size="full" onClick={onComplete}>
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {solo && (
        <Field delay={0.3}>
          <p className="font-main text-center text-sm text-gray-400">
            Name your solo team. You&apos;ll compete in the Open division.
          </p>
        </Field>
      )}

      <Field delay={0.4}>
        <Input
          label="Team Name"
          name="team_name"
          required
          placeholder="e.g. The Destroyers"
        />
      </Field>

      {!solo && (
        <Field delay={0.4}>
          <Select
            label="Category"
            name="category"
            options={categoryOptions}
            required
            defaultValue={canJoinStandard ? "standard" : "open"}
          />
        </Field>
      )}

      {!solo && (
        <Field delay={0.3}>
          <p className="font-main text-xs text-gray-500">
            {canJoinStandard ? (
              <>
                <b>Standard:</b> UNSW students only, 3-6 members.{" "}
                <b>Open:</b> Any university or high school, 1-6 members.
              </>
            ) : (
              <>
                <b>Open:</b> Any university or high school, 1-6 members.
                {userType === "high_school"
                  ? " High school students can only compete in the Open division."
                  : " Non-UNSW students can only compete in the Open division."}
              </>
            )}
          </p>
        </Field>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="sticky bottom-4 mt-4 pt-4">
        <Button type="submit" size="full" disabled={loading} loading={loading}>
          {loading ? "Creating..." : solo ? "Go Solo" : "Create Team"}
        </Button>
      </div>
    </form>
  );
}
