"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import type {
  Profile,
  TeamWithMembers,
  TeamBrowseItem,
  AdminTeamRow,
  ProfileWithTeam,
} from "@/app/_types/registration";
import ProfileCard from "@/app/2026/dashboard/_components/ProfileCard";
import TeamCard from "@/app/2026/dashboard/_components/TeamCard";
import MemberList from "@/app/2026/dashboard/_components/MemberList";
import JoinCodeDisplay from "@/app/2026/dashboard/_components/JoinCodeDisplay";
import NoTeamState from "@/app/2026/dashboard/_components/NoTeamState";
import LeaveTeamButton from "@/app/2026/dashboard/_components/LeaveTeamButton";
import AdminLoginForm from "@/app/2026/admin/_components/AdminLoginForm";
import AdminShell from "@/app/2026/admin/_components/AdminShell";
import TeamsTable from "@/app/2026/admin/_components/TeamsTable";
import IndividualsTable from "@/app/2026/admin/_components/IndividualsTable";
import StepIndicator from "@/app/2026/onboarding/_components/StepIndicator";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";

// ── Mock Data ──────────────────────────────────────────────

const mockProfile: Profile = {
  id: "p1",
  clerk_user_id: "clerk_1",
  email: "alice@unsw.edu.au",
  full_name: "Alice Zhang",
  is_unsw: true,
  university: "UNSW",
  zid: "z5555555",
  year_of_study: 3,
  degree: "Computer Science",
  faculty: "Engineering",
  gender: "Female",
  dietary_requirements: "None",
  phone: "0400000000",
  onboarded: true,
  created_at: "2026-01-15T00:00:00Z",
  updated_at: "2026-01-15T00:00:00Z",
};

const mockMembers = [
  {
    id: "tm1",
    team_id: "t1",
    profile_id: "p1",
    role: "captain" as const,
    joined_at: "2026-01-15T00:00:00Z",
    profile: mockProfile,
  },
  {
    id: "tm2",
    team_id: "t1",
    profile_id: "p2",
    role: "member" as const,
    joined_at: "2026-01-16T00:00:00Z",
    profile: {
      ...mockProfile,
      id: "p2",
      full_name: "Bob Chen",
      email: "bob@sydney.edu.au",
      is_unsw: false,
      university: "University of Sydney",
      zid: "",
    },
  },
  {
    id: "tm3",
    team_id: "t1",
    profile_id: "p3",
    role: "member" as const,
    joined_at: "2026-01-17T00:00:00Z",
    profile: {
      ...mockProfile,
      id: "p3",
      full_name: "Charlie Kim",
      email: "charlie@unsw.edu.au",
      zid: "z5123456",
    },
  },
  {
    id: "tm4",
    team_id: "t1",
    profile_id: "p4",
    role: "member" as const,
    joined_at: "2026-01-18T00:00:00Z",
    profile: {
      ...mockProfile,
      id: "p4",
      full_name: "Diana Patel",
      email: "diana@uts.edu.au",
      is_unsw: false,
      university: "UTS",
      zid: "",
      degree: "Mechatronics Engineering",
    },
  },
];

const mockTeam: TeamWithMembers = {
  id: "t1",
  name: "Sumo Slammers",
  category: "standard",
  join_code: "XK9M4R",
  paid: false,
  competition_year: 2026,
  created_by: "p1",
  created_at: "2026-01-15T00:00:00Z",
  updated_at: "2026-01-15T00:00:00Z",
  members: mockMembers,
};

const mockPaidTeam: TeamWithMembers = {
  ...mockTeam,
  id: "t1b",
  name: "RoboWarriors",
  paid: true,
  members: mockMembers.slice(0, 3),
};

const mockBrowseTeams: TeamBrowseItem[] = [
  { name: "Sumo Slammers", category: "standard", member_count: 4 },
  { name: "RoboWarriors", category: "standard", member_count: 3 },
  { name: "Bot Busters", category: "open", member_count: 2 },
  { name: "The Pushers", category: "standard", member_count: 6 },
  { name: "Solo Bot", category: "open", member_count: 1 },
];

const mockAdminTeams: AdminTeamRow[] = [
  {
    ...mockTeam,
    member_count: 4,
    member_names: ["Alice Zhang", "Bob Chen", "Charlie Kim", "Diana Patel"],
  },
  {
    ...mockPaidTeam,
    member_count: 3,
    member_names: ["Alice Zhang", "Bob Chen", "Charlie Kim"],
  },
  {
    id: "t2",
    name: "Bot Busters",
    category: "open",
    join_code: "HN3P7W",
    paid: false,
    competition_year: 2026,
    created_by: "p5",
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-01T00:00:00Z",
    member_count: 2,
    member_names: ["Eve Wilson", "Frank Li"],
  },
  {
    id: "t3",
    name: "The Pushers",
    category: "standard",
    join_code: "QR8T2V",
    paid: true,
    competition_year: 2026,
    created_by: "p7",
    created_at: "2026-02-05T00:00:00Z",
    updated_at: "2026-02-05T00:00:00Z",
    member_count: 6,
    member_names: [
      "Grace Park",
      "Henry Nguyen",
      "Iris Wang",
      "Jack Brown",
      "Kate Lee",
      "Leo Martinez",
    ],
  },
];

const mockProfiles: ProfileWithTeam[] = [
  {
    ...mockProfile,
    team_name: "Sumo Slammers",
    team_id: "t1",
    team_role: "captain",
  },
  {
    ...mockProfile,
    id: "p2",
    full_name: "Bob Chen",
    email: "bob@sydney.edu.au",
    is_unsw: false,
    university: "University of Sydney",
    zid: "",
    team_name: "Sumo Slammers",
    team_id: "t1",
    team_role: "member",
  },
  {
    ...mockProfile,
    id: "p5",
    full_name: "Eve Wilson",
    email: "eve@unsw.edu.au",
    zid: "z5111111",
    team_name: null,
    team_id: null,
    team_role: null,
  },
  {
    ...mockProfile,
    id: "p6",
    full_name: "Frank Li",
    email: "frank@mq.edu.au",
    is_unsw: false,
    university: "Macquarie University",
    zid: "",
    degree: "Electrical Engineering",
    team_name: "Bot Busters",
    team_id: "t2",
    team_role: "captain",
  },
];

// ── Sections ───────────────────────────────────────────────

const sections = [
  "Primitives",
  "Onboarding",
  "Dashboard (Team)",
  "Dashboard (No Team)",
  "Admin Login",
  "Admin Teams",
  "Admin Individuals",
] as const;

type Section = (typeof sections)[number];

export default function UIPreviewPage() {
  const [active, setActive] = useState<Section>("Primitives");

  return (
    <div className="min-h-screen bg-black">
      {/* Nav */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-3">
          <span className="shrink-0 text-sm font-semibold text-rose-400">
            UI Preview
          </span>
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`font-main shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors ${
                active === s
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {active === "Primitives" && <PrimitivesSection />}
        {active === "Onboarding" && <OnboardingSection />}
        {active === "Dashboard (Team)" && <DashboardTeamSection />}
        {active === "Dashboard (No Team)" && <DashboardNoTeamSection />}
        {active === "Admin Login" && <AdminLoginSection />}
        {active === "Admin Teams" && <AdminTeamsSection />}
        {active === "Admin Individuals" && <AdminIndividualsSection />}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 border-b border-white/10 pb-2 text-lg">{children}</h2>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3 className="font-main mb-3 text-sm font-medium text-gray-400">
        {title}
      </h3>
      {children}
    </div>
  );
}

// ── Primitives ─────────────────────────────────────────────

function PrimitivesSection() {
  return (
    <div>
      <SectionTitle>Primitives</SectionTitle>

      <SubSection title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
      </SubSection>

      <SubSection title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Paid</Badge>
          <Badge variant="warning">Unpaid</Badge>
          <Badge variant="info">Open</Badge>
          <Badge variant="captain">Captain</Badge>
        </div>
      </SubSection>

      <SubSection title="Inputs">
        <div className="flex max-w-sm flex-col gap-4">
          <Input label="Full Name" placeholder="Enter your name" />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error="Invalid email address"
          />
          <Select
            label="Category"
            options={[
              { value: "standard", label: "Standard" },
              { value: "open", label: "Open" },
            ]}
            placeholder="Select a category"
          />
        </div>
      </SubSection>

      <SubSection title="Card">
        <div className="max-w-sm">
          <Card>
            <p className="font-main text-sm text-gray-300">
              A basic card container with border and subtle background.
            </p>
          </Card>
        </div>
      </SubSection>
    </div>
  );
}

// ── Onboarding ─────────────────────────────────────────────

const YEAR_OPTIONS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year+" },
  { value: "0", label: "Postgraduate" },
];

const GENDER_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

const CATEGORY_OPTIONS = [
  { value: "standard", label: "Standard (UNSW only, 3–6 members)" },
  { value: "open", label: "Open (Inter-uni, 1–6 members)" },
];

function OnboardingSection() {
  const [step, setStep] = useState(1);
  const [teamMode, setTeamMode] = useState<"choose" | "create" | "join">(
    "choose",
  );
  const [isUnsw, setIsUnsw] = useState(true);
  const [joinCode, setJoinCode] = useState("");
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [showJoinPreview, setShowJoinPreview] = useState(false);

  function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  function handleCreateSubmit(e: FormEvent) {
    e.preventDefault();
    setCreatedCode("XK9M4R");
  }

  function resetOnboarding() {
    setStep(1);
    setTeamMode("choose");
    setCreatedCode(null);
    setShowJoinPreview(false);
    setJoinCode("");
  }

  return (
    <div>
      <SectionTitle>Onboarding Flow</SectionTitle>
      <div className="mb-4 flex justify-end">
        <Button variant="ghost" size="default" onClick={resetOnboarding}>
          Reset Flow
        </Button>
      </div>
      <div className="mx-auto max-w-lg">
        <StepIndicator currentStep={step} totalSteps={2} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mock StudentDetailsForm */}
              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                <Input
                  label="Full Name"
                  name="full_name"
                  required
                  autoComplete="name"
                  defaultValue="Alice Zhang"
                />

                <div className="flex items-center gap-3">
                  <label className="font-main flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={isUnsw}
                      onChange={(e) => setIsUnsw(e.target.checked)}
                      className="h-5 w-5 rounded accent-rose-600"
                    />
                    I am a UNSW student
                  </label>
                </div>

                {isUnsw ? (
                  <Input
                    label="zID"
                    name="zid"
                    placeholder="z1234567"
                    required
                    defaultValue="z5555555"
                  />
                ) : (
                  <Input
                    label="University"
                    name="university"
                    required
                    placeholder="e.g. University of Sydney"
                  />
                )}

                <Select
                  label="Year of Study"
                  name="year_of_study"
                  options={YEAR_OPTIONS}
                  placeholder="Select year"
                  defaultValue="3"
                />
                <Input
                  label="Degree"
                  name="degree"
                  placeholder="e.g. B.Eng (Mechatronics)"
                  defaultValue="Computer Science"
                />
                <Input
                  label="Faculty"
                  name="faculty"
                  placeholder="e.g. Engineering"
                  defaultValue="Engineering"
                />
                <Select
                  label="Gender"
                  name="gender"
                  options={GENDER_OPTIONS}
                  defaultValue=""
                />
                <Input
                  label="Dietary Requirements"
                  name="dietary_requirements"
                  placeholder="e.g. Vegetarian, Halal"
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="04XX XXX XXX"
                />

                <div className="sticky bottom-4 mt-4 pt-4">
                  <Button type="submit" size="full">
                    Continue
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mock TeamStep */}
              {teamMode === "choose" && (
                <div className="flex flex-col gap-4">
                  <p className="font-main text-center text-gray-400">
                    Create a new team or join an existing one with a code
                  </p>
                  <motion.button
                    type="button"
                    onClick={() => setTeamMode("create")}
                    className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-white transition-colors hover:border-rose-500 hover:bg-white/10"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-display text-lg">Create a Team</span>
                    <span className="text-sm text-gray-400">
                      Start a new team and invite others
                    </span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setTeamMode("join")}
                    className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-white transition-colors hover:border-rose-500 hover:bg-white/10"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-display text-lg">Join a Team</span>
                    <span className="text-sm text-gray-400">
                      Enter a join code from your captain
                    </span>
                  </motion.button>
                </div>
              )}

              {teamMode === "create" && !createdCode && (
                <div>
                  <button
                    type="button"
                    onClick={() => setTeamMode("choose")}
                    className="font-main mb-4 text-sm text-gray-400 hover:text-white"
                  >
                    &larr; Back
                  </button>
                  <form
                    onSubmit={handleCreateSubmit}
                    className="flex flex-col gap-4"
                  >
                    <Input
                      label="Team Name"
                      name="team_name"
                      required
                      placeholder="e.g. The Destroyers"
                    />
                    <Select
                      label="Category"
                      name="category"
                      options={CATEGORY_OPTIONS}
                      required
                      defaultValue="standard"
                    />
                    <p className="font-main text-xs text-gray-500">
                      <b>Standard:</b> UNSW students only, 3–6 members.{" "}
                      <b>Open:</b> Any university, 1–6 members.
                    </p>
                    <div className="sticky bottom-4 mt-4 pt-4">
                      <Button type="submit" size="full">
                        Create Team
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {teamMode === "create" && createdCode && (
                <div className="flex flex-col items-center gap-6 text-center">
                  <div>
                    <h3 className="mb-2">Team Created!</h3>
                    <p className="text-gray-400">
                      Share this code with your teammates
                    </p>
                  </div>
                  <div
                    className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-sm transition-colors hover:border-rose-500"
                    onClick={() => navigator.clipboard.writeText(createdCode)}
                    title="Click to copy"
                  >
                    <span className="font-display text-4xl tracking-[0.3em]">
                      {createdCode}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Tap the code to copy</p>
                  <Button
                    size="full"
                    onClick={() =>
                      alert("Would navigate to dashboard")
                    }
                  >
                    Go to Dashboard
                  </Button>
                </div>
              )}

              {teamMode === "join" && !showJoinPreview && (
                <div>
                  <button
                    type="button"
                    onClick={() => setTeamMode("choose")}
                    className="font-main mb-4 text-sm text-gray-400 hover:text-white"
                  >
                    &larr; Back
                  </button>
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Join Code"
                      value={joinCode}
                      onChange={(e) =>
                        setJoinCode(
                          e.target.value.toUpperCase().slice(0, 6),
                        )
                      }
                      placeholder="ABCDEF"
                      maxLength={6}
                      className="text-center font-mono text-2xl tracking-[0.3em] uppercase"
                      autoComplete="off"
                    />
                    <div className="sticky bottom-4 mt-4 pt-4">
                      <Button
                        size="full"
                        onClick={() => setShowJoinPreview(true)}
                        disabled={joinCode.length !== 6}
                      >
                        Find Team
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {teamMode === "join" && showJoinPreview && (
                <div className="flex flex-col gap-5">
                  <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                    <h3 className="mb-2">Sumo Slammers</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="info">Standard</Badge>
                      <span className="font-main text-sm text-gray-400">
                        4 members
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      size="full"
                      onClick={() => {
                        setShowJoinPreview(false);
                        setJoinCode("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="full"
                      onClick={() =>
                        alert("Would join team and navigate to dashboard")
                      }
                    >
                      Join Team
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Dashboard with Team ────────────────────────────────────

function DashboardTeamSection() {
  return (
    <div>
      <SectionTitle>Dashboard — Has Team</SectionTitle>
      <div className="mx-auto flex max-w-lg flex-col gap-5">
        <ProfileCard profile={mockProfile} />
        <TeamCard team={mockTeam} />
        <JoinCodeDisplay code={mockTeam.join_code} />
        <MemberList members={mockTeam.members} />
        <LeaveTeamButton />

        <div className="mt-4 border-t border-gray-800 pt-4">
          <h3 className="font-main mb-3 text-sm font-medium text-gray-400">
            Paid variant
          </h3>
          <TeamCard team={mockPaidTeam} />
        </div>
      </div>
    </div>
  );
}

// ── Dashboard No Team ──────────────────────────────────────

function DashboardNoTeamSection() {
  return (
    <div>
      <SectionTitle>Dashboard — No Team</SectionTitle>
      <div className="mx-auto flex max-w-lg flex-col gap-5">
        <ProfileCard profile={mockProfile} />
        <NoTeamState teams={mockBrowseTeams} />
      </div>
    </div>
  );
}

// ── Admin Login ────────────────────────────────────────────

function AdminLoginSection() {
  return (
    <div>
      <SectionTitle>Admin Login</SectionTitle>
      <div className="mx-auto max-w-sm">
        <Card>
          <h1 className="mb-6 text-center text-2xl">Admin Login</h1>
          <AdminLoginForm />
        </Card>
      </div>
    </div>
  );
}

// ── Admin Teams ────────────────────────────────────────────

function AdminTeamsSection() {
  return (
    <div>
      <SectionTitle>Admin — Teams</SectionTitle>
      <AdminShell>
        <h2 className="mb-4 text-xl">Teams</h2>
        <TeamsTable teams={mockAdminTeams} />
      </AdminShell>
    </div>
  );
}

// ── Admin Individuals ──────────────────────────────────────

function AdminIndividualsSection() {
  return (
    <div>
      <SectionTitle>Admin — Individuals</SectionTitle>
      <AdminShell>
        <h2 className="mb-4 text-xl">Individuals</h2>
        <IndividualsTable profiles={mockProfiles} />
      </AdminShell>
    </div>
  );
}
