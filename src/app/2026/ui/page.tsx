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
import ProfileTab from "@/app/2026/dashboard/_components/ProfileTab";
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
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";
import FadeIn from "@/app/2026/_components/ui/FadeIn";
import PaymentForm from "@/app/2026/dashboard/payment/_components/PaymentForm";

// ── Mock Data ──────────────────────────────────────────────

const mockProfile: Profile = {
  id: "p1",
  clerk_user_id: "clerk_1",
  email: "alice@unsw.edu.au",
  full_name: "Alice Zhang",
  is_unsw: true,
  university: "UNSW",
  zid: "z5555555",
  year_of_study: "3rd Year",
  degree_stage: "Penultimate",
  undergrad_postgrad: "Undergraduate",
  domestic_international: "Domestic",
  degree: "Computer Science",
  majors: "Artificial Intelligence",
  faculty: "Engineering",
  gender: "female",
  gender_other: "",
  is_ramsoc_member: true,
  is_arc_member: true,
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
  "Dashboard",
  "Payment",
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
      <div className="sticky top-0 z-50 border-b border-border bg-secondary/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-3">
          <span className="shrink-0 text-sm font-semibold text-primary">
            UI Preview
          </span>
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`font-main shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors ${
                active === s
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {active === "Primitives" && <PrimitivesSection />}
            {active === "Onboarding" && <OnboardingSection />}
            {active === "Dashboard" && <DashboardSection />}
            {active === "Payment" && <PaymentSection />}
            {active === "Admin Login" && <AdminLoginSection />}
            {active === "Admin Teams" && <AdminTeamsSection />}
            {active === "Admin Individuals" && <AdminIndividualsSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 border-b border-border pb-2 text-lg">{children}</h2>
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
      <h3 className="font-main mb-3 text-sm font-medium text-muted-foreground">
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

      <FadeIn delay={0}>
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
      </FadeIn>

      <FadeIn delay={0.1}>
        <SubSection title="Badges">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Paid</Badge>
            <Badge variant="warning">Unpaid</Badge>
            <Badge variant="info">Open</Badge>
            <Badge variant="captain">Captain</Badge>
          </div>
        </SubSection>
      </FadeIn>

      <FadeIn delay={0.2}>
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
      </FadeIn>

      <FadeIn delay={0.3}>
        <SubSection title="Card">
          <div className="max-w-sm">
            <Card>
              <p className="font-main text-sm text-muted-foreground">
                A basic card container with border and subtle background.
              </p>
            </Card>
          </div>
        </SubSection>
      </FadeIn>

      <FadeIn delay={0.4}>
        <SubSection title="Glass Panel with Ambient Glow">
          <div className="max-w-sm">
            <GlassPanel>
              <p className="font-main text-sm text-muted-foreground">
                A glassmorphism panel with animated ambient light gradient drifting behind it.
              </p>
            </GlassPanel>
          </div>
        </SubSection>
      </FadeIn>
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

function OnboardingField({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function OnboardingSection() {
  const [step, setStep] = useState(0);
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
    setStep(0);
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
        <GlassPanel>
        {step > 0 && <StepIndicator currentStep={step} totalSteps={2} />}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center py-4 text-center"
            >
              <motion.p
                className="font-main mb-2 text-sm tracking-widest text-primary uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                RAMSoc UNSW presents
              </motion.p>
              <motion.h1
                className="mb-3 text-4xl sm:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Sumobots 2026
              </motion.h1>
              <motion.p
                className="font-main mb-10 max-w-xs text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Build a sumo robot and compete against other teams. Register below to get started.
              </motion.p>
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <Button size="full" onClick={() => setStep(1)}>
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Mock StudentDetailsForm */}
              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                <OnboardingField delay={0.1}>
                  <Input
                    label="Full Name"
                    name="full_name"
                    required
                    autoComplete="name"
                    defaultValue="Alice Zhang"
                  />
                </OnboardingField>

                <OnboardingField delay={0.2}>
                  <div className="flex items-center gap-3">
                    <label className="font-main flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={isUnsw}
                        onChange={(e) => setIsUnsw(e.target.checked)}
                        className="h-5 w-5 rounded accent-primary"
                      />
                      I am a UNSW student
                    </label>
                  </div>
                </OnboardingField>

                <OnboardingField delay={0.3}>
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
                </OnboardingField>

                <OnboardingField delay={0.4}>
                  <Select
                    label="Year of Study"
                    name="year_of_study"
                    options={YEAR_OPTIONS}
                    placeholder="Select year"
                    defaultValue="3"
                  />
                </OnboardingField>

                <OnboardingField delay={0.5}>
                  <Input
                    label="Degree"
                    name="degree"
                    placeholder="e.g. B.Eng (Mechatronics)"
                    defaultValue="Computer Science"
                  />
                </OnboardingField>

                <OnboardingField delay={0.6}>
                  <Select
                    label="Faculty"
                    name="faculty"
                    options={[
                      { value: "Engineering", label: "Engineering" },
                      { value: "Science", label: "Science" },
                      { value: "Business", label: "Business" },
                    ]}
                    defaultValue="Engineering"
                  />
                </OnboardingField>

                <OnboardingField delay={0.7}>
                  <Select
                    label="Gender"
                    name="gender"
                    options={GENDER_OPTIONS}
                    defaultValue=""
                  />
                </OnboardingField>

                <OnboardingField delay={0.8}>
                  <Input
                    label="Majors (if applicable)"
                    name="majors"
                    placeholder="e.g. Mechanical Engineering"
                  />
                </OnboardingField>

                <OnboardingField delay={0.9}>
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="04XX XXX XXX"
                  />
                </OnboardingField>

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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Mock TeamStep */}
              {teamMode === "choose" && (
                <div className="flex flex-col gap-4">
                  <p className="font-main text-center text-muted-foreground">
                    Create a new team or join an existing one with a code
                  </p>
                  <motion.button
                    type="button"
                    onClick={() => setTeamMode("create")}
                    className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-border bg-secondary p-5 text-foreground transition-colors hover:border-primary hover:bg-secondary/80"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-display text-lg">Create a Team</span>
                    <span className="text-sm text-muted-foreground">
                      Start a new team and invite others
                    </span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setTeamMode("join")}
                    className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-border bg-secondary p-5 text-foreground transition-colors hover:border-primary hover:bg-secondary/80"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-display text-lg">Join a Team</span>
                    <span className="text-sm text-muted-foreground">
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
                    className="font-main mb-4 text-sm text-muted-foreground hover:text-foreground"
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
                    <p className="font-main text-xs text-muted-foreground">
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
                    <p className="text-muted-foreground">
                      Share this code with your teammates
                    </p>
                  </div>
                  <div
                    className="cursor-pointer rounded-xl border border-border bg-secondary px-8 py-6 transition-colors hover:border-primary"
                    onClick={() => navigator.clipboard.writeText(createdCode)}
                    title="Click to copy"
                  >
                    <span className="font-display text-4xl tracking-[0.3em]">
                      {createdCode}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Tap the code to copy</p>
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
                    className="font-main mb-4 text-sm text-muted-foreground hover:text-foreground"
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
                  <div className="rounded-xl border border-border bg-secondary backdrop-blur-sm p-5">
                    <h3 className="mb-2">Sumo Slammers</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="info">Standard</Badge>
                      <span className="font-main text-sm text-muted-foreground">
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
        </GlassPanel>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────

type DashboardTab = "home" | "team" | "profile";
const dashboardTabLabels: Record<DashboardTab, string> = {
  home: "Home",
  team: "Team",
  profile: "Profile",
};

function DashboardSection() {
  const [dashTab, setDashTab] = useState<DashboardTab>("home");
  const [isCaptainView, setIsCaptainView] = useState(true);
  const [memberCount, setMemberCount] = useState(4);
  const [hasTeamToggle, setHasTeamToggle] = useState(true);

  const visibleMembers = mockMembers.slice(0, memberCount);
  const currentTeam: TeamWithMembers = {
    ...mockTeam,
    paid: false,
    members: visibleMembers,
  };

  const hasEnoughMembers = visibleMembers.length >= 3;

  return (
    <div>
      <SectionTitle>Dashboard</SectionTitle>

      {/* Test toggles */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label className="font-main flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={hasTeamToggle}
            onChange={(e) => setHasTeamToggle(e.target.checked)}
            className="h-4 w-4 rounded accent-primary"
          />
          Has team
        </label>
        <label className="font-main flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={isCaptainView}
            onChange={(e) => setIsCaptainView(e.target.checked)}
            className="h-4 w-4 rounded accent-primary"
          />
          Captain view
        </label>
        <label className="font-main flex items-center gap-2 text-sm text-muted-foreground">
          Members:
          <select
            value={memberCount}
            onChange={(e) => setMemberCount(Number(e.target.value))}
            className="rounded bg-accent px-2 py-1 text-sm text-white"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mx-auto max-w-lg">
        <GlassPanel>
          <AnimatePresence mode="wait">
            <motion.div
              key={dashTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Home tab */}
              {dashTab === "home" && (
                <div className="flex flex-col gap-5">
                  <Card>
                    <h3 className="mb-1">Welcome, Alice</h3>
                    <p className="font-main text-sm text-muted-foreground">
                      {hasTeamToggle && currentTeam.paid
                        ? "You're all set for the competition!"
                        : "Here's what you need to do to get ready."}
                    </p>
                  </Card>
                  <Card>
                    <h3 className="mb-3 text-base">Action Items</h3>
                    <div className="flex flex-col gap-2">
                      <div className={`font-main flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${hasTeamToggle ? "bg-secondary text-muted-foreground line-through" : "bg-secondary text-white"}`}>
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${hasTeamToggle ? "border-green-500/50 bg-green-500/20 text-green-400" : "border-border"}`}>
                          {hasTeamToggle ? "\u2713" : ""}
                        </span>
                        Create or join a team
                      </div>
                      <div className={`font-main flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${hasEnoughMembers ? "bg-secondary text-muted-foreground line-through" : "bg-secondary text-white"}`}>
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${hasEnoughMembers ? "border-green-500/50 bg-green-500/20 text-green-400" : "border-border"}`}>
                          {hasEnoughMembers ? "\u2713" : ""}
                        </span>
                        Get at least 3 team members
                      </div>
                      <div className="font-main flex items-center gap-3 rounded-lg bg-secondary px-4 py-3 text-sm text-white">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-xs" />
                        Pay the entry fee to activate your team
                      </div>
                    </div>
                  </Card>
                  {hasTeamToggle && (
                    <Card>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-main text-xs text-muted-foreground">Your team</p>
                          <h3 className="text-base">{currentTeam.name}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="warning">Not Active</Badge>
                          <span className="font-main text-sm text-muted-foreground">{visibleMembers.length}/6</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setDashTab("team")}
                        className="font-main mt-3 text-sm text-primary transition-colors hover:text-primary/80"
                      >
                        View team details &rarr;
                      </button>
                    </Card>
                  )}
                </div>
              )}

              {/* Team tab */}
              {dashTab === "team" && (
                <div className="flex flex-col gap-5">
                  {hasTeamToggle ? (
                    <>
                      <TeamCard team={currentTeam} isCaptain={isCaptainView} />
                      <JoinCodeDisplay code={currentTeam.join_code} />
                      <MemberList
                        members={visibleMembers}
                        isCaptain={isCaptainView}
                        currentProfileId="p1"
                      />
                      <LeaveTeamButton />

                      <div className="mt-2 border-t border-border pt-4">
                        <h3 className="font-main mb-3 text-sm font-medium text-muted-foreground">
                          Paid variant
                        </h3>
                        <TeamCard team={mockPaidTeam} />
                      </div>
                    </>
                  ) : (
                    <NoTeamState teams={mockBrowseTeams} />
                  )}
                </div>
              )}

              {/* Profile tab */}
              {dashTab === "profile" && (
                <ProfileTab
                  profile={mockProfile}
                  onLogout={() => alert("Would log out")}
                  onDeleteAccount={() => alert("Would delete account")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </GlassPanel>

        {/* Bottom tab bar — outside the glass panel */}
        <div className="mt-4 flex justify-around rounded-xl border border-border bg-secondary p-1 backdrop-blur-xl">
          {(["home", "team", "profile"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setDashTab(t)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-3 transition-colors ${
                dashTab === t
                  ? "text-primary"
                  : "text-muted-foreground hover:text-muted-foreground"
              }`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={dashTab === t ? 2.5 : 1.5}
              >
                {t === "home" && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
                )}
                {t === "team" && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                )}
                {t === "profile" && (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                )}
              </svg>
              <span className="font-main text-xs">{dashboardTabLabels[t]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Payment ───────────────────────────────────────────────

function PaymentSection() {
  return (
    <div>
      <SectionTitle>Payment</SectionTitle>
      <div className="mx-auto max-w-lg">
        <GlassPanel>
          <PaymentForm
            teamName="Sumo Slammers"
            category="standard"
            memberCount={4}
            priceCents={5000}
          />
        </GlassPanel>
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
        <GlassPanel>
          <FadeIn delay={0} direction="none">
            <h1 className="mb-6 text-center text-2xl">Admin Login</h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <AdminLoginForm />
          </FadeIn>
        </GlassPanel>
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
