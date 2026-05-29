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
      { day: "Tuesday", date: "2 Jun", isoDate: "2026-06-02", time: "6–8 PM", location: "504 Design Next" },
      { day: "Thursday", date: "4 Jun", isoDate: "2026-06-04", time: "6–8 PM", location: "504 Design Next" },
    ],
  },
  {
    week: "2",
    topics: "Arduino Basics",
    sessions: [
      { day: "Tuesday", date: "9 Jun", isoDate: "2026-06-09", time: "6–8 PM", location: "Tyree LG03 + LG05" },
      { day: "Thursday", date: "11 Jun", isoDate: "2026-06-11", time: "6–8 PM", location: "504 Design Next" },
    ],
  },
  {
    week: "3",
    topics: "CAD | 3D Printing | Lasercutting",
    sessions: [
      { day: "Tuesday", date: "16 Jun", isoDate: "2026-06-16", time: "6–8 PM", location: "Tyree LG03 + LG05" },
      { day: "Thursday", date: "18 Jun", isoDate: "2026-06-18", time: "6–8 PM", location: "504 Design Next" },
    ],
  },
  {
    week: "4",
    topics: "Motor Controls | Soldering",
    sessions: [
      { day: "Tuesday", date: "23 Jun", isoDate: "2026-06-23", time: "6–8 PM", location: "Tyree LG03 + LG05" },
      { day: "Thursday", date: "25 Jun", isoDate: "2026-06-25", time: "6–8 PM", location: "504 Design Next" },
    ],
  },
  {
    week: "5",
    topics: "Build Session",
    sessions: [
      { day: "Tuesday", date: "11 Aug", isoDate: "2026-08-11", time: "6–8 PM", location: "Kirby Makerspace" },
      { day: "Thursday", date: "13 Aug", isoDate: "2026-08-13", time: "6–8 PM", location: "Kirby Makerspace" },
    ],
  },
  {
    week: "7",
    topics: "Build Session",
    sessions: [
      { day: "Tuesday", date: "25 Aug", isoDate: "2026-08-25", time: "6–8 PM", location: "Kirby Makerspace" },
      { day: "Thursday", date: "27 Aug", isoDate: "2026-08-27", time: "6–8 PM", location: "Kirby Makerspace" },
    ],
  },
  {
    week: "8",
    topics: "Build Session",
    sessions: [
      { day: "Tuesday", date: "1 Sep", isoDate: "2026-09-01", time: "6–8 PM", location: "Kirby Makerspace" },
      { day: "Thursday", date: "3 Sep", isoDate: "2026-09-03", time: "6–8 PM", location: "Kirby Makerspace" },
    ],
  },
  {
    week: "9",
    topics: "Qualifiers",
    sessions: [
      { day: "Tuesday", date: "8 Sep", isoDate: "2026-09-08", time: "2–6 PM (pending)", location: "TBD" },
    ],
  },
  {
    week: "9",
    topics: "Knockouts",
    sessions: [
      { day: "Thursday", date: "10 Sep", isoDate: "2026-09-10", time: "2–9 PM (pending)", location: "TBD" },
    ],
  },
  {
    week: "9",
    topics: "Finals",
    sessions: [
      { day: "Friday", date: "11 Sep", isoDate: "2026-09-11", time: "5–8:30 PM", location: "Leighton Hall" },
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
