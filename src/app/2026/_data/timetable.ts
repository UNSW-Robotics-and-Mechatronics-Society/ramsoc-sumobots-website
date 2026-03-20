export type Timetable = {
  week: string;
  topics: string;
  date_and_location?: {
    date: string;
    location: string;
  }[];
};

const timetable: Timetable[] = [
  {
    week: "1",
    topics: "Introduction and Kit Handouts",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "Tyree Energy Technologies Building LG03",
      },
      {
        date: "THURS 6-8 PM",
        location: "Design Next studio (Ainsworth LVL5)",
      },
    ],
  },
  {
    week: "2",
    topics: "Arduino Basics",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "Tyree Energy Technologies Building LG03",
      },
      {
        date: "THURS 6-8 PM",
        location: "Design Next studio (Ainsworth LVL5)",
      },
    ],
  },
  {
    week: "3",
    topics: "CAD | Lasercutting | 3D Printing",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "Ainsworth 203/204",
      },
      {
        date: "THURS 6-8 PM",
        location: "Ainsworth 203/204",
      },
    ],
  },
  {
    week: "4",
    topics: "Arduino Motor Control | Soldering/Wiring",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "Tyree Energy Technologies Building LG03",
      },
      {
        date: "THURS 6-8 PM",
        location: "Design Next studio (Ainsworth LVL5)",
      },
    ],
  },
  {
    week: "5-8",
    topics: "Build Sessions + Scrimmage",
    date_and_location: [
      {
        date: "TUES & THURS 6-8 PM",
        location: "Kirby Makerspace",
      },
    ],
  },
  {
    week: "9",
    topics: "Sumobots Knockout",
    date_and_location: [
      {
        date: "31/07 (time TBC)",
        location: "To be confirmed",
      },
    ],
  },
  {
    week: "9",
    topics: "Sumobots Finals",
    date_and_location: [
      {
        date: "01/08 (time TBC)",
        location: "Leighton Hall",
      },
    ],
  },
];

export default timetable;
