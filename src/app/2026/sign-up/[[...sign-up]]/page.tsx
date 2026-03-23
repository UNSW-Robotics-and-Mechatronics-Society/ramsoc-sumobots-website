import { SignUp } from "@clerk/nextjs";
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <GlassPanel className="w-full max-w-md">
        <SignUp />
      </GlassPanel>
    </div>
  );
}
