"use client";

import * as React from "react";
import { JobApplication, ApplicationStatus, WorkMode } from "@/lib/types";
import { MetricsStrip } from "@/components/applications/MetricsStrip";
import { KanbanBoard } from "@/components/applications/KanbanBoard";
import { ApplicationTable } from "@/components/applications/ApplicationTable";
import { ApplicationDrawer } from "@/components/applications/ApplicationDrawer";
import { ApplicationModal } from "@/components/applications/ApplicationModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, LayoutGrid, List, Search, Download } from "lucide-react";
import { exportApplicationsToCsv } from "@/lib/utils";
import { INITIAL_APPLICATIONS } from "@/lib/mock-data";
import {
  createApplication,
  updateApplicationStatus,
  deleteApplication,
  getApplications,
} from "@/lib/actions/application-actions";

interface ApplicationsClientViewProps {
  initialApplications?: JobApplication[];
}

export function ApplicationsClientView({
  initialApplications = INITIAL_APPLICATIONS,
}: ApplicationsClientViewProps) {
  const [applications, setApplications] = React.useState<JobApplication[]>(initialApplications);
  const [viewMode, setViewMode] = React.useState<"board" | "table">("board");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [workModeFilter, setWorkModeFilter] = React.useState<"All" | WorkMode>("All");
  const [selectedApp, setSelectedApp] = React.useState<JobApplication | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [quickAddStatus, setQuickAddStatus] = React.useState<ApplicationStatus>("applied");

  React.useEffect(() => {
    getApplications()
      .then((dbApps) => {
        if (dbApps && dbApps.length > 0) {
          setApplications(dbApps);
        }
      })
      .catch((err) => console.error("Failed to load applications from server:", err));
  }, []);

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

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    // Optimistic UI update
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app
      )
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    // Persist to Supabase
    try {
      await updateApplicationStatus(id, newStatus);
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistic UI update
    setApplications((prev) => prev.filter((app) => app.id !== id));
    setIsDrawerOpen(false);
    setSelectedApp(null);

    // Persist to Supabase
    try {
      await deleteApplication(id);
    } catch (err) {
      console.error("Failed to delete application on server:", err);
    }
  };

  const handleAddApplication = async (newAppData: Partial<JobApplication>) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticApp: JobApplication = {
      id: tempId,
      companyName: newAppData.companyName || "Untitled Company",
      jobTitle: newAppData.jobTitle || "Software Engineer",
      status: newAppData.status || "applied",
      workMode: newAppData.workMode || "Hybrid",
      location: newAppData.location || "Dhaka (Gulshan)",
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

    // Optimistically add to list
    setApplications((prev) => [optimisticApp, ...prev]);

    // Persist to Supabase
    try {
      const res = await createApplication(newAppData);
      if (res.success && res.application) {
        setApplications((prev) =>
          prev.map((app) => (app.id === tempId ? res.application! : app))
        );
      }
    } catch (err) {
      console.error("Failed to create application on server:", err);
    }
  };

  const handleQuickAdd = (status: ApplicationStatus) => {
    setQuickAddStatus(status);
    setIsModalOpen(true);
  };

  const handleExportCsv = () => {
    exportApplicationsToCsv(filteredApplications);
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

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="gap-1.5 text-xs"
            title="Export filtered applications to RFC 4180 CSV"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </Button>

          <Button
            size="sm"
            onClick={() => {
              setQuickAddStatus("applied");
              setIsModalOpen(true);
            }}
            className="gap-1.5 shadow-sm text-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add Application</span>
          </Button>
        </div>
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
                className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
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
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-2xs font-medium transition-colors cursor-pointer ${
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
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-2xs font-medium transition-colors cursor-pointer ${
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
