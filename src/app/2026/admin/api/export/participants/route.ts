import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";

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

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const supabase = getSupabaseSecretClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*, team_members(team_id, role, team:teams(name, paid))")
    .order("created_at", { ascending: false });

  if (!profiles) {
    return new NextResponse("Failed to fetch data", { status: 500 });
  }

  const headers = [
    "id",
    "full_name",
    "email",
    "phone",
    "user_type",
    "zid",
    "uni_id",
    "university",
    "high_school",
    "year_of_study",
    "degree_stage",
    "undergrad_postgrad",
    "domestic_international",
    "degree",
    "majors",
    "faculty",
    "gender",
    "gender_other",
    "is_ramsoc_member",
    "is_arc_member",
    "heard_from",
    "heard_from_other",
    "onboarded",
    "team_name",
    "team_id",
    "team_role",
    "team_paid",
    "created_at",
    "updated_at",
  ];

  const rows = profiles.map((p) => {
    const membership = Array.isArray(p.team_members)
      ? p.team_members[0]
      : p.team_members;
    const team = membership?.team as
      | { name: string; paid: boolean }
      | undefined;
    return [
      p.id,
      p.full_name,
      p.email,
      p.phone,
      p.user_type,
      p.zid,
      p.uni_id,
      p.university,
      p.high_school,
      p.year_of_study,
      p.degree_stage,
      p.undergrad_postgrad,
      p.domestic_international,
      p.degree,
      p.majors,
      p.faculty,
      p.gender,
      p.gender_other,
      p.is_ramsoc_member,
      p.is_arc_member,
      p.heard_from,
      p.heard_from_other,
      p.onboarded,
      team?.name ?? "",
      membership?.team_id ?? "",
      membership?.role ?? "",
      team?.paid ?? "",
      p.created_at,
      p.updated_at,
    ];
  });

  const csv = toCSV(headers, rows);
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="participants-${date}.csv"`,
    },
  });
}
