import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="sticky left-0 top-0 z-50 h-24 w-full text-xl">
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-16">
        <div className="h-full">
          <Image
            src="2025/logo.svg"
            alt="RAMSoc Logo"
            width={96}
            height={96}
          ></Image>
        </div>
        <div className="ml-auto flex gap-8">
          <Link className="hover:underline underline-offset-4 px-3 py-2" href="/sumobots/2025">
            Home
          </Link>
          <Link className="hover:underline underline-offset-4 text-black bg-white px-3 py-2" href="/sumobots/2025/eoi">
            EOI
          </Link>
        </div>
      </div>
    </nav>
  );
}
