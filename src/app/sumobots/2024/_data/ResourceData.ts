interface ResourceData {
  image: string;
  title: string;
  description?: string;
  url: string;
}

export const InternalResourceData: ResourceData[] = [
  {
    image: "/images/resources/info pack.png",
    title: "Info pack",
    description: "Read up on our information about Sumobots.",
    url: "https://shorturl.at/yJMCJ",
  },

  {
    image: "/images/resources/week1.png",
    title: "Introductory Workshop",
    description: "Please come to meet new people, get the kits, and the food.",
    url: "https://www.canva.com/design/DAFfr7SEwpI/IdsFkLRWD8QVTibkSQLPUw/view?utm_content=DAFfr7SEwpI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
  },
  {
    image: "/images/resources/week2.png",
    title: "Arduino Basics",
    description:
      "This week we will be covering, how to use and wire your Arduino, teaching you how to code your Arduino and how to get your sensors working.",
    url: "https://www.canva.com/design/DAFgEsGFhco/CGrXbUDpfd7z80CzwlTq5A/edit?utm_content=DAFgEsGFhco&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
  {
    image: "/images/resources/week3.png",
    title: "CAD, Lasercutting and 3D Printing",
    description:
      "This week we will be covering, how to use OnShape, lasercut and steps to prepare and send in your 3D prints.",
    url: "https://www.canva.com/design/DAFkp004xdI/1QBIaEl4c851xfqZBEOk7Q/view?utm_content=DAFkp004xdI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
  },
  {
    image: "/images/resources/week4.png",
    title: "Soldering, Wiring, and Motor Control Workshop",
    description:
      "This week we will be covering the basics of soldering, connecting motors to the Arduino and controlling the motor in the Arduino IDE.",
    url: "https://www.canva.com/design/DAGHu56fBBY/QIXAzySqHjnR_vCATQyx5w/edit?utm_content=DAGHu56fBBY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },

  {
    image: "/images/resources/starter code thumbnail.jpg",
    title: "Starter Code",
    description:
      "This guide provides a basic scaffold of code to control a sumobot. We have created 3 separate files for participants of different skill levels.",
    url: "https://github.com/RyanKwok-rsk/sumobots-code/tree/main",
  },

  {
    image: "/images/resources/knockout registration.png",
    title: "Knockout Registration Form",
    description: `Hello fellow Sumobot competitors! The time has come to put your creations against each other!`,
    url: "https://forms.gle/RT6wg7o2BDdCNsHj7",
  },
];

export const InternalVideoResourceData: ResourceData[] = [
  {
    image: "/images/resources/SumobotsTrailerThumbnail.jpg",
    title: "Sumobots Trailer",
    description: "Watch our Sumobots 2024 Trailer on our Youtube!",
    url: "https://www.youtube.com/watch?v=BNlw9fUDNVc",
  },
  // {
  //   image: "/images/resources/prizes.png",
  //   title: "Prizes (Bugged)",
  //   description:
  //     "Do you have what it takes to win part of the 𝐋𝐀𝐑𝐆𝐄𝐒𝐓 𝐂𝐀$𝐇 𝐏𝐑𝐈𝐙𝐄 𝐏𝐎𝐎𝐋 𝐈𝐍 𝐓𝐇𝐄 𝐇𝐈𝐒𝐓𝐎𝐑𝐘 𝐎𝐅 𝐒𝐔𝐌𝐎𝐁𝐎𝐓𝐒?",
  //   url: "https://cdn.discordapp.com/attachments/1242437537277149205/1247896907305451551/447776357_7825687514160303_3050409131679275649_n.mp4?ex=667772cf&is=6676214f&hm=ddf1a2ec3ee4f60d2c0ed676467441c27c7773d078cea65469f15d71fa3a8f9b&",
  // },
  {
    image: "/images/resources/ArduinoBasicsVideoThumbnail.jpg",
    title: "Arduino Basics Tutorial",
    description: "Watch our Arduino Basics Tutorial on our Youtube!",
    url: "https://www.youtube.com/watch?v=Qaol1ywlcjQ",
  },
  {
    image: "/images/resources/CADVideoThumbnail.jpg",
    title: "CAD - Sumobots 2024",
    description: "This video covers basic CAD using Onshape!",
    url: "https://www.youtube.com/watch?v=2V1Y9ENvDSM",
  },
  {
    image: "/images/resources/MotorControl.jpg",
    title: "Motor Control - Sumobots 2024",
    description:
      "This video covers motor control using the Arduino and L298N motor driver to get your motors spinning!",
    url: "https://www.youtube.com/watch?v=PFLQC4x5NoQ",
  },
  {
    image: "/images/resources/3DPrintingVideoThumbnail.jpg",
    title: "3D Printing With Cura - Sumobots 2024",
    description: "This video covers basic 3D printing with Cura!",
    url: "https://www.youtube.com/watch?v=uO-_3uxiNsw",
  },
];

export const ExternalResourceData: ResourceData[] = [
  {
    image: "/images/resources/WS badge.png",
    title: "Workshop Safety Badge",
    description:
      "‼️IMPORTANT‼️ If you or any of your team members do not have a makerspace safety induction badge, be sure to get one before our Week 3 workshops!",
    url: "https://www.making.unsw.edu.au/access/badges/b/workshop-safety-badge/",
  },
  {
    image: "/images/resources/arduino.png",
    title: "Arduino IDE",
    description:
      "Please make sure you have installed the Arduino IDE before attending the workshop!",
    url: "https://www.arduino.cc/en/software",
  },
  {
    image: "/images/resources/sparkfun.jfif",
    title: "CH340G Drivers",
    description:
      "For all windows users make sure you install the CH340G drivers as well!",
    url: "https://learn.sparkfun.com/tutorials/how-to-install-ch340-drivers/all",
  },
  {
    image: "/images/resources/onshape.png",
    title: "Onshape",
    description:
      "Please make sure you make an account for OnShape BEFORE the workshop, using your school email.",
    url: "https://www.onshape.com/en/",
  },
];
