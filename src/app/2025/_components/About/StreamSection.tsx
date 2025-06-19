"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { JSX, useState } from "react";
import StandardStream from "./StandardStream";
import OpenStream from "./OpenStream";
import RulebookBox from "./RulebookBox";

interface Tab {
  name: string;
  description: string;
  render: () => JSX.Element;
}

const tabs: Tab[] = [
  {
    name: "STANDARD STREAM",
    description: "UNSW only",
    render: () => <StandardStream />,
  },
  {
    name: "OPEN STREAM",
    description: "Inter-University",
    render: () => <OpenStream />,
  },
];

type TabSelectorProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

const TabNavigation = ({ activeTab, setActiveTab }: TabSelectorProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-2 text-center">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab)}
          className={`relative flex flex-col items-center justify-center gap-1 rounded-md px-6 py-3 transition duration-300 ${
            activeTab.name === tab.name
              ? "bg-gray-900 text-white shadow-lg"
              : "hover:bg-gray-900/50 hover:text-gray-200"
          }`}
        >
          <h4 className="text-lg font-semibold">{tab.name}</h4>
          <p className="text-sm opacity-70">{tab.description}</p>

          {/* Underline Indicator for Active Tab */}
          {activeTab.name === tab.name && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 h-1 w-full rounded-md bg-rose-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

const tabContentVariants: Variants = {
  initial: { y: 10, opacity: 0 },
  enter: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
};

const StreamSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <div className="mt-8 flex flex-col justify-center">
      <h3 className="font-display self-center text-xl font-bold text-gray-100 uppercase">
        Select Your Path
      </h3>

      <div className="mt-4 rounded-lg border border-white/10 bg-zinc-900/70 p-4 shadow-md">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.name}
              variants={tabContentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-4"
            >
              {activeTab.render()}
              <RulebookBox />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StreamSection;
