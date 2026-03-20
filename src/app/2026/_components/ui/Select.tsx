"use client";

import { cn } from "@/app/_utils/cn";
import { forwardRef } from "react";

type SelectProps = {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="font-main text-sm text-gray-300">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "font-main min-h-[44px] rounded-lg border border-gray-700 bg-gray-900 px-3 py-2.5 text-sm text-white outline-none transition-colors",
            "focus:border-rose-500 focus:ring-1 focus:ring-rose-500",
            error && "border-red-500",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select;
