import Card from "@/app/2026/_components/ui/Card";
import AdminLoginForm from "./_components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <h1 className="mb-6 text-center text-2xl">Admin Login</h1>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
