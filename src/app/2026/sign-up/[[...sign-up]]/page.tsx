import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import Path from "@/app/path";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-6 w-full max-w-sm">
        <Link
          href={Path[2026].Root}
          className="font-main inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sumobots
        </Link>
      </div>
      <SignUp />
    </div>
  );
}
