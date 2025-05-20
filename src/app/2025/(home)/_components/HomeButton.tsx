'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function BackHomeButton() {
  return (
    <Link href="/">
      <button
        className="flex items-center gap-2 text-base sm:text-lg md:text-xl lg:text-2xl px-5 py-2 rounded bg-[#0070f3] text-white transition-colors duration-300 hover:bg-[#005bb5] cursor-pointer border-none"
        type="button"
      >
        Home
        <Image
          src="/home.svg"
          alt="Home"
          width={28}
          height={28}
          className="inline-block invert w-7 h-7"
        />
      </button>
    </Link>
  );
}
