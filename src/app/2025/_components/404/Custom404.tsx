"use client";

import Image from "next/image";
import Navbar from "@/app/2025/_components/Nav/Navbar";
import { SparkBurst } from "@/app/2025/_components/404/Spark";
import Link from "next/link";
import Path from "@/app/path";
import { FaHouse } from "react-icons/fa6";
import { useEffect } from "react";

const HomeButton = () => (
  <Link href={Path.Root} className="button-white gap-2 rounded-sm">
    Home <FaHouse size={20} />
  </Link>
);

const GearAndRambo = () => (
  <div className="relative mx-auto mb-4 aspect-square h-full">
    <Image
      className="animate-wiggle z-[1]"
      src="/2025/404/gear.svg"
      alt="404 Gear"
      fill
      priority
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-5/8 w-5/8 translate-x-[-15%] translate-y-[20%]">
        <Image
          className="object-contain"
          src="/2025/404/rambo_broken.svg"
          alt="404 Rambo"
          fill
          priority
        />
      </div>
    </div>
  </div>
);

const SparkGroup = () => (
  <>
    <SparkBurst
      count={22}
      origin={{ left: "58%", top: "22%" }}
      minAngle={-30}
      maxAngle={30}
      baseAngle={320}
      seed={1}
    />
    <SparkBurst
      count={8}
      origin={{ left: "38%", top: "30%" }}
      minAngle={-40}
      maxAngle={40}
      baseAngle={210}
      seed={2}
    />
    <SparkBurst
      count={4}
      origin={{ left: "45%", top: "85%" }}
      minAngle={-30}
      maxAngle={30}
      baseAngle={125}
      seed={3}
    />
  </>
);

const WiggleAnimation = () => {
  // Inject CSS for wiggle animation
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes wiggle {
        0% { transform: rotate(-10deg); }
        20% { transform: rotate(12deg); }
        40% { transform: rotate(-8deg); }
        60% { transform: rotate(10deg); }
        80% { transform: rotate(-6deg); }
        100% { transform: rotate(-10deg); }
      }
      .animate-wiggle {
        animation: wiggle 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

const Custom404 = () => {
  return (
    <>
      <WiggleAnimation />
      <div className="flex min-h-screen items-center justify-center">
        <Navbar />
        <div className="w-full px-8 py-16 text-center">
          <div className="relative mx-auto mb-4 aspect-[4/1] w-full">
            <Image
              className="object-contain"
              src="/2025/404/4_4.svg"
              alt="404"
              fill
              priority
            />
            <SparkGroup />
            <GearAndRambo />
          </div>
          <p className="pt-10">Looks like you&apos;re a little lost?</p>
          <div className="pt-4">
            <p className="inline-flex items-center gap-2">
              Let&apos;s take you <HomeButton />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
