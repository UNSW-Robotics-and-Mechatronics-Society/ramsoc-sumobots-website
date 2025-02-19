"use client";

import { Fragment } from "react";
import { Banner } from "./_components/Banner";
import { About } from "./_components/About";
import { Timeline } from "./_components/Timeline";
import { Sponsors } from "./_components/Sponsors";

export default function Page() {
  return (
    <Fragment>
      <Banner />
      <div className="flex min-h-screen w-full flex-col items-center bg-black/30 pt-12">
        <div className="max-w-5xl">
          <About />
          <Timeline />
          <Sponsors />
        </div>
      </div>
    </Fragment>
  );
}
