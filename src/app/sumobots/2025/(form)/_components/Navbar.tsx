import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky left-0 top-0 z-50 h-24 w-full text-xl mb-[-6rem]">
      <div className="flex h-full w-full items-center justify-center">
        <Link className="hover:underline underline-offset-4 px-3 py-2" href="/sumobots/2025">
          SUMOBOTS 2025
        </Link>
      </div>
    </nav>
  );
}
