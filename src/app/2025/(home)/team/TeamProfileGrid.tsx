"use client";

import { useEffect, useState } from "react";
import { TeamMember } from "@/app/_types/Team";
import { getTeamProfiles } from "@/app/_utils/teamProfiles";
import TeamProfile from "./TeamProfile";

const TeamProfileSkeleton = ({ length }: { length: number }) => {
  return (
    <>
      {Array.from({ length: length }).map((_, index) => (
        <TeamProfile isLoading key={index} member={null} />
      ))}
    </>
  );
};

const TeamProfileGrid = () => {
  const [technicalExecutive, setTechnicalExecutive] =
    useState<TeamMember | null>(null);
  const [otherOrganisers, setOtherOrganisers] = useState<TeamMember[] | null>(
    null,
  );
  const [nonOrganisers, setNonOrganisers] = useState<TeamMember[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getTeamProfiles(2025).then((data) => {
      setTechnicalExecutive(data.organisers.technicalExecutive);
      setOtherOrganisers(data.organisers.otherOrganisers);
      setNonOrganisers(data.nonOrganisers);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container" id="team">
      <div className="flex flex-col justify-center">
        <div className="relative mb-5 rounded-lg border border-dashed border-gray-300 px-4 py-8">
          <h3 className="absolute -top-4 left-3 bg-gray-950 px-2">
            Main Organisers
          </h3>
          <TeamProfile
            member={technicalExecutive}
            size="l"
            isLoading={isLoading}
          />
          <div className="mt-5 grid w-full grid-cols-2 gap-4 self-center md:grid-cols-3 lg:grid-cols-4">
            {otherOrganisers ? (
              otherOrganisers.map((member) => (
                <TeamProfile key={member.id} member={member} />
              ))
            ) : (
              <TeamProfileSkeleton length={4} />
            )}
          </div>
        </div>
        <div className="mt-5 grid w-full grid-cols-2 gap-4 self-center md:grid-cols-3 lg:grid-cols-4">
          {nonOrganisers ? (
            nonOrganisers.map((member) => (
              <TeamProfile key={member.id} member={member} />
            ))
          ) : (
            <TeamProfileSkeleton length={16} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamProfileGrid;
