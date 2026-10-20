import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export function Logo({ className, size = "md", showWordmark = true }: LogoProps) {
  const iconContainerSizes = {
    sm: "h-7 w-7 rounded-lg",
    md: "h-8 w-8 rounded-lg",
    lg: "h-10 w-10 rounded-xl",
  };

  const svgSizes = {
    sm: "h-4 w-4",
    md: "h-4.5 w-4.5",
    lg: "h-5.5 w-5.5",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base sm:text-lg",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      aria-label="ApplyDock homepage"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg transition-transform active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-slate-600 shrink-0 select-none",
        className
      )}
    >
      {/* Brand Icon Mark */}
      <div
        className={cn(
          "flex items-center justify-center bg-slate-900 text-white shadow-xs transition-colors dark:bg-white dark:text-slate-950 border border-slate-800/10 dark:border-white/10 shrink-0",
          iconContainerSizes[size]
        )}
      >
        <svg
          className={svgSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Dock Canvas */}
          <rect x="3" y="3" width="18" height="18" rx="4" />
          {/* Pipeline Horizontal Lane */}
          <path d="M3 9.5h18" strokeWidth="1.8" />
          {/* Pipeline Vertical Stage */}
          <path d="M9.5 21V9.5" strokeWidth="1.8" />
          {/* Target Success Checkmark */}
          <path
            d="m13 15 2.2 2.2 4.3-4.4"
            className="stroke-emerald-400 dark:stroke-emerald-600"
            strokeWidth="2.4"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showWordmark && (
        <span
          className={cn(
            "font-display tracking-tight text-slate-900 transition-colors dark:text-white font-bold leading-none",
            textSizes[size]
          )}
        >
          Apply<span className="text-slate-500 dark:text-slate-400 font-normal">Dock</span>
        </span>
      )}
    </Link>
  );
}
