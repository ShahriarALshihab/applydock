"use client";

import * as React from "react";
import { INITIAL_SKILLS } from "@/lib/mock-data";
import { SkillItem, SkillLevel } from "@/lib/types";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const LEVEL_LABELS: Record<SkillLevel, string> = {
  1: "Novice",
  2: "Advanced Beginner",
  3: "Competent",
  4: "Proficient",
  5: "Expert",
};

export default function SkillsPage() {
  const [skills, setSkills] = React.useState<SkillItem[]>(INITIAL_SKILLS);
  const [isAdding, setIsAdding] = React.useState(false);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState<SkillItem["category"]>("Backend");
  const [currentLevel, setCurrentLevel] = React.useState<SkillLevel>(3);
  const [targetLevel, setTargetLevel] = React.useState<SkillLevel>(5);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: name.trim(),
      category,
      currentLevel,
      targetLevel,
      evidenceCount: 1,
      notes: "Newly declared skill goal.",
    };

    setSkills([newSkill, ...skills]);
    setName("");
    setIsAdding(false);
  };

  // Group by category
  const categories: SkillItem["category"][] = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps & Cloud",
    "Architecture & Tools",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/90 pb-6 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Proficiency Matrix
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Map technical proficiencies on a verified 1–5 scale, set target readiness goals, and bridge gaps
          </p>
        </div>

        <Button onClick={() => setIsAdding(!isAdding)} className="gap-1.5 shadow-sm self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </Button>
      </div>

      {/* Add Skill Form */}
      {isAdding && (
        <Card className="border-indigo-200 bg-indigo-50/30 p-6 dark:border-indigo-900/60 dark:bg-indigo-950/20">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Declare New Skill & Target Level
          </h3>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Skill Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Go, Kafka, Kubernetes"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SkillItem["category"])}
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Current (1-5)
                  </label>
                  <select
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(Number(e.target.value) as SkillLevel)}
                    className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        Level {lvl} ({LEVEL_LABELS[lvl as SkillLevel]})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target (1-5)
                  </label>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(Number(e.target.value) as SkillLevel)}
                    className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        Level {lvl} ({LEVEL_LABELS[lvl as SkillLevel]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button size="sm" type="submit">
                Save Skill
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;

          return (
            <Card key={cat} className="overflow-hidden">
              <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-3.5 px-5 dark:bg-slate-950/40 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-900 dark:text-white">
                    {cat}
                  </CardTitle>
                  <span className="text-2xs font-semibold text-slate-400">
                    {catSkills.length} skills
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-5 divide-y divide-slate-100 dark:divide-slate-800/80">
                {catSkills.map((skill) => {
                  const gap = skill.targetLevel - skill.currentLevel;

                  return (
                    <div key={skill.id} className="py-3 first:pt-0 last:pb-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {skill.name}
                          </span>
                          <span className="ml-2 text-2xs text-slate-400">
                            ({LEVEL_LABELS[skill.currentLevel]})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {gap > 0 ? (
                            <span className="inline-flex items-center gap-0.5 rounded bg-amber-50 px-1.5 py-0.5 text-2xs font-semibold text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                              <span>Target: L{skill.targetLevel}</span>
                              <span className="text-amber-600">(+{gap})</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 rounded bg-emerald-50 px-1.5 py-0.5 text-2xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                              <Check className="h-3 w-3" />
                              <span>Goal Met</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 1-5 Visual Scale Bar */}
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((lvl) => {
                          const isCurrent = lvl <= skill.currentLevel;
                          const isTarget = lvl <= skill.targetLevel;

                          return (
                            <div
                              key={lvl}
                              className={`h-2 flex-1 rounded-sm transition-colors ${
                                isCurrent
                                  ? "bg-indigo-600 dark:bg-indigo-500"
                                  : isTarget
                                  ? "bg-amber-300 dark:bg-amber-600/60"
                                  : "bg-slate-100 dark:bg-slate-800"
                              }`}
                              title={`Level ${lvl}: ${LEVEL_LABELS[lvl as SkillLevel]}`}
                            />
                          );
                        })}
                      </div>

                      {skill.notes && (
                        <p className="text-2xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {skill.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
