"use client";

import { cn } from "@/app/_utils/cn";
import { forwardRef } from "react";

type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="font-main text-sm text-gray-300">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "font-main min-h-[44px] rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none backdrop-blur-sm transition-colors",
            "placeholder:text-gray-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500",
            error && "border-red-500",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
