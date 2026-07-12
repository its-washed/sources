"use client";

import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "destructive" | "muted" | "outline" | "secondary";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary/20 text-primary-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-yellow-300",
  destructive: "bg-destructive/15 text-destructive",
  muted: "bg-muted text-muted-foreground",
  outline: "border border-border bg-transparent text-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
