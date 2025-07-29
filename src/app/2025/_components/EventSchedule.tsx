import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const EventSchedule = () => {
  interface Tab {
    name: string;
    date: string;
    place: string;
    roundStatus: string;
  }

  interface Events {
    time: string;
    event: string;
    details?: string;
    showLogos?: boolean;
  }

  interface Sponsors {
    source: string;
    alt: string;
    style: string;
  }

  const knockOutSchedule: Events[] = [
    {
      time: "15:00 PM",
      event: "Opening remarks",
      details:
        "Team arrive, confirm attendance, collect bot stickers, practice run on the rings.",
    },
    {
      time: "16:00 PM",
      event: "Briefing",
      details:
        "Welcoming attendees, acknowledgment, Who We Are, and explain rules.",
    },
    {
      time: "16:15 PM",
      event: "Matches Start",
      details: "Speed run matches",
    },
    {
      time: "20:00 PM",
      event: "Boss Battles",
      details:
        "Compete with bots created by projects / elec makerspace. Winner will get CSE + EA Merch !",
    },
    {
      time: "20:30 PM",
      event: "Closing",
      details: "Announcement for Finals, wrap-up message, thank you",
    },
  ];

  const finalsSchedule: Events[] = [
    {
      time: "16:45 PM",
      event: "Opening Remarks",
      details: "Confirm attendance, bot checking.",
    },
    {
      time: "17:15 PM",
      event: "Opening Presentation & Guest Speakers",
      details:
        "Welcoming attendees, acknowledgment, explain rules, guest speaker, introduce Pick-A-Bot !!",
    },
    {
      time: "18:00 PM",
      event: "Sumobot Matches (Finals)",
      details: "Speed run matches",
    },
    {
      time: "19:00 PM",
      event: "Announcement",
      details:
        "Awards and announcing winners, group photos with winning teams, handout prizes.",
    },
    {
      time: "19:20 PM",
      event: "Industry Guest Speaker",
      details: "Presentation by Dematic",
    },
    {
      time: "19:35 PM",
      event: "Industry Night & Networking",
      details: "Companies:",
      showLogos: true,
    },
    {
      time: "21:15 PM",
      event: "Official Event End",
    },
  ];

  const sponsors: Sponsors[] = [
    {
      source: "/engineers_australia_logo.svg",
      alt: "Engineers Australia",
      style: "h-16 sm:h-25 w-auto",
    },
    {
      source: "/bt_imaging_logo.png",
      alt: "BT Imaging",
      style: "h-10 sm:h-15 w-auto",
    },
    {
      source: "/crest_robotics_logo.png",
      alt: "CREST Robotics",
      style: "h-10 sm:h-15 w-auto",
    },
    {
      source: "/CSIRO_Logo.png",
      alt: "CSIRO",
      style: "h-16 sm:h-25 w-auto",
    },
    {
      source: "/Dematic_logo.svg",
      alt: "Dematic",
      style: "h-10 sm:h-15 w-auto",
    },
    {
      source: "/pearler_logo.png",
      alt: "Pearler",
      style: "h-10 sm:h-12 w-auto",
    },
    {
      source: "/ResMed_logo.svg",
      alt: "ResMed",
      style: "h-12 sm:h-20 w-auto",
    },
    {
      source: "/Rode_Microphones_logo.png",
      alt: "Rode Microphones",
      style: "h-16 sm:h-25 w-auto",
    },
  ];

  const tabs: Tab[] = [
    {
      name: "Knock-Out Day",
      date: "31 July 2025",
      place: "Law Theatre G05",
      roundStatus: "knockout",
    },
    {
      name: "Finals Day",
      date: "1 August 2025",
      place: "Leighton Hall",
      roundStatus: "finals",
    },
  ];
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const scheduleData =
    activeTab.roundStatus === "knockout" ? knockOutSchedule : finalsSchedule;

  // Motions:
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.4 },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <section id="schedule" className="container">
      <h2 className="col-span-full">Event Schedule.</h2>
      <p>
        Get ready for the ultimate showdown! Teams will battle head-to-head,
        pushing their Sumobots to the limit in a test of strategy, speed, and
        control.
      </p>

      <div className="mx-auto mt-4 max-w-4xl rounded-lg border border-white/10 bg-zinc-900/70 p-4 shadow-md">
        <div className="mb-10 flex justify-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-md px-8 py-3 font-semibold transition ${
                activeTab.name === tab.name
                  ? "bg-rose-600 text-white shadow-xl"
                  : "text-gray-400 hover:bg-rose-600/30 hover:text-white"
              }`}
              aria-pressed={activeTab.name === tab.name}
            >
              {tab.name}

              <span className="mt-1 block text-xs text-gray-300">
                {tab.date} | {tab.place}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab.roundStatus}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            {scheduleData.map((item, index) => (
              <motion.div
                key={index}
                className="flex divide-x-3"
                variants={itemVariants}
              >
                <div className="flex w-2/10 justify-center">
                  <p className="text-rose-600">{item.time}</p>
                </div>
                <div className="mx-10 w-8/10 pb-10">
                  <p>
                    <b>{item.event}</b>
                  </p>
                  <p className="text-gray-400">{item.details}</p>

                  {/* Logo */}
                  {item.showLogos && (
                    <div className="relative mt-6 rounded-xl border border-white/10 bg-white/70 p-6 shadow-inner">
                      <div className="flex flex-wrap items-center justify-center gap-6">
                        {sponsors.map((item, index) => (
                          <img
                            key={index}
                            src={item.source}
                            alt={item.alt}
                            className={item.style}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
