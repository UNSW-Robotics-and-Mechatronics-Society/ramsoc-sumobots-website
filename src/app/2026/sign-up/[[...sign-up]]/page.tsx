import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <SignUp />
      </div>
    </div>
  );
}
