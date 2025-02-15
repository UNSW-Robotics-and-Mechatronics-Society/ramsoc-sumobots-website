"use client"

import { Fragment } from "react";
import { Banner } from "./_components/Banner";
import { About } from "./_components/About";
import { Timeline } from "./_components/Timeline";
import { Sponsors } from "./_components/Sponsors";

export default function Page() {

  return (
    <Fragment>
      <Banner />
      <div className="min-h-screen w-full pt-12 bg-black/30 flex flex-col items-center">
        <div className="max-w-5xl">
          <About />
          <Timeline />
          <Sponsors />
        </div>
      </div>
    </Fragment>
  );
}
