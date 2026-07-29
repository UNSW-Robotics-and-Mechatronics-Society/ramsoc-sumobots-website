"use client";

import { Fragment, useState } from "react";
import { About } from "./_components/About/About";
import { EventSchedule } from "./_components/EventSchedule";
import { Sponsors } from "./_components/Sponsors";
import Navbar from "./_components/Nav/Navbar";
import { Banner } from "./_components/Banner";
import PickabotsBanner from "./_components/PickabotsBanner";
import PickabotsAccountModal from "./_components/PickabotsAccountModal";
import Stats from "./_components/Stats/Stats";
import Faq from "./_components/Faq";
import FurtherSupport from "./_components/FurtherSupport";
import Footer from "./_components/Footer";

export default function HomeClient({
  pickabotsEnabled,
  showPickabotsPrompt,
}: {
  pickabotsEnabled: boolean;
  showPickabotsPrompt: boolean;
}) {
  const [isTitleVisible, setTitleVisible] = useState(true);
  const [isFooterVisible, setFooterVisible] = useState(false);
  return (
    <Fragment>
      <PickabotsAccountModal show={showPickabotsPrompt} />
      <Navbar
        isTitleVisible={isTitleVisible}
        isFooterVisible={isFooterVisible}
      />
      <Banner setPageTitleVisible={setTitleVisible} />
      {pickabotsEnabled && <PickabotsBanner />}
      <div className="flex min-h-screen w-full flex-col items-center bg-black/30 pt-12">
        <div className="max-w-5xl">
          <Stats />
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
