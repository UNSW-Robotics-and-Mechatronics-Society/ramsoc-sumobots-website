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
        location: "TBD",
      },
      {
        date: "THURS 6-8 PM",
        location: "TBD",
      },
    ],
  },
  {
    week: "2",
    topics: "Arduino Basics",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "TBD",
      },
      {
        date: "THURS 6-8 PM",
        location: "TBD",
      },
    ],
  },
  {
    week: "3",
    topics: "CAD | Lasercutting | 3D Printing",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "TBD",
      },
      {
        date: "THURS 6-8 PM",
        location: "TBD",
      },
    ],
  },
  {
    week: "4",
    topics: "Arduino Motor Control | Soldering/Wiring",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "TBD",
      },
      {
        date: "THURS 6-8 PM",
        location: "TBD",
      },
    ],
  },
  {
    week: "5-8",
    topics: "Build Sessions + Scrimmage",
    date_and_location: [
      {
        date: "TUES & THURS 6-8 PM",
        location: "TBD",
      },
    ],
  },
  {
    week: "9",
    topics: "Sumobots Knockout",
    date_and_location: [
      {
        date: "31/07 (time TBC)",
        location: "TBD",
      },
    ],
  },
  {
    week: "9",
    topics: "Sumobots Finals",
    date_and_location: [
      {
        date: "01/08 (time TBC)",
        location: "TBD",
      },
    ],
  },
];

export default timetable;
