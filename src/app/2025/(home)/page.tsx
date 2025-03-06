"use client";

import { Fragment, useState } from "react";
import { About } from "./_components/About/About";
import { EventSchedule } from "./_components/EventSchedule";
import { Sponsors } from "./_components/Sponsors";
import Navbar from "./_components/Navbar";
import { Banner } from "./_components/Banner";
import Faq from "./_components/Faq";
import FurtherSupport from "./_components/FurtherSupport";
import Footer from "./_components/Footer";

export default function Page() {
  const [isTitleVisible, setTitleVisible] = useState(true);
  const [isFooterVisible, setFooterVisible] = useState(false);
  return (
    <Fragment>
      <Navbar
        isTitleVisible={isTitleVisible}
        isFooterVisible={isFooterVisible}
      />
      <Banner setPageTitleVisible={setTitleVisible} />
      <div className="flex min-h-screen w-full flex-col items-center bg-black/30 pt-12">
        <div className="max-w-5xl">
          <About />
          <EventSchedule />
          <Faq />
          <Sponsors />
          <FurtherSupport />
        </div>
      </div>
      <Footer setFooterVisible={setFooterVisible} />
    </Fragment>
  );
}
