"use client";

import Link from "next/link";
import Card from "@/app/2026/_components/ui/Card";
import { Button } from "@/app/2026/_components/ui/Button";
import Path from "@/app/path";

export default function NoTeamState() {
  return (
    <Card className="text-center">
      <h3 className="mb-2">No Team Yet</h3>
      <p className="font-main mb-4 text-sm text-gray-400">
        Create a new team or join one with a code
      </p>
      <Link href={Path[2026].Onboarding}>
        <Button size="full">Create or Join a Team</Button>
      </Link>
    </Card>
  );
}
