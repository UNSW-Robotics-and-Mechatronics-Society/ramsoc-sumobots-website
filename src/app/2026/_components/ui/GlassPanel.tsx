"use client";

import { cn } from "@/app/_utils/cn";
import AmbientGlow from "./AmbientGlow";

/**
 * A glassmorphism container with an ambient animated gradient behind it.
 * Used as the outer wrapper for full-page sections (dashboard, onboarding, etc.)
 */
export default function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8",
        className,
      )}
    >
      <AmbientGlow />
      {children}
    </div>
  );
}
