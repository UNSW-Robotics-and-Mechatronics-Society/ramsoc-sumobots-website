"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import Input from "@/app/2026/_components/ui/Input";
import type {
  AdminTeamRow,
  TeamWithMembers,
} from "@/app/_types/registration";
import {
  getTeamDetail,
  updateTeamPaid,
  updateTeamName,
  transferCaptain,
  adminRemoveMember,
  adminDeleteTeam,
} from "@/app/2026/admin/_actions/teams";

export default function TeamsTable({ teams }: { teams: AdminTeamRow[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [paidFilter, setPaidFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<TeamWithMembers | null>(null);
  const [isPending, startTransition] = useTransition();
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const router = useRouter();

  const filtered = teams.filter((t) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false;
    if (paidFilter !== "all") {
      if (paidFilter === "paid" && !t.paid) return false;
      if (paidFilter === "unpaid" && t.paid) return false;
    }
    return true;
  });

  function toggleExpand(teamId: string) {
    if (expandedId === teamId) {
      setExpandedId(null);
      setDetail(null);
      setConfirmAction(null);
      setEditingName(null);
      return;
    }
    setExpandedId(teamId);
    setConfirmAction(null);
    setEditingName(null);
    startTransition(async () => {
      const data = await getTeamDetail(teamId);
      setDetail(data);
    });
  }

  function handleAction(action: () => Promise<unknown>) {
    startTransition(async () => {
      await action();
      setConfirmAction(null);
      setEditingName(null);
      router.refresh();
      if (expandedId) {
        const data = await getTeamDetail(expandedId);
        setDetail(data);
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-main min-h-[40px] rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-rose-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="font-main min-h-[40px] rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-2 text-sm text-white outline-none focus:border-rose-500"
        >
          <option value="all">All Categories</option>
          <option value="standard">Standard</option>
          <option value="open">Open</option>
        </select>
        <select
          value={paidFilter}
          onChange={(e) => setPaidFilter(e.target.value)}
          className="font-main min-h-[40px] rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-2 text-sm text-white outline-none focus:border-rose-500"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      <div className="font-main text-sm text-gray-400">
        {filtered.length} team{filtered.length !== 1 ? "s" : ""}
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Team Name
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Category
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Paid
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Members
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Join Code
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((team) => (
              <>
                <tr
                  key={team.id}
                  onClick={() => toggleExpand(team.id)}
                  className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="font-main px-4 py-3 text-sm text-white">
                    {team.name}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={team.category === "open" ? "info" : "default"}
                    >
                      {team.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={team.paid ? "success" : "warning"}>
                      {team.paid ? "Paid" : "Unpaid"}
                    </Badge>
                  </td>
                  <td className="font-main px-4 py-3 text-sm text-gray-300">
                    {team.member_count}/6
                  </td>
                  <td className="font-main px-4 py-3 font-mono text-sm text-gray-400">
                    {team.join_code}
                  </td>
                </tr>
                {expandedId === team.id && (
                  <tr key={`${team.id}-detail`}>
                    <td colSpan={5} className="bg-white/5 px-4 py-4">
                      {isPending && !detail ? (
                        <p className="font-main text-sm text-gray-400">
                          Loading...
                        </p>
                      ) : detail ? (
                        <div className="flex flex-col gap-4">
                          {/* Member list */}
                          <div>
                            <h4 className="font-main mb-2 text-sm font-medium text-gray-300">
                              Members
                            </h4>
                            <div className="flex flex-col gap-2">
                              {detail.members.map((m) => (
                                <div
                                  key={m.id}
                                  className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                                >
                                  <div className="flex items-center gap-3">
                                    <div>
                                      <p className="font-main text-sm text-white">
                                        {m.profile.full_name}
                                      </p>
                                      <p className="font-main text-xs text-gray-400">
                                        {m.profile.email} &middot;{" "}
                                        {m.profile.university}
                                        {m.profile.zid && ` · ${m.profile.zid}`}
                                      </p>
                                    </div>
                                    {m.role === "captain" && (
                                      <Badge variant="captain">Captain</Badge>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    {m.role !== "captain" && (
                                      <Button
                                        variant="ghost"
                                        size="default"
                                        className="text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (
                                            confirmAction ===
                                            `captain-${m.profile_id}`
                                          ) {
                                            handleAction(() =>
                                              transferCaptain(
                                                team.id,
                                                m.profile_id,
                                              ),
                                            );
                                          } else {
                                            setConfirmAction(
                                              `captain-${m.profile_id}`,
                                            );
                                          }
                                        }}
                                      >
                                        {confirmAction ===
                                        `captain-${m.profile_id}`
                                          ? "Confirm?"
                                          : "Make Captain"}
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="default"
                                      className="text-xs text-red-400"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                          confirmAction ===
                                          `remove-${m.profile_id}`
                                        ) {
                                          handleAction(() =>
                                            adminRemoveMember(
                                              team.id,
                                              m.profile_id,
                                            ),
                                          );
                                        } else {
                                          setConfirmAction(
                                            `remove-${m.profile_id}`,
                                          );
                                        }
                                      }}
                                    >
                                      {confirmAction ===
                                      `remove-${m.profile_id}`
                                        ? "Confirm?"
                                        : "Remove"}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Team actions */}
                          <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                            <Button
                              variant="secondary"
                              size="default"
                              className="text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(() =>
                                  updateTeamPaid(team.id, !team.paid),
                                );
                              }}
                              disabled={isPending}
                            >
                              {team.paid ? "Mark Unpaid" : "Mark Paid"}
                            </Button>

                            {editingName === team.id ? (
                              <div className="flex items-end gap-2">
                                <Input
                                  label=""
                                  value={newName}
                                  onChange={(e) => setNewName(e.target.value)}
                                  className="min-h-[36px] w-48 py-1.5"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <Button
                                  variant="secondary"
                                  size="default"
                                  className="text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAction(() =>
                                      updateTeamName(team.id, newName),
                                    );
                                  }}
                                  disabled={isPending}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="default"
                                  className="text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingName(null);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="secondary"
                                size="default"
                                className="text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingName(team.id);
                                  setNewName(team.name);
                                }}
                              >
                                Edit Name
                              </Button>
                            )}

                            <Button
                              variant="ghost"
                              size="default"
                              className="text-xs text-red-400"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirmAction === `delete-${team.id}`) {
                                  handleAction(() =>
                                    adminDeleteTeam(team.id),
                                  );
                                } else {
                                  setConfirmAction(`delete-${team.id}`);
                                }
                              }}
                              disabled={isPending}
                            >
                              {confirmAction === `delete-${team.id}`
                                ? "Confirm Delete?"
                                : "Delete Team"}
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
