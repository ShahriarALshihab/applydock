"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Award,
  CheckCircle2,
} from "lucide-react";
import { INITIAL_APPLICATIONS, INITIAL_SKILLS, INITIAL_TASKS } from "@/lib/mock-data";
import { formatSalaryRange, formatRelativeTime } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getApplications } from "@/lib/actions/application-actions";
import { JobApplication } from "@/lib/types";

export default function DashboardPage() {
  const [applications, setApplications] = React.useState<JobApplication[]>(INITIAL_APPLICATIONS);

  React.useEffect(() => {
    getApplications()
      .then((dbApps) => {
        if (dbApps && dbApps.length > 0) {
          setApplications(dbApps);
        }
      })
      .catch((err) => console.error("Failed to load dashboard applications:", err));
  }, []);

  const activeApps = applications.filter(
    (a) => a.status !== "rejected" && a.status !== "withdrawn"
  );
  const interviewApps = applications.filter(
    (a) => a.status === "interview" || a.status === "screening"
  );
  const offerApps = applications.filter((a) => a.status === "offer");
  const pendingTasks = INITIAL_TASKS.filter((t) => t.status !== "completed");

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/90 pb-6 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Career Command Center
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Real-time pipeline overview, interview milestones, and targeted skill readiness
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/applications">
            <Button size="sm" className="gap-1.5 shadow-sm">
              <Briefcase className="h-4 w-4" />
              <span>View Job Board</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="hover:shadow-xs transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500">Active Pipeline</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{activeApps.length}</span>
              <span className="text-xs text-slate-500">opportunities</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xs transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500">Upcoming Interviews</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{interviewApps.length}</span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">scheduled rounds</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xs transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500">Offers Extended</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{offerApps.length}</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">ready for decision</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xs transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500">Target Skills</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{INITIAL_SKILLS.length}</span>
              <span className="text-xs text-slate-500">tracked proficiencies</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Active Offer Spotlight & Upcoming Interviews */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Offer Spotlight & Active Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Offer Highlight Card */}
          {offerApps.length > 0 && (
            <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50/70 via-white to-white p-6 shadow-2xs dark:border-emerald-900/60 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Active Job Offer
                  </span>
                </div>
                <Badge variant="offer" className="font-semibold">
                  Extended
                </Badge>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {offerApps[0].jobTitle}
                  </h3>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {offerApps[0].companyName} • {offerApps[0].location}
                  </div>
                </div>
                <div className="text-right sm:text-right">
                  <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                    ৳155,000 / mo
                  </div>
                  <div className="text-2xs text-slate-500">Plus 2x Festival Bonuses</div>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                {offerApps[0].notes}
              </p>
            </div>
          )}

          {/* Active Interviews Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Interview Pipeline</CardTitle>
                <CardDescription>Scheduled rounds with talent teams and technical leads</CardDescription>
              </div>
              <Link href="/applications" className="text-xs font-semibold text-indigo-600 hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {interviewApps.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {app.companyName}
                      </span>
                      <span className="text-xs text-slate-500">• {app.jobTitle}</span>
                    </div>
                    <div className="text-xs font-medium text-amber-700 dark:text-amber-300">
                      {app.interviewStage || "Interview Scheduled"}
                    </div>
                    <div className="text-2xs text-slate-500">
                      {formatSalaryRange(app.salaryMin, app.salaryMax, app.salaryCurrency, app.salaryPeriod)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-2xs font-semibold text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                      <Calendar className="h-3 w-3 text-amber-600" />
                      <span>{app.nextInterviewAt ? formatRelativeTime(app.nextInterviewAt) : "Upcoming"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Pending Learning Tasks & Quick Actions */}
        <div className="space-y-6">
          {/* Actionable Learning Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Target Learning Tasks</CardTitle>
                <CardDescription>Milestones linked to target skills</CardDescription>
              </div>
              <Link href="/learning" className="text-xs font-semibold text-indigo-600 hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-slate-200/80 p-3 space-y-1 dark:border-slate-800"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-2">
                      {task.title}
                    </span>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-2xs font-bold ${
                        task.priority === "High"
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  {task.skillName && (
                    <div className="text-2xs text-indigo-600 dark:text-indigo-400 font-medium">
                      Skill: {task.skillName}
                    </div>
                  )}
                  {task.dueAt && (
                    <div className="text-2xs text-slate-400">
                      Due: {formatRelativeTime(task.dueAt)}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Market Compensation Benchmarks</CardTitle>
              <CardDescription>Target salary benchmark</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span>Mid-Level Software Engineer</span>
                <span className="font-semibold text-slate-900 dark:text-white">৳80k - ৳120k / mo</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span>Senior Software Engineer</span>
                <span className="font-semibold text-slate-900 dark:text-white">৳130k - ৳190k / mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lead / Staff Engineer</span>
                <span className="font-semibold text-slate-900 dark:text-white">৳200k - ৳300k+ / mo</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
