export type TeamMember = {
  id: string;
  name: string;
  role: string;
  year: number;
  selfie: string;
  email: string;
  linkedin: string;
};

export type TeamStructure = {
  executives: TeamMember[];
  directors: TeamMember[];
  subcommittees: SubcomProfileData[];
};

export type SubcomProfileData = {
  portfolio: string;
  members: string[];
};
