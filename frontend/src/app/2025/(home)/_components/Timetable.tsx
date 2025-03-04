import { TimelineData } from "../../_data/TimelineData";
import { FaLocationDot } from "react-icons/fa6";

export const Timetable = () => {
  return (
    <div className="w-fit items-center justify-center">
      <div className="flex w-full flex-col space-y-4 sm:w-[35rem]">
        {TimelineData.map((data, index) => (
          <div
            key={index}
            className="flex items-center rounded-sm border-[1px] border-white border-opacity-10 bg-zinc-900/70"
          >
            <div className="flex h-full w-16 flex-shrink-0 flex-col justify-center border-r-[1px] border-white border-opacity-10 text-center text-lg font-semibold text-white text-opacity-70">
              WK
              <br />
              {data.week}
            </div>
            <div className="flex flex-col justify-center p-2">
              <div>{data.topics}</div>
              <div className="flex flex-col gap-2 text-sm text-white text-opacity-70 sm:flex-row">
                {data.date}
                <span className="flex w-fit items-center justify-center gap-1 rounded-xl bg-zinc-800 px-2 font-semibold">
                  <FaLocationDot size={12} />
                  {data.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
