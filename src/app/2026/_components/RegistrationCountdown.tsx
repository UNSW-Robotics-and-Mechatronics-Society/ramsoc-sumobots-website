"use client";

import { useEffect, useState } from "react";
import { getRegistrationStatus } from "@/app/2026/_data/registrationConfig";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function RegistrationCountdown() {
  const [status] = useState(() => getRegistrationStatus());
  const [timeLeft, setTimeLeft] = useState(
    status.nextDeadline ? getTimeLeft(status.nextDeadline) : null,
  );

  useEffect(() => {
    if (!status.nextDeadline) return;
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(status.nextDeadline!));
    }, 1000);
    return () => clearInterval(id);
  }, [status.nextDeadline]);

  if (!status.nextDeadline || !timeLeft) return null;

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="mt-3 inline-flex flex-col items-start gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
      <span className="font-main text-[10px] uppercase tracking-wider text-amber-400">
        {status.nextDeadlineLabel}
      </span>
      <div className="flex items-baseline gap-2">
        {days > 0 && (
          <span className="font-main text-white">
            <span className="text-xl font-bold">{days}</span>
            <span className="ml-0.5 text-xs text-gray-400">d</span>
          </span>
        )}
        <span className="font-main text-white">
          <span className="text-xl font-bold">{pad(hours)}</span>
          <span className="ml-0.5 text-xs text-gray-400">h</span>
        </span>
        <span className="font-main text-white">
          <span className="text-xl font-bold">{pad(minutes)}</span>
          <span className="ml-0.5 text-xs text-gray-400">m</span>
        </span>
        <span className="font-main text-white">
          <span className="text-xl font-bold">{pad(seconds)}</span>
          <span className="ml-0.5 text-xs text-gray-400">s</span>
        </span>
      </div>
    </div>
  );
}
