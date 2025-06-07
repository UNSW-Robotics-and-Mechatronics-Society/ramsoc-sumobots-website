import timetable from "@/app/2025/_data/timetable";
import { FaLocationDot } from "react-icons/fa6";

interface TimetableProps {
  className?: string;
}

export const Timetable = ({ className }: TimetableProps) => {
  return (
    <div className={`flex scroll-mt-10 flex-col ${className}`} id="timetable">
      <h2>Timetable.</h2>
      <p>
        Join us for hands-on workshops to build and program your Sumobot! From
        Arduino basics to advanced motor control, these sessions are for UNSW
        students to learn, collaborate, and prepare for the competition. Check
        the schedule below and get ready to bring your robot to life!
      </p>
      <div className={`mt-6 w-fit items-center justify-center self-center`}>
        <div className="flex w-full flex-col space-y-4 sm:w-[35rem]">
          {timetable.map((data, index) => (
            <div
              key={index}
              className="flex items-center rounded-xs border-[1px] border-white/10 bg-zinc-900/70"
            >
              <div className="text-opacity-70 flex h-full w-16 shrink-0 flex-col justify-center border-r-[1px] border-white/10 text-center text-lg font-semibold text-white">
                WK
                <br />
                {data.week}
              </div>
              <div className="flex flex-col justify-center gap-1 p-2">
                <h3>{data.topics}</h3>
                <div className="flex flex-col gap-2">
                  {data.date_and_location?.map(({ date, location }) => (
                    <div
                      key={`${date}-${location}`}
                      className="text-opacity-70 flex flex-col gap-2 text-sm text-white sm:flex-row"
                    >
                      {date}
                      <span className="flex w-fit items-center justify-center gap-1 rounded-xl bg-zinc-800 px-2 font-semibold">
                        <FaLocationDot size={12} />
                        {location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
