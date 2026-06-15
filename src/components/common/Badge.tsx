import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "category" | "breaking" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const styles = {
    default: "bg-secondary text-secondary-foreground",
    category: "bg-primary text-primary-foreground",
    breaking: "bg-breaking text-breaking-foreground animate-pulse",
    outline: "border border-border text-foreground",
  }[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        styles,
        className,
      )}
    >
      {children}
    </span>
  );
}
