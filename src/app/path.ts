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
} as const;

export default Path;
