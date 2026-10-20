"use server";

import { db } from "@/db";
import { jobApplications, applicationActivities } from "@/db/schema";
import { eq, and, desc, isNull } from "drizzle-orm";
import { requireAuth } from "@/lib/actions/auth-actions";
import { JobApplication, ApplicationStatus } from "@/lib/types";
import { revalidatePath } from "next/cache";

/**
 * Format DB row to frontend JobApplication interface
 */
function formatDbApplication(row: typeof jobApplications.$inferSelect): JobApplication {
  return {
    id: row.id,
    companyName: row.companyName,
    jobTitle: row.jobTitle,
    status: row.status,
    workMode: row.workMode,
    location: row.location,
    jobUrl: row.jobUrl ?? undefined,
    salaryMin: row.salaryMin ?? undefined,
    salaryMax: row.salaryMax ?? undefined,
    salaryCurrency: row.salaryCurrency ?? "BDT",
    salaryPeriod: row.salaryPeriod,
    appliedAt: row.appliedAt ? row.appliedAt.toISOString().split("T")[0] : undefined,
    nextFollowUpAt: row.nextFollowUpAt ? row.nextFollowUpAt.toISOString() : undefined,
    nextInterviewAt: row.nextInterviewAt ? row.nextInterviewAt.toISOString() : undefined,
    interviewStage: row.interviewStage ?? undefined,
    description: row.description ?? undefined,
    notes: row.notes ?? undefined,
    requiredSkills: Array.isArray(row.requiredSkills) ? row.requiredSkills : [],
    matchedSkills: Array.isArray(row.matchedSkills) ? row.matchedSkills : [],
    recruiterName: row.recruiterName ?? undefined,
    recruiterEmail: row.recruiterEmail ?? undefined,
    archivedAt: row.archivedAt ? row.archivedAt.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Fetch all active job applications for the authenticated user
 */
export async function getApplications(): Promise<JobApplication[]> {
  try {
    const user = await requireAuth();

    const rows = await db.query.jobApplications.findMany({
      where: and(
        eq(jobApplications.userId, user.id),
        isNull(jobApplications.archivedAt)
      ),
      orderBy: [desc(jobApplications.updatedAt)],
    });

    return rows.map(formatDbApplication);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

/**
 * Create a new job application for the current user
 */
export async function createApplication(
  data: Partial<JobApplication>
): Promise<{ success: boolean; application?: JobApplication; error?: string }> {
  try {
    const user = await requireAuth();

    if (!data.companyName?.trim() || !data.jobTitle?.trim()) {
      return { success: false, error: "Company name and job title are required." };
    }

    const [inserted] = await db
      .insert(jobApplications)
      .values({
        userId: user.id,
        companyName: data.companyName.trim(),
        jobTitle: data.jobTitle.trim(),
        status: data.status || "applied",
        workMode: data.workMode || "Hybrid",
        location: data.location || "Dhaka (Gulshan)",
        jobUrl: data.jobUrl?.trim() || null,
        salaryMin: data.salaryMin ? Number(data.salaryMin) : null,
        salaryMax: data.salaryMax ? Number(data.salaryMax) : null,
        salaryCurrency: "BDT",
        salaryPeriod: data.salaryPeriod || "month",
        appliedAt: data.appliedAt ? new Date(data.appliedAt) : new Date(),
        interviewStage: data.interviewStage || null,
        notes: data.notes || null,
        requiredSkills: data.requiredSkills || [],
        matchedSkills: data.matchedSkills || [],
        recruiterName: data.recruiterName || null,
        recruiterEmail: data.recruiterEmail || null,
      })
      .returning();

    // Log timeline activity
    await db.insert(applicationActivities).values({
      applicationId: inserted.id,
      userId: user.id,
      eventType: "created",
      newValue: inserted.status,
      note: `Added application for ${inserted.jobTitle} at ${inserted.companyName}`,
    });

    revalidatePath("/applications");
    revalidatePath("/dashboard");

    return { success: true, application: formatDbApplication(inserted) };
  } catch (error) {
    console.error("Error creating application:", error);
    return { success: false, error: "Failed to create application." };
  }
}

/**
 * Update the status of an application and log an activity event
 */
export async function updateApplicationStatus(
  id: string,
  newStatus: ApplicationStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    const existing = await db.query.jobApplications.findFirst({
      where: and(
        eq(jobApplications.id, id),
        eq(jobApplications.userId, user.id)
      ),
    });

    if (!existing) {
      return { success: false, error: "Application not found." };
    }

    const previousStatus = existing.status;

    await db
      .update(jobApplications)
      .set({
        status: newStatus,
        updatedAt: new Date(),
      })
      .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, user.id)));

    // Log audit trail
    await db.insert(applicationActivities).values({
      applicationId: id,
      userId: user.id,
      eventType: "status_changed",
      previousValue: previousStatus,
      newValue: newStatus,
      note: `Moved stage from ${previousStatus} to ${newStatus}`,
    });

    revalidatePath("/applications");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating application status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

/**
 * Update full application details
 */
export async function updateApplication(
  id: string,
  data: Partial<JobApplication>
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.companyName !== undefined) updatePayload.companyName = data.companyName.trim();
    if (data.jobTitle !== undefined) updatePayload.jobTitle = data.jobTitle.trim();
    if (data.status !== undefined) updatePayload.status = data.status;
    if (data.workMode !== undefined) updatePayload.workMode = data.workMode;
    if (data.location !== undefined) updatePayload.location = data.location;
    if (data.salaryMin !== undefined) updatePayload.salaryMin = data.salaryMin;
    if (data.salaryMax !== undefined) updatePayload.salaryMax = data.salaryMax;
    if (data.notes !== undefined) updatePayload.notes = data.notes;
    if (data.interviewStage !== undefined) updatePayload.interviewStage = data.interviewStage;
    if (data.jobUrl !== undefined) updatePayload.jobUrl = data.jobUrl;
    if (data.requiredSkills !== undefined) updatePayload.requiredSkills = data.requiredSkills;
    if (data.matchedSkills !== undefined) updatePayload.matchedSkills = data.matchedSkills;

    await db
      .update(jobApplications)
      .set(updatePayload)
      .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, user.id)));

    revalidatePath("/applications");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating application:", error);
    return { success: false, error: "Failed to update application." };
  }
}

/**
 * Delete / Archive application
 */
export async function deleteApplication(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireAuth();

    await db
      .delete(jobApplications)
      .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, user.id)));

    revalidatePath("/applications");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting application:", error);
    return { success: false, error: "Failed to delete application." };
  }
}

/**
 * Get timeline activities for an application
 */
export async function getApplicationActivities(applicationId: string) {
  try {
    const user = await requireAuth();

    return await db.query.applicationActivities.findMany({
      where: and(
        eq(applicationActivities.applicationId, applicationId),
        eq(applicationActivities.userId, user.id)
      ),
      orderBy: [desc(applicationActivities.occurredAt)],
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}
