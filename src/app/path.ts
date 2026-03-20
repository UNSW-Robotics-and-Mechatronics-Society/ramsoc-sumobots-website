const Path = {
  Root: "/",
  2024: {
    Root: "/2024",
    Resources: "/2024/resources",
  },
  2025: {
    Root: "/2025",
    About: "/2025/#about",
    Schedule: "/2025/#schedule",
    Faq: "/2025/#faq",
    Sponsor: "/2025/#sponsor",
    Workshop: {
      Root: "/2025/workshop",
      Timetable: "/2025/workshop/#timetable",
      Resources: "/2025/workshop/#resources",
    },
    Team: "/2025/team",
    EOI: "/2025/eoi",
    NotFound: "/2025/404",
  },
  2026: {
    Root: "/2026",
    About: "/2026/#about",
    Schedule: "/2026/#schedule",
    Faq: "/2026/#faq",
    Sponsor: "/2026/#sponsor",
    Workshop: {
      Root: "/2026/workshop",
      Timetable: "/2026/workshop/#timetable",
      Resources: "/2026/workshop/#resources",
    },
    Team: "/2026/team",
    EOI: "/2026/eoi",
    NotFound: "/2026/404",
  },
} as const;

export default Path;
