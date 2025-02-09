import Link from "next/link";

export function Navbar() {
  return (
    <nav className="h-[10vh] min-h-20 w-full text-xl">
      <div className="flex h-full w-full items-center justify-center">
        <Link className="hover:underline underline-offset-4 px-3 py-2" href="/sumobots/2025">
          SUMOBOTS 2025
        </Link>
      </div>
    </nav>
  );
}
