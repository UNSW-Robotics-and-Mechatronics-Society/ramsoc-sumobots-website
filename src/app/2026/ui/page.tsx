"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import socials from "@/app/2026/_data/socials";
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
import TasksTable from "@/app/2026/admin/_components/TasksTable";
import StepIndicator from "@/app/2026/onboarding/_components/StepIndicator";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";
import FadeIn from "@/app/2026/_components/ui/FadeIn";

// ── Mock Data ──────────────────────────────────────────────

const mockProfile: Profile = {
  id: "p1",
  clerk_user_id: "clerk_1",
  email: "alice@unsw.edu.au",
  full_name: "Alice Zhang",
  user_type: "unsw",
  is_unsw: true,
  university: "UNSW",
  zid: "z5555555",
  uni_id: "",
  high_school: "",
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
  heard_from: "discord",
  heard_from_other: "",
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
  "Admin Tasks",
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
            {active === "Admin Tasks" && <AdminTasksSection />}
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
  { value: "1st Year", label: "1st Year" },
  { value: "2nd Year", label: "2nd Year" },
  { value: "3rd Year", label: "3rd Year" },
  { value: "4th Year", label: "4th Year" },
  { value: "5th Year+", label: "5th Year+" },
];

const DEGREE_STAGE_OPTIONS = [
  { value: "Pre-penultimate", label: "Pre-penultimate (3rd-last year or earlier)" },
  { value: "Penultimate", label: "Penultimate (2nd-last year)" },
  { value: "Final Year", label: "Final year" },
];

const UNDERGRAD_POSTGRAD_OPTIONS = [
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Postgraduate", label: "Postgraduate" },
];

const DOMESTIC_INTL_OPTIONS = [
  { value: "Domestic", label: "Domestic" },
  { value: "International", label: "International" },
];

const FACULTY_OPTIONS = [
  { value: "Arts, Design & Architecture", label: "Arts, Design & Architecture" },
  { value: "Business", label: "Business" },
  { value: "Engineering", label: "Engineering" },
  { value: "Law & Justice", label: "Law & Justice" },
  { value: "Medicine & Health", label: "Medicine & Health" },
  { value: "Science", label: "Science" },
  { value: "Other", label: "Other" },
];

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

const HEARD_FROM_OPTIONS = [
  { value: "discord", label: "Discord" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "poster", label: "Poster" },
  { value: "friend", label: "Friend" },
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

function MockRadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-main text-sm text-muted-foreground">
        {label}{required && <span className="text-destructive"> *</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`font-main flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-all ${
              value === opt.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-secondary/80"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 accent-primary"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

function MockCheckboxGroup({
  label,
  options,
  selected,
  onChange,
  required,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  required?: boolean;
}) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-main text-sm text-muted-foreground">
        {label}{required && <span className="text-destructive"> *</span>}
      </span>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`font-main flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-all ${
              selected.includes(opt.value)
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-secondary/80"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="h-4 w-4 rounded accent-primary"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

function MockYesNoToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className={`font-main flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-all ${
      value
        ? "border-primary bg-primary/10 text-foreground"
        : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-secondary/80"
    }`}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded accent-primary"
      />
      {label}
    </label>
  );
}

function OnboardingSection() {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<"unsw" | "other_uni" | "high_school" | null>(null);
  const [division, setDivision] = useState<"standard" | "open" | null>(null);
  const [teamMode, setTeamMode] = useState<"choose" | "create" | "join" | "solo">(
    "choose",
  );
  const [joinCode, setJoinCode] = useState("");
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [showJoinPreview, setShowJoinPreview] = useState(false);
  const [undergradPostgrad, setUndergradPostgrad] = useState("Undergraduate");
  const [domesticIntl, setDomesticIntl] = useState("Domestic");
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>(["Engineering"]);
  const [gender, setGender] = useState("female");
  const [genderOther, setGenderOther] = useState("");
  const [isRamsocMember, setIsRamsocMember] = useState(true);
  const [isArcMember, setIsArcMember] = useState(true);
  const [facultyOther, setFacultyOther] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [heardFromOther, setHeardFromOther] = useState("");

  const isUnsw = userType === "unsw";
  const isOtherUni = userType === "other_uni";
  const isHighSchool = userType === "high_school";
  const canJoinStandard = userType === "unsw";
  const isStandard = division === "standard";
  const showDivisionPicker = step === 1 && userType === "unsw" && !division;

  function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setStep(3);
  }

  function handleCreateSubmit(e: FormEvent) {
    e.preventDefault();
    setCreatedCode("XK9M4R");
  }

  function resetOnboarding() {
    setStep(0);
    setUserType(null);
    setDivision(null);
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
        {step > 0 && <StepIndicator currentStep={step} totalSteps={3} />}

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

          {step === 1 && !showDivisionPicker && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Mock UserTypeStep — Who are you? */}
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <h2 className="mb-2 text-2xl sm:text-3xl">Who are you?</h2>
                  <p className="font-main text-sm text-muted-foreground">
                    This helps us match you with the right competition division
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  {([
                    { value: "unsw" as const, title: "UNSW Student", desc: "Currently enrolled at UNSW" },
                    { value: "other_uni" as const, title: "Other University", desc: "Enrolled at another university" },
                    { value: "high_school" as const, title: "High School Student", desc: "Currently attending high school" },
                  ]).map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setUserType(opt.value);
                        if (opt.value === "unsw") {
                          setDivision(null);
                        } else {
                          setDivision("open");
                          setStep(2);
                        }
                      }}
                      className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-border bg-secondary p-5 text-foreground transition-colors hover:border-primary hover:bg-secondary/80"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-display text-lg">{opt.title}</span>
                      <span className="text-sm text-muted-foreground">{opt.desc}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {showDivisionPicker && (
            <motion.div
              key="step-1-division"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Mock DivisionStep — Standard or Open? */}
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <h2 className="mb-2 text-2xl sm:text-3xl">Which division?</h2>
                  <p className="font-main text-sm text-muted-foreground">
                    As a UNSW student you can compete in either division
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  {([
                    { value: "standard" as const, title: "Standard", desc: "UNSW students only, 3-6 members per team" },
                    { value: "open" as const, title: "Open", desc: "Any university or high school, 1-6 members (solo allowed)" },
                  ]).map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => { setDivision(opt.value); setStep(2); }}
                      className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-border bg-secondary p-5 text-foreground transition-colors hover:border-primary hover:bg-secondary/80"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-display text-lg">{opt.title}</span>
                      <span className="text-sm text-muted-foreground">{opt.desc}</span>
                    </motion.button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => { setUserType(null); setDivision(null); }}
                  className="font-main text-sm text-muted-foreground hover:text-foreground"
                >
                  &larr; Back
                </button>
              </div>
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
              {/* Mock StudentDetailsForm — adapts based on user type */}
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

                {isUnsw && (
                  <OnboardingField delay={0.15}>
                    <Input
                      label="zID"
                      name="zid"
                      placeholder="z1234567"
                      required
                      defaultValue="z5555555"
                    />
                  </OnboardingField>
                )}

                {isOtherUni && (
                  <>
                    <OnboardingField delay={0.15}>
                      <Input
                        label="University"
                        name="university"
                        required
                        placeholder="e.g. University of Sydney"
                      />
                    </OnboardingField>
                    <OnboardingField delay={0.2}>
                      <Input
                        label="University ID"
                        name="uni_id"
                        required
                        placeholder="e.g. 490123456"
                      />
                    </OnboardingField>
                  </>
                )}

                {isHighSchool && (
                  <OnboardingField delay={0.15}>
                    <Input
                      label="High School"
                      name="high_school"
                      required
                      placeholder="e.g. Sydney Grammar School"
                    />
                  </OnboardingField>
                )}

                {!isHighSchool && (
                  <>
                    <OnboardingField delay={0.25}>
                      <Select
                        label="Year of Study"
                        name="year_of_study"
                        options={YEAR_OPTIONS}
                        placeholder="Select year"
                        required
                        defaultValue="3rd Year"
                      />
                    </OnboardingField>

                    <OnboardingField delay={0.3}>
                      <Select
                        label="Degree Stage"
                        name="degree_stage"
                        options={DEGREE_STAGE_OPTIONS}
                        placeholder="Select degree stage"
                        required
                        defaultValue="Penultimate"
                      />
                    </OnboardingField>

                    <OnboardingField delay={0.35}>
                      <MockRadioGroup
                        label="Undergraduate or Postgraduate"
                        name="undergrad_postgrad"
                        options={UNDERGRAD_POSTGRAD_OPTIONS}
                        value={undergradPostgrad}
                        onChange={setUndergradPostgrad}
                        required
                      />
                    </OnboardingField>

                    <OnboardingField delay={0.4}>
                      <MockRadioGroup
                        label="Domestic or International"
                        name="domestic_international"
                        options={DOMESTIC_INTL_OPTIONS}
                        value={domesticIntl}
                        onChange={setDomesticIntl}
                        required
                      />
                    </OnboardingField>

                    <OnboardingField delay={0.45}>
                      <Input
                        label="Degree"
                        name="degree"
                        required
                        placeholder="e.g. B.Eng (Mechatronics)"
                        defaultValue="Computer Science"
                      />
                    </OnboardingField>

                    <OnboardingField delay={0.5}>
                      <Input
                        label="Majors (if applicable)"
                        name="majors"
                        placeholder="e.g. Mechanical Engineering"
                        defaultValue="Artificial Intelligence"
                      />
                    </OnboardingField>

                    <OnboardingField delay={0.55}>
                      <MockCheckboxGroup
                        label="Faculty"
                        options={FACULTY_OPTIONS}
                        selected={selectedFaculties}
                        onChange={(vals) => {
                          setSelectedFaculties(vals);
                          if (!vals.includes("Other")) setFacultyOther("");
                        }}
                        required
                      />
                    </OnboardingField>

                    {selectedFaculties.includes("Other") && (
                      <OnboardingField delay={0}>
                        <Input
                          label="Please specify your faculty"
                          name="faculty_other"
                          required
                          value={facultyOther}
                          onChange={(e) => setFacultyOther(e.target.value)}
                        />
                      </OnboardingField>
                    )}
                  </>
                )}

                <OnboardingField delay={0.6}>
                  <MockRadioGroup
                    label="Gender"
                    name="gender"
                    options={GENDER_OPTIONS}
                    value={gender}
                    onChange={(val) => {
                      setGender(val);
                      if (val !== "other") setGenderOther("");
                    }}
                    required
                  />
                </OnboardingField>

                {gender === "other" && (
                  <OnboardingField delay={0}>
                    <Input
                      label="Please specify"
                      name="gender_other"
                      required
                      value={genderOther}
                      onChange={(e) => setGenderOther(e.target.value)}
                    />
                  </OnboardingField>
                )}

                {isUnsw && (
                  <OnboardingField delay={0.65}>
                    <div className="flex flex-col gap-2">
                      <span className="font-main text-sm text-muted-foreground">Memberships</span>
                      <MockYesNoToggle
                        label="I am a RAMSoc member"
                        value={isRamsocMember}
                        onChange={setIsRamsocMember}
                      />
                      <MockYesNoToggle
                        label="I am an Arc member"
                        value={isArcMember}
                        onChange={setIsArcMember}
                      />
                    </div>
                  </OnboardingField>
                )}

                <OnboardingField delay={0.7}>
                  <Select
                    label="How did you hear about us?"
                    name="heard_from"
                    options={HEARD_FROM_OPTIONS}
                    placeholder="Select an option"
                    required
                    value={heardFrom}
                    onChange={(e) => {
                      setHeardFrom(e.target.value);
                      if (e.target.value !== "other") setHeardFromOther("");
                    }}
                  />
                </OnboardingField>

                {heardFrom === "other" && (
                  <OnboardingField delay={0}>
                    <Input
                      label="Please specify"
                      name="heard_from_other"
                      required
                      value={heardFromOther}
                      onChange={(e) => setHeardFromOther(e.target.value)}
                    />
                  </OnboardingField>
                )}

                <OnboardingField delay={0.75}>
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    required
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

          {step === 3 && (
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
                    Create a team, join one with a code{!isStandard && ", or go it alone"}
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
                  {!isStandard && (
                    <motion.button
                      type="button"
                      onClick={() => setTeamMode("solo")}
                      className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-border bg-secondary p-5 text-foreground transition-colors hover:border-primary hover:bg-secondary/80"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-display text-lg">Go Solo</span>
                      <span className="text-sm text-muted-foreground">
                        Compete on your own in the Open division
                      </span>
                    </motion.button>
                  )}
                  <motion.button
                    type="button"
                    onClick={() => alert("Would mark onboarded and navigate to dashboard")}
                    className="font-main flex min-h-[80px] flex-col items-center justify-center rounded-xl border border-border bg-secondary p-5 text-foreground transition-colors hover:border-primary hover:bg-secondary/80"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-display text-lg">Decide Later</span>
                    <span className="text-sm text-muted-foreground">
                      Skip for now and set up your team from the dashboard
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
                      options={canJoinStandard ? CATEGORY_OPTIONS : CATEGORY_OPTIONS.filter((o) => o.value === "open")}
                      required
                      defaultValue={canJoinStandard ? (division ?? "standard") : "open"}
                    />
                    <p className="font-main text-xs text-muted-foreground">
                      {canJoinStandard ? (
                        <>
                          <b>Standard:</b> UNSW students only, 3–6 members.{" "}
                          <b>Open:</b> Any university or high school, 1–6 members.
                        </>
                      ) : (
                        <>
                          <b>Open:</b> Any university or high school, 1–6 members.
                          {isHighSchool
                            ? " High school students can only compete in the Open division."
                            : " Non-UNSW students can only compete in the Open division."}
                        </>
                      )}
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

              {teamMode === "solo" && !createdCode && (
                <div>
                  <button
                    type="button"
                    onClick={() => setTeamMode("choose")}
                    className="font-main mb-4 text-sm text-muted-foreground hover:text-foreground"
                  >
                    &larr; Back
                  </button>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCreatedCode("XK9M4R");
                    }}
                    className="flex flex-col gap-4"
                  >
                    <p className="font-main text-center text-sm text-muted-foreground">
                      Name your solo team. You&apos;ll compete in the Open division.
                    </p>
                    <Input
                      label="Team Name"
                      name="team_name"
                      required
                      placeholder="e.g. The Destroyers"
                    />
                    <div className="sticky bottom-4 mt-4 pt-4">
                      <Button type="submit" size="full">
                        Go Solo
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {teamMode === "solo" && createdCode && (
                <div className="flex flex-col items-center gap-6 text-center">
                  <div>
                    <h3 className="mb-2">You&apos;re all set!</h3>
                    <p className="text-muted-foreground">
                      Keep this code in case you want to add teammates later
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

// ── Dashboard helpers ─────────────────────────────────────

function PreviewCollapsibleSection({
  title,
  total,
  completedCount,
  children,
}: {
  title: string;
  total: number;
  completedCount: number;
  children: React.ReactNode;
}) {
  const allDone = completedCount === total;
  const [expanded, setExpanded] = useState(!allDone);

  return (
    <Card>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-base">{title}</h3>
          {allDone ? (
            <span className="font-main rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
              All {total} completed
            </span>
          ) : (
            <span className="font-main text-xs text-gray-500">
              {completedCount}/{total}
            </span>
          )}
        </div>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && <div className="mt-3 flex flex-col gap-2">{children}</div>}
    </Card>
  );
}

function PreviewActionItem({
  label,
  description,
  url,
  done,
}: {
  label: string;
  description?: string;
  url?: string;
  done: boolean;
}) {
  const expandable = !!(description || url);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-lg transition-colors ${done ? "bg-white/5" : "bg-white/5 hover:bg-white/10"}`}>
      <button
        onClick={() => expandable && setExpanded((v) => !v)}
        className={`font-main flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
          done ? "text-gray-500 line-through" : "text-white"
        }`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
            done
              ? "border-green-500/50 bg-green-500/20 text-green-400"
              : "border-white/20"
          }`}
        >
          {done ? "\u2713" : ""}
        </span>
        <span className="flex-1">{label}</span>
        {expandable && (
          <svg
            className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {expandable && expanded && (
        <div className="flex flex-col gap-2 px-4 pb-3 pl-12">
          {description && (
            <p className="font-main text-xs text-gray-400">{description}</p>
          )}
          <div className="flex items-center gap-2">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-main inline-flex items-center gap-1 text-xs text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Open link
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {!done && (
              <button className="font-main rounded-md bg-green-500/10 px-2.5 py-1 text-xs text-green-400 transition-colors hover:bg-green-500/20">
                Mark as completed
              </button>
            )}
          </div>
        </div>
      )}
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
                  <PreviewCollapsibleSection
                    title="Getting Started"
                    total={3}
                    completedCount={[hasTeamToggle, hasEnoughMembers, false].filter(Boolean).length}
                  >
                    <PreviewActionItem label="Create or join a team" done={hasTeamToggle} />
                    <PreviewActionItem label="Get at least 3 team members" done={hasEnoughMembers} />
                    <PreviewActionItem label="Pay the entry fee to activate your team" done={false} />
                  </PreviewCollapsibleSection>
                  <PreviewCollapsibleSection
                    title="Tasks"
                    total={2}
                    completedCount={1}
                  >
                    <PreviewActionItem
                      label="Complete the Lipo Battery Safety Quiz"
                      description="Most team members (over half) must score 100% on the Lipo Battery Safety Quiz to receive your battery kits."
                      url="https://docs.google.com/forms/example"
                      done={false}
                    />
                    <PreviewActionItem
                      label="Get Workshop Safety Badge"
                      description="All team members need a makerspace safety induction badge before Week 3 workshops."
                      done={true}
                    />
                  </PreviewCollapsibleSection>
                  <Card>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-lg text-indigo-400">
                        {socials.discord.icon(20)}
                      </span>
                      <div>
                        <p className="font-main text-sm text-gray-300">
                          All updates, announcements, and communications will be
                          through our Discord channel.
                        </p>
                        <Link
                          href={socials.discord.href}
                          target="_blank"
                          className="font-main mt-1 inline-block text-sm text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                          Join the Discord &rarr;
                        </Link>
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
  const baseCents = 5000;
  const totalCents = Math.ceil(baseCents / (1 - 0.022));
  const feeCents = totalCents - baseCents;
  const fmt = (c: number) => `$${(c / 100).toFixed(2)}`;

  return (
    <div>
      <SectionTitle>Payment</SectionTitle>
      <div className="mx-auto max-w-lg">
        <GlassPanel>
          <div className="flex flex-col gap-6">
            {/* Back link */}
            <button className="font-main inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to dashboard
            </button>

            {/* Title */}
            <div>
              <h2 className="font-display text-2xl text-white">Pay Entry Fee</h2>
              <p className="font-main mt-1 text-sm text-muted-foreground">RAMSoc Sumobots 2026</p>
            </div>

            {/* Order summary */}
            <div className="rounded-xl border border-border bg-secondary p-5">
              <h3 className="font-display mb-4 text-sm uppercase tracking-wider text-muted-foreground">Order Summary</h3>
              <div className="font-main text-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-white">1 &times; Standard Team Registration</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">Sumo Slammers &middot; 4 members</p>
                  </div>
                  <span className="shrink-0 text-white">{fmt(baseCents)}</span>
                </div>
                <div className="mt-4 space-y-1.5 border-t border-border pt-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{fmt(baseCents)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Processing fee (2.2%)</span>
                    <span>{fmt(feeCents)}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-border pt-2">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-display text-2xl text-white">{fmt(totalCents)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital wallet buttons (static mocks) */}
            <div className="flex flex-col gap-3">
              <button className="flex h-12 w-full items-center justify-center rounded-lg bg-black border border-border text-white text-sm font-medium">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple Pay
              </button>
              <button className="flex h-12 w-full items-center justify-center rounded-lg bg-white text-black text-sm font-medium">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google Pay
              </button>
              <button className="flex h-12 w-full items-center justify-center rounded-lg bg-[#b2fce4] text-black text-sm font-medium">
                Afterpay
              </button>

              <div className="font-main my-1 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                or pay with card
                <div className="h-px flex-1 bg-border" />
              </div>
            </div>

            {/* Card details (static mock) */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-main mb-2 block text-sm text-muted-foreground">Cardholder name</label>
                <input
                  type="text"
                  placeholder="Name on card"
                  defaultValue="Alice Zhang"
                  className="font-main w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="font-main mb-2 block text-sm text-muted-foreground">Card details</label>
                  <div className="flex h-[90px] items-center justify-center rounded-lg border border-input text-sm text-muted-foreground">
                    Square card widget renders here
                  </div>
                </div>

                <div>
                  <label className="font-main mb-2 block text-sm text-muted-foreground">Billing postcode</label>
                  <input
                    type="text"
                    placeholder="2000"
                    defaultValue="2052"
                    className="font-main w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                  />
                </div>

                <div>
                  <label className="font-main mb-2 block text-sm text-muted-foreground">Country</label>
                  <div className="font-main flex h-[42px] items-center rounded-lg border border-input bg-transparent px-3 text-sm text-muted-foreground">
                    Australia
                  </div>
                </div>
              </div>
            </div>

            {/* Pay button */}
            <Button size="full">
              Pay {fmt(totalCents)}
            </Button>

            {/* Trust footer */}
            <div className="font-main flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secured by Square
            </div>
          </div>
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

// ── Admin Tasks ──────────────────────────────────────

const mockTasks = [
  {
    id: "task1",
    title: "Complete the Lipo Battery Safety Quiz",
    description:
      "Most team members (over half) must score 100% on the Lipo Battery Safety Quiz to receive your battery kits.",
    url: "https://docs.google.com/forms/example",
    active: true,
    created_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "task2",
    title: "Get Workshop Safety Badge",
    description:
      "All team members need a makerspace safety induction badge before Week 3 workshops.",
    url: "",
    active: true,
    created_at: "2026-02-02T00:00:00Z",
  },
  {
    id: "task3",
    title: "Install Arduino IDE",
    description: "",
    url: "https://www.arduino.cc/en/software",
    active: false,
    created_at: "2026-01-15T00:00:00Z",
  },
];

function AdminTasksSection() {
  return (
    <div>
      <SectionTitle>Admin — Tasks</SectionTitle>
      <AdminShell>
        <h2 className="mb-4 text-xl">Tasks</h2>
        <TasksTable tasks={mockTasks} />
      </AdminShell>
    </div>
  );
}
