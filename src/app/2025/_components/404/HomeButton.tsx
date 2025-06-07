"use client";

import Link from "next/link";
import { FaHouse } from "react-icons/fa6";
import Path from "@/app/path";

const HomeButton = () => {
  return (
    <button className="button-white rounded-sm" type="button">
      <Link href={Path.Root} className="flex items-center justify-center gap-2">
        Home
        <FaHouse size={20} />
      </Link>
    </button>
  );
};

export default HomeButton;
