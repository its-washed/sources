"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

interface SidebarProps {
  items: SidebarItem[];
  activePath?: string;
  className?: string;
}

export function Sidebar({ items, activePath, className = "" }: SidebarProps) {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname;
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => child.href === currentPath);
        if (hasActiveChild) {
          initial[item.label] = true;
        }
      }
    });
    return initial;
  });

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => currentPath === href;

  return (
    <aside className={`flex h-full w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar-bg ${className}`}>
      <nav className="flex flex-col gap-1 overflow-y-auto p-3">
        {items.map((item) => {
          if (item.children) {
            const isExpanded = expandedGroups[item.label];
            const hasActiveChild = item.children.some((child) => isActive(child.href));

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    hasActiveChild
                      ? "text-sidebar-active"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <span className={hasActiveChild ? "text-primary" : "text-muted-foreground"}>
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                  )}
                </button>

                <div
                  className="overflow-hidden transition-all duration-200 ease-in-out"
                  style={{
                    maxHeight: isExpanded ? `${item.children.length * 36}px` : "0px",
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="ml-4 flex flex-col gap-0.5 border-l border-sidebar-border py-1 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                          isActive(child.href)
                            ? "border-l-2 border-sidebar-active bg-sidebar-active/10 font-medium text-sidebar-active"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "border-l-2 border-sidebar-active bg-sidebar-active/10 text-sidebar-active"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <span className={isActive(item.href) ? "text-primary" : "text-muted-foreground"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
