import { TeamMember, TeamRole, TeamPosition } from "@/app/_types/team";

const person = (
  id: string,
  name: string,
  role: TeamRole,
  roleName: string,
  position: TeamPosition,
  selfie: string,
): TeamMember => ({
  id,
  name,
  role,
  roleName,
  position,
  year: 2026,
  selfie,
  email: "",
  linkedin: "",
});

// Sourced from the RAMSoc 2026 committee page (ramsocunsw.org/team).
// Sumobots is run by the Workshops and Projects teams, so Main Organisers
// is scoped to just those two portfolios rather than the full committee.
export const primaryOrganisers: TeamMember[] = [
  person(
    "kobe-goodridge",
    "Kobe Goodridge",
    "workshops director",
    "Workshops Director",
    "director",
    "https://images.ctfassets.net/zo65zj537qdi/2pFT6r8T8fj8mtkrhxUJdx/d285e3a99042ccac2d0a0ca9057b6699/IMG_20250601_144541_016_-_Kobe_Goodridge.jpg",
  ),
  person(
    "mannan-zaveri",
    "Mannan Zaveri",
    "workshops director",
    "Workshops Director",
    "director",
    "https://images.ctfassets.net/zo65zj537qdi/2ZigdiW0YYm46KDdS1I1gQ/09c52205054c0c2753a565daa1d233c7/1761305353940.jpeg",
  ),
  person(
    "mikayla-harvey",
    "Mikayla Harvey",
    "projects director",
    "Projects Director",
    "director",
    "https://images.ctfassets.net/zo65zj537qdi/4XlIVjFmXqmE5ummOytFVv/a006b058905ddf820e8f9f9e9f6ea41f/P1010221_-_Mikayla_Harvey.jpeg",
  ),
  person(
    "sophia-andrews",
    "Sophia Andrews",
    "projects director",
    "Projects Director",
    "director",
    "https://images.ctfassets.net/zo65zj537qdi/rv4AyZSo7qowaoji7v8Q7/7efaf8782d7048cf0b610da0f2600c23/image.png",
  ),
];

// Workshops + Projects subcommittee members. Photos reuse the same local
// assets as the Mentors section since these people are the same individuals.
export const secondaryOrganisers: TeamMember[] = [
  person(
    "ian-yuho-lai-organiser",
    "Ian Yuho Lai",
    "workshops subcommittee",
    "Workshops Subcommittee",
    "subcommittee",
    "/2026/team/mentors/ian-yuho-lai.jpeg",
  ),
  person(
    "irene-jacob-organiser",
    "Irene Jacob",
    "workshops subcommittee",
    "Workshops Subcommittee",
    "subcommittee",
    "/2026/team/mentors/irene-jacob.jpeg",
  ),
  person(
    "naveen-garg-organiser",
    "Naveen Garg",
    "workshops subcommittee",
    "Workshops Subcommittee",
    "subcommittee",
    "/2026/team/mentors/naveen-garg.jpeg",
  ),
  person(
    "nicholas-shi-organiser",
    "Nicholas Shi",
    "workshops subcommittee",
    "Workshops Subcommittee",
    "subcommittee",
    "/2026/team/mentors/nicholas-shi.jpeg",
  ),
  person(
    "priyan-thesinghu-organiser",
    "Priyan Thesinghu",
    "workshops subcommittee",
    "Workshops Subcommittee",
    "subcommittee",
    "/2026/team/mentors/priyan-thesinghu.png",
  ),
  person(
    "abigail-bush-organiser",
    "Abigail Bush",
    "projects subcommittee",
    "Projects Subcommittee",
    "subcommittee",
    "/2026/team/mentors/abigail-bush.png",
  ),
  person(
    "allen-chen-organiser",
    "Allen Chen",
    "projects subcommittee",
    "Projects Subcommittee",
    "subcommittee",
    "/2026/team/mentors/allen-chen.png",
  ),
  person(
    "jake-hayden-lee-organiser",
    "Jake Hayden Lee",
    "projects subcommittee",
    "Projects Subcommittee",
    "subcommittee",
    "/2026/team/mentors/jake-hayden-lee.jpeg",
  ),
  person(
    "lorenzo-laureti-organiser",
    "Lorenzo Laureti",
    "projects subcommittee",
    "Projects Subcommittee",
    "subcommittee",
    "/2026/team/mentors/lorenzo-laureti.jpeg",
  ),
  person(
    "luke-scard-organiser",
    "Luke Scard",
    "projects subcommittee",
    "Projects Subcommittee",
    "subcommittee",
    "/2026/team/mentors/luke-scard.jpeg",
  ),
  person(
    "nidhi-pisharody-organiser",
    "Nidhi Pisharody",
    "projects subcommittee",
    "Projects Subcommittee",
    "subcommittee",
    "/2026/team/mentors/nidhi-pisharody.jpeg",
  ),
];
