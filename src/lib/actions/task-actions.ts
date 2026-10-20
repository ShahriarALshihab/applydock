"use server";

import { db } from "@/db";
import { learningTasks, skills } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { requireAuth } from "@/lib/actions/auth-actions";
import { LearningTaskItem, TaskPriority, TaskStatus } from "@/lib/types";
import { revalidatePath } from "next/cache";

function formatDbTask(
  row: typeof learningTasks.$inferSelect & { skill?: typeof skills.$inferSelect | null }
): LearningTaskItem {
  return {
    id: row.id,
    title: row.title,
    skillName: row.skill?.name || undefined,
    priority: row.priority as TaskPriority,
    status: row.status as TaskStatus,
    dueAt: row.dueAt ? row.dueAt.toISOString().split("T")[0] : undefined,
    completedAt: row.completedAt ? row.completedAt.toISOString() : null,
  };
}

/**
 * Fetch all learning tasks for the authenticated user
 */
export async function getLearningTasks(): Promise<LearningTaskItem[]> {
  try {
    const user = await requireAuth();

    const rows = await db.query.learningTasks.findMany({
      where: eq(learningTasks.userId, user.id),
      with: {
        skill: true,
      },
      orderBy: [desc(learningTasks.updatedAt)],
    });

    return rows.map(formatDbTask);
  } catch (error) {
    console.error("Error fetching learning tasks:", error);
    return [];
  }
}

/**
 * Create a new learning task
 */
export async function createLearningTask(data: {
  title: string;
  skillId?: string;
  skillName?: string;
  priority: TaskPriority;
  dueAt?: string;
}): Promise<{ success: boolean; task?: LearningTaskItem; error?: string }> {
  try {
    const user = await requireAuth();

    if (!data.title?.trim()) {
      return { success: false, error: "Task title is required." };
    }

    let linkedSkillId = data.skillId;
    if (!linkedSkillId && data.skillName) {
      const existing = await db.query.skills.findFirst({
        where: and(
          eq(skills.userId, user.id),
          eq(skills.name, data.skillName.trim())
        ),
      });
      if (existing) {
        linkedSkillId = existing.id;
      }
    }

    const [inserted] = await db
      .insert(learningTasks)
      .values({
        userId: user.id,
        skillId: linkedSkillId || null,
        title: data.title.trim(),
        priority: data.priority,
        status: "todo",
        dueAt: data.dueAt ? new Date(data.dueAt) : null,
      })
      .returning();

    revalidatePath("/learning");
    revalidatePath("/dashboard");

    return {
      success: true,
      task: {
        id: inserted.id,
        title: inserted.title,
        skillName: data.skillName,
        priority: inserted.priority as TaskPriority,
        status: inserted.status as TaskStatus,
        dueAt: inserted.dueAt ? inserted.dueAt.toISOString().split("T")[0] : undefined,
        completedAt: null,
      },
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Failed to create task." };
  }
}

/**
 * Toggle task completion status
 */
export async function toggleTaskStatus(
  id: string,
  currentStatus: TaskStatus
): Promise<{ success: boolean; newStatus?: TaskStatus; error?: string }> {
  try {
    const user = await requireAuth();

    const isCurrentlyCompleted = currentStatus === "completed";
    const nextStatus: TaskStatus = isCurrentlyCompleted ? "todo" : "completed";
    const completedAt = isCurrentlyCompleted ? null : new Date();

    await db
      .update(learningTasks)
      .set({
        status: nextStatus,
        completedAt,
        updatedAt: new Date(),
      })
      .where(and(eq(learningTasks.id, id), eq(learningTasks.userId, user.id)));

    revalidatePath("/learning");
    revalidatePath("/dashboard");

    return { success: true, newStatus: nextStatus };
  } catch (error) {
    console.error("Error toggling task status:", error);
    return { success: false, error: "Failed to update task." };
  }
}

/**
 * Delete a learning task
 */
export async function deleteLearningTask(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    await db
      .delete(learningTasks)
      .where(and(eq(learningTasks.id, id), eq(learningTasks.userId, user.id)));

    revalidatePath("/learning");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: "Failed to delete task." };
  }
}
