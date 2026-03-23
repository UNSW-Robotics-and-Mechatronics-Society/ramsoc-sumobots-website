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
        location: "To be confirmed.",
      },
      {
        date: "THURS 6-8 PM",
        location: "To be confirmed.",
      },
    ],
  },
  {
    week: "2",
    topics: "Arduino Basics",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "To be confirmed.",
      },
      {
        date: "THURS 6-8 PM",
        location: "To be confirmed.",
      },
    ],
  },
  {
    week: "3",
    topics: "CAD | Lasercutting | 3D Printing",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "To be confirmed.",
      },
      {
        date: "THURS 6-8 PM",
        location: "To be confirmed.",
      },
    ],
  },
  {
    week: "4",
    topics: "Arduino Motor Control | Soldering/Wiring",
    date_and_location: [
      {
        date: "TUES 6-8 PM",
        location: "To be confirmed.",
      },
      {
        date: "THURS 6-8 PM",
        location: "To be confirmed.",
      },
    ],
  },
  {
    week: "5-8",
    topics: "Build Sessions + Scrimmage",
    date_and_location: [
      {
        date: "TUES & THURS 6-8 PM",
        location: "To be confirmed.",
      },
    ],
  },
  {
    week: "9",
    topics: "Sumobots Qualifiers",
    date_and_location: [
      {
        date: "28th July (time TBC)",
        location: "To be confirmed",
      },
    ],
  },
  {
    week: "9",
    topics: "Sumobots Knockout",
    date_and_location: [
      {
        date: "30th July (time TBC)",
        location: "To be confirmed",
      },
    ],
  },
  {
    week: "9",
    topics: "Sumobots Finals",
    date_and_location: [
      {
        date: "31st July (time TBC)",
        location: "To be confirmed",
      },
    ],
  },
];

export default timetable;
