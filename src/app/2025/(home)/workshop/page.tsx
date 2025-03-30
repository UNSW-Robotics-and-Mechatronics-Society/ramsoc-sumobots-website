"use client";
import { Fragment, useState } from "react";
import Navbar from "../_components/Nav/Navbar";
import { Timetable } from "./Timetable";
import Resources from "./Resources";
import Footer from "../_components/Footer";

export default function Workshop() {
  const [isFooterVisible, setFooterVisible] = useState(false);
  return (
    <Fragment>
      <Navbar isFooterVisible={isFooterVisible} />
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
      <Footer setFooterVisible={setFooterVisible} />
    </Fragment>
  );
}
