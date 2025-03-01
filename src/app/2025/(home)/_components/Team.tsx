import Image from "next/image";
import { useEffect, useState } from "react";
import { TeamMember } from "@/app/_types/teamData";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

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
                      <FaLinkedin size={32} />
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
