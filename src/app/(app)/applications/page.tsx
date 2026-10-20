"use client";

import * as React from "react";
import { JobApplication, ApplicationStatus, WorkMode } from "@/lib/types";
import { INITIAL_APPLICATIONS } from "@/lib/mock-data";
import { MetricsStrip } from "@/components/applications/MetricsStrip";
import { KanbanBoard } from "@/components/applications/KanbanBoard";
import { ApplicationTable } from "@/components/applications/ApplicationTable";
import { ApplicationDrawer } from "@/components/applications/ApplicationDrawer";
import { ApplicationModal } from "@/components/applications/ApplicationModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, LayoutGrid, List, Search } from "lucide-react";

export default function ApplicationsPage() {
  const [applications, setApplications] = React.useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [viewMode, setViewMode] = React.useState<"board" | "table">("board");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [workModeFilter, setWorkModeFilter] = React.useState<"All" | WorkMode>("All");
  const [selectedApp, setSelectedApp] = React.useState<JobApplication | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [quickAddStatus, setQuickAddStatus] = React.useState<ApplicationStatus>("applied");

  // Filtering
  const filteredApplications = React.useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesWorkMode = workModeFilter === "All" || app.workMode === workModeFilter;

      return matchesSearch && matchesWorkMode;
    });
  }, [applications, searchQuery, workModeFilter]);

  // Handlers
  const handleSelectApplication = (app: JobApplication) => {
    setSelectedApp(app);
    setIsDrawerOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app))
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    setIsDrawerOpen(false);
    setSelectedApp(null);
  };

  const handleAddApplication = (newAppData: Partial<JobApplication>) => {
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      companyName: newAppData.companyName || "Untitled Company",
      jobTitle: newAppData.jobTitle || "Software Engineer",
      status: newAppData.status || "applied",
      workMode: newAppData.workMode || "Hybrid",
      location: newAppData.location || "Dhaka",
      salaryMin: newAppData.salaryMin,
      salaryMax: newAppData.salaryMax,
      salaryCurrency: "BDT",
      salaryPeriod: "month",
      jobUrl: newAppData.jobUrl,
      requiredSkills: newAppData.requiredSkills || [],
      matchedSkills: newAppData.matchedSkills || [],
      notes: newAppData.notes,
      appliedAt: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);
  };

  const handleQuickAdd = (status: ApplicationStatus) => {
    setQuickAddStatus(status);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & New Application Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Job Applications
          </h1>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Track interview milestones, follow-up dates, and compensation packages
          </p>
        </div>

        <Button
          onClick={() => {
            setQuickAddStatus("applied");
            setIsModalOpen(true);
          }}
          className="gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Application</span>
        </Button>
      </div>

      {/* Real-time Executive Metrics Strip */}
      <MetricsStrip applications={applications} />

      {/* Control Bar: Search, Work Mode Filter, View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, role, location, or skill..."
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* Filters and View Switcher */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* Work Mode Toggle Pills */}
          <div className="flex items-center rounded-lg border border-slate-200/90 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-900 text-2xs font-medium">
            {(["All", "Hybrid", "Remote", "On-site"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setWorkModeFilter(mode)}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  workModeFilter === mode
                    ? "bg-slate-900 text-white font-semibold dark:bg-slate-100 dark:text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Board vs Table */}
          <div className="flex items-center rounded-lg border border-slate-200/90 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => setViewMode("board")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-2xs font-medium transition-colors ${
                viewMode === "board"
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-2xs font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area: Board or Table */}
      {viewMode === "board" ? (
        <KanbanBoard
          applications={filteredApplications}
          onSelectApplication={handleSelectApplication}
          selectedId={selectedApp?.id}
          onQuickAdd={handleQuickAdd}
        />
      ) : (
        <ApplicationTable
          applications={filteredApplications}
          onSelectApplication={handleSelectApplication}
          selectedId={selectedApp?.id}
        />
      )}

      {/* Slide-Over Inspector Drawer */}
      <ApplicationDrawer
        application={selectedApp}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* Add Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddApplication}
        initialStatus={quickAddStatus}
      />
    </div>
  );
}
