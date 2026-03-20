"use client";

import { useState } from "react";
import { createTeam } from "@/app/2026/_actions/team";
import { markOnboarded } from "@/app/2026/_actions/profile";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";
import { Button } from "@/app/2026/_components/ui/Button";

const CATEGORY_OPTIONS = [
  {
    value: "standard",
    label: "Standard (UNSW only, 3–6 members)",
  },
  {
    value: "open",
    label: "Open (Inter-uni, 1–6 members)",
  },
];

export default function CreateTeamForm({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [joinCode, setJoinCode] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await createTeam({
      name: form.get("team_name") as string,
      category: form.get("category") as "standard" | "open",
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
        <div>
          <h3 className="mb-2">Team Created!</h3>
          <p className="text-gray-400">Share this code with your teammates</p>
        </div>
        <div
          className="cursor-pointer rounded-xl border border-gray-700 bg-gray-900 px-8 py-6 transition-colors hover:border-rose-500"
          onClick={() => navigator.clipboard.writeText(joinCode)}
          title="Click to copy"
        >
          <span className="font-display text-4xl tracking-[0.3em]">
            {joinCode}
          </span>
        </div>
        <p className="text-xs text-gray-500">Tap the code to copy</p>
        <Button size="full" onClick={onComplete}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Team Name"
        name="team_name"
        required
        placeholder="e.g. The Destroyers"
      />

      <Select
        label="Category"
        name="category"
        options={CATEGORY_OPTIONS}
        required
        defaultValue="standard"
      />

      <p className="font-main text-xs text-gray-500">
        <b>Standard:</b> UNSW students only, 3–6 members.{" "}
        <b>Open:</b> Any university, 1–6 members.
      </p>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="sticky bottom-4 mt-4 pt-4">
        <Button type="submit" size="full" disabled={loading}>
          {loading ? "Creating..." : "Create Team"}
        </Button>
      </div>
    </form>
  );
}
