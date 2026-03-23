"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/app/2026/_components/ui/Button";
import { adminLogout } from "@/app/2026/admin/_actions/auth";
import Path from "@/app/path";
import { cn } from "@/app/_utils/cn";

const tabs = [
  { label: "Teams", href: Path[2026].AdminTeams },
  { label: "Individuals", href: Path[2026].AdminIndividuals },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await adminLogout();
      router.push(Path[2026].Admin);
    });
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-semibold">Admin</h1>
            <nav className="flex gap-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "font-main rounded-md px-3 py-1.5 text-sm transition-colors",
                    pathname === tab.href
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white",
                  )}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
          <Button
            variant="ghost"
            size="default"
            onClick={handleLogout}
            disabled={isPending}
          >
            Logout
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
