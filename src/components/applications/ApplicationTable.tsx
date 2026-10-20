import { JobApplication } from "@/lib/types";
import { formatSalaryRange, formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Calendar, Clock, ChevronRight } from "lucide-react";

interface ApplicationTableProps {
  applications: JobApplication[];
  onSelectApplication: (app: JobApplication) => void;
  selectedId?: string;
}

export function ApplicationTable({
  applications,
  onSelectApplication,
  selectedId,
}: ApplicationTableProps) {
  const getBadgeVariant = (status: JobApplication["status"]) => {
    switch (status) {
      case "wishlist":
        return "wishlist";
      case "applied":
        return "applied";
      case "screening":
      case "interview":
        return "interview";
      case "offer":
        return "offer";
      case "rejected":
        return "rejected";
      case "withdrawn":
        return "withdrawn";
      default:
        return "default";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200/90 bg-slate-50/80 text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
            <tr>
              <th className="py-3 pl-4 pr-3 sm:pl-6">Company & Role</th>
              <th className="px-3 py-3">Stage</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">Compensation</th>
              <th className="px-3 py-3">Upcoming Date</th>
              <th className="px-3 py-3 text-center">Skill Fit</th>
              <th className="py-3 pl-3 pr-4 text-right sm:pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400">
                  No applications match your filter criteria.
                </td>
              </tr>
            ) : (
              applications.map((app) => {
                const isSelected = app.id === selectedId;
                const totalSkills = app.requiredSkills.length;
                const matchedCount = app.matchedSkills.length;
                const matchPct = totalSkills > 0 ? Math.round((matchedCount / totalSkills) * 100) : 100;

                return (
                  <tr
                    key={app.id}
                    onClick={() => onSelectApplication(app)}
                    className={`cursor-pointer transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 ${
                      isSelected ? "bg-indigo-50/50 dark:bg-indigo-950/30" : ""
                    }`}
                  >
                    {/* Company & Role */}
                    <td className="py-3.5 pl-4 pr-3 sm:pl-6">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {app.jobTitle}
                      </div>
                      <div className="text-2xs text-slate-500 font-medium">
                        {app.companyName}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <Badge variant={getBadgeVariant(app.status)} className="capitalize font-semibold">
                        {app.status}
                      </Badge>
                    </td>

                    {/* Location */}
                    <td className="px-3 py-3.5 whitespace-nowrap text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span>{app.location}</span>
                        <span className="text-2xs text-slate-400">({app.workMode})</span>
                      </div>
                    </td>

                    {/* Compensation in BDT */}
                    <td className="px-3 py-3.5 whitespace-nowrap font-medium text-slate-900 dark:text-slate-100">
                      {formatSalaryRange(
                        app.salaryMin,
                        app.salaryMax,
                        app.salaryCurrency,
                        app.salaryPeriod
                      )}
                    </td>

                    {/* Upcoming date */}
                    <td className="px-3 py-3.5 whitespace-nowrap">
                      {app.nextInterviewAt ? (
                        <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 font-medium text-2xs">
                          <Calendar className="h-3 w-3 text-amber-500" />
                          <span>Interview {formatRelativeTime(app.nextInterviewAt)}</span>
                        </span>
                      ) : app.nextFollowUpAt ? (
                        <span className="inline-flex items-center gap-1 text-slate-500 text-2xs">
                          <Clock className="h-3 w-3" />
                          <span>Follow-up {formatRelativeTime(app.nextFollowUpAt)}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Skill Fit */}
                    <td className="px-3 py-3.5 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-2xs font-bold ${
                          matchPct >= 75
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : matchPct >= 50
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {matchPct}%
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 pl-3 pr-4 text-right sm:pr-6">
                      <ChevronRight className="inline-block h-4 w-4 text-slate-400" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
