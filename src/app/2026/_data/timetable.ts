export type TimetableSession = {
  day: string;
  date: string;
  isoDate: string;
  time: string;
  location: string;
};

export type Timetable = {
  week: string;
  topics: string;
  sessions: TimetableSession[];
};

const timetable: Timetable[] = [
  {
    week: "1",
    topics: "Introduction",
    sessions: [
      { day: "Tuesday", date: "2 Jun", isoDate: "2026-06-02", time: "6–8 PM", location: "Ainsworth 504 Design Next" },
      { day: "Thursday", date: "4 Jun", isoDate: "2026-06-04", time: "6–8 PM", location: "Ainsworth 504 Design Next" },
    ],
  },
  {
    week: "2",
    topics: "Arduino Basics",
    sessions: [
      { day: "Tuesday", date: "9 Jun", isoDate: "2026-06-09", time: "6–8 PM", location: "Tyree LG03 + LG05" },
      { day: "Thursday", date: "11 Jun", isoDate: "2026-06-11", time: "6–8 PM", location: "Ainsworth 504 Design Next" },
    ],
  },
  {
    week: "3",
    topics: "CAD | 3D Printing | Lasercutting",
    sessions: [
      { day: "Tuesday", date: "16 Jun", isoDate: "2026-06-16", time: "6–8 PM", location: "Tyree LG03 + LG05" },
      { day: "Thursday", date: "18 Jun", isoDate: "2026-06-18", time: "6–8 PM", location: "Ainsworth 203/204" },
    ],
  },
  {
    week: "4",
    topics: "Motor Controls | Soldering",
    sessions: [
      { day: "Tuesday", date: "23 Jun", isoDate: "2026-06-23", time: "6–8 PM", location: "Ainsworth 504 Design Next" },
      { day: "Thursday", date: "25 Jun", isoDate: "2026-06-25", time: "6–8 PM", location: "Ainsworth 504 Design Next" },
    ],
  },
  {
    week: "5",
    topics: "Build Session",
    sessions: [
      { day: "Tuesday", date: "30 Jun", isoDate: "2026-06-30", time: "6–8 PM", location: "Kirby Makerspace" },
      { day: "Thursday", date: "2 Jul", isoDate: "2026-07-02", time: "6–8 PM", location: "Kirby Makerspace" },
    ],
  },
  {
    week: "7",
    topics: "Build Session",
    sessions: [
      { day: "Tuesday", date: "14 Jul", isoDate: "2026-07-14", time: "6–8 PM", location: "Kirby Makerspace" },
      { day: "Thursday", date: "16 Jul", isoDate: "2026-07-16", time: "6–8 PM", location: "Kirby Makerspace" },
    ],
  },
  {
    week: "8",
    topics: "Build Session",
    sessions: [
      { day: "Tuesday", date: "21 Jul", isoDate: "2026-07-21", time: "6–8 PM", location: "Kirby Makerspace" },
      { day: "Thursday", date: "23 Jul", isoDate: "2026-07-23", time: "6–8 PM", location: "Kirby Makerspace" },
    ],
  },
];

export default timetable;

export function getUpcomingEvents(limit = 3): (TimetableSession & { topics: string; week: string })[] {
  const today = new Date().toISOString().split("T")[0];
  const upcoming: (TimetableSession & { topics: string; week: string })[] = [];
  for (const entry of timetable) {
    for (const session of entry.sessions) {
      if (session.isoDate >= today) {
        upcoming.push({ ...session, topics: entry.topics, week: entry.week });
      }
    }
  }
  return upcoming.slice(0, limit);
}
