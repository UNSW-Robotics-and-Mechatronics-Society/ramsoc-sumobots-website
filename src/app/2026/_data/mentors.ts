import { TeamMember } from "@/app/_types/team";

const mentor = (
  id: string,
  name: string,
  selfie: string,
): TeamMember => ({
  id,
  name,
  role: "mentor",
  roleName: "Mentor",
  position: "mentor",
  year: 2026,
  selfie,
  email: "",
  linkedin: "",
});

export const mentors: TeamMember[] = [
  mentor("naveen-garg", "Naveen Garg", "/2026/team/mentors/naveen-garg.jpeg"),
  mentor(
    "priyan-thesinghu",
    "Priyan Thesinghu",
    "/2026/team/mentors/priyan-thesinghu.png",
  ),
  mentor(
    "sidhida-behera",
    "Sidhida Behera",
    "/2026/team/mentors/sidhida-behera.jpeg",
  ),
  mentor(
    "tarun-sathish",
    "Tarun Sathish",
    "/2026/team/mentors/tarun-sathish.jpeg",
  ),
  mentor(
    "sophia-andrews",
    "Sophia Andrews",
    "/2026/team/mentors/sophia-andrews.png",
  ),
  mentor("nicholas-shi", "Nicholas Shi", "/2026/team/mentors/nicholas-shi.jpeg"),
  mentor(
    "mikayla-harvey",
    "Mikayla Harvey",
    "/2026/team/mentors/mikayla-harvey.png",
  ),
  mentor(
    "nirvan-pulakhandam",
    "Nirvan Pulakhandam",
    "/2026/team/mentors/nirvan-pulakhandam.jpeg",
  ),
  mentor("luke-scard", "Luke Scard", "/2026/team/mentors/luke-scard.jpeg"),
  mentor(
    "mannan-vivek-zaveri",
    "Mannan Vivek Zaveri",
    "/2026/team/mentors/mannan-vivek-zaveri.png",
  ),
  mentor(
    "matthew-williams",
    "Matthew Williams",
    "/2026/team/mentors/matthew-williams.jpeg",
  ),
  mentor(
    "nidhi-pisharody",
    "Nidhi Pisharody",
    "/2026/team/mentors/nidhi-pisharody.jpeg",
  ),
  mentor("abigail-bush", "Abigail Bush", "/2026/team/mentors/abigail-bush.png"),
  mentor(
    "artem-suiargulov",
    "Artem Suiargulov",
    "/2026/team/mentors/artem-suiargulov.jpeg",
  ),
  mentor("irene-jacob", "Irene Jacob", "/2026/team/mentors/irene-jacob.jpeg"),
  mentor(
    "ian-yuho-lai",
    "Ian Yuho Lai",
    "/2026/team/mentors/ian-yuho-lai.jpeg",
  ),
  mentor(
    "jake-hayden-lee",
    "Jake Hayden Lee",
    "/2026/team/mentors/jake-hayden-lee.jpeg",
  ),
  mentor(
    "jamie-stodart",
    "Jamie Stodart",
    "/2026/team/mentors/jamie-stodart.png",
  ),
  mentor(
    "kobe-goodridge",
    "Kobe Goodridge",
    "/2026/team/mentors/kobe-goodridge.png",
  ),
  mentor(
    "lorenzo-laureti",
    "Lorenzo Laureti",
    "/2026/team/mentors/lorenzo-laureti.jpeg",
  ),
  mentor(
    "yangyue-jiang",
    "Yangyue Jiang",
    "/2026/team/mentors/yangyue-jiang.jpeg",
  ),
  mentor("adrian-jong", "Adrian Jong", "/2026/team/mentors/adrian-jong.jpeg"),
  mentor("ruby-chang", "Ruby Chang", "/2026/team/mentors/ruby-chang.jpeg"),
  mentor("aliff-azlan", "Aliff Azlan", "/2026/team/mentors/aliff-azlan.jpeg"),
  mentor(
    "angelo-sleiman",
    "Angelo Sleiman",
    "/2026/team/mentors/angelo-sleiman.jpeg",
  ),
  mentor(
    "arjun-agarwal",
    "Arjun Agarwal",
    "/2026/team/mentors/arjun-agarwal.png",
  ),
  mentor("ryan-kwok", "Ryan Kwok", "/2026/team/mentors/ryan-kwok.jpeg"),
  mentor("allen-chen", "Allen Chen", "/2026/team/mentors/allen-chen.png"),
  mentor("aneesa-shaki", "Aneesa Shaki", "/2026/team/mentors/aneesa-shaki.png"),
];
