"use server";

import { SubcomProfileData, TeamMember, TeamStructure } from "@/app/_types/teamData";

export async function getTeamProfiles(year: number): Promise<TeamStructure> {
    const url = new URL(`http://localhost:8787/api/team/get?year=${year}`);
    const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${process.env.SUMOBOTS_API_KEY}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }
    return categorizeTeamMembersByRole(data);
}

const categorizeTeamMembersByRole = (
  teamMembers: TeamMember[],
): TeamStructure => {
  const execs: TeamMember[] = [];
  const directors: TeamMember[] = [];
  const subcoms: SubcomProfileData[] = [];

  const execOrder = [
    "president",
    "vice president",
    "secretary",
    "arc delegate",
    "treasurer",
    "grievance & edi officer",
    "marketing executive",
    "technical executive",
    "industry & sponsorships executive",
  ];

  teamMembers.forEach((member) => {
    if (member.role.toLowerCase().includes("subcommittee")) {
      const portfolioName = member.role
        .toLowerCase()
        .replace(" subcommittee", "");
      const portfolioSubcoms = subcoms.find(
        (subcom) => subcom.portfolio === portfolioName,
      );
      if (!portfolioSubcoms) {
        subcoms.push({ portfolio: portfolioName, members: [member.name] });
      } else {
        portfolioSubcoms.members.push(member.name);
      }
    } else if (member.role.toLowerCase().includes("director")) {
      directors.push(member);
    } else if (!member.role.toLowerCase().includes("none")) {
      execs.push(member);
    } else {
      console.error(`Unrecognized role: ${member.name}`);
    }
  });

  execs.sort(
    (a, b) =>
      execOrder.indexOf(a.role.toLowerCase()) -
      execOrder.indexOf(b.role.toLowerCase()),
  );
  directors.sort((a, b) => a.role.localeCompare(b.role));

  return {
    executives: execs,
    directors: directors,
    subcommittees: subcoms,
  };
};