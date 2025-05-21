import {
  FaTrophy,
  FaGraduationCap,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";
import { BsGearWide } from "react-icons/bs";

import AnimatedCounter from "./AnimatedCounter";

const Stats = () => {
  return (
    <div className="mt-20 flex w-full justify-center gap-x-8 rounded-xl bg-gray-800/50 p-10">
      <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <FaTrophy size={32} className="text-black" />
        </div>
        <h2 className="my-4">
          $<AnimatedCounter target={2300} />+
        </h2>
        <p>Plus: A greener future</p>
        <p>One tree planted every signup!</p>
      </div>
      <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <FaGraduationCap size={32} className="text-black" />
        </div>
        <h2 className="my-4">
          <AnimatedCounter target={168} />
        </h2>
        <p>Across all engineering</p>
        <p>dispiplines</p>
      </div>
      <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <FaUsers size={32} className="text-black" />
        </div>
        <h2 className="my-4">
          <AnimatedCounter target={220} />+
        </h2>
        <p>During Knockouts & Finals</p>
        <p>of the competition</p>
      </div>
      <div className="flex flex-col items-center transition-all duration-300 hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <FaHandsHelping size={32} className="text-black" />
        </div>
        <h2 className="my-4">
          <AnimatedCounter target={40} />+
        </h2>
        <p>Mechanical & Mechatronics</p>
        <p>member workshops</p>
      </div>
    </div>
  );
};

export default Stats;
