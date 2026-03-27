import { cn } from "@/app/_utils/cn";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
