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
    sm: "h-8 w-8 rounded-lg",
    md: "h-9.5 w-9.5 rounded-xl",
    lg: "h-12 w-12 rounded-2xl",
  };

  const svgSizes = {
    sm: "h-4.5 w-4.5",
    md: "h-5.5 w-5.5",
    lg: "h-7 w-7",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  };

  return (
    <Link
      href="/"
      aria-label="ApplyDock homepage"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-transform active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 rounded-xl shrink-0 select-none",
        className
      )}
    >
      {/* Brand Icon Mark */}
      <div
        className={cn(
          "relative flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-sm shadow-emerald-950/20 ring-1 ring-slate-800/80 dark:from-white dark:to-slate-100 dark:text-slate-950 dark:ring-white/20 dark:shadow-emerald-500/10 transition-all duration-200 group-hover:scale-105 group-hover:shadow-emerald-500/25 shrink-0",
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
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
          {/* Pipeline Horizontal Lane */}
          <path d="M2.5 8.5h19" strokeWidth="1.8" />
          {/* Pipeline Vertical Stage */}
          <path d="M9 21.5V8.5" strokeWidth="1.8" />
          {/* Target Success Checkmark */}
          <path
            d="m12.5 15 2.2 2.2 4.3-4.5"
            className="stroke-emerald-400 dark:stroke-emerald-600"
            strokeWidth="2.6"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showWordmark && (
        <span
          className={cn(
            "font-sans tracking-tight font-extrabold text-slate-950 dark:text-white flex items-center leading-none",
            textSizes[size]
          )}
        >
          <span>Apply</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-[1px]">Dock</span>
          <span
            className={cn(
              "inline-block rounded-full bg-emerald-500 animate-pulse ml-1 self-center",
              dotSizes[size]
            )}
            aria-hidden="true"
          />
        </span>
      )}
    </Link>
  );
}
