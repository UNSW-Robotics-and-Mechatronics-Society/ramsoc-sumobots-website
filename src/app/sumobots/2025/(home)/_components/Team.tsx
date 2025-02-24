import Image from "next/image";
import { useEffect, useState } from "react";
import { TeamMember } from "../types/teamData";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fetchTeamData = async (year: number) => {
  const response = await fetch(`/api/team/get?year=${year}`);
  if (!response.ok) {
    throw new Error("Failed to fetch team data");
  }
  return response.json();
};

export const Team = () => {
  const [teamData, setTeamData] = useState<TeamMember[] | null>();
  useEffect(() => {
    fetchTeamData(2025).then((data) =>
      setTeamData([...data.executives, ...data.directors]),
    );
  }, []);
  return (
    <div className="container" id="team">
      <h2>Meet The Team.</h2>
      <p>
        The RAMSOC team is a group of passionate students who are dedicated to
        providing a great experience for all participants.
      </p>
      <div className="flex justify-center">
        <div className="mt-5 grid grid-cols-2 gap-4 self-center md:grid-cols-3 lg:grid-cols-4">
          {teamData &&
            teamData.map((member) => (
              <div
                key={member.name}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative">
                  <Image
                    width={128}
                    height={128}
                    className="h-32 w-32 rounded-full object-cover"
                    src={member.selfie}
                    alt={member.name}
                  />
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-0 right-0 rounded-[4px] border-2 border-black bg-black"
                    >
                      <FontAwesomeIcon icon={faLinkedin} size="sm" />
                    </Link>
                  )}
                </div>
                <h3 className="mb-0">{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
