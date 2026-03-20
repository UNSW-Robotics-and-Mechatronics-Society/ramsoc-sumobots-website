import Path from "@/app/path";

export type NavItem = {
  name: string;
  label: string;
  href?: string | "";
  color?: "default" | "white";
  dropdown?: NavItem[];
  isDisabled?: boolean;
};

const navItems: NavItem[] = [
  {
    name: "Home",
    label: "Go to home page",
    href: Path[2026].Root,
  },
  {
    name: "About",
    label: "Go to about section",
    href: Path[2026].About,
  },
  {
    name: "Schedule",
    label: "Go to schedule section",
    href: Path[2026].Schedule,
  },
  {
    name: "FAQ",
    label: "Go to faq section",
    href: Path[2026].Faq,
  },
  {
    name: "Sponsors",
    label: "Go to sponsors section",
    href: Path[2026].Sponsor,
  },
  {
    name: "Team",
    label: "Go to team page",
    href: Path[2026].Team,
  },
  {
    name: "Workshop",
    label: "Go to workshop page",
    href: Path[2026].Workshop.Root,
    dropdown: [
      {
        name: "Timetable",
        label: "Go to workshop timetable",
        href: Path[2026].Workshop.Timetable,
      },
      {
        name: "Resources",
        label: "Go to workshop resources",
        href: Path[2026].Workshop.Resources,
      },
    ],
  },
  // {
  //   name: "EOI",
  //   label: "Go to EOI page",
  //   href: Path[2026].EOI,
  // },
  {
    name: "Register",
    label: "Go to registration dashboard",
    href: Path[2026].Dashboard,
    color: "white",
  },
];

export default navItems;
