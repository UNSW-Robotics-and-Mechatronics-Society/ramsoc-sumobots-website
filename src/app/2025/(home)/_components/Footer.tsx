"use client";

import Link from "next/link";
import { MAIN_DOMAIN, MAIN_SITE_URL } from "@/app/constants";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import NavLinks from "./Nav/NavLinks";
import Social from "./Social";
import Logo from "./Logo";

function Footer({
  setFooterVisible = () => {},
}: {
  setFooterVisible?: (visible: boolean) => void;
}) {
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, {
    amount: "all",
  });

  useEffect(() => {
    setFooterVisible(isFooterInView);
  }, [isFooterInView, setFooterVisible]);
  return (
    <footer className="mt-16 flex-col items-center justify-center border-t-2 border-gray-300 bg-black px-10">
      <div className="flex flex-col items-center gap-4 space-y-6 py-8 sm:flex-row sm:justify-between">
        {/* Navigation Links */}
        <NavLinks
          ref={footerRef}
          size="sm"
          orientation="wrap"
          className="justify-center gap-4 text-sm lg:justify-start"
        />

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row-reverse sm:space-x-4 sm:space-y-0">
          {/* Social Links */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-4">
              <Social socialName="instagram" />
              <Social socialName="facebook" />
              <Social socialName="discord" />
              <Social socialName="email" />
            </div>
            <Link
              href={MAIN_SITE_URL}
              className="text-primary-500 mt-2 inline-block text-center text-xs opacity-75"
              target="_blank"
            >
              {MAIN_DOMAIN}
            </Link>
          </div>
        </div>
      </div>
      <hr className="self-center border-gray-300/50" />
      <div className="flex flex-col items-center justify-center py-4 text-center text-sm">
        {/* UNSW Arc */}
        <div className="m-4 flex flex-col items-center gap-1 rounded-md border border-gray-300 px-8 py-4">
          <p>Proudly supported by</p>
          <Logo logoName="arc" size={16} />
          <p className="text-sm">UNSW Student Life</p>
        </div>
        <p>&copy; 2025 RAMSoc UNSW. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
