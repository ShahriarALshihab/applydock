"use client";

import * as React from "react";
import { JobApplication, ApplicationStatus } from "@/lib/types";
import { ApplicationCard } from "./ApplicationCard";
import { Plus, LayoutGrid } from "lucide-react";

interface KanbanBoardProps {
  applications: JobApplication[];
  onSelectApplication: (app: JobApplication) => void;
  selectedId?: string;
  onQuickAdd?: (status: ApplicationStatus) => void;
}

interface ColumnConfig {
  id: string;
  title: string;
  statuses: ApplicationStatus[];
  accentColor: string;
  badgeColor: string;
  dotColor: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    id: "wishlist",
    title: "Wishlist",
    statuses: ["wishlist"],
    accentColor: "border-t-purple-500",
    badgeColor: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
    dotColor: "bg-purple-500",
  },
  {
    id: "applied",
    title: "Applied",
    statuses: ["applied"],
    accentColor: "border-t-blue-500",
    badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
    dotColor: "bg-blue-500",
  },
  {
    id: "screening",
    title: "Screening",
    statuses: ["screening"],
    accentColor: "border-t-sky-500",
    badgeColor: "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
    dotColor: "bg-sky-500",
  },
  {
    id: "interview",
    title: "Interview",
    statuses: ["interview"],
    accentColor: "border-t-amber-500",
    badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
    dotColor: "bg-amber-500",
  },
  {
    id: "offer",
    title: "Offer",
    statuses: ["offer"],
    accentColor: "border-t-emerald-500",
    badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    dotColor: "bg-emerald-500",
  },
  {
    id: "archived",
    title: "Archived",
    statuses: ["rejected", "withdrawn"],
    accentColor: "border-t-slate-400",
    badgeColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    dotColor: "bg-slate-400",
  },
];

export function KanbanBoard({
  applications,
  onSelectApplication,
  selectedId,
  onQuickAdd,
}: KanbanBoardProps) {
  const [selectedColumnId, setSelectedColumnId] = React.useState<string>("all");

  const visibleColumns = React.useMemo(() => {
    if (selectedColumnId === "all") return COLUMNS;
    return COLUMNS.filter((col) => col.id === selectedColumnId);
  }, [selectedColumnId]);

  return (
    <div className="space-y-4">
      {/* Responsive Stage Navigation Bar (No horizontal scrolling forced) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-slate-200/80 bg-white p-2 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedColumnId("all")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedColumnId === "all"
                ? "bg-indigo-600 text-white shadow-xs font-semibold"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>All Stages</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-2xs ${
                selectedColumnId === "all"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {applications.length}
            </span>
          </button>

          {COLUMNS.map((column) => {
            const count = applications.filter((app) =>
              column.statuses.includes(app.status)
            ).length;
            const isSelected = selectedColumnId === column.id;

            return (
              <button
                key={column.id}
                onClick={() => setSelectedColumnId(column.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${column.dotColor}`} />
                <span>{column.title}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-2xs ${
                    isSelected
                      ? "bg-white/20 dark:bg-slate-900/20"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {selectedColumnId !== "all" && (
          <button
            onClick={() => setSelectedColumnId("all")}
            className="text-2xs font-medium text-indigo-600 hover:underline dark:text-indigo-400 px-2 py-1"
          >
            Reset to All Stages
          </button>
        )}
      </div>

      {/* Responsive Grid Container: 3 Columns on desktop, 2 on tablet, 1 on mobile (Zero horizontal scroll) */}
      <div
        className={`grid gap-4.5 ${
          selectedColumnId === "all"
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1 max-w-2xl mx-auto"
        }`}
      >
        {visibleColumns.map((column) => {
          const columnApps = applications.filter((app) =>
            column.statuses.includes(app.status)
          );

          return (
            <div
              key={column.id}
              className="flex w-full flex-col rounded-xl border border-slate-200/90 bg-slate-50/70 dark:border-slate-800/90 dark:bg-slate-950/40 shadow-2xs"
            >
              {/* Column Header */}
              <div
                className={`flex items-center justify-between border-b border-slate-200/90 border-t-2 px-4 py-3 dark:border-slate-800 ${column.accentColor}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${column.dotColor}`} />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {column.title}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-2xs font-semibold ${column.badgeColor}`}
                  >
                    {columnApps.length}
                  </span>
                </div>

                {onQuickAdd && (
                  <button
                    onClick={() => onQuickAdd(column.statuses[0])}
                    className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
                    title={`Add to ${column.title}`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Cards Container */}
              <div className="flex flex-1 flex-col gap-3 p-3 min-h-[160px]">
                {columnApps.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 p-6 text-center dark:border-slate-800">
                    <p className="text-2xs text-slate-400">No applications in {column.title}</p>
                    {onQuickAdd && (
                      <button
                        onClick={() => onQuickAdd(column.statuses[0])}
                        className="mt-2 text-2xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        + Add first application
                      </button>
                    )}
                  </div>
                ) : (
                  columnApps.map((app) => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                      onClick={onSelectApplication}
                      isSelected={app.id === selectedId}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
