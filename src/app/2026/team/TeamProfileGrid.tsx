"use client";

import { useEffect, useState } from "react";
import { getTeamProfiles } from "@/app/_utils/teamProfiles";
import TeamProfile from "./TeamProfile";
import { TeamMember } from "@/app/_types/team";

const TeamProfileSkeleton = ({
  length,
  size = "s",
}: {
  length: number;
  size?: "s" | "l";
}) => {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => (
        <TeamProfile isLoading key={index} member={null} size={size} />
      ))}
    </>
  );
};

const TeamProfileGrid = () => {
  const [primaryOrganisers, setPrimaryOrganisers] = useState<
    TeamMember[] | null
  >(null);
  const [secondaryOrganisers, setSecondaryOrganisers] = useState<
    TeamMember[] | null
  >(null);
  const [others, setOthers] = useState<TeamMember[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const teamData = await getTeamProfiles(2026);
      setPrimaryOrganisers(teamData.primaryOrganisers);
      setSecondaryOrganisers(teamData.secondaryOrganisers);
      setOthers(teamData.others);
    };
    fetchData();
  }, []);

  return (
    <div className="container" id="team">
      <fieldset
        className="relative mb-5 overflow-hidden rounded-lg border border-dashed border-gray-300 bg-black/40 px-4 py-8 bg-repeat"
        style={{ backgroundImage: "url(/2026/team/gear-pattern.svg)" }}
      >
        <legend className="ml-4 -mb-4 px-2 text-left text-sm text-gray-300">
          Main Organisers
        </legend>
        <div className="mb-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {primaryOrganisers ? (
            primaryOrganisers.map((member) => (
              <TeamProfile key={member.id} member={member} size="l" />
            ))
          ) : (
            <TeamProfileSkeleton length={3} size="l" />
          )}
        </div>
        <div className="mt-5 grid w-full grid-cols-2 gap-4 self-center md:grid-cols-3 lg:grid-cols-4">
          {secondaryOrganisers ? (
            secondaryOrganisers.map((member) => (
              <TeamProfile key={member.id} member={member} />
            ))
          ) : (
            <TeamProfileSkeleton length={8} />
          )}
        </div>
      </fieldset>
      <div className="mt-5 grid w-full grid-cols-2 gap-4 self-center md:grid-cols-3 lg:grid-cols-4">
        {others ? (
          others.map((member) => (
            <TeamProfile key={member.id} member={member} />
          ))
        ) : (
          <TeamProfileSkeleton length={16} />
        )}
      </div>
    </div>
  );
};

export default TeamProfileGrid;
