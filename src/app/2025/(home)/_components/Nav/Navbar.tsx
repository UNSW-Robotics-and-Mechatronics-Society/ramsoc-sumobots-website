"use client";
import { cn } from "@/app/_utils/cn";
import { motion } from "framer-motion";
import NavLinks from "./NavLinks";
import Logo from "../Logo";

const NavHeader = ({
  isTitleVisible = false,
}: {
  isTitleVisible?: boolean;
}) => {
  return (
    <div className="flex items-center">
      <Logo logoName="ramsoc" size={70} />
      <motion.div
        id="page-title"
        className="flex flex-col text-nowrap"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isTitleVisible ? 0 : 1,
        }}
      >
        <span className="text-[0.7rem] leading-none text-gray-300">
          RAMSOC UNSW
        </span>
        <span className="text-[1rem] leading-none font-bold">SUMOBOTS</span>
      </motion.div>
    </div>
  );
};

const NavContent = () => {
  return (
    <div className="flex h-full flex-row-reverse items-center gap-5 text-lg xl:flex-row">
      <NavLinks />
      <Logo logoName="arc" className="self-start" size={80} />
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
        "fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between pl-4 transition-colors ease-out lg:pr-4",
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
    </motion.nav>
  );
}
