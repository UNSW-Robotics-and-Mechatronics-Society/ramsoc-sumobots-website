import { getAllProfiles } from "@/app/2026/admin/_actions/individuals";
import AdminShell from "../_components/AdminShell";
import IndividualsTable from "../_components/IndividualsTable";

export default async function AdminIndividualsPage() {
  const profiles = await getAllProfiles();

  return (
    <AdminShell>
      <h2 className="mb-4 text-xl">Individuals</h2>
      <IndividualsTable profiles={profiles} />
    </AdminShell>
  );
}
