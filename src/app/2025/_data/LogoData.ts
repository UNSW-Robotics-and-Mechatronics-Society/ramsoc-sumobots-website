import { MAIN_SITE_URL, UNSW_ARC_SITE_URL } from "@/app/constants";

export const LogoData = {
  ramsoc: {
    name: "ramsoc logo",
    image_url: "/ramsoc_logo.svg",
    href: MAIN_SITE_URL,
  },
  arc: {
    name: "unsw arc logo",
    image_url: "/arc_logo.svg",
    href: UNSW_ARC_SITE_URL,
  },
};

export type LogoKeys = keyof typeof LogoData;
