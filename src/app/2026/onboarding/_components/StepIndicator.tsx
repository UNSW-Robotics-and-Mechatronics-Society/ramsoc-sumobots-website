"use client";

import { cn } from "@/app/_utils/cn";

const STEP_LABELS = ["Who You Are", "Your Details", "Team"];

export default function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-8 flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isComplete = stepNum < currentStep;
        return (
          <div key={stepNum} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={cn(
                "h-1.5 w-full rounded-full transition-colors",
                isActive
                  ? "bg-rose-600"
                  : isComplete
                    ? "bg-rose-600/60"
                    : "bg-gray-700",
              )}
            />
            <span
              className={cn(
                "font-main text-xs",
                isActive ? "text-white" : "text-gray-500",
              )}
            >
              {STEP_LABELS[i] ?? `Step ${stepNum}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
