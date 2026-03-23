"use client";

import { cn } from "@/app/_utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "font-main inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-rose-600 text-white hover:bg-rose-700",
        secondary:
          "border border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10",
        ghost: "text-gray-300 hover:bg-gray-800 hover:text-white",
      },
      size: {
        default: "px-5 py-2.5",
        lg: "px-8 py-3 text-base",
        full: "w-full px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export { Button, buttonVariants };
