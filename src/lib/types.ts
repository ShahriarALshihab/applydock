export type ApplicationStatus =
  | "wishlist"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

export type WorkMode = "Remote" | "Hybrid" | "On-site";

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  status: ApplicationStatus;
  workMode: WorkMode;
  location: string;
  jobUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string; // e.g., "BDT"
  salaryPeriod: "month" | "year";
  appliedAt?: string;
  nextFollowUpAt?: string;
  nextInterviewAt?: string;
  interviewStage?: string;
  description?: string;
  notes?: string;
  requiredSkills: string[];
  matchedSkills: string[];
  recruiterName?: string;
  recruiterEmail?: string;
  archivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps & Cloud" | "Architecture & Tools";
  currentLevel: SkillLevel;
  targetLevel: SkillLevel;
  notes?: string;
  evidenceCount: number;
}

export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "todo" | "in_progress" | "completed";

export interface LearningTaskItem {
  id: string;
  title: string;
  skillName?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueAt?: string;
  completedAt?: string | null;
}
