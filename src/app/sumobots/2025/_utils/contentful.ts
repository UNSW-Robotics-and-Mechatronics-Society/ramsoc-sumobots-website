import { Asset, createClient } from "contentful";
import {
  SubcomProfileData,
  TeamMember,
  TeamStructure,
} from "../(home)/types/teamData";

export const client = createClient({
  space: `${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
  accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
});

export const fetchTeamData = async (year: number): Promise<TeamStructure> => {
  const response = await client.getEntries({
    content_type: "team",
    order: ["fields.year", "fields.role", "fields.name"],
  });

  const yearTeamData: TeamMember[] = response.items
    .filter((item) => item.fields.year?.toString() === year.toString())
    .map((item) => {
      const selfieUrl = (item.fields.selfie as Asset)?.fields.file?.url; // without https
      const formattedSelfieUrl = selfieUrl
        ? `https:${selfieUrl}?fm=jpg&fit=fill&w=500&h=500&fl=progressive` // format: .webp, fitting: fill, dimention: 500px * 500px
        : "";

      const nameParts = (item.fields.name as string).split(" ");
      const formattedName =
        nameParts.length > 2
          ? `${nameParts[0]} ${nameParts[2]}`
          : item.fields.name;

      return {
        id: item.sys.id as string,
        name: formattedName as string,
        role: item.fields.role as string,
        year: item.fields.year as number,
        selfie: formattedSelfieUrl as string,
        email: item.fields.email as string,
        linkedin: item.fields.linkedin as string,
      };
    });

  return categorizeTeamMembersByRole(yearTeamData);
};

const categorizeTeamMembersByRole = (
  teamMembers: TeamMember[],
): TeamStructure => {
  /*
    Categorizing conditions:
    - execs: teamMember.role doesn't include director nor subcommittee
    - directors: teamMember.role includes director
    - subcoms: teamMember.role includes subcommittee
  */

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
