"use client";
import { cn } from "@/app/_utils/cn";
import { motion } from "framer-motion";
import NavLinks from "./NavLinks";
import Logo from "../Logo";
import NavSheet from "./NavSheet";

const NavHeader = ({
  isTitleVisible = false,
}: {
  isTitleVisible?: boolean;
}) => {
  return (
    <div className="flex items-center">
      <Logo logoName="ramsoc" size={14} />
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
  );
};

const NavContent = () => {
  return (
    <div className="hidden h-full items-center gap-10 text-lg lg:flex">
      <NavLinks size="lg" />
      <Logo logoName="arc" size={20} className="self-start" />
    </div>
  );
};

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
        "fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between pl-4 transition-colors ease-out lg:pr-4",
        !isTitleVisible ? "bg-black/50" : "bg-primary-transparent",
      )}
      initial={{ y: 0 }}
      animate={{
        y: !isFooterVisible ? 0 : -100,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <NavHeader isTitleVisible={isTitleVisible} />
      <NavContent />
      <NavSheet />
    </motion.nav>
  );
}
