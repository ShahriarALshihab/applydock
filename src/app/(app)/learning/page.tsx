"use client";

import * as React from "react";
import { INITIAL_TASKS } from "@/lib/mock-data";
import { LearningTaskItem, TaskPriority } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import { Plus, Check, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  getLearningTasks,
  createLearningTask,
  toggleTaskStatus,
  deleteLearningTask,
} from "@/lib/actions/task-actions";

export default function LearningPage() {
  const [tasks, setTasks] = React.useState<LearningTaskItem[]>(INITIAL_TASKS);
  const [filter, setFilter] = React.useState<"all" | "pending" | "completed">("all");
  const [isAdding, setIsAdding] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [skillName, setSkillName] = React.useState("Kafka & Event Streaming");
  const [priority, setPriority] = React.useState<TaskPriority>("High");
  const [dueAt, setDueAt] = React.useState("2026-10-25");

  React.useEffect(() => {
    getLearningTasks()
      .then((dbTasks) => {
        if (dbTasks && dbTasks.length > 0) {
          setTasks(dbTasks);
        }
      })
      .catch((err) => console.error("Failed to load tasks from server:", err));
  }, []);

  const handleToggleTask = async (id: string) => {
    const targetTask = tasks.find((t) => t.id === id);
    if (!targetTask) return;

    const isComp = targetTask.status === "completed";
    const nextStatus = isComp ? "todo" : "completed";

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: nextStatus,
            completedAt: isComp ? null : new Date().toISOString(),
          };
        }
        return t;
      })
    );

    try {
      await toggleTaskStatus(id, targetTask.status);
    } catch (err) {
      console.error("Failed to toggle task status on server:", err);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tempId = `task-${Date.now()}`;
    const newTask: LearningTaskItem = {
      id: tempId,
      title: title.trim(),
      skillName: skillName.trim() || undefined,
      priority,
      status: "todo",
      dueAt,
    };

    // Optimistic update
    setTasks([newTask, ...tasks]);
    setTitle("");
    setIsAdding(false);

    try {
      const res = await createLearningTask({
        title: newTask.title,
        skillName: newTask.skillName,
        priority: newTask.priority,
        dueAt: newTask.dueAt,
      });
      if (res.success && res.task) {
        setTasks((prev) => prev.map((t) => (t.id === tempId ? res.task! : t)));
      }
    } catch (err) {
      console.error("Failed to create task on server:", err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteLearningTask(id);
    } catch (err) {
      console.error("Failed to delete task on server:", err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status !== "completed";
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/90 pb-6 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Actionable Learning Tasks
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Prioritized milestones linked directly to your target roles and interview prep
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </div>

      {/* Progress Metric Card */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Sprint Progress ({completedCount} of {tasks.length} completed)
          </span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {progressPercent}%
          </span>
        </div>
        <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 dark:bg-emerald-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Task Form */}
      {isAdding && (
        <Card className="border-slate-300 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Create Learning Milestone
          </h3>
          <form onSubmit={handleAddTask} className="space-y-4">
            <Input
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Build Redis caching middleware for payment gateway"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Target Skill"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="e.g. Go, Kafka, Docker"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Due Date
                </label>
                <Input
                  type="date"
                  value={dueAt}
                  onChange={(e) => setDueAt(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button size="sm" type="submit">
                Save Task
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 text-xs font-medium dark:border-slate-800">
        {(["all", "pending", "completed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`capitalize px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === tab
                ? "bg-slate-900 text-white font-semibold dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No tasks found for this filter.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === "completed";

            return (
              <div
                key={task.id}
                className={`flex items-start gap-3.5 rounded-xl border p-4 transition-colors group ${
                  isCompleted
                    ? "border-slate-200 bg-slate-50/60 dark:border-slate-800/60 dark:bg-slate-950/40"
                    : "border-slate-200/90 bg-white shadow-2xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                {/* Custom Checkbox */}
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors cursor-pointer ${
                    isCompleted
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-300 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-950"
                  }`}
                  aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
                >
                  {isCompleted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </button>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div
                    className={`text-sm font-semibold tracking-tight ${
                      isCompleted
                        ? "text-slate-400 line-through dark:text-slate-500"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-2xs text-slate-500">
                    {task.skillName && (
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {task.skillName}
                      </span>
                    )}

                    {task.dueAt && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Due: {formatRelativeTime(task.dueAt)}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Priority Badge & Delete Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded px-2 py-0.5 text-2xs font-bold ${
                      task.priority === "High"
                        ? "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900"
                        : "bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
