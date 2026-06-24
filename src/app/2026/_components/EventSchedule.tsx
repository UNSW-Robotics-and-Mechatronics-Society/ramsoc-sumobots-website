import React from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import { getUpcomingEvents } from "@/app/2026/_data/timetable";
import { FaLocationDot } from "react-icons/fa6";

function WorkshopsTab({ containerVariants, itemVariants }: { containerVariants: Variants; itemVariants: Variants }) {
  const upcoming = getUpcomingEvents(3);

  if (upcoming.length === 0) {
    return (
      <p className="text-center text-gray-400">No upcoming workshops — check back soon!</p>
    );
  }

  return (
    <motion.div
      key="workshops"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-3"
    >
      {upcoming.map((event) => (
        <motion.div
          key={`${event.isoDate}-${event.day}`}
          variants={itemVariants}
          className="flex items-center rounded-lg border border-white/10 bg-zinc-800/60"
        >
          <div className="flex w-14 shrink-0 flex-col items-center justify-center border-r border-white/10 py-4 text-center">
            <span className="text-[10px] font-semibold uppercase text-rose-400">
              {new Date(event.isoDate + "T00:00:00").toLocaleString("en-AU", { month: "short" })}
            </span>
            <span className="text-xl font-bold text-white leading-none">
              {new Date(event.isoDate + "T00:00:00").getDate()}
            </span>
          </div>
          <div className="flex flex-col gap-1 p-3">
            <p className="font-semibold text-white">Wk {event.week} — {event.topics}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
              <span>{event.day} · {event.time}</span>
              <span className="flex items-center gap-1 rounded-full bg-zinc-700 px-2 py-0.5 text-xs font-medium">
                <FaLocationDot size={10} className="text-rose-400" />
                {event.location}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
      <div className="mt-2 text-center">
        <Link
          href="/2026/workshop#timetable"
          className="font-main text-sm text-rose-400 transition-colors hover:text-rose-300"
        >
          View full workshop schedule &rarr;
        </Link>
      </div>
    </motion.div>
  );
}

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

  ];

  const finalsSchedule: Events[] = [

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
      name: "Workshops",
      date: "2 Jun – 30 Jul",
      place: "Various",
      roundStatus: "workshops",
    },
    {
      name: "Knock-Out Day",
      date: "TBD",
      place: "TBD",
      roundStatus: "knockout",
    },
    {
      name: "Finals Day",
      date: "TBD",
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
      <p>The detailed event schedule for Knock-Out and Finals day will be posted closer to the competition. Check back soon!</p>

      <div className="mx-auto mt-4 max-w-4xl rounded-lg border border-white/10 bg-zinc-900/70 p-4 shadow-md">
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-md px-6 py-3 font-semibold transition ${
                activeTab.name === tab.name
                  ? "bg-rose-600 text-white shadow-xl"
                  : "text-gray-400 hover:bg-rose-600/30 hover:text-white"
              }`}
              aria-pressed={activeTab.name === tab.name}
            >
              {tab.name}
              <span className="mt-1 block text-xs text-gray-300">
                {tab.date}&nbsp;&nbsp;{tab.place}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {activeTab.roundStatus === "workshops" ? (
            <WorkshopsTab containerVariants={containerVariants} itemVariants={itemVariants} />
          ) : (
            <motion.div
              key={activeTab.roundStatus}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              {scheduleData.length === 0 ? (
                <p className="text-center text-gray-400">Schedule to be announced closer to the event.</p>
              ) : (
                scheduleData.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex divide-x-3"
                    variants={itemVariants}
                  >
                    <div className="flex w-2/10 justify-center">
                      <p className="text-rose-600">{item.time}</p>
                    </div>
                    <div className="mx-10 w-8/10 pb-10">
                      <p><b>{item.event}</b></p>
                      <p className="text-gray-400">{item.details}</p>
                      {item.showLogos && (
                        <div className="relative mt-6 rounded-xl border border-white/10 bg-white/70 p-6 shadow-inner">
                          <div className="flex flex-wrap items-center justify-center gap-6">
                            {sponsors.map((item, index) => (
                              <img key={index} src={item.source} alt={item.alt} className={item.style} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
