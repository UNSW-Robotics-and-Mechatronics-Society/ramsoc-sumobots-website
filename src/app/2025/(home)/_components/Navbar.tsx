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
import { MAIN_SITE_URL } from "@/app/constants";

export default function Navbar({
  isTitleVisible = false,
  isFooterVisible = false,
}: {
  isTitleVisible?: boolean;
  isFooterVisible?: boolean;
}) {
  return (
    <motion.nav
      className={cn(
        "fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between px-4 transition-colors ease-out",
        !isTitleVisible ? "bg-black/50" : "bg-primary-transparent",
      )}
      initial={{ y: 0 }}
      animate={{
        y: !isFooterVisible ? 0 : -100,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center justify-start">
        <Link href={MAIN_SITE_URL} className="h-16 w-16">
          <Image
            src="/2025/logo.svg"
            alt="RAMSoc Logo"
            width={96}
            height={96}
          />
        </Link>
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
      <div className="hidden size-full items-center text-lg lg:flex">
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
            href="/2025/#schedule"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to schedule section"
          >
            Schedule
          </Link>
          <Link
            href="/2025/#faq"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to faq section"
          >
            Faq
          </Link>
          <Link
            href="/2025/#sponsor"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to sponsors section"
          >
            Sponsors
          </Link>
          <Link
            href="/2025/workshop"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to workshop page"
          >
            Workshop
          </Link>
          <Link
            href="/2025/team"
            className="flex items-center px-4 hover:underline"
            aria-label="Go to team page"
          >
            Team
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSciKhBKAnkF2AwTzlVI-XyPJiT-bZjtOWi02eg3b2VT_WhKUg/viewform?usp=sharing"
            className="bg-white px-3 py-2 text-black hover:underline"
          >
            Apply
          </Link>
        </div>
        <Link
          href="https://arc.unsw.edu.au/"
          className="ml-10 hidden w-20 self-start lg:block"
          target="_blank"
        >
          <Image
            src="/2025/UNSW_ARC_logo.svg"
            alt="RAMSoc Logo"
            width={96}
            height={96}
          />
        </Link>
      </div>
      <Sheet>
        <SheetTrigger className="ml-auto flex h-full items-center gap-2 text-xl text-white lg:hidden">
          <Link
            href="https://arc.unsw.edu.au/"
            className="mr-5 block w-20 self-start lg:hidden"
            target="_blank"
          >
            <Image
              src="/2025/UNSW_ARC_logo.svg"
              alt="RAMSoc Logo"
              width={96}
              height={96}
            />
          </Link>
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
                href="/2025/#schedule"
                className="flex h-full items-center p-4 hover:underline"
                aria-label="Go to event schedule section"
              >
                Schedule
              </Link>
              <Link
                href="/2025/#faq"
                className="flex h-full items-center p-4 hover:underline"
                aria-label="Go to event faq section"
              >
                Faq
              </Link>
              <Link
                href="/2025/#sponsor"
                className="flex h-full items-center p-4 hover:underline"
                aria-label="Go to sponsors section"
              >
                Sponsors
              </Link>
              <Link
                href="/2025/workshop"
                className="flex items-center p-4 hover:underline"
                aria-label="Go to workshop page"
              >
                Workshop
              </Link>
              <Link
                href="/2025/team"
                className="flex items-center p-4 hover:underline"
                aria-label="Go to team page"
              >
                Team
              </Link>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSciKhBKAnkF2AwTzlVI-XyPJiT-bZjtOWi02eg3b2VT_WhKUg/viewform?usp=sharing"
                className="flex h-full items-center bg-white p-4 text-black hover:underline"
                aria-label="Go to Open Stream apply form"
              >
                Apply
              </Link>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
}
