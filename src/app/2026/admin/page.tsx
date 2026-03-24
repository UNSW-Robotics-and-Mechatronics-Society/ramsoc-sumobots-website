import Link from "next/link";
import Path from "@/app/path";
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";
import AdminLoginForm from "./_components/AdminLoginForm";

export default function AdminLoginPage() {
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
      <div className="w-full max-w-sm">
        <GlassPanel>
          <h1 className="mb-6 text-center text-2xl">Admin Login</h1>
          <AdminLoginForm />
        </GlassPanel>
      </div>
    </div>
  );
}
