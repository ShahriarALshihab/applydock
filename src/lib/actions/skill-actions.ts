"use server";

import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { requireAuth } from "@/lib/actions/auth-actions";
import { SkillItem, SkillLevel } from "@/lib/types";
import { revalidatePath } from "next/cache";

function formatDbSkill(row: typeof skills.$inferSelect): SkillItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category as SkillItem["category"],
    currentLevel: (row.currentLevel || 1) as SkillLevel,
    targetLevel: (row.targetLevel || 5) as SkillLevel,
    notes: row.notes || undefined,
    evidenceCount: 1,
  };
}

/**
 * Fetch all skills declared by the authenticated user
 */
export async function getSkills(): Promise<SkillItem[]> {
  try {
    const user = await requireAuth();

    const rows = await db.query.skills.findMany({
      where: eq(skills.userId, user.id),
      orderBy: [desc(skills.updatedAt)],
    });

    return rows.map(formatDbSkill);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

/**
 * Create a new skill goal
 */
export async function createSkill(data: {
  name: string;
  category: SkillItem["category"];
  currentLevel: SkillLevel;
  targetLevel: SkillLevel;
  notes?: string;
}): Promise<{ success: boolean; skill?: SkillItem; error?: string }> {
  try {
    const user = await requireAuth();

    if (!data.name?.trim()) {
      return { success: false, error: "Skill name is required." };
    }

    const [inserted] = await db
      .insert(skills)
      .values({
        userId: user.id,
        name: data.name.trim(),
        category: data.category,
        currentLevel: data.currentLevel,
        targetLevel: data.targetLevel,
        notes: data.notes || `Target proficiency mapped for ${data.name.trim()}`,
      })
      .returning();

    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return { success: true, skill: formatDbSkill(inserted) };
  } catch (error) {
    console.error("Error creating skill:", error);
    return { success: false, error: "Failed to create skill." };
  }
}

/**
 * Update proficiency level for a skill
 */
export async function updateSkillLevel(
  id: string,
  currentLevel: SkillLevel,
  targetLevel: SkillLevel
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    await db
      .update(skills)
      .set({
        currentLevel,
        targetLevel,
        updatedAt: new Date(),
      })
      .where(and(eq(skills.id, id), eq(skills.userId, user.id)));

    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating skill levels:", error);
    return { success: false, error: "Failed to update skill." };
  }
}

/**
 * Delete a skill
 */
export async function deleteSkill(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    await db
      .delete(skills)
      .where(and(eq(skills.id, id), eq(skills.userId, user.id)));

    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { success: false, error: "Failed to delete skill." };
  }
}
