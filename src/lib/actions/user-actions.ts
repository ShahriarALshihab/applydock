"use server";

import { db } from "@/db";
import { users, jobApplications, skills, learningTasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "@/lib/actions/auth-actions";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

/**
 * Get current user profile details
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const sessionUser = await requireAuth();

    const user = await db.query.users.findFirst({
      where: eq(users.id, sessionUser.id),
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

/**
 * Update user display name
 */
export async function updateUserProfile(data: {
  name: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const sessionUser = await requireAuth();

    if (!data.name?.trim()) {
      return { success: false, error: "Display name cannot be empty." };
    }

    await db
      .update(users)
      .set({
        name: data.name.trim(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, sessionUser.id));

    revalidatePath("/settings");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile." };
  }
}

/**
 * Change account password
 */
export async function changeUserPassword(formData: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const sessionUser = await requireAuth();

    if (!formData.newPassword || formData.newPassword.length < 8) {
      return { success: false, error: "New password must be at least 8 characters long." };
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, sessionUser.id),
    });

    if (!user || !user.hashedPassword) {
      return { success: false, error: "Password change not supported for OAuth accounts." };
    }

    const isMatch = await bcrypt.compare(formData.currentPassword, user.hashedPassword);
    if (!isMatch) {
      return { success: false, error: "Current password is incorrect." };
    }

    const newHashedPassword = await bcrypt.hash(formData.newPassword, 12);

    await db
      .update(users)
      .set({
        hashedPassword: newHashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, sessionUser.id));

    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    return { success: false, error: "Failed to change password." };
  }
}

/**
 * Export complete workspace data as JSON archive
 */
export async function exportAllUserData() {
  try {
    const sessionUser = await requireAuth();

    const [userApps, userSkills, userTasks] = await Promise.all([
      db.query.jobApplications.findMany({ where: eq(jobApplications.userId, sessionUser.id) }),
      db.query.skills.findMany({ where: eq(skills.userId, sessionUser.id) }),
      db.query.learningTasks.findMany({ where: eq(learningTasks.userId, sessionUser.id) }),
    ]);

    return {
      success: true,
      data: {
        exportDate: new Date().toISOString(),
        version: "1.0",
        applications: userApps,
        skills: userSkills,
        tasks: userTasks,
      },
    };
  } catch (error) {
    console.error("Error exporting user data:", error);
    return { success: false, error: "Failed to export data." };
  }
}
