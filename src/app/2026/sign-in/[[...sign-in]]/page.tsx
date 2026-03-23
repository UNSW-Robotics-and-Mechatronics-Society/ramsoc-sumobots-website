import { SignIn } from "@clerk/nextjs";
import GlassPanel from "@/app/2026/_components/ui/GlassPanel";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <GlassPanel>
        <SignIn />
      </GlassPanel>
    </div>
  );
}
