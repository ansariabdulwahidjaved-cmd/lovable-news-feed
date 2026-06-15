import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
    secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
    outline: "border border-border bg-transparent text-foreground hover:bg-secondary",
    ghost: "bg-transparent text-foreground hover:bg-secondary",
  }[variant];
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  }[size];
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variants,
        sizes,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
