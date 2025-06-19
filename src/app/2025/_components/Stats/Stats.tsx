import { FaTrophy, FaGraduationCap, FaHandsHelping } from "react-icons/fa";

import AnimatedCounter from "./AnimatedCounter";
import { LuGlobe } from "react-icons/lu";

const data = [
  {
    icon: <FaTrophy size={32} className="text-black" />,
    prefix: "$",
    suffix: "+",
    number: 3200,
    title: "Prizes Award",
    desc: "Plus: A greener future, one tree planted every signup!",
  },
  {
    icon: <FaGraduationCap size={32} className="text-black" />,
    prefix: "",
    suffix: "",
    number: 261,
    title: "Standard Sign-Ups",
    desc: "Across all engineering disciplines",
  },
  {
    icon: <LuGlobe size={32} className="text-black" />,
    prefix: "",
    suffix: "",
    number: 113,
    title: "Open Sign-Ups",
    desc: "Includes participants from other unis and high schools",
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
    <section id="about" className="container">
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
    </section>
  );
};

export default Stats;
