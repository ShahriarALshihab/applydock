import * as dotenv from "dotenv";
dotenv.config();

import { db } from "./index";
import { users, jobApplications, skills, learningTasks } from "./schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function seed() {
  if (process.env.NODE_ENV === "production") {
    console.error("❌ Refusing to seed database in production environment!");
    process.exit(1);
  }

  console.log("🌱 Starting development database seeding for Proofly...");

  // 1. Ensure or create a demo user with test password
  const demoEmail = "demo@proofly.local";
  const hashedPassword = await bcrypt.hash("Password123!", 12);

  let demoUser = await db.query.users.findFirst({
    where: eq(users.email, demoEmail),
  });

  if (!demoUser) {
    const [created] = await db
      .insert(users)
      .values({
        email: demoEmail,
        name: "Job Seeker BD",
        hashedPassword,
      })
      .returning();
    demoUser = created;
    console.log(`✓ Created demo user: ${demoEmail} (${demoUser.id})`);
  } else {
    await db
      .update(users)
      .set({ hashedPassword })
      .where(eq(users.id, demoUser.id));
    console.log(`✓ Updated demo user password: ${demoEmail} (${demoUser.id})`);
  }

  const userId = demoUser.id;

  // 2. Seed Skills
  console.log("✓ Seeding skills...");
  const skillEntries = [
    { name: "TypeScript", category: "Frontend", currentLevel: 4, targetLevel: 5 },
    { name: "Next.js & React", category: "Frontend", currentLevel: 5, targetLevel: 5 },
    { name: "Node.js & Express", category: "Backend", currentLevel: 4, targetLevel: 5 },
    { name: "PostgreSQL & Drizzle ORM", category: "Database", currentLevel: 4, targetLevel: 5 },
    { name: "Docker & Containerization", category: "DevOps & Cloud", currentLevel: 3, targetLevel: 4 },
    { name: "Go (Golang)", category: "Backend", currentLevel: 2, targetLevel: 4 },
    { name: "Kafka & Event Streaming", category: "Backend", currentLevel: 2, targetLevel: 4 },
    { name: "System Design & Architecture", category: "Architecture & Tools", currentLevel: 3, targetLevel: 5 },
  ];

  const seededSkills = [];
  for (const sk of skillEntries) {
    const existing = await db.query.skills.findFirst({
      where: (s, { and, eq }) => and(eq(s.userId, userId), eq(s.name, sk.name)),
    });
    if (!existing) {
      const [newSkill] = await db
        .insert(skills)
        .values({
          userId,
          name: sk.name,
          category: sk.category,
          currentLevel: sk.currentLevel,
          targetLevel: sk.targetLevel,
          notes: `Target proficiency mapped for ${sk.name}`,
        })
        .returning();
      seededSkills.push(newSkill);
    } else {
      seededSkills.push(existing);
    }
  }

  // 3. Seed Applications with BDT compensation
  console.log("✓ Seeding job applications...");
  const appEntries = [
    {
      companyName: "bKash Limited",
      jobTitle: "Senior Backend Engineer",
      status: "interview" as const,
      workMode: "Hybrid" as const,
      location: "Dhaka (Gulshan)",
      salaryMin: 140000,
      salaryMax: 180000,
      salaryCurrency: "BDT",
      salaryPeriod: "month" as const,
      interviewStage: "System Design Round (Stage 3 of 4)",
      requiredSkills: ["Go", "Kafka", "PostgreSQL", "Docker", "Microservices"],
      matchedSkills: ["PostgreSQL", "Docker", "Microservices"],
      notes: "Focus on idempotent payment processing and transaction isolation.",
    },
    {
      companyName: "Brain Station 23",
      jobTitle: "Lead Full Stack Engineer",
      status: "offer" as const,
      workMode: "Hybrid" as const,
      location: "Dhaka (Mohakhali)",
      salaryMin: 130000,
      salaryMax: 165000,
      salaryCurrency: "BDT",
      salaryPeriod: "month" as const,
      interviewStage: "Offer Extended (BDT 155,000 / month)",
      requiredSkills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      matchedSkills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      notes: "Offer received: BDT 155,000 / mo with medical and festival bonuses.",
    },
    {
      companyName: "Pathao",
      jobTitle: "Senior Frontend Engineer",
      status: "interview" as const,
      workMode: "Hybrid" as const,
      location: "Dhaka (Dhanmondi)",
      salaryMin: 125000,
      salaryMax: 160000,
      salaryCurrency: "BDT",
      salaryPeriod: "month" as const,
      interviewStage: "Technical Live Coding (Stage 2 of 3)",
      requiredSkills: ["React", "TypeScript", "Next.js", "Performance Optimization"],
      matchedSkills: ["React", "TypeScript", "Next.js"],
      notes: "React 19 virtualization and SSR optimization prep.",
    },
    {
      companyName: "Cefalo Bangladesh",
      jobTitle: "Senior Software Engineer",
      status: "screening" as const,
      workMode: "Hybrid" as const,
      location: "Dhaka (Banani)",
      salaryMin: 140000,
      salaryMax: 175000,
      salaryCurrency: "BDT",
      salaryPeriod: "month" as const,
      interviewStage: "Recruiter Phone Screen Scheduled",
      requiredSkills: ["TypeScript", "React", "Node.js", "GraphQL"],
      matchedSkills: ["TypeScript", "React", "Node.js"],
      notes: "Call scheduled for Wednesday afternoon.",
    },
  ];

  for (const app of appEntries) {
    const existing = await db.query.jobApplications.findFirst({
      where: (a, { and, eq }) => and(eq(a.userId, userId), eq(a.companyName, app.companyName)),
    });
    if (!existing) {
      await db.insert(jobApplications).values({
        userId,
        ...app,
        appliedAt: new Date(),
      });
    }
  }

  // 4. Seed Learning Tasks
  console.log("✓ Seeding learning tasks...");
  const kafkaSkill = seededSkills.find((s) => s.name.includes("Kafka"));
  const sysDesignSkill = seededSkills.find((s) => s.name.includes("System Design"));

  const taskEntries = [
    {
      title: "Review Kafka consumer group rebalancing and offset commits",
      skillId: kafkaSkill?.id,
      priority: "High" as const,
      status: "in_progress" as const,
    },
    {
      title: "Implement distributed rate limiter using Redis sliding window",
      skillId: sysDesignSkill?.id,
      priority: "High" as const,
      status: "todo" as const,
    },
    {
      title: "Review Brain Station 23 employment contract and benefits handbook",
      priority: "High" as const,
      status: "completed" as const,
    },
  ];

  for (const task of taskEntries) {
    const existing = await db.query.learningTasks.findFirst({
      where: (t, { and, eq }) => and(eq(t.userId, userId), eq(t.title, task.title)),
    });
    if (!existing) {
      await db.insert(learningTasks).values({
        userId,
        ...task,
      });
    }
  }

  console.log("✅ Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
