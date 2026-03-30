"use client";

import { useState, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type {
  Profile,
  TeamWithMembers,
  TeamBrowseItem,
} from "@/app/_types/registration";
import type { UserTask } from "@/app/2026/_actions/tasks";
import Link from "next/link";
import Card from "@/app/2026/_components/ui/Card";
import Badge from "@/app/2026/_components/ui/Badge";
import socials from "@/app/2026/_data/socials";
import { completeTask } from "@/app/2026/_actions/tasks";
import TeamCard from "./TeamCard";
import MemberList from "./MemberList";
import JoinCodeDisplay from "./JoinCodeDisplay";
import NoTeamState from "./NoTeamState";
import LeaveTeamButton from "./LeaveTeamButton";
import ProfileTab from "./ProfileTab";
import { MEMBER_LIMITS } from "@/app/2026/_data/teamConfig";

type Tab = "home" | "team" | "profile";

const TAB_LABELS: Record<Tab, string> = {
  home: "Home",
  team: "Team",
  profile: "Profile",
};

function ActionItem({
  label,
  description,
  done,
  onClick,
}: {
  label: string;
  description?: string;
  done: boolean;
  onClick?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg transition-colors ${
        done ? "bg-white/5" : "bg-white/5 hover:bg-white/10"
      }`}
    >
      <button
        onClick={onClick}
        disabled={done}
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
        {description && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                setExpanded((v) => !v);
              }
            }}
            className="shrink-0 text-gray-500 transition-transform hover:text-gray-300"
          >
            <svg
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        )}
      </button>
      {description && expanded && (
        <p className="font-main px-4 pb-3 pl-12 text-xs text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}

function TabIcon({ tab, active }: { tab: Tab; active: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={active ? 2.5 : 1.5}
    >
      {tab === "home" && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
        />
      )}
      {tab === "team" && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      )}
      {tab === "profile" && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      )}
    </svg>
  );
}

export function BottomTabBar({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg justify-around">
        {(["home", "team", "profile"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
              tab === t
                ? "text-rose-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <TabIcon tab={t} active={tab === t} />
            <span className="font-main text-xs">{TAB_LABELS[t]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DashboardContent({
  profile,
  team,
  browsableTeams,
  adminTasks = [],
}: {
  profile: Profile;
  team: TeamWithMembers | null;
  browsableTeams: TeamBrowseItem[];
  adminTasks?: UserTask[];
}) {
  const [tab, setTab] = useState<Tab>("home");
  const [mounted, setMounted] = useState(false);
  const [isPendingTask, startTaskTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleCompleteTask(taskId: string) {
    startTaskTransition(async () => {
      await completeTask(taskId);
      router.refresh();
    });
  }

  const isCaptain =
    team?.members.some(
      (m) => m.profile_id === profile.id && m.role === "captain",
    ) ?? false;

  const hasTeam = !!team;
  const minMembers = team ? MEMBER_LIMITS[team.category].min : 3;
  const hasEnoughMembers = (team?.members.length ?? 0) >= minMembers;
  const isPaid = team?.paid ?? false;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ── Home Tab ── */}
          {tab === "home" && (
            <div className="flex flex-col gap-5">
              <Card>
                <h3 className="mb-1">
                  Welcome, {profile.full_name.split(" ")[0]}
                </h3>
                <p className="font-main text-sm text-gray-400">
                  {hasTeam && isPaid
                    ? "You're all set for the competition!"
                    : "Here's what you need to do to get ready."}
                </p>
              </Card>

              <Card>
                <h3 className="mb-3 text-base">Getting Started</h3>
                <div className="flex flex-col gap-2">
                  <ActionItem
                    label="Create or join a team"
                    done={hasTeam}
                    onClick={() => !hasTeam && setTab("team")}
                  />
                  <ActionItem
                    label={`Get at least ${minMembers} team member${minMembers !== 1 ? "s" : ""}`}
                    done={hasEnoughMembers}
                    onClick={() =>
                      hasTeam && !hasEnoughMembers && setTab("team")
                    }
                  />
                  <ActionItem
                    label="Pay the entry fee to activate your team"
                    done={isPaid}
                    onClick={() =>
                      hasTeam && hasEnoughMembers && !isPaid && setTab("team")
                    }
                  />
                </div>
              </Card>

              {adminTasks.length > 0 && (
                <Card>
                  <h3 className="mb-3 text-base">Tasks</h3>
                  <div className="flex flex-col gap-2">
                    {adminTasks.map((task) => (
                      <ActionItem
                        key={task.id}
                        label={task.title}
                        description={task.description || undefined}
                        done={task.completed}
                        onClick={() => {
                          if (!task.completed && task.url) {
                            window.open(task.url, "_blank");
                          }
                          if (!task.completed) {
                            handleCompleteTask(task.id);
                          }
                        }}
                      />
                    ))}
                  </div>
                </Card>
              )}

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

              {hasTeam && (
                <Card>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-main text-xs text-gray-500">
                        Your team
                      </p>
                      <h3 className="truncate text-base">{team.name}</h3>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant={isPaid ? "success" : "warning"}>
                        {isPaid ? "Active" : "Not Active"}
                      </Badge>
                      <span className="font-main text-sm text-gray-400">
                        {team.members.length}/6
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setTab("team")}
                    className="font-main mt-3 text-sm text-rose-400 transition-colors hover:text-rose-300"
                  >
                    View team details &rarr;
                  </button>
                </Card>
              )}
            </div>
          )}

          {/* ── Team Tab ── */}
          {tab === "team" && (
            <div className="flex flex-col gap-5">
              {team ? (
                <>
                  <TeamCard team={team} isCaptain={isCaptain} />
                  <JoinCodeDisplay code={team.join_code} />
                  <MemberList
                    members={team.members}
                    isCaptain={isCaptain}
                    currentProfileId={profile.id}
                  />
                  <LeaveTeamButton />
                </>
              ) : (
                <NoTeamState teams={browsableTeams} />
              )}
            </div>
          )}

          {/* ── Profile Tab ── */}
          {tab === "profile" && <ProfileTab profile={profile} />}
        </motion.div>
      </AnimatePresence>

      {mounted && createPortal(<BottomTabBar tab={tab} setTab={setTab} />, document.body)}
    </>
  );
}
