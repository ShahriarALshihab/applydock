import { JobApplication } from "@/lib/types";
import { formatBDT } from "@/lib/utils";
import { Briefcase, Calendar, CheckCircle2, TrendingUp } from "lucide-react";

interface MetricsStripProps {
  applications: JobApplication[];
}

export function MetricsStrip({ applications }: MetricsStripProps) {
  const activeCount = applications.filter(
    (app) => app.status !== "rejected" && app.status !== "withdrawn"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "interview" || app.status === "screening"
  ).length;

  const offerCount = applications.filter((app) => app.status === "offer").length;

  // Calculate interview conversion rate
  const appliedCount = applications.filter((app) => app.status !== "wishlist").length;
  const responseRate = appliedCount > 0 ? Math.round(((interviewCount + offerCount) / appliedCount) * 100) : 0;

  // Calculate average target salary in BDT
  const salaries = applications
    .filter((app) => app.salaryMin)
    .map((app) => app.salaryMin as number);
  const avgSalary = salaries.length > 0 ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length) : 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {/* Active Pipeline */}
      <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          <Briefcase className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Pipeline
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{activeCount}</span>
            <span className="text-xs text-slate-500">jobs</span>
          </div>
        </div>
      </div>

      {/* Response / Interview Rate */}
      <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Interview Rate
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{responseRate}%</span>
            <span className="text-xs text-slate-500">conversion</span>
          </div>
        </div>
      </div>

      {/* Interviews Scheduled */}
      <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Interviews
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{interviewCount}</span>
            <span className="text-xs text-slate-500">rounds</span>
          </div>
        </div>
      </div>

      {/* Average BDT Target */}
      <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Average Target
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              {formatBDT(avgSalary)}
            </span>
            <span className="text-2xs text-slate-500">/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
