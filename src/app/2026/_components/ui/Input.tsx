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
        <label htmlFor={inputId} className="font-main text-sm text-muted-foreground">
          {label}{props.required && <span className="text-destructive"> *</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "font-main min-h-[44px] rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition-colors",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
            error && "border-destructive ring-1 ring-destructive/20",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
