export type TeamMember = {
  id: string;
  name: string;
  roleName: TeamRole;
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

export class Team {
  constructor(fullTeam: TeamMember[]) {
    this.#fullTeam = fullTeam;
  }

  get fullTeam() {
    return this.#fullTeam;
  }

  get fullTeamOrdered() {
    return [...this.executives, ...this.directors, ...this.subcommittees];
  }

  get organisers() {
    const organisers = this.fullTeam
      .filter((member) => Team.organisersOrder.includes(member.role))
      .sort(
        (a, b) =>
          Team.organisersOrder.indexOf(a.role) -
          Team.organisersOrder.indexOf(b.role),
      );
    const technicalExecutive = organisers.find(
      (member) => member.role === "technical executive",
    );
    if (!technicalExecutive) {
      throw new Error("Technical Executive is required");
    }
    const otherOrganisers = organisers.filter(
      (member) => member.role !== "technical executive",
    );
    return { technicalExecutive, otherOrganisers };
  }

  get nonOrganisers() {
    return this.fullTeam
      .filter(
        (member) => !Team.organisersOrder.find((role) => role === member.role),
      )
      .sort(
        (a, b) =>
          Team.fullTeamOrder.indexOf(a.role) -
          Team.fullTeamOrder.indexOf(b.role),
      );
  }

  get executives() {
    return this.fullTeam
      .filter((member) => member.position.toLowerCase() === "executive")
      .sort(
        (a, b) =>
          Team.execOrder.indexOf(a.role) - Team.execOrder.indexOf(b.role),
      );
  }

  get directors() {
    return this.fullTeam
      .filter((member) => member.position.toLowerCase() === "director")
      .sort((a, b) => a.role.localeCompare(b.role));
  }

  get subcommittees() {
    return this.fullTeam
      .filter((member) => member.position.toLowerCase() === "subcommittee")
      .sort((a, b) => a.role.localeCompare(b.role));
  }

  static validateTeamMember(member: TeamMember) {
    if (!member.id) {
      throw new Error("Member ID is required");
    }
    if (!member.name) {
      throw new Error("Member name is required");
    }
    if (!member.role) {
      throw new Error("Member role is required");
    }
    if (!member.position) {
      throw new Error("Member position is required");
    }
    if (!member.year) {
      throw new Error("Member year is required");
    }
    if (!member.email) {
      throw new Error("Member email is required");
    }
    return {
      id: member.id,
      name: member.name,
      roleName: member.role,
      role: member.role.toLowerCase() as TeamRole,
      position: member.position.toLowerCase() as TeamPosition,
      year: member.year,
      selfie: member.selfie,
      email: member.email,
      linkedin: member.linkedin,
    };
  }

  static processRawData(teamData: TeamMember[]) {
    const fullTeam: TeamMember[] = [];
    for (const member of teamData) {
      fullTeam.push(this.validateTeamMember(member));
    }
    return new Team(fullTeam);
  }

  static execOrder: TeamRole[] = [
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

  static directorOrder: TeamRole[] = [
    "creatives director",
    "industry & sponsorships director",
    "it director",
    "marketing director",
    "outreach director",
    "projects director",
    "socials director",
    "wim director",
    "workshops director",
  ];

  static subcommitteeOrder: TeamRole[] = [
    "creatives subcommittee",
    "industry & sponsorships subcommittee",
    "it subcommittee",
    "marketing subcommittee",
    "outreach subcommittee",
    "projects subcommittee",
    "socials subcommittee",
    "wim subcommittee",
    "workshops subcommittee",
  ];

  static fullTeamOrder: TeamRole[] = [
    ...this.execOrder,
    ...this.directorOrder,
    ...this.subcommitteeOrder,
  ];

  static organisersOrder: TeamRole[] = [
    "technical executive",
    "workshops director",
    "projects director",
    "workshops subcommittee",
    "projects subcommittee",
  ];

  #fullTeam: TeamMember[] = [];
}
