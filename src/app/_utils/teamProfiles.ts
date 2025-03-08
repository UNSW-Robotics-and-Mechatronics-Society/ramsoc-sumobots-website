"use server";

import { Team, TeamMember } from "@/app/_types/Team";
import { SUMOBOTS_WORKER_SITE_URL } from "../constants";

export async function getTeamProfiles(
  year: number,
): Promise<{
  organisers: { technicalExecutive: TeamMember; otherOrganisers: TeamMember[] };
  nonOrganisers: TeamMember[];
}> {
  const response = await fetch(
    `${SUMOBOTS_WORKER_SITE_URL}/api/team/get?year=${year}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.SUMOBOTS_WORKER_KEY}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }

  const team = Team.processRawData(data);
  return {
    organisers: team.organisers,
    nonOrganisers: team.nonOrganisers,
  };
}
