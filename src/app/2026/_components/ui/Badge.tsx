import { cn } from "@/app/_utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "font-main inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-gray-300",
        success: "bg-emerald-900/50 text-emerald-400",
        warning: "bg-amber-900/50 text-amber-400",
        info: "bg-blue-900/50 text-blue-400",
        captain: "bg-rose-900/50 text-rose-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof badgeVariants>;

export default function Badge({ children, className, variant }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))}>{children}</span>
  );
}
