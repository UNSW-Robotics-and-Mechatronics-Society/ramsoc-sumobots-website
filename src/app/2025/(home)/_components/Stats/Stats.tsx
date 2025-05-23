import {
  FaTrophy,
  FaGraduationCap,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";

import AnimatedCounter from "./AnimatedCounter";

const Stats = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-8 rounded-xl bg-gray-800/50 p-4 py-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      <div className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <FaTrophy size={32} className="text-black" />
        </div>
        <h2 className="mt-4 mb-2">
          $<AnimatedCounter target={2300} />+
        </h2>
        <h3 className="text-center text-lg text-rose-600">Prizes Awarded</h3>
        <p className="text-center">
          Plus: A greener future One tree planted every signup!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <FaGraduationCap size={32} className="text-black" />
        </div>
        <h2 className="mt-4 mb-2">
          <AnimatedCounter target={168} />
        </h2>
        <h3 className="text-center text-lg text-rose-600">
          Students Participated
        </h3>
        <p className="text-center">Across all engineering dispiplines</p>
      </div>
      <div className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <FaUsers size={32} className="text-black" />
        </div>
        <h2 className="mt-4 mb-2">
          <AnimatedCounter target={220} />+
        </h2>
        <h3 className="text-center text-lg text-rose-600">Attendees</h3>
        <p className="text-center">
          During Knockouts & Finals of the competition
        </p>
      </div>
      <div className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <FaHandsHelping size={32} className="text-black" />
        </div>
        <h2 className="mt-4 mb-2">
          <AnimatedCounter target={40} />+
        </h2>
        <h3 className="text-center text-lg text-rose-600">
          Engineering Volunteers
        </h3>
        <p className="text-center">
          Mechanical & Mechatronics member workshops
        </p>
      </div>
    </div>
  );
};

export default Stats;
