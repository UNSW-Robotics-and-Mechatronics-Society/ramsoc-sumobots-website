import {
  MAIN_SITE_URL,
  UNSW_ARC_SITE_URL,
  UNSW_CSE_SCHOOL_SITE_URL,
  UNSW_MECH_SCHOOL_SITE_URL,
} from "@/app/constants";

const logos = {
  ramsoc: {
    label: "ramsoc logo",
    name: "RAMSOC",
    image_url: "/ramsoc_logo.svg",
    href: MAIN_SITE_URL,
    bg_color: "black",
  },
  unsw_arc_white: {
    label: "unsw arc logo white",
    name: "UNSW Arc",
    image_url: "/unsw_arc_logo_white.svg",
    href: UNSW_ARC_SITE_URL,
    bg_color: "black",
  },
  unsw_arc_green_outline: {
    label: "unsw arc logo green outline",
    name: "UNSW Arc",
    image_url: "/unsw_arc_logo_green_outline.svg",
    href: UNSW_ARC_SITE_URL,
    bg_color: "white",
  },
  unsw_cse_school: {
    label: "unsw cse school logo",
    name: "UNSW School of Computer Science and Engineering",
    image_url: "/unsw_cse_school_logo.svg",
    href: UNSW_CSE_SCHOOL_SITE_URL,
    bg_color: "#FDDD00",
  },
  unsw_mech_school: {
    label: "unsw mech school logo",
    name: "UNSW School of Mechanical and Manufacturing Engineering",
    image_url: "/unsw_mech_school_logo.svg",
    href: UNSW_MECH_SCHOOL_SITE_URL,
    bg_color: "#FDDD00",
  },
  engineers_australia: {
    label: "engineers australia logo",
    name: "Engineers Australia",
    image_url: "/engineers_australia_logo.svg",
    href: "https://www.engineersaustralia.org.au/",
    bg_color: "white",
  },
};

export default logos;

export type LogoKey = keyof typeof logos;
