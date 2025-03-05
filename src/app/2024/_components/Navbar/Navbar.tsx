import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="sticky left-0 top-0 z-50 h-24 w-full bg-black text-xl">
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-16">
        <div className="h-full">
          <Image
            src="/2024/logo.svg"
            alt="Mechatronics Logo"
            width={96}
            height={96}
          ></Image>
        </div>
        <div className="ml-auto flex gap-8">
          <Link className="" href="/2024">
            Home
          </Link>
          <Link className="" href="/2024/resources">
            Resources
          </Link>
        </div>
      </div>
    </nav>
  );
}
