"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { previewTeam, joinTeam } from "@/app/2026/_actions/team";
import { markOnboarded } from "@/app/2026/_actions/profile";
import Input from "@/app/2026/_components/ui/Input";
import { Button } from "@/app/2026/_components/ui/Button";
import Badge from "@/app/2026/_components/ui/Badge";

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

export default function JoinTeamForm({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{
    name: string;
    category: string;
    member_count: number;
  } | null>(null);

  async function handlePreview() {
    if (code.length !== 6) {
      setError("Join code must be 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    const result = await previewTeam(code);
    setLoading(false);

    if (result.success && result.team) {
      setPreview(result.team);
    } else {
      setError(result.error || "Invalid code");
    }
  }

  async function handleJoin() {
    setLoading(true);
    setError("");

    const result = await joinTeam(code);
    setLoading(false);

    if (result.success) {
      await markOnboarded();
      onComplete();
    } else {
      setError(result.error || "Failed to join team");
    }
  }

  if (preview) {
    return (
      <div className="flex flex-col gap-5">
        <Field delay={0.05}>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <h3 className="mb-2">{preview.name}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="info">
                {preview.category === "standard" ? "Standard" : "Open"}
              </Badge>
              <span className="font-main text-sm text-gray-400">
                {preview.member_count} member{preview.member_count !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </Field>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Field delay={0.1}>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="full"
              onClick={() => {
                setPreview(null);
                setCode("");
              }}
            >
              Cancel
            </Button>
            <Button size="full" onClick={handleJoin} disabled={loading}>
              {loading ? "Joining..." : "Join Team"}
            </Button>
          </div>
        </Field>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Field delay={0.05}>
        <Input
          label="Join Code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
          placeholder="ABCDEF"
          maxLength={6}
          className="text-center font-mono text-2xl tracking-[0.3em] uppercase"
          autoComplete="off"
        />
      </Field>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Field delay={0.1}>
        <div className="sticky bottom-4 mt-4 pt-4">
          <Button
            size="full"
            onClick={handlePreview}
            disabled={loading || code.length !== 6}
          >
            {loading ? "Looking up..." : "Find Team"}
          </Button>
        </div>
      </Field>
    </div>
  );
}
