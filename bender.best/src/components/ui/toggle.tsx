"use client";

import { useState } from "react";

interface ToggleProps {
  label: string;
  defaultChecked?: boolean;
  className?: string;
}

export function Toggle({ label, defaultChecked = false, className = "" }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <label className={`flex cursor-pointer items-center gap-3 ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="sr-only"
        />
        <div
          className={`h-6 w-11 rounded-full transition-colors ${
            checked ? "bg-primary" : "bg-muted"
          }`}
        />
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </label>
  );
}
