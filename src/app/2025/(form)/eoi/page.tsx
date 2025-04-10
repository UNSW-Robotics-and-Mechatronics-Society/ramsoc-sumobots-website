"use client";
import EOIFormEnd from "./_components/EOIFormEnd";
import EOIForm from "./_components/EOIForm";
import { SubmitStatus } from "@/app/_types/SubmitStatus";
import { useState } from "react";

export default function EOI() {
  const [status, setStatus] = useState<SubmitStatus>("initial");
  return (
    <div className="flex h-[90vh] min-h-[620px] flex-col items-center justify-center px-6 pb-6 text-white">
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-linear-to-br from-gray-900 to-black p-8 shadow-lg">
        {status !== "success" ? (
          <EOIForm status={status} setStatus={setStatus} />
        ) : (
          <EOIFormEnd />
        )}
      </div>
    </div>
  );
}
