import { getAdminAppConfig } from "@/app/2026/admin/_actions/config";
import AdminShell from "../_components/AdminShell";
import SettingsPanel from "../_components/SettingsPanel";

export default async function AdminSettingsPage() {
  const config = await getAdminAppConfig();

  return (
    <AdminShell>
      <h2 className="mb-4 text-xl">Settings</h2>
      <SettingsPanel config={config} />
    </AdminShell>
  );
}
