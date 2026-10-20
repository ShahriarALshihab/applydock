import { JobApplication } from "@/lib/types";
import { formatSalaryRange, formatRelativeTime } from "@/lib/utils";
import { Calendar, MapPin, Check, Clock } from "lucide-react";

interface ApplicationCardProps {
  application: JobApplication;
  onClick: (app: JobApplication) => void;
  isSelected?: boolean;
}

export function ApplicationCard({ application, onClick, isSelected }: ApplicationCardProps) {
  // Generate consistent monogram background color from company name
  const getMonogramColor = (name: string) => {
    const colors = [
      "bg-blue-600",
      "bg-indigo-600",
      "bg-emerald-600",
      "bg-violet-600",
      "bg-rose-600",
      "bg-amber-600",
      "bg-teal-600",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const initial = application.companyName.charAt(0).toUpperCase();

  return (
    <div
      onClick={() => onClick(application)}
      className={`group relative flex flex-col rounded-xl border bg-white p-4 shadow-2xs transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer dark:bg-slate-900 ${
        isSelected
          ? "border-indigo-600 ring-2 ring-indigo-500/20 dark:border-indigo-500"
          : "border-slate-200/90 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
      }`}
    >
      {/* Top Header: Monogram, Company, WorkMode */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-2xs ${getMonogramColor(
              application.companyName
            )}`}
          >
            {initial}
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
              {application.companyName}
            </h4>
            <div className="flex items-center gap-1.5 text-2xs text-slate-500 dark:text-slate-400">
              <MapPin className="h-2.5 w-2.5 shrink-0" />
              <span className="truncate">{application.location}</span>
            </div>
          </div>
        </div>

        {/* Work mode badge */}
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-2xs font-medium border ${
            application.workMode === "Remote"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
              : application.workMode === "Hybrid"
              ? "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800"
              : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
          }`}
        >
          {application.workMode}
        </span>
      </div>

      {/* Role Title */}
      <h3 className="mt-3 text-sm font-semibold tracking-tight text-slate-950 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {application.jobTitle}
      </h3>

      {/* Salary in BDT */}
      <div className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-300">
        {formatSalaryRange(
          application.salaryMin,
          application.salaryMax,
          application.salaryCurrency,
          application.salaryPeriod
        )}
      </div>

      {/* Interview / Follow-up alert indicators */}
      {application.nextInterviewAt && (
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-2xs font-medium text-amber-800 border border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
          <Calendar className="h-3 w-3 shrink-0 text-amber-600 dark:text-amber-400" />
          <span className="truncate">
            Interview {formatRelativeTime(application.nextInterviewAt)}
          </span>
        </div>
      )}

      {!application.nextInterviewAt && application.nextFollowUpAt && (
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-2xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <Clock className="h-3 w-3 shrink-0 text-slate-400" />
          <span className="truncate">Follow-up: {formatRelativeTime(application.nextFollowUpAt)}</span>
        </div>
      )}

      {/* Required Skill Chips with match checkmarks */}
      {application.requiredSkills && application.requiredSkills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
          {application.requiredSkills.slice(0, 3).map((skill) => {
            const isMatched = application.matchedSkills.includes(skill);
            return (
              <span
                key={skill}
                className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-2xs font-medium ${
                  isMatched
                    ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                    : "bg-slate-50 text-slate-500 border border-dashed border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700"
                }`}
              >
                {isMatched && <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />}
                <span>{skill}</span>
              </span>
            );
          })}
          {application.requiredSkills.length > 3 && (
            <span className="text-2xs text-slate-400 self-center">
              +{application.requiredSkills.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
