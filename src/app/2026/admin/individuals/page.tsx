import { getAllProfiles } from "@/app/2026/admin/_actions/individuals";
import { getAllTeams } from "@/app/2026/admin/_actions/teams";
import AdminShell from "../_components/AdminShell";
import IndividualsTable from "../_components/IndividualsTable";

export default async function AdminIndividualsPage() {
  const [profiles, teams] = await Promise.all([getAllProfiles(), getAllTeams()]);

  return (
    <AdminShell>
      <h2 className="mb-4 text-xl">Individuals</h2>
      <IndividualsTable profiles={profiles} teams={teams} />
    </AdminShell>
  );
}
