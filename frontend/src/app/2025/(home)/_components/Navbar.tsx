"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/_utils/cn";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

export default function Navbar({
  isTitleVisible,
}: {
  isTitleVisible: boolean;
}) {
  return (
    <motion.nav
      className={cn(
        "fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between px-4 transition-colors ease-out",
        !isTitleVisible ? "bg-black/50" : "bg-primary-transparent",
      )}
    >
      <div className="flex items-center justify-start">
        <Image
          src="/static/2025/logo.svg"
          className="h-16 w-16"
          alt="RAMSoc Logo"
          width={96}
          height={96}
        />
        <motion.div
          id="page-title"
          className="flex flex-col text-nowrap"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isTitleVisible ? 0 : 1,
          }}
        >
          <h1 className="font-main text-[0.6rem] leading-none text-gray-300">
            RAMSOC UNSW
          </h1>
          <h1 className="text-[0.7rem] leading-none">SUMOBOTS</h1>
        </motion.div>
      </div>
      <div className="hidden size-full items-center text-lg sm:flex">
        <div className="ml-auto flex">
          <Link
            href="/2025/#"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to home page"
          >
            Home
          </Link>
          <Link
            href="/2025/#about"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to about section"
          >
            About
          </Link>
          <Link
            href="/2025/#timeline"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to timeline section"
          >
            Timeline
          </Link>
          <Link
            href="/2025/#sponsor"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to sponsors section"
          >
            Sponsors
          </Link>
          <Link
            href="/2025/eoi"
            className="bg-white px-3 py-2 text-black hover:underline"
            aria-label="Go to EOI page"
          >
            EOI
          </Link>
        </div>
      </div>
      <Sheet>
        <SheetTrigger className="ml-auto flex h-full items-center gap-2 text-xl text-white sm:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent className="bg-black">
          <SheetHeader>
            <SheetTitle hidden>Navbar for RAMSOC Sumobots</SheetTitle>
            <SheetDescription hidden>
              Navbar for RAMSOC Sumobots
            </SheetDescription>
            <div className="ml-auto flex w-full flex-col text-2xl text-white">
              <Link
                href="/2025/#"
                className="flex h-full items-center p-4 hover:underline"
                aria-label="Go to home page"
              >
                Home
              </Link>
              <Link
                href="/2025/#about"
                className="flex h-full items-center p-4 hover:underline"
                aria-label="Go to about section"
              >
                About
              </Link>
              <Link
                href="/2025/#timeline"
                className="flex h-full items-center p-4 hover:underline"
                aria-label="Go to timeline section"
              >
                Timeline
              </Link>
              <Link
                href="/2025/#sponsor"
                className="flex h-full items-center p-4 hover:underline"
                aria-label="Go to sponsors section"
              >
                Sponsors
              </Link>
              <Link
                href="/2025/eoi"
                className="flex h-full items-center bg-white p-4 text-black hover:underline"
                aria-label="Go to EOI page"
              >
                EOI
              </Link>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
}
