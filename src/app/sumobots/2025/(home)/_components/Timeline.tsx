import { Timetable } from "./Timetable";

export const Timeline = () => {
  return (
    <section id="timeline" className="container">
      <h2 className="col-span-full">Timeline.</h2>
      <div className="col-span-full flex justify-center items-center mt-5">
        <Timetable />
      </div>
    </section>
  );
}