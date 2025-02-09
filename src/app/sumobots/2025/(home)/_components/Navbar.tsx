"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { cn } from "../../_utils/cn"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={cn("fixed top-0 left-0 z-50 h-20 w-full px-4 transition-colors ease-out flex justify-between items-center", isScrolled ? "bg-black/50":"bg-primary-transparent")}>
      <div>
        <Image
        src="/sumobots/2025/logo.svg"
        className="w-20 h-20"
        alt="RAMSoc Logo"
        width={96}
        height={96}
        />
        {/* TODO: Add SUMOBOTS 2025 text when banner is out of view (use framer motion) */}
      </div>
      <div className="hidden size-full items-center text-lg sm:flex">
      <div className="ml-auto flex">
        <Link
        href="/sumobots/2025/#banner"
        className="flex items-center px-4 hover:underline"
        aria-label="Go to home page"
        >
        Home
        </Link>
        <Link
        href="/sumobots/2025/#about"
        className="flex items-center px-4 hover:underline"
        aria-label="Go to about section"
        >
        About
        </Link>
        <Link
        href="/sumobots/2025/#timeline"
        className="flex items-center px-4 hover:underline"
        aria-label="Go to timeline section"
        >
        Timeline
        </Link>
        <Link
        href="/sumobots/2025/#sponsor"
        className="flex items-center px-4 hover:underline"
        aria-label="Go to sponsors section"
        >
        Sponsors
        </Link>
        <Link
        href="/sumobots/2025/eoi"
        className="text-black bg-white px-3 py-2 hover:underline"
        aria-label="Go to EOI page"
        >
        EOI
        </Link>
      </div>
      </div>
      <Sheet>
      <SheetTrigger className="ml-auto flex h-full items-center gap-2 text-xl text-white sm:hidden">
        <LuMenu size={32} />
      </SheetTrigger>
        <SheetContent className="bg-primary-950 ">
        <SheetHeader>
          <SheetTitle hidden>Navbar for RAMSOC Sumobots</SheetTitle>
          <SheetDescription hidden>Navbar for RAMSOC Sumobots</SheetDescription>
          <div className="ml-auto flex w-full flex-col text-2xl text-white">
            <Link
            href="/sumobots/2025/#banner"
            className="flex h-full items-center p-4 hover:underline"
            aria-label="Go to home page"
            >
            Home
            </Link>
            <Link
            href="/sumobots/2025/#about"
            className="flex h-full items-center p-4 hover:underline"
            aria-label="Go to about section"
            >
            About
            </Link>
            <Link
            href="/sumobots/2025/#timeline"
            className="flex h-full items-center p-4 hover:underline"
            aria-label="Go to timeline section"
            >
            Timeline
            </Link>
            <Link
            href="/sumobots/2025/#sponsor"
            className="flex h-full items-center p-4 hover:underline"
            aria-label="Go to sponsors section"
            >
            Sponsors
            </Link>
            <Link
            href="/sumobots/2025/eoi"
            className="flex h-full items-center p-4 bg-white text-black hover:underline"
            aria-label="Go to EOI page"
            >
            EOI
            </Link>
          </div>
        </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
