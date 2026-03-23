import GlassPanel from "@/app/2026/_components/ui/GlassPanel";
import AdminLoginForm from "./_components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <GlassPanel>
          <h1 className="mb-6 text-center text-2xl">Admin Login</h1>
          <AdminLoginForm />
        </GlassPanel>
      </div>
    </div>
  );
}
