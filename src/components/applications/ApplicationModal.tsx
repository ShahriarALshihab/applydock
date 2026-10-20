"use client";

import * as React from "react";
import { JobApplication, ApplicationStatus, WorkMode } from "@/lib/types";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (app: Partial<JobApplication>) => void;
  initialStatus?: ApplicationStatus;
}

const BD_COMPANY_PRESETS = [
  "bKash Limited",
  "Pathao",
  "Brain Station 23",
  "Chaldal",
  "Cefalo Bangladesh",
  "ShopUp",
  "Therap (BD) Ltd.",
  "Enosis Solutions",
  "Optimizely Dhaka",
  "Selise Digital Platforms",
  "Kaz Software",
];

const BD_LOCATION_PRESETS = [
  "Dhaka (Gulshan)",
  "Dhaka (Banani)",
  "Dhaka (Dhanmondi)",
  "Dhaka (Mohakhali)",
  "Dhaka (Uttara)",
  "Dhaka (Tejgaon)",
  "Chattogram",
  "Sylhet",
  "Remote (Bangladesh)",
  "Remote (Global)",
];

export function ApplicationModal({
  isOpen,
  onClose,
  onAdd,
  initialStatus = "applied",
}: ApplicationModalProps) {
  const [companyName, setCompanyName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [status, setStatus] = React.useState<ApplicationStatus>(initialStatus);
  const [workMode, setWorkMode] = React.useState<WorkMode>("Hybrid");
  const [location, setLocation] = React.useState("Dhaka (Gulshan)");
  const [salaryMin, setSalaryMin] = React.useState<string>("100000");
  const [salaryMax, setSalaryMax] = React.useState<string>("140000");
  const [jobUrl, setJobUrl] = React.useState("");
  const [skills, setSkills] = React.useState("TypeScript, React, Next.js, PostgreSQL");
  const [notes, setNotes] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !jobTitle.trim()) return;

    const skillArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onAdd({
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      status,
      workMode,
      location,
      salaryMin: salaryMin ? parseInt(salaryMin, 10) : undefined,
      salaryMax: salaryMax ? parseInt(salaryMax, 10) : undefined,
      salaryCurrency: "BDT",
      salaryPeriod: "month",
      jobUrl: jobUrl.trim() || undefined,
      requiredSkills: skillArray,
      matchedSkills: skillArray.slice(0, Math.ceil(skillArray.length / 2)),
      notes: notes.trim() || undefined,
      appliedAt: new Date().toISOString().split("T")[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Add Job Application
            </h3>
            <p className="text-xs text-slate-500">Track a new opportunity in your pipeline</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              list="bd-companies"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. bKash Limited or Pathao"
              required
              className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <datalist id="bd-companies">
              {BD_COMPANY_PRESETS.map((comp) => (
                <option key={comp} value={comp} />
              ))}
            </datalist>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Job Title
            </label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              required
            />
          </div>

          {/* Work Mode & Initial Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="wishlist">Wishlist</option>
                <option value="applied">Applied</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Location
            </label>
            <input
              type="text"
              list="bd-locations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Dhaka (Gulshan) or Remote (Bangladesh)"
              className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <datalist id="bd-locations">
              {BD_LOCATION_PRESETS.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>

          {/* Monthly Compensation in BDT */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Min Monthly Salary (৳)
              </label>
              <Input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="100000"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Max Monthly Salary (৳)
              </label>
              <Input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                placeholder="140000"
              />
            </div>
          </div>

          {/* Job Posting URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Job Posting URL (optional)
            </label>
            <Input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Required Skills (comma separated)
            </label>
            <Input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, TypeScript, Node.js, Docker"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notes / Recruiter Info
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add recruiter contact, referral notes, or prep items..."
              rows={2}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" type="submit" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span>Save Application</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
