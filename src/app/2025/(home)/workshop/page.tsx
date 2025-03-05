import { Fragment } from "react";
import Navbar from "../_components/Navbar";
import { Timetable } from "./Timetable";
import Resources from "./Resources";

export default function Workshop() {
  return (
    <Fragment>
      <Navbar />
      <section className="min-h-screen py-24">
        <div className="flex min-h-screen w-full flex-col items-center bg-black/30 pt-12">
          <div className="container flex flex-col">
            <div className="rounded-md bg-gray-600/50 py-12 text-center">
              <span>UNSW exclusive</span>
              <h1>Workshop</h1>
            </div>
            <Timetable className="mt-10" />
            <Resources />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
