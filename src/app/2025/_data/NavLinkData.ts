import Path from "@/app/path";
import { OPEN_STREAM_FORM_URL } from "@/app/constants";
import NavLinkDataType from "@/app/_types/NavLinkData";

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
    name: "Workshop",
    label: "Go to workshop page",
    href: Path[2025].Workshop,
  },
  {
    name: "Team",
    label: "Go to team page",
    href: Path[2025].Team,
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
        name: "Standard Stream",
        label: "Go to standard stream application form",
        href: "",
      },
      {
        name: "Open Stream",
        label: "Go to open stream application form",
        href: OPEN_STREAM_FORM_URL,
      },
    ],
  },
];

export default NavLinkData;
