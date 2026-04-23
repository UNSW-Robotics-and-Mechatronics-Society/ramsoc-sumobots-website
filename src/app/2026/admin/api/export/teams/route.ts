import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import type { Profile } from "@/app/_types/registration";

function escapeCell(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCSV(headers: string[], rows: unknown[][]): string {
  return [headers, ...rows]
    .map((row) => row.map(escapeCell).join(","))
    .join("\n");
}

type MemberRow = {
  id: string;
  team_id: string;
  profile_id: string;
  role: "captain" | "member";
  joined_at: string;
  profile: Profile;
};

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabase = getSupabaseSecretClient();

  const { data: teams } = await supabase
    .from("teams")
    .select("*, team_members(id, team_id, profile_id, role, joined_at, profile:profiles(*))")
    .eq("competition_year", 2026)
    .order("created_at", { ascending: false });

  if (!teams) {
    return new NextResponse("Failed to fetch data", { status: 500 });
  }

  const headers = [
    "id",
    "name",
    "category",
    "join_code",
    "paid",
    "member_count",
    "captain_name",
    "captain_email",
    "captain_zid",
    "member_names",
    "member_emails",
    "created_at",
    "updated_at",
  ];

  const rows = teams.map((t) => {
    const members: MemberRow[] = Array.isArray(t.team_members)
      ? (t.team_members as MemberRow[])
      : [];
    const captain = members.find((m) => m.role === "captain");
    const memberNames = members.map((m) => m.profile.full_name).join("; ");
    const memberEmails = members.map((m) => m.profile.email).join("; ");

    return [
      t.id,
      t.name,
      t.category,
      t.join_code,
      t.paid,
      members.length,
      captain?.profile.full_name ?? "",
      captain?.profile.email ?? "",
      captain?.profile.zid ?? "",
      memberNames,
      memberEmails,
      t.created_at,
      t.updated_at,
    ];
  });

  const csv = toCSV(headers, rows);
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="teams-${date}.csv"`,
    },
  });
}
