"use client";

import * as React from "react";
import { INITIAL_APPLICATIONS } from "@/lib/mock-data";
import { KanbanBoard } from "@/components/applications/KanbanBoard";
import { ApplicationDrawer } from "@/components/applications/ApplicationDrawer";
import { JobApplication, ApplicationStatus } from "@/lib/types";
import { MetricsStrip } from "@/components/applications/MetricsStrip";
import { LayoutGrid, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function InteractiveHeroPreview() {
  const [applications, setApplications] = React.useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [selectedApp, setSelectedApp] = React.useState<JobApplication | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleSelect = (app: JobApplication) => {
    setSelectedApp(app);
    setIsDrawerOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setIsDrawerOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 text-left">
      {/* Browser Frame Shell */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 ring-1 ring-slate-900/5">
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-100/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-400/80" />
            <div className="h-3 w-3 rounded-full bg-amber-400/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-2xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <LayoutGrid className="h-3 w-3 text-indigo-500" />
              <span>ApplyDock Workspace — Engineering Career Pipeline (Live Interactive Preview)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-2xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Click any card to inspect
            </span>
            <Link href="/login">
              <Button size="sm" variant="outline" className="h-7 text-2xs gap-1">
                <span>Open Full App</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Board Content Inside Preview */}
        <div className="p-5 space-y-5 bg-slate-50/50 dark:bg-slate-950/50">
          {/* Executive Metrics Strip */}
          <MetricsStrip applications={applications} />

          {/* Interactive Kanban Board */}
          <div className="pt-2">
            <KanbanBoard
              applications={applications}
              onSelectApplication={handleSelect}
              selectedId={selectedApp?.id}
            />
          </div>
        </div>
      </div>

      {/* Slide-over drawer on card click */}
      <ApplicationDrawer
        application={selectedApp}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
