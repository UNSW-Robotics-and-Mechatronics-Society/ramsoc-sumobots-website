import { TeamMember } from "@/app/_types/Team";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";

const TeamProfile = ({
  member,
  size = "s",
  isLoading = false,
}: {
  isLoading?: boolean;
  member: TeamMember | null;
  size?: "s" | "l";
}) => {
  const sizeClass = size === "s" ? "size-32" : "size-48";

  if (isLoading || !member) {
    return (
      <div className="relative flex flex-col items-center text-center">
        <div className="relative">
          <div
            className={`${sizeClass} animate-pulse rounded-full bg-gray-300/50`}
          ></div>
        </div>
        <div className="mt-2 h-4 w-24 animate-pulse bg-gray-300/50"></div>
        <div className="mt-1 h-3 w-16 animate-pulse bg-gray-300/50"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="relative">
        <Image
          width={128}
          height={128}
          className={`${sizeClass} rounded-full object-cover`}
          src={member.selfie}
          alt={member.name}
        />
        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 bottom-0 rounded-[4px] border-2 border-black bg-black text-white"
          >
            <FaLinkedin size={size === "s" ? 32 : 48} />
          </Link>
        )}
      </div>
      <h3 className="mb-0">{member.name}</h3>
      <p>{member.roleName}</p>
    </div>
  );
};

export default TeamProfile;
