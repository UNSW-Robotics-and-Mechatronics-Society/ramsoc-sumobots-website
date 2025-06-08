"use server";

import { TeamMember } from "@/app/_types/Team";
import { SUMOBOTS_WORKER_SITE_URL } from "../constants";

export async function getTeamProfiles(year: number): Promise<{
  primaryOrganisers: TeamMember[];
  secondaryOrganisers: TeamMember[];
  others: TeamMember[];
}> {
  const response = await fetch(
    `${SUMOBOTS_WORKER_SITE_URL}/api/team?year=${year}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.SUMOBOTS_WORKER_KEY}`,
      },
    },
  );
  const data = await response.json();
  console.log("Team data:", data);
  if (!response.ok) {
    throw new Error(data.error);
  }

  if (
    !data ||
    !data.primaryOrganisers ||
    !data.secondaryOrganisers ||
    !data.others
  ) {
    throw new Error("Invalid team data");
  }

  return {
    primaryOrganisers: data.primaryOrganisers,
    secondaryOrganisers: data.secondaryOrganisers,
    others: data.others,
  };
}
