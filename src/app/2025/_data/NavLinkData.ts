import Path from "@/app/path";
// import { OPEN_STREAM_FORM_URL } from "@/app/constants";
import NavLinkDataType from "@/app/_types/NavLinkData";
import {
  INTER_UNI_SIGNUP_FORM_URL,
  UNSW_ONLY_SIGNUP_FORM_URL,
} from "@/app/constants";

const NavLinkData: NavLinkDataType[] = [
  {
    name: "Home",
    label: "Go to home page",
    href: Path[2025].Root,
  },
  {
    name: "About",
    label: "Go to about section",
    href: Path[2025].About,
  },
  {
    name: "Schedule",
    label: "Go to schedule section",
    href: Path[2025].Schedule,
  },
  {
    name: "FAQ",
    label: "Go to faq section",
    href: Path[2025].Faq,
  },
  {
    name: "Sponsors",
    label: "Go to sponsors section",
    href: Path[2025].Sponsor,
  },
  {
    name: "Team",
    label: "Go to team page",
    href: Path[2025].Team,
  },
  {
    name: "Workshop",
    label: "Go to workshop page",
    href: Path[2025].Workshop.Root,
    dropdown: [
      {
        name: "Timetable",
        label: "Go to workshop timetable",
        href: Path[2025].Workshop.Timetable,
      },
      {
        name: "Resources",
        label: "Go to workshop resources",
        href: Path[2025].Workshop.Resources,
      },
    ],
  },
  // {
  //   name: "EOI",
  //   label: "Go to EOI page",
  //   href: Path[2025].EOI,
  // },
  {
    name: "Apply",
    label: "Go to application form",
    color: "white",
    dropdown: [
      {
        name: "UNSW ONLY Sign-up",
        label: "Go to UNSW students sign-up form",
        href: UNSW_ONLY_SIGNUP_FORM_URL,
      },
      {
        name: "INTER-UNI Sign-up",
        label: "Go to inter-uni sign-up form",
        href: INTER_UNI_SIGNUP_FORM_URL,
      },
    ],
  },
];

export default NavLinkData;
