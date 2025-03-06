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

export function Footer({
  setFooterVisible,
}: {
  setFooterVisible: (visible: boolean) => void;
}) {
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, {
    amount: "all",
  });

  useEffect(() => {
    setFooterVisible(isFooterInView);
  }, [isFooterInView, setFooterVisible]);
  return (
    <footer
      ref={footerRef}
      className="mt-16 border-t-2 border-gray-300 bg-black px-10 py-8"
    >
      <div className="flex flex-col items-center space-y-6 sm:flex-row sm:justify-between">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
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
    </footer>
  );
}
