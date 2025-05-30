import {
  FaTrophy,
  FaGraduationCap,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";

import AnimatedCounter from "./AnimatedCounter";

const data = [
  {
    icon: <FaTrophy size={32} className="text-black" />,
    prefix: "$",
    suffix: "+",
    number: 2300,
    title: "Prizes Awarded",
    desc: "Plus: A greener future, one tree planted every signup!",
  },
  {
    icon: <FaGraduationCap size={32} className="text-black" />,
    prefix: "",
    suffix: "",
    number: 168,
    title: "Students Participated",
    desc: "Across all engineering disciplines",
  },
  {
    icon: <FaUsers size={32} className="text-black" />,
    prefix: "",
    suffix: "+",
    number: 220,
    title: "Attendees",
    desc: "During Knockouts & Finals of the competition",
  },
  {
    icon: <FaHandsHelping size={32} className="text-black" />,
    prefix: "",
    suffix: "+",
    number: 40,
    title: "Engineering Volunteers",
    desc: "Dedicated to help you bring your SUMOBOT to life",
  },
];

const Stats = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-8 rounded-xl bg-gray-800/50 p-4 py-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
      {data.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
            {stat.icon}
          </div>
          <h2 className="mt-4 mb-2">
            {stat.prefix}
            <AnimatedCounter target={stat.number} />
            {stat.suffix}
          </h2>
          <h3 className="text-center text-lg text-rose-600">{stat.title}</h3>
          <p className="text-center">{stat.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
