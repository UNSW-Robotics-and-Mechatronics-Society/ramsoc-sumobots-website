import { getAllTeams } from "@/app/2026/admin/_actions/teams";
import AdminShell from "../_components/AdminShell";
import TeamsTable from "../_components/TeamsTable";

export default async function AdminTeamsPage() {
  const teams = await getAllTeams();

  return (
    <AdminShell>
      <h2 className="mb-4 text-xl">Teams</h2>
      <TeamsTable teams={teams} />
    </AdminShell>
  );
}
