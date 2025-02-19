"use client";

import { Fragment, useState } from "react";
import { About } from "./_components/About";
import { Timeline } from "./_components/Timeline";
import { Sponsors } from "./_components/Sponsors";
import Navbar from "./_components/Navbar";
import { Banner } from "./_components/Banner";

export default function Page() {
  const [isTitleVisible, setTitleVisible] = useState(true);
  return (
    <Fragment>
      <Navbar isTitleVisible={isTitleVisible} />
      <Banner setPageTitleVisible={setTitleVisible} />
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
