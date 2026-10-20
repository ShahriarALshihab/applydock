import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency with unobtrusive symbol (defaults to ৳)
 * Example: 140000 -> "৳140,000"
 */
export function formatCurrency(amount: number, symbol = "৳"): string {
  if (isNaN(amount)) return `${symbol}0`;
  return `${symbol}${new Intl.NumberFormat("en-US").format(amount)}`;
}

export const formatBDT = formatCurrency; // backward compatibility

/**
 * Format salary range cleanly with compact notation
 * Example: min: 140000, max: 180000 -> "৳140,000 - ৳180,000 /mo"
 */
export function formatSalaryRange(
  min?: number,
  max?: number,
  currency = "৳",
  period: "month" | "year" = "month"
): string {
  const periodLabel = period === "month" ? "/mo" : "/yr";
  const sym = currency === "BDT" ? "৳" : currency;
  if (min && max) {
    return `${sym}${new Intl.NumberFormat("en-US").format(min)} - ${sym}${new Intl.NumberFormat("en-US").format(max)} ${periodLabel}`;
  }
  if (min) {
    return `From ${sym}${new Intl.NumberFormat("en-US").format(min)} ${periodLabel}`;
  }
  if (max) {
    return `Up to ${sym}${new Intl.NumberFormat("en-US").format(max)} ${periodLabel}`;
  }
  return "Compensation unspecified";
}

export function formatDate(date: Date | string | number | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function formatRelativeTime(
  date: Date | string | null | undefined,
  baseDate?: Date
): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const now = baseDate ?? new Date("2026-10-20T00:00:00Z");
  const diffInMs = d.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) {
    const pastDays = Math.abs(diffInDays);
    return pastDays === 1 ? "1 day ago" : `${pastDays} days ago`;
  }
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Tomorrow";
  return `In ${diffInDays} days`;
}
