import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { JobApplication } from "@/lib/types";

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

/**
 * RFC 4180 compliant CSV export for job applications
 */
export function exportApplicationsToCsv(applications: JobApplication[]): void {
  const headers = [
    "ID",
    "Company",
    "Job Title",
    "Status",
    "Work Mode",
    "Location",
    "Salary Min",
    "Salary Max",
    "Salary Currency",
    "Salary Period",
    "Applied Date",
    "Next Interview",
    "Interview Stage",
    "Required Skills",
    "Matched Skills",
    "Notes",
    "Job URL",
  ];

  const escapeCsv = (val: unknown): string => {
    if (val === null || val === undefined) return "";
    const str = String(val);
    if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = applications.map((app) => [
    app.id,
    app.companyName,
    app.jobTitle,
    app.status,
    app.workMode,
    app.location,
    app.salaryMin ?? "",
    app.salaryMax ?? "",
    app.salaryCurrency ?? "BDT",
    app.salaryPeriod ?? "month",
    app.appliedAt ?? "",
    app.nextInterviewAt ?? "",
    app.interviewStage ?? "",
    app.requiredSkills?.join("; ") ?? "",
    app.matchedSkills?.join("; ") ?? "",
    app.notes ?? "",
    app.jobUrl ?? "",
  ]);

  const csvContent =
    [headers.map(escapeCsv).join(","), ...rows.map((r) => r.map(escapeCsv).join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `applydock-applications-${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
