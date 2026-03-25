export type Profile = {
  id: string;
  clerk_user_id: string;
  email: string;
  full_name: string;
  is_unsw: boolean;
  university: string;
  zid: string;
  year_of_study: number | null;
  degree: string;
  faculty: string;
  gender: string;
  dietary_requirements: string;
  phone: string;
  onboarded: boolean;
  created_at: string;
  updated_at: string;
};

export type Team = {
  id: string;
  name: string;
  category: "standard" | "open";
  join_code: string;
  paid: boolean;
  competition_year: number;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type TeamMember = {
  id: string;
  team_id: string;
  profile_id: string;
  role: "captain" | "member";
  joined_at: string;
};

export type TeamWithMembers = Team & {
  members: (TeamMember & { profile: Profile })[];
};

export type TeamBrowseItem = {
  name: string;
  category: "standard" | "open";
  member_count: number;
};

export type ProfileWithTeam = Profile & {
  team_name: string | null;
  team_id: string | null;
  team_role: "captain" | "member" | null;
};

export type AdminTeamRow = Team & {
  member_count: number;
  member_names: string[];
};

export type Payment = {
  id: string;
  team_id: string;
  square_payment_id: string;
  amount_cents: number;
  currency: string;
  status: string;
  source: "checkout" | "webhook";
  created_at: string;
};
