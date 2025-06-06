import {
  ARDUINO_BASICS_VIDEO_URL,
  ARDUINO_IDE_URL,
  CAD_VIDEO_URL,
  CH340G_DRIVERS_URL,
  INTRO_WORKSHOP_SLIDES_URL,
  LIPO_BATTERY_QUIZ_URL,
  MOTOR_CONTROL_VIDEO_URL,
  ONSHAPE_URL,
  PRINTING_VIDEO_URL,
  SUMOBOTS_RULEBOOK_URL,
  SUMOBOTS_INFO_PACK_URL,
  WORKSHOP_SAFETY_BADGE_URL,
} from "@/app/constants";

interface Resource {
  image: string;
  title: string;
  description?: string;
  url: string;
}

// Resource URLs

export const internalResources: Resource[] = [
  {
    image: "/thumbnails/sumobots_rulebook.png",
    title: "Official Rule Book",
    description: "Read the official 2025 SUMOBOTS Rule Book.",
    url: SUMOBOTS_RULEBOOK_URL,
  },
  {
    image: "/thumbnails/info_pack.jpg",
    title: "Info Pack",
    description: "Read up on our general information about SUMOBOTS.",
    url: SUMOBOTS_INFO_PACK_URL,
  },
  {
    image: "/thumbnails/intro_workshop_slide.png",
    title: "Introductory Workshop Slides",
    description:
      "Introduction to SUMOBOTS: Overview of competition rules, robot design, and team expectations.",
    url: INTRO_WORKSHOP_SLIDES_URL,
  },
];

export const internalVideoResources: Resource[] = [
  {
    image: "/thumbnails/arduino_basics_vid.jpg",
    title: "Arduino Basics Tutorial",
    description: "Watch our Arduino Basics Tutorial on our Youtube!",
    url: ARDUINO_BASICS_VIDEO_URL,
  },
  {
    image: "/thumbnails/CAD_vid.jpg",
    title: "CAD - Sumobots 2024",
    description: "This video covers basic CAD using Onshape!",
    url: CAD_VIDEO_URL,
  },
  {
    image: "/thumbnails/motor_control_vid.jpg",
    title: "Motor Control - Sumobots 2024",
    description:
      "This video covers motor control using the Arduino and L298N motor driver to get your motors spinning!",
    url: MOTOR_CONTROL_VIDEO_URL,
  },
  {
    image: "/thumbnails/3d_printing_vid.jpg",
    title: "3D Printing With Cura - Sumobots 2024",
    description: "This video covers basic 3D printing with Cura!",
    url: PRINTING_VIDEO_URL,
  },
];

export const externalResources: Resource[] = [
  {
    image: "/thumbnails/lipo_safety_quiz_thumbnail.png",
    title: "Lipo Battery Safety Quiz",
    description:
      "‼️IMPORTANT‼️ Most team members (over half) must score 100% on the Lipo Battery Safety Quiz to receive your battery kits. For teams of 2, both members must pass.",
    url: LIPO_BATTERY_QUIZ_URL,
  },
  {
    image: "/thumbnails/workshop_badge.png",
    title: "Workshop Safety Badge",
    description:
      "‼️IMPORTANT‼️ If you or any of your team members do not have a makerspace safety induction badge, be sure to get one before our Week 3 workshops!",
    url: WORKSHOP_SAFETY_BADGE_URL,
  },
  {
    image: "/thumbnails/arduino.png",
    title: "Arduino IDE",
    description:
      "Please make sure you have installed the Arduino IDE before attending the workshop!",
    url: ARDUINO_IDE_URL,
  },
  {
    image: "/thumbnails/sparkfun.jfif",
    title: "CH340G Drivers",
    description:
      "For all windows users make sure you install the CH340G drivers as well!",
    url: CH340G_DRIVERS_URL,
  },
  {
    image: "/thumbnails/onshape.png",
    title: "Onshape",
    description:
      "Please make sure you make an account for OnShape BEFORE the workshop, using your school email.",
    url: ONSHAPE_URL,
  },
];
