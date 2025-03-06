"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaEnvelope,
} from "react-icons/fa6";
import { MAIN_SITE_URL } from "@/app/constants";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

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
      <div className="flex flex-col items-center space-y-6 py-8 sm:flex-row sm:justify-between">
        {/* Navigation Links */}
        <div
          ref={footerRef}
          className="flex flex-wrap justify-center gap-4 text-sm sm:justify-start"
        >
          <Link href="/2025/#" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/2025/#about" className="hover:text-gray-400">
            About
          </Link>
          <Link href="/2025/#schedule" className="hover:text-gray-400">
            Schedule
          </Link>
          <Link href="/2025/#faq" className="hover:text-gray-400">
            FAQ
          </Link>
          <Link href="/2025/#sponsor" className="hover:text-gray-400">
            Sponsors
          </Link>
          <Link href="/2025/workshop" className="hover:text-gray-400">
            Workshop
          </Link>
          <Link href="/2025/team" className="hover:text-gray-400">
            Team
          </Link>
          <Link
            href="/2025/eoi"
            className="bg-white px-4 text-black hover:bg-gray-200"
          >
            EOI
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-4">
            <Link
              href="https://www.instagram.com/ramsocunsw"
              target="_blank"
              className="hover:text-gray-400"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://www.facebook.com/RAMSOCUNSW"
              target="_blank"
              className="hover:text-gray-400"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </Link>
            <Link
              href="https://discord.com/invite/4dWMWAjWm9"
              target="_blank"
              className="hover:text-gray-400"
              aria-label="Discord"
            >
              <FaDiscord size={24} />
            </Link>
            <Link
              href="mailto:contact@ramsocunsw.org"
              className="hover:text-gray-400"
              aria-label="Email us"
            >
              <FaEnvelope size={24} />
            </Link>
          </div>
          <Link
            href={MAIN_SITE_URL}
            className="text-primary-500 mt-2 inline-block text-center text-xs opacity-75"
            target="_blank"
          >
            ramsocunsw.org
          </Link>
        </div>
      </div>
      <hr className="self-center border-gray-300/50" />
      <div className="py-4 text-center text-sm">
        <p>&copy; 2025 RAMSoc UNSW. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
