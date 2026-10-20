import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export function Logo({ className, size = "md", showWordmark = true }: LogoProps) {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const svgSizes = {
    sm: "h-4 w-4",
    md: "h-4.5 w-4.5",
    lg: "h-5 w-5",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      aria-label="ApplyDock homepage"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-slate-600",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs transition-colors dark:bg-white dark:text-slate-950",
          iconSizes[size]
        )}
      >
        <svg
          className={svgSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Dock / Workspace Card Symbol */}
          <rect width="18" height="14" x="3" y="3" rx="3" />
          <path d="M7 21h10" />
          <path d="M12 17v4" />
          <path d="m8.5 10 2.5 2.5 4.5-4.5" />
        </svg>
      </div>

      {showWordmark && (
        <span
          className={cn(
            "font-display tracking-tight text-slate-950 transition-colors dark:text-white font-bold",
            textSizes[size]
          )}
        >
          Apply<span className="text-slate-500 dark:text-slate-400 font-normal">Dock</span>
        </span>
      )}
    </Link>
  );
}
