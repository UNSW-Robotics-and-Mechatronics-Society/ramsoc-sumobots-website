"use client";

/**
 * Renders two slowly drifting gradient blobs behind content.
 * Place inside a `relative overflow-hidden` container.
 */
export default function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Primary blob – rose/pink */}
      <div
        className="absolute -top-1/3 -left-1/4 h-[70%] w-[70%] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)",
          animation: "ambient-drift 12s ease-in-out infinite",
        }}
      />
      {/* Secondary blob – blue/purple */}
      <div
        className="absolute -right-1/4 -bottom-1/3 h-[60%] w-[60%] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          animation: "ambient-drift-2 15s ease-in-out infinite",
        }}
      />
    </div>
  );
}
