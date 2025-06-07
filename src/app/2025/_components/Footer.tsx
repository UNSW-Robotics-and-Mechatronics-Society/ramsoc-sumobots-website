"use client";

import Link from "next/link";
import { MAIN_DOMAIN, MAIN_SITE_URL } from "@/app/constants";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import Social from "./Social";
import Logo from "./Logo";
import navData from "../_data/navItems";

function Footer({
  setFooterVisible = () => {},
}: {
  setFooterVisible?: (visible: boolean) => void;
}) {
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, {
    amount: "some",
  });

  const links = navData.filter(
    (link) => !!link.href && !link.dropdown && link.name !== "Home",
  );
  const dropdownLinks = navData.filter((link) => !!link.dropdown);

  useEffect(() => {
    setFooterVisible(isFooterInView);
  }, [isFooterInView, setFooterVisible]);

  return (
    <footer
      className="mt-20 border-t-2 border-gray-700 bg-black px-6 text-gray-300 sm:px-10"
      ref={footerRef}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 py-12 sm:grid-cols-3 lg:grid-cols-4">
        {/* Brand and Socials */}
        <div className="col-span-1 space-y-4 sm:col-span-1">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <Social socialName="instagram" />
            <Social socialName="facebook" />
            <Social socialName="discord" />
            <Social socialName="email" />
          </div>
          <Link
            href={MAIN_SITE_URL}
            className="text-primary-500 mt-2 block text-xs opacity-75"
            target="_blank"
          >
            {MAIN_DOMAIN}
          </Link>
        </div>

        {/* Primary Nav */}
        <div className="col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-white">Home</h3>
          <ul className="space-y-1 text-sm">
            {links.map(
              (link) =>
                link.href && (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      aria-label={link.label}
                      className="hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </div>

        {/* Dropdown Links */}
        <div className="col-span-1 space-y-4">
          {dropdownLinks.map((link) => (
            <div key={link.name}>
              <h3 className="text-lg font-semibold text-white">{link.name}</h3>
              <ul className="mt-1 space-y-1 text-sm">
                {link.dropdown?.map((navLink) => (
                  <li key={navLink.name}>
                    {navLink.href ? (
                      <Link href={navLink.href} className="hover:underline">
                        {navLink.name}
                      </Link>
                    ) : (
                      <span className="text-gray-500">{navLink.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Arc Support Badge */}
        <div className="col-span-1 flex flex-col items-start space-y-4 sm:items-center">
          <p className="text-sm">Proudly supported by</p>
          <Logo logoName="unsw_arc_white" size={80} />
          <p className="text-xs">UNSW Student Life</p>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-gray-700 p-5 pt-6 text-center text-xs text-gray-500">
        &copy; 2025 RAMSoc UNSW. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
