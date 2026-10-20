import {
  pgTable,
  text,
  timestamp,
  integer,
  jsonb,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * USERS TABLE
 * Core authentication user record supporting email/password and OAuth providers.
 */
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true, mode: "date" }),
  image: text("image"),
  hashedPassword: text("hashed_password"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

/**
 * ACCOUNTS TABLE
 * NextAuth OAuth account linkage (e.g. Google OAuth).
 */
export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
    index("account_user_id_idx").on(account.userId),
  ]
);

/**
 * SESSIONS TABLE
 * NextAuth database sessions.
 */
export const sessions = pgTable(
  "sessions",
  {
    sessionToken: text("session_token").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { withTimezone: true, mode: "date" }).notNull(),
  },
  (session) => [index("session_user_id_idx").on(session.userId)]
);

/**
 * VERIFICATION TOKENS TABLE
 */
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true, mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

/**
 * JOB APPLICATIONS TABLE
 * Core tracking table with ownership, status, BDT compensation, and interview dates.
 */
export const jobApplications = pgTable(
  "job_applications",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    companyName: text("company_name").notNull(),
    jobTitle: text("job_title").notNull(),
    status: text("status")
      .$type<"wishlist" | "applied" | "screening" | "interview" | "offer" | "rejected" | "withdrawn">()
      .default("applied")
      .notNull(),
    workMode: text("work_mode").$type<"Remote" | "Hybrid" | "On-site">().default("Hybrid").notNull(),
    employmentType: text("employment_type").default("Full-time"),
    location: text("location").default("Dhaka (Gulshan)").notNull(),
    jobUrl: text("job_url"),
    salaryMin: integer("salary_min"),
    salaryMax: integer("salary_max"),
    salaryCurrency: text("salary_currency").default("BDT").notNull(),
    salaryPeriod: text("salary_period").$type<"month" | "year">().default("month").notNull(),
    appliedAt: timestamp("applied_at", { withTimezone: true, mode: "date" }),
    nextFollowUpAt: timestamp("next_follow_up_at", { withTimezone: true, mode: "date" }),
    nextInterviewAt: timestamp("next_interview_at", { withTimezone: true, mode: "date" }),
    interviewStage: text("interview_stage"),
    description: text("description"),
    notes: text("notes"),
    recruiterName: text("recruiter_name"),
    recruiterEmail: text("recruiter_email"),
    requiredSkills: jsonb("required_skills").$type<string[]>().default([]).notNull(),
    matchedSkills: jsonb("matched_skills").$type<string[]>().default([]).notNull(),
    archivedAt: timestamp("archived_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("job_app_user_id_idx").on(table.userId),
    index("job_app_status_idx").on(table.status),
    index("job_app_updated_at_idx").on(table.updatedAt),
    index("job_app_next_interview_idx").on(table.nextInterviewAt),
    index("job_app_next_follow_up_idx").on(table.nextFollowUpAt),
  ]
);

/**
 * APPLICATION ACTIVITIES TABLE
 * Audit trail / timeline tracking status changes and interview milestones.
 */
export const applicationActivities = pgTable(
  "application_activities",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    applicationId: text("application_id")
      .notNull()
      .references(() => jobApplications.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    eventType: text("event_type").notNull(), // 'status_changed' | 'interview_scheduled' | 'note_added'
    previousValue: text("previous_value"),
    newValue: text("new_value"),
    note: text("note"),
    occurredAt: timestamp("occurred_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("activity_app_id_idx").on(table.applicationId),
    index("activity_user_id_idx").on(table.userId),
  ]
);

/**
 * SKILLS TABLE
 * User-declared technical and professional proficiencies mapped on a 1-5 scale.
 */
export const skills = pgTable(
  "skills",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    category: text("category").notNull(),
    currentLevel: integer("current_level").notNull(), // 1 to 5
    targetLevel: integer("target_level").notNull(), // 1 to 5
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("skill_user_id_idx").on(table.userId),
    uniqueIndex("skill_user_name_idx").on(table.userId, table.name),
  ]
);

/**
 * LEARNING TASKS TABLE
 * Actionable tasks and milestones optionally linked to a specific skill.
 */
export const learningTasks = pgTable(
  "learning_tasks",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    skillId: text("skill_id").references(() => skills.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    description: text("description"),
    priority: text("priority").$type<"High" | "Medium" | "Low">().default("Medium").notNull(),
    status: text("status").$type<"todo" | "in_progress" | "completed">().default("todo").notNull(),
    dueAt: timestamp("due_at", { withTimezone: true, mode: "date" }),
    completedAt: timestamp("completed_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("task_user_id_idx").on(table.userId),
    index("task_skill_id_idx").on(table.skillId),
    index("task_status_idx").on(table.status),
  ]
);

/**
 * RELATIONS DEFINITIONS
 */
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  jobApplications: many(jobApplications),
  skills: many(skills),
  learningTasks: many(learningTasks),
}));

export const jobApplicationsRelations = relations(jobApplications, ({ one, many }) => ({
  user: one(users, { fields: [jobApplications.userId], references: [users.id] }),
  activities: many(applicationActivities),
}));

export const applicationActivitiesRelations = relations(applicationActivities, ({ one }) => ({
  application: one(jobApplications, {
    fields: [applicationActivities.applicationId],
    references: [jobApplications.id],
  }),
  user: one(users, { fields: [applicationActivities.userId], references: [users.id] }),
}));

export const skillsRelations = relations(skills, ({ one, many }) => ({
  user: one(users, { fields: [skills.userId], references: [users.id] }),
  learningTasks: many(learningTasks),
}));

export const learningTasksRelations = relations(learningTasks, ({ one }) => ({
  user: one(users, { fields: [learningTasks.userId], references: [users.id] }),
  skill: one(skills, { fields: [learningTasks.skillId], references: [skills.id] }),
}));
