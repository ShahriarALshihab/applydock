"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
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
import { Navbar } from "@/components/layout/Navbar";
import { Logo } from "@/components/layout/Logo";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

/* ─────────────────────────── FAQ Data ─────────────────────────── */

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does ApplyDock differ from a traditional spreadsheet or Notion template?",
    answer:
      "Spreadsheets require manual date tracking, formulas for salary ranges, and offer no structured skill gap analysis. ApplyDock is purpose-built for engineering job searches: it provides real-time countdown alerts for upcoming interviews, tracks follow-up deadlines, evaluates technical skill matches against target roles, and delivers instant stage metrics without any manual formula upkeep.",
  },
  {
    question: "How does the 1–5 skill proficiency tracker work?",
    answer:
      "ApplyDock uses a standardized 1 to 5 scale (1: Fundamental, 2: Novice, 3: Intermediate, 4: Proficient, 5: Expert). You can profile your current strengths in languages, frameworks, and system design, compare them against each job opportunity's required skills, and immediately see what gaps you need to bridge before technical interview rounds.",
  },
  {
    question: "How are compensation packages and salaries formatted?",
    answer:
      "ApplyDock formats salaries cleanly with the standard currency symbol (e.g., ৳140,000 - ৳180,000 / mo) and accounts for monthly gross base pay, festival bonuses, and equity. You can record compensation expectations for each role and track market benchmarks across mid-level, senior, and lead engineering positions.",
  },
  {
    question: "Can I export my application data at any time?",
    answer:
      "Yes. ApplyDock provides full data portability with a one-click RFC 4180 compliant CSV export. You can export your full pipeline, notes, salary data, and interview dates at any time for offline analysis or personal archiving.",
  },
  {
    question: "Is ApplyDock private and secure?",
    answer:
      "ApplyDock uses end-to-end user isolation backed by Supabase PostgreSQL with strict Row Level Security (RLS) policies and bcrypt password hashing. Your job applications, compensation negotiations, and interview notes remain strictly private to your authenticated workspace.",
  },
];

/* ─────────────────────────── Features Data ─────────────────────────── */

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "Dual-Engine Pipeline: Board & Table",
    description:
      "Seamlessly toggle between visual Kanban columns with zero forced horizontal scrolling and high-density tabular data grids for rapid search, sorting, and filtering.",
    pill: "6 Core Stages",
    span: "md:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "Structured Salary Packaging",
    description:
      "Record monthly gross compensation in ৳, festival bonuses, and benchmark offers against senior market data.",
    pill: "৳140K–৳180K range",
    span: "md:col-span-1",
  },
  {
    icon: Award,
    title: "1–5 Skill Gap Radar",
    description:
      "Benchmark your technical competencies across languages and system design, and see exactly what to level up before technical rounds.",
    pill: "Target vs Current",
    span: "md:col-span-1",
  },
  {
    icon: Calendar,
    title: "Interview Countdown Alerts",
    description:
      "Never miss a recruiter follow-up or system design window. Automatic relative-time alerts keep your preparation strictly on schedule.",
    pill: "Relative time",
    span: "md:col-span-2",
  },
];

/* ─────────────────────────── Main Homepage ─────────────────────────── */

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);
  const [activeTab, setActiveTab] = React.useState<"pipeline" | "skills" | "timeline">("pipeline");

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-950">
      {/* Floating Scrolled Navbar */}
      <Navbar />

      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          {/* Eyebrow Status Pill */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-3.5 py-1 text-2xs font-semibold text-slate-700 shadow-2xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Career Pipeline &amp; Interview Intelligence</span>
            </div>
          </ScrollReveal>

          {/* Headline inspired by Simplify.jobs */}
          <ScrollReveal delayMs={60}>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-slate-950 dark:text-white">
              Land your next engineering role with{" "}
              <span className="text-emerald-700 dark:text-emerald-400 font-normal italic">
                complete clarity
              </span>
              .
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delayMs={120}>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Ditch disorganized spreadsheets. ApplyDock unites high-density pipeline management, automated interview countdown alerts, structured ৳ compensation benchmarking, and 1–5 technical skill profiling into one disciplined workspace.
            </p>
          </ScrollReveal>

          {/* Action CTAs */}
          <ScrollReveal delayMs={180}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-98 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 cursor-pointer">
                  <span>Explore Demo Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/register">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 shadow-2xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                  <span>Create Free Account</span>
                </button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Micro Trust Indicators */}
          <ScrollReveal delayMs={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-2xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Isolated Supabase Privacy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                <span>RFC 4180 CSV Export</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>৳ Compensation Tracking</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ═══════════════════════ PRODUCT PREVIEW CANVAS ═══════════════════════ */}
        <ScrollReveal delayMs={280}>
          <div className="mx-auto mt-14 max-w-5xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl dark:border-slate-800 dark:bg-[#10131b]">
              {/* Window Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/70">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  </div>
                  <span className="ml-3 text-2xs font-semibold text-slate-500 dark:text-slate-400">
                    ApplyDock — Engineering Career Pipeline
                  </span>
                </div>

                {/* Interactive View Switcher */}
                <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-2xs font-semibold dark:border-slate-800 dark:bg-slate-900">
                  <button
                    onClick={() => setActiveTab("pipeline")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === "pipeline"
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    Active Pipeline
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === "skills"
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    Skill Radar (1–5)
                  </button>
                  <button
                    onClick={() => setActiveTab("timeline")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === "timeline"
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    Milestones
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="p-4 sm:p-6 bg-slate-50/40 dark:bg-slate-950/40">
                {/* View 1: Active Pipeline */}
                {activeTab === "pipeline" && (
                  <div className="space-y-4">
                    {/* Top KPI Metrics Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                      <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                        <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500">
                          Active Search
                        </span>
                        <div className="font-display text-lg text-slate-950 dark:text-white mt-0.5">
                          8 Opportunities
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                        <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500">
                          Scheduled Rounds
                        </span>
                        <div className="font-display text-lg text-amber-700 dark:text-amber-400 mt-0.5">
                          3 Next 7 Days
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                        <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500">
                          Offers Extended
                        </span>
                        <div className="font-display text-lg text-emerald-700 dark:text-emerald-400 mt-0.5">
                          1 Extended
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                        <span className="text-3xs font-semibold uppercase tracking-wider text-slate-500">
                          Target Package
                        </span>
                        <div className="font-display text-lg text-slate-950 dark:text-white mt-0.5">
                          ৳155,000 / mo
                        </div>
                      </div>
                    </div>

                    {/* Realistic Application Cards Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-left">
                      {/* Card 1: Interview */}
                      <div className="rounded-xl border border-amber-200/80 bg-white p-4 space-y-2.5 shadow-2xs dark:border-amber-500/25 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-2xs font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                            Interview Round 3
                          </span>
                          <span className="text-3xs font-medium text-slate-500">Hybrid</span>
                        </div>
                        <h4 className="font-display text-base text-slate-900 dark:text-white">
                          Senior Backend Engineer
                        </h4>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                          bKash Limited
                        </p>
                        <div className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                          ৳140,000 - ৳180,000 / mo
                        </div>
                        <div className="rounded-lg bg-amber-50/70 border border-amber-200/60 p-2 text-2xs font-medium text-amber-800 dark:bg-amber-950/40 dark:border-amber-800/60 dark:text-amber-300 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          <span>System Design in 2 days</span>
                        </div>
                      </div>

                      {/* Card 2: Offer */}
                      <div className="rounded-xl border border-emerald-200/80 bg-white p-4 space-y-2.5 shadow-2xs dark:border-emerald-500/25 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-2xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                            Offer Extended
                          </span>
                          <span className="text-3xs rounded-full bg-emerald-600 px-2 py-0.5 font-bold text-white">
                            Decision Ready
                          </span>
                        </div>
                        <h4 className="font-display text-base text-slate-900 dark:text-white">
                          Lead Full Stack Engineer
                        </h4>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                          Brain Station 23
                        </p>
                        <div className="font-display text-base text-emerald-700 dark:text-emerald-400">
                          ৳155,000 / mo
                        </div>
                        <p className="text-2xs text-slate-500 dark:text-slate-400 leading-normal">
                          Includes 2x annual festival bonuses, medical coverage, and provident fund.
                        </p>
                      </div>

                      {/* Card 3: Applied */}
                      <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-2xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            Applied
                          </span>
                          <span className="text-3xs font-medium text-slate-500">Remote</span>
                        </div>
                        <h4 className="font-display text-base text-slate-900 dark:text-white">
                          Senior Frontend Engineer
                        </h4>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                          Pathao
                        </p>
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

                {/* View 2: Skill Radar */}
                {activeTab === "skills" && (
                  <div className="max-w-2xl mx-auto rounded-xl border border-slate-200/80 bg-white p-5 text-left shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                      <div>
                        <span className="text-3xs font-bold uppercase tracking-wider text-slate-500">
                          Technical Profiler
                        </span>
                        <h3 className="font-display text-base text-slate-950 dark:text-white">
                          1–5 Proficiency Scale &amp; Gap Analysis
                        </h3>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-2xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        85% Target Met
                      </span>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                          <span>TypeScript &amp; Next.js</span>
                          <span className="text-emerald-700 dark:text-emerald-400">Level 4 of 5 (Proficient)</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full w-4/5 bg-emerald-600 rounded" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                          <span>PostgreSQL &amp; Drizzle ORM</span>
                          <span className="text-emerald-700 dark:text-emerald-400">Level 4 of 5 (Target Met)</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full w-4/5 bg-emerald-600 rounded" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                          <span>Kafka &amp; Distributed Streaming</span>
                          <span className="text-amber-700 dark:text-amber-400">Level 2 of 5 (Target: Level 4)</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full w-2/5 bg-amber-500 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* View 3: Milestones */}
                {activeTab === "timeline" && (
                  <div className="max-w-2xl mx-auto rounded-xl border border-slate-200/80 bg-white p-5 text-left shadow-2xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                      <div>
                        <span className="text-3xs font-bold uppercase tracking-wider text-slate-500">
                          Upcoming Milestones
                        </span>
                        <h3 className="font-display text-base text-slate-950 dark:text-white">
                          Relative Countdown Alerts
                        </h3>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-2xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
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
                            <div className="text-2xs text-slate-500">bKash Limited • Distributed Payment Architecture</div>
                          </div>
                        </div>
                        <span className="font-bold text-amber-700 dark:text-amber-400">In 2 days</span>
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
        </ScrollReveal>
      </section>

      {/* ═══════════════════════ FEATURES BENTO SECTION ═══════════════════════ */}
      <section
        id="features"
        className="relative border-t border-slate-200/80 bg-surface-subtle py-20 sm:py-28 dark:border-slate-800"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-2xs font-semibold text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 shadow-2xs">
                Built for High-Stakes Moves
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl tracking-tight text-slate-950 dark:text-white">
                Engineered for serious career transitions.
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                No fragile spreadsheet formulas, no missed recruiter follow-ups, and no ambiguity about your skill gaps.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} delayMs={i * 60}>
                <div
                  className={`h-full rounded-2xl border border-slate-200/90 bg-white p-7 shadow-2xs transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-[#10131b] dark:hover:border-slate-700 flex flex-col justify-between ${f.span}`}
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-3xs font-semibold text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400">
                        {f.pill}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-slate-950 dark:text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SPREADSHEETS VS APPLYDOCK ═══════════════════════ */}
      <section
        id="comparison"
        className="relative border-t border-slate-200/80 bg-background py-20 sm:py-28 dark:border-slate-800"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-xl text-center">
              <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-slate-950 dark:text-white">
                Why engineers switch from Excel &amp; Notion.
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Generic productivity tools weren&apos;t built to navigate technical interview processes.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* The Old Way */}
            <ScrollReveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 dark:border-slate-800 dark:bg-[#10131b]">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider dark:text-rose-400">
                  <CloseIcon className="h-4 w-4" />
                  <span>Messy Spreadsheets &amp; Notion</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  {[
                    "Manual date tracking and missed follow-up deadlines",
                    "Zero skill gap analysis against target role requirements",
                    "Forced horizontal scrolling and broken mobile experience",
                    "Unstructured compensation tracking without bonus comparisons",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <CloseIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500/70" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* The ApplyDock Way */}
            <ScrollReveal delayMs={80}>
              <div className="h-full rounded-2xl border border-emerald-300/80 bg-white p-6 sm:p-7 shadow-xs dark:border-emerald-600/30 dark:bg-[#10131b]">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider dark:text-emerald-400">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span>The ApplyDock Standard</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {[
                    "Adaptive Kanban board with automated countdown alerts",
                    "Integrated 1–5 technical proficiency profiler and gap roadmap",
                    "Slide-over inspector for job requirements, contacts, and logs",
                    "Full user isolation with instant RFC 4180 CSV export anytime",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ACCORDION ═══════════════════════ */}
      <section
        id="faq"
        className="relative border-t border-slate-200/80 bg-surface-subtle py-20 sm:py-28 dark:border-slate-800"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-xl text-center">
              <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-2xs font-semibold text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 shadow-2xs">
                Got Questions?
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl tracking-tight text-slate-950 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Everything you need to know about ApplyDock and how it powers disciplined career management.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={60}>
            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl border border-slate-200/90 bg-white transition-colors dark:border-slate-800 dark:bg-[#10131b]"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 transition-colors hover:text-slate-700 dark:text-white dark:hover:text-slate-200 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-slate-900 dark:text-white" : ""
                        }`}
                      />
                    </button>

                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-slate-100 px-5 pt-3 pb-5 text-sm text-slate-600 leading-relaxed dark:border-slate-800 dark:text-slate-400">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ FINAL CALL TO ACTION ═══════════════════════ */}
      <section className="relative border-t border-slate-200/80 bg-background py-20 sm:py-28 dark:border-slate-800">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-slate-950 leading-tight dark:text-white">
              Take full control of your next career move.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-slate-600 dark:text-slate-400">
              Organize your pipeline, bridge technical gaps, and interview with complete clarity.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-98 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 cursor-pointer">
                  <span>Create Free Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/login">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 shadow-2xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                  Sign In as Demo User
                </button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="border-t border-slate-200/80 bg-background py-10 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:px-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xs text-slate-500 dark:text-slate-500">
              Smart Job Search &amp; Skill Command Center
            </span>
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-600">
            © 2026 ApplyDock. Built for disciplined engineering careers.
          </div>
        </div>
      </footer>
    </div>
  );
}
