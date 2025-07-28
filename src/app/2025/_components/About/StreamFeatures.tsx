import {
  LuGlobe,
  LuLightbulb,
  LuSettings,
  LuTrophy,
  LuBuilding,
  LuGraduationCap,
  LuScale,
  LuUserCheck,
} from "react-icons/lu";

const streamFeaturesData = {
  standard: [
    {
      icon: <LuBuilding className="h-10 w-10 text-rose-600" />,
      title: "UNSW Exclusive",
      description: "This competition is exclusive to UNSW students.",
    },
    {
      icon: <LuGraduationCap className="h-10 w-10 text-rose-600" />,
      title: "Beginner Friendly",
      description:
        "This stream is designed for those who are new to the field.",
    },
    {
      icon: <LuScale className="h-10 w-10 text-rose-600" />,
      title: "Equal Opportunity",
      description: "All competitors use the same core components.",
    },
    {
      icon: <LuUserCheck className="h-10 w-10 text-rose-600" />,
      title: "Guidance and Support",
      description: (
        <>
          Each team will be assigned a <b>mentor</b> to guide them throughout
          the competition.
        </>
      ),
    },
  ],
  open: [
    {
      icon: <LuGlobe className="h-10 w-10 text-rose-600" />,
      title: "Inter-University Competition",
      description: "Face off against top students from other universities.",
    },
    {
      icon: <LuSettings className="h-10 w-10 text-rose-600" />,
      title: "Customization Freedom",
      description:
        "Modify your bot with additional components and drivetrain upgrades.",
    },
    {
      icon: <LuLightbulb className="h-10 w-10 text-rose-600" />,
      title: "Innovation & Engineering",
      description:
        "Experiment with advanced mechanics and adaptive strategies.",
    },
    {
      icon: <LuTrophy className="h-10 w-10 text-rose-600" />,
      title: "High-Level Competition",
      description:
        "Compete against the best in a fast-paced and unpredictable battlefield.",
    },
  ],
};

type StreamFeaturesProps = {
  streamType: "standard" | "open";
};

const StreamFeatures = ({ streamType }: StreamFeaturesProps) => {
  const features = streamFeaturesData[streamType];
  return (
    <div className="grid w-fit grid-cols-1 grid-rows-2 gap-6 md:grid-cols-2">
      {features.map((feature, idx) => (
        <div
          key={`${feature.title}-${idx}`}
          className="flex flex-row items-center"
        >
          <div className="flex w-20 shrink-0 items-center justify-center">
            {feature.icon}
          </div>
          <div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StreamFeatures;
