"use client";
import { Fragment, useState } from "react";
import Navbar from "../_components/Nav/Navbar";
import TeamProfileGrid from "./TeamProfileGrid";
import Footer from "../_components/Footer";

export default function Team() {
  const [isFooterVisible, setFooterVisible] = useState(false);
  return (
    <Fragment>
      <Navbar isFooterVisible={isFooterVisible} />
      <section className="min-h-screen py-24">
        <div className="flex w-full flex-col items-center pt-12">
          <div className="container flex flex-col items-center text-center">
            <div className="rounded-md bg-gray-600/50 px-6 py-12">
              <h1 className="text-4xl font-bold text-white">
                <span className="transition-all duration-300 before:content-['Meet_the_Team.'] hover:before:content-['MEET_THE_GOATS.']" />
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-300">
                Creating an exciting Sumobot experience is what we prioritise!
                Have questions, need assistance, or just want to connect? Feel
                free to reach out!
              </p>
            </div>
            <TeamProfileGrid />
          </div>
        </div>
      </section>
      <Footer setFooterVisible={setFooterVisible} />
    </Fragment>
  );
}
