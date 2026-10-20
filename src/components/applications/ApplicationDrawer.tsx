"use client";

import { JobApplication, ApplicationStatus } from "@/lib/types";
import { formatSalaryRange, formatDate, formatRelativeTime } from "@/lib/utils";
import {
  X,
  ExternalLink,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ApplicationDrawerProps {
  application: JobApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
  onDelete: (id: string) => void;
}

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: "wishlist", label: "Wishlist" },
  { value: "applied", label: "Applied" },
  { value: "screening", label: "Screening" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
  { value: "withdrawn", label: "Withdrawn" },
];

export function ApplicationDrawer({
  application,
  isOpen,
  onClose,
  onStatusChange,
  onDelete,
}: ApplicationDrawerProps) {
  if (!isOpen || !application) return null;

  const totalSkills = application.requiredSkills.length;
  const matchedCount = application.matchedSkills.length;
  const matchPercentage = totalSkills > 0 ? Math.round((matchedCount / totalSkills) * 100) : 100;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200/90 dark:bg-slate-900 dark:border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200/90 px-6 py-4.5 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Application Inspector
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Company & Role Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {application.jobTitle}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">{application.companyName}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-xs">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {application.location} ({application.workMode})
                </span>
                {application.jobUrl && (
                  <>
                    <span>•</span>
                    <a
                      href={application.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      <span>Posting</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Quick Status Stage Selector */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <label className="block text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Pipeline Stage
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {statusOptions.slice(0, 6).map((opt) => {
                  const isCurrent = application.status === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => onStatusChange(application.id, opt.value)}
                      className={`rounded-lg py-1.5 px-2 text-xs font-medium text-center transition-all ${
                        isCurrent
                          ? "bg-indigo-600 text-white shadow-xs font-semibold"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compensation in BDT */}
            <div className="rounded-xl border border-slate-200/90 p-4 space-y-1 dark:border-slate-800">
              <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Target Compensation
              </span>
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {formatSalaryRange(
                  application.salaryMin,
                  application.salaryMax,
                  application.salaryCurrency,
                  application.salaryPeriod
                )}
              </div>
              <p className="text-2xs text-slate-500">
                Monthly gross compensation package including basic, allowances, and festive bonuses where applicable.
              </p>
            </div>

            {/* Interview Milestones */}
            {(application.nextInterviewAt || application.interviewStage) && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2 dark:border-amber-900/60 dark:bg-amber-950/30">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Interview Scheduled</span>
                </div>
                {application.interviewStage && (
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {application.interviewStage}
                  </div>
                )}
                {application.nextInterviewAt && (
                  <div className="text-xs text-amber-800 dark:text-amber-300">
                    Date: {formatDate(application.nextInterviewAt)} ({formatRelativeTime(application.nextInterviewAt)})
                  </div>
                )}
              </div>
            )}

            {/* Skill Fit & Gap Analysis */}
            <div className="rounded-xl border border-slate-200/90 p-4 space-y-3 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Skill Readiness Fit
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{matchPercentage}% Match</span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                <div
                  className={`h-full transition-all duration-300 ${
                    matchPercentage >= 75
                      ? "bg-emerald-500"
                      : matchPercentage >= 50
                      ? "bg-amber-500"
                      : "bg-indigo-500"
                  }`}
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>

              {/* Skills tags */}
              <div className="pt-2 space-y-2">
                <span className="text-2xs text-slate-500">Skills Breakdown:</span>
                <div className="flex flex-wrap gap-1.5">
                  {application.requiredSkills.map((skill) => {
                    const isMatched = application.matchedSkills.includes(skill);
                    return (
                      <span
                        key={skill}
                        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium border ${
                          isMatched
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                            : "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800"
                        }`}
                      >
                        {isMatched ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                        )}
                        <span>{skill}</span>
                        {!isMatched && <span className="text-2xs text-amber-600 font-semibold">(Gap)</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recruiter / Point of Contact */}
            {application.recruiterName && (
              <div className="rounded-xl border border-slate-200/90 p-4 space-y-2 dark:border-slate-800">
                <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Talent Acquisition Contact
                </span>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>{application.recruiterName}</span>
                </div>
                {application.recruiterEmail && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <a href={`mailto:${application.recruiterEmail}`} className="hover:underline text-indigo-600 dark:text-indigo-400">
                      {application.recruiterEmail}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Private Notes & Preparation */}
            {application.notes && (
              <div className="rounded-xl border border-slate-200/90 p-4 space-y-2 dark:border-slate-800">
                <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Interview Preparation & Notes
                </span>
                <p className="text-xs text-slate-700 leading-relaxed dark:text-slate-300">
                  {application.notes}
                </p>
              </div>
            )}

            {/* Application Dates */}
            <div className="flex items-center justify-between text-2xs text-slate-400 border-t border-slate-100 pt-3 dark:border-slate-800">
              <span>Applied: {formatDate(application.appliedAt)}</span>
              <span>Updated: {formatDate(application.updatedAt)}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-slate-200/90 bg-slate-50/80 px-6 py-4 flex items-center justify-between dark:border-slate-800 dark:bg-slate-950">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(application.id)}
              className="gap-1.5"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Application</span>
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
