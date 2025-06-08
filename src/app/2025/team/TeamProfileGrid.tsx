"use client";

import { useEffect, useState } from "react";
import { getTeamProfiles } from "@/app/_utils/teamProfiles";
import TeamProfile from "./TeamProfile";
import { TeamMember } from "@/app/_types/Team";

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
      const teamData = await getTeamProfiles(2025);
      setPrimaryOrganisers(teamData.primaryOrganisers);
      setSecondaryOrganisers(teamData.secondaryOrganisers);
      setOthers(teamData.others);
    };
    fetchData();
  }, []);

  return (
    <div className="container" id="team">
      <fieldset className="mb-5 rounded-lg border border-dashed border-gray-300 px-4 py-8">
        <legend className="ml-1 text-left">
          <h3>Main Organisers</h3>
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
