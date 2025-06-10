export type TeamMember = {
  id: string;
  name: string;
  role: TeamRole;
  position: TeamPosition;
  year: number;
  selfie: string;
  email: string;
  linkedin: string | "";
};

export type TeamPosition = "executive" | "director" | "subcommittee";

export type TeamRole =
  | "president"
  | "vice president"
  | "secretary"
  | "arc delegate"
  | "treasurer"
  | "grievance & edi officer"
  | "marketing executive"
  | "technical executive"
  | "industry & sponsorships executive"
  | "industry & sponsorships director"
  | "it director"
  | "marketing director"
  | "wim director"
  | "creatives director"
  | "socials director"
  | "projects director"
  | "workshops director"
  | "outreach director"
  | "industry & sponsorships subcommittee"
  | "it subcommittee"
  | "marketing subcommittee"
  | "wim subcommittee"
  | "creatives subcommittee"
  | "socials subcommittee"
  | "projects subcommittee"
  | "workshops subcommittee"
  | "outreach subcommittee";
