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
        "rounded-xl border border-gray-800 bg-gray-900/50 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
