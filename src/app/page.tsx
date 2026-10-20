"use client";

import * as React from "react";
import Link from "next/link";
import {
  Briefcase,
  ArrowRight,
  Sparkles,
  Calendar,
  TrendingUp,
  Clock,
  Award,
  Download,
  ShieldCheck,
  ChevronDown,
  Check,
  X as CloseIcon,
  LayoutGrid,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does Proofly differ from a traditional spreadsheet or Notion template?",
    answer:
      "Spreadsheets require manual date tracking, formulas for salary ranges, and offer no structured skill gap analysis. Proofly is purpose-built for engineering job searches: it provides real-time countdown alerts for upcoming interviews, tracks follow-up deadlines, evaluates technical skill matches against target roles, and delivers instant stage metrics without any manual formula upkeep.",
  },
  {
    question: "How does the 1–5 skill proficiency tracker work?",
    answer:
      "Proofly uses a standardized 1 to 5 scale (1: Fundamental, 2: Novice, 3: Intermediate, 4: Proficient, 5: Expert). You can profile your current strengths in languages, frameworks, and system design, compare them against each job opportunity's required skills, and immediately see what gaps you need to bridge before technical interview rounds.",
  },
  {
    question: "How are compensation packages and salaries formatted?",
    answer:
      "Proofly formats salaries cleanly with standard currency symbols (e.g., ৳140,000 - ৳180,000 / mo) and accounts for monthly gross base pay, festival bonuses, and equity. You can record compensation expectations for each role and track market benchmarks across mid-level, senior, and lead engineering positions.",
  },
  {
    question: "Can I export my application data at any time?",
    answer:
      "Yes. Proofly provides full data portability with a one-click RFC 4180 compliant CSV export. You can export your full pipeline, notes, salary data, and interview dates at any time for offline analysis or personal archiving.",
  },
  {
    question: "Is Proofly private and secure?",
    answer:
      "Proofly uses end-to-end user isolation backed by Supabase PostgreSQL with strict Row Level Security (RLS) policies and bcrypt password hashing. Your job applications, compensation negotiations, and interview notes remain strictly private to your authenticated workspace.",
  },
];

export default function HomePage() {
  const [activeHeroTab, setActiveHeroTab] = React.useState<"pipeline" | "skills" | "timeline">("pipeline");
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans antialiased transition-colors duration-200 dark:bg-[#070b14] dark:text-slate-100">
      {/* Subtle Atmospheric Top Pattern (Theme Adaptive) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-[100px] rounded-full dark:from-indigo-600/20 dark:via-purple-600/10" />
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(rgba(100, 116, 139, 0.5) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Floating Header Navbar */}
      <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between rounded-full border border-slate-200/90 bg-white/85 px-5 shadow-xs backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-2xl">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <Briefcase className="h-4.5 w-4.5" />
            </div>
            <span className="font-display text-lg tracking-tight text-slate-950 dark:text-white">
              Proofly
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#comparison" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
              Why Proofly
            </a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <button className="text-xs font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors px-3 py-1.5 cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-xs cursor-pointer">
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Art-Directed Hero Section with Simplify-style Typography */}
      <section className="relative z-10 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          {/* Refined Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/70 px-3.5 py-1 text-2xs font-semibold text-indigo-700 backdrop-blur-md mb-6 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            <span>Structured Job Search & Skill Gap Command Center</span>
          </div>

          {/* Headline with Simplify-Style DM Serif Display Font */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-950 dark:text-white leading-[1.1]">
            Master every interview,{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-300 dark:to-indigo-200">
              salary negotiation, and skill gap.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Ditch disorganized spreadsheets. Proofly unites high-density pipeline management, automated interview countdown alerts, structured salary tracking, and 1–5 technical skill profiling into one disciplined workspace.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link href="/login">
              <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all cursor-pointer">
                <Sparkles className="h-4 w-4" />
                <span>Instant Demo Access</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/register">
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-all shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                <span>Create Workspace</span>
              </button>
            </Link>
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Isolated Workspace Privacy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Download className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Instant CSV Data Export</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span>Compensation Intelligence</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Workspace Canvas */}
        <div className="relative mx-auto mt-12 max-w-5xl px-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl dark:border-slate-800/90 dark:bg-slate-900/90 dark:shadow-[0_0_60px_rgba(79,70,229,0.12)]">
            {/* Window Controls & View Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/80">
              <div className="flex items-center gap-2">
                <div className="flex h-3 w-3 gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="ml-3 text-2xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Proofly Pipeline Canvas
                </span>
              </div>

              {/* View Selector Tabs */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-2xs font-semibold dark:border-slate-800 dark:bg-slate-900">
                <button
                  onClick={() => setActiveHeroTab("pipeline")}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeHeroTab === "pipeline"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Active Pipeline
                </button>
                <button
                  onClick={() => setActiveHeroTab("skills")}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeHeroTab === "skills"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Skill Radar (1–5)
                </button>
                <button
                  onClick={() => setActiveHeroTab("timeline")}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeHeroTab === "timeline"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Milestones
                </button>
              </div>
            </div>

            {/* Canvas Body */}
            <div className="p-4 sm:p-6 bg-slate-50/40 dark:bg-slate-950/40">
              {/* Tab 1: Active Pipeline View */}
              {activeHeroTab === "pipeline" && (
                <div className="space-y-4">
                  {/* Summary Metric Header */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                      <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Active Applications
                      </span>
                      <div className="font-display text-lg text-slate-950 dark:text-white mt-0.5">8 In Motion</div>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                      <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Interview Conversion
                      </span>
                      <div className="font-display text-lg text-emerald-600 dark:text-emerald-400 mt-0.5">
                        42% Success Rate
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                      <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Upcoming Rounds
                      </span>
                      <div className="font-display text-lg text-amber-600 dark:text-amber-400 mt-0.5">
                        3 This Week
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-2xs">
                      <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Target Compensation
                      </span>
                      <div className="font-display text-lg text-indigo-600 dark:text-indigo-400 mt-0.5">
                        ৳150,000 / mo
                      </div>
                    </div>
                  </div>

                  {/* 3 Real Opportunity Cards Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-left">
                    {/* Card 1: Interview */}
                    <div className="rounded-xl border border-amber-200/80 bg-white p-4 space-y-2.5 shadow-2xs dark:border-amber-500/30 dark:bg-slate-900">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-amber-50 px-2 py-0.5 text-2xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                          Interview Round 3
                        </span>
                        <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400">Hybrid</span>
                      </div>
                      <h4 className="font-display text-base text-slate-900 dark:text-white">Senior Backend Engineer</h4>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300">bKash Limited</p>
                      <div className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                        ৳140,000 - ৳180,000 / mo
                      </div>
                      <div className="rounded-lg bg-amber-50/80 border border-amber-200/60 p-2 text-2xs font-medium text-amber-800 dark:bg-amber-950/40 dark:border-amber-800/60 dark:text-amber-300 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        <span>System Design in 2 days</span>
                      </div>
                    </div>

                    {/* Card 2: Offer */}
                    <div className="rounded-xl border border-emerald-200/80 bg-white p-4 space-y-2.5 shadow-2xs dark:border-emerald-500/30 dark:bg-slate-900">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-2xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                          Offer Received
                        </span>
                        <span className="text-3xs rounded-full bg-emerald-500 px-2 py-0.5 font-bold text-white">
                          Accepted
                        </span>
                      </div>
                      <h4 className="font-display text-base text-slate-900 dark:text-white">Lead Full Stack Engineer</h4>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Brain Station 23</p>
                      <div className="font-display text-base text-emerald-600 dark:text-emerald-400">
                        ৳155,000 / mo
                      </div>
                      <p className="text-2xs text-slate-500 dark:text-slate-400">
                        Includes 2x annual festival bonuses, medical coverage, and provident fund.
                      </p>
                    </div>

                    {/* Card 3: Applied */}
                    <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-2xs font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                          Applied
                        </span>
                        <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400">Remote</span>
                      </div>
                      <h4 className="font-display text-base text-slate-900 dark:text-white">Senior Frontend Engineer</h4>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Pathao</p>
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        ৳125,000 - ৳160,000 / mo
                      </div>
                      <div className="flex items-center gap-1.5 text-2xs text-slate-500 dark:text-slate-400">
                        <Clock className="h-3 w-3 shrink-0" />
                        <span>Follow-up scheduled in 4 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Skill Radar Preview */}
              {activeHeroTab === "skills" && (
                <div className="max-w-2xl mx-auto rounded-xl border border-slate-200/80 bg-white p-5 text-left shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div>
                      <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Technical Skill Profiler
                      </span>
                      <h3 className="font-display text-base text-slate-950 dark:text-white">
                        1–5 Proficiency Scale & Gap Analysis
                      </h3>
                    </div>
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-2xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      85% Target Match
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                        <span>TypeScript & Next.js</span>
                        <span className="text-indigo-600 dark:text-indigo-400">Level 4 of 5 (Proficient)</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full w-4/5 bg-indigo-600 dark:bg-indigo-500 rounded" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                        <span>PostgreSQL & Relational Data Architecture</span>
                        <span className="text-emerald-600 dark:text-emerald-400">Level 4 of 5 (Target Met)</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full w-4/5 bg-emerald-500 rounded" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                        <span>Kafka & Distributed Streaming</span>
                        <span className="text-amber-600 dark:text-amber-400">Level 2 of 5 (Target: Level 4)</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full w-2/5 bg-amber-500 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Timeline & Milestones Preview */}
              {activeHeroTab === "timeline" && (
                <div className="max-w-2xl mx-auto rounded-xl border border-slate-200/80 bg-white p-5 text-left shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div>
                      <span className="text-3xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Upcoming Milestones
                      </span>
                      <h3 className="font-display text-base text-slate-950 dark:text-white">
                        Relative Time Interview Countdown
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-2xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      0 Overdue
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-xs dark:border-slate-800 dark:bg-slate-950/50">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            System Design Technical Round
                          </div>
                          <div className="text-2xs text-slate-500">bKash Limited • Distributed Architecture</div>
                        </div>
                      </div>
                      <span className="font-bold text-amber-600 dark:text-amber-400">In 2 days</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-xs dark:border-slate-800 dark:bg-slate-950/50">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            Recruiter Follow-up Check-in
                          </div>
                          <div className="text-2xs text-slate-500">Pathao • Senior Frontend Role</div>
                        </div>
                      </div>
                      <span className="font-bold text-slate-600 dark:text-slate-300">In 4 days</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section with Simplify-Style Headings */}
      <section id="features" className="relative z-10 py-20 border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300">
              High-Density Architecture
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl tracking-tight text-slate-950 dark:text-white">
              Every tool engineered for your career moves.
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              No spreadsheets, no missed recruiter emails, and no guessing where your skills stand.
            </p>
          </div>

          {/* Asymmetric Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Dual Mode Grid */}
            <div className="md:col-span-2 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-xs hover:border-slate-300 transition-all dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 mb-4">
                  <LayoutGrid className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-slate-950 dark:text-white">Dual-Engine Pipeline: Board & Table</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                  Seamlessly toggle between visual Kanban columns with zero forced horizontal scrolling and high-density tabular data grids for bulk search, sorting, and filtering.
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 grid grid-cols-3 gap-3 text-center text-xs dark:border-slate-800 dark:bg-slate-950/60">
                <div className="p-2 rounded bg-slate-50 dark:bg-white/5">
                  <span className="text-2xs text-slate-500 dark:text-slate-400">Kanban Board</span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">6 Core Stages</div>
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-white/5">
                  <span className="text-2xs text-slate-500 dark:text-slate-400">Data Grid</span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">Fast Sort & Filter</div>
                </div>
                <div className="p-2 rounded bg-slate-50 dark:bg-white/5">
                  <span className="text-2xs text-slate-500 dark:text-slate-400">Slide-Out Panel</span>
                  <div className="font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">Deep Inspector</div>
                </div>
              </div>
            </div>

            {/* Card 2: Compensation Tracking */}
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-xs hover:border-slate-300 transition-all dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 mb-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-slate-950 dark:text-white">Structured Salary Packaging</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Track monthly gross compensation, festival bonuses, and market benchmarks across all your active and offered opportunities.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-xl border border-purple-200 bg-purple-50/60 text-center dark:border-purple-500/20 dark:bg-purple-500/5">
                <span className="text-3xs uppercase font-bold text-purple-700 dark:text-purple-300">
                  Target Senior Benchmark
                </span>
                <div className="font-display text-xl text-slate-950 dark:text-white mt-1">৳140,000 - ৳180,000</div>
                <span className="text-2xs text-slate-500 dark:text-slate-400">Monthly package</span>
              </div>
            </div>

            {/* Card 3: 1-5 Skill Profiler */}
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-xs hover:border-slate-300 transition-all dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 mb-4">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-slate-950 dark:text-white">1–5 Skill Gap Radar</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Benchmark your capabilities on a standardized 1 to 5 scale and visualize exactly what to level up before technical interviews.
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-2xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Kafka & Distributed Streaming</span>
                  <span className="text-amber-600 dark:text-amber-400">Level 2 → Target: 4</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full w-1/2 bg-amber-500 rounded" />
                </div>
              </div>
            </div>

            {/* Card 4: Milestones & Overdue Alerts */}
            <div className="md:col-span-2 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-7 shadow-xs hover:border-slate-300 transition-all dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 mb-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-slate-950 dark:text-white">
                  Interview Milestones & Countdown Alerts
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                  Never forget to follow up with a hiring manager. Proofly tracks relative time countdowns right on your cards, alerting you to rounds and overdue check-ins.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-emerald-800 font-semibold flex items-center gap-1.5 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300">
                  <Calendar className="h-3.5 w-3.5" /> Technical Round (bKash)
                </span>
                <span className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-amber-800 font-semibold flex items-center gap-1.5 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-300">
                  <Clock className="h-3.5 w-3.5" /> Follow-up Due (Pathao)
                </span>
                <span className="rounded-lg bg-purple-50 border border-purple-200 px-3 py-1.5 text-purple-800 font-semibold flex items-center gap-1.5 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-300">
                  <Sparkles className="h-3.5 w-3.5" /> Offer Decision (Brain Station 23)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section: Spreadsheets vs Proofly */}
      <section id="comparison" className="relative z-10 py-20 border-t border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-[#070b14]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-slate-950 dark:text-white">
              Why engineers switch from Excel & Notion.
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Generic spreadsheets weren&apos;t designed for technical job search management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 sm:p-7 space-y-4 dark:border-rose-500/20 dark:bg-rose-500/5">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm uppercase tracking-wider dark:text-rose-400">
                <CloseIcon className="h-4 w-4" />
                <span>Messy Spreadsheets & Notes</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CloseIcon className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Manual date calculations and missed follow-up deadlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <CloseIcon className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Zero skill gap analysis against job descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CloseIcon className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Clunky horizontal scrolling on smaller screens</span>
                </li>
                <li className="flex items-start gap-2">
                  <CloseIcon className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>Disconnected notes with no structured compensation view</span>
                </li>
              </ul>
            </div>

            {/* The Proofly Way */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 sm:p-7 space-y-4 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider dark:text-emerald-400">
                <Check className="h-4 w-4 stroke-[3]" />
                <span>The Proofly Standard</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Adaptive Kanban board with automated countdown alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Integrated 1–5 skill proficiency profiler and sprint tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Slide-over inspector for job requirements, contacts, and logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>Full ownership with instant RFC 4180 CSV export anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Production-Quality Functional FAQ Section (Accordion) */}
      <section id="faq" className="relative z-10 py-20 border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-300">
              Got Questions?
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl tracking-tight text-slate-950 dark:text-white">
              Frequently Asked Questions.
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Everything you need to know about Proofly and how it powers disciplined career management.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/60 shadow-2xs transition-all dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="border-t border-slate-200/70 px-4 pt-3 pb-5 text-xs text-slate-600 leading-relaxed dark:border-slate-800 dark:text-slate-300 sm:px-5"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern High-End CTA Section */}
      <section className="relative z-10 py-20 border-t border-slate-200/80 bg-gradient-to-b from-slate-50 via-indigo-50/40 to-slate-100 dark:border-slate-800 dark:from-[#070b14] dark:to-indigo-950/40">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-slate-950 sm:leading-[1.15] dark:text-white">
            Take full control of your next career move.
          </h2>
          <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto dark:text-slate-300">
            Organize your opportunities, bridge technical skill gaps, and interview with complete clarity.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link href="/register">
              <button className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-indigo-500 transition-all hover:scale-102 cursor-pointer">
                Create Free Workspace
              </button>
            </Link>
            <Link href="/login">
              <button className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-all shadow-2xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                Sign In as Demo User
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalist Studio Footer */}
      <footer className="relative z-10 border-t border-slate-200/80 bg-white py-10 text-slate-500 text-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-white font-bold">
              <Briefcase className="h-3.5 w-3.5" />
            </div>
            <span className="font-display font-bold text-slate-900 dark:text-slate-200">Proofly</span>
            <span>— Smart Job Application & Skill Tracker</span>
          </div>
          <div>© 2026 Proofly. Built for disciplined engineering careers.</div>
        </div>
      </footer>
    </div>
  );
}
