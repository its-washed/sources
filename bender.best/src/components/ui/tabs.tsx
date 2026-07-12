"use client";

import { useState, ReactNode } from "react";

interface TabsProps {
  tabs: { label: string; value: string }[];
  defaultTab?: string;
  children: (activeTab: string) => ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTab, children, className = "" }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.value || "");

  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              active === tab.value
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{children(active)}</div>
    </div>
  );
}
