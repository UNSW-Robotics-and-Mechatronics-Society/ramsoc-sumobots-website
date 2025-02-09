
import { FaLocationDot } from "react-icons/fa6";
import { TimelineData } from "../../_data/TimelineData";

export const Timetable = () => {
  return (
    <div className="justify-center items-center w-fit">
      <div className="flex flex-col space-y-4 w-full sm:w-[35rem]">
        {TimelineData.map((data, index) => (
          <div key={index} className="flex items-center border-[1px] border-white border-opacity-10 bg-zinc-900/70 rounded-sm">
            <div className="h-full w-16 flex flex-col font-semibold text-center justify-center text-white text-opacity-70 text-lg border-r-[1px] border-white border-opacity-10">
              WK<br />{data.week}
            </div>
            <div className="flex flex-col justify-center p-2 sm:w-fit">
              <div>{data.topics}</div>
              <div className="flex flex-col sm:flex-row gap-2 text-sm text-white text-opacity-70">
                {data.date}
                <span className="flex gap-1 w-fit justify-center items-center rounded-xl bg-zinc-800 px-2 font-semibold">
                  <FaLocationDot className="h-3"/>
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
