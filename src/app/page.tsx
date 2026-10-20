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
  Layers,
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
    question:
      "How does ApplyDock differ from a traditional spreadsheet or Notion template?",
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
      "ApplyDock formats salaries cleanly with standard currency symbols (e.g., ৳140,000 - ৳180,000 / mo) and accounts for monthly gross base pay, festival bonuses, and equity. You can record compensation expectations for each role and track market benchmarks across mid-level, senior, and lead engineering positions.",
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

/* ─────────────────────────── Feature Data ─────────────────────────── */

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "Dual-Mode Pipeline",
    description:
      "Toggle between visual Kanban columns and high-density data tables. Sort, filter, and inspect every application without horizontal scrolling.",
    detail: "Board + Table",
    span: "md:col-span-2",
  },
  {
    icon: TrendingUp,
    title: "Compensation Tracker",
    description:
      "Record monthly gross pay, festival bonuses, and equity for every opportunity. Compare offers side-by-side with market benchmarks.",
    detail: "৳140K–৳180K range",
    span: "",
  },
  {
    icon: Award,
    title: "1–5 Skill Gap Radar",
    description:
      "Profile your capabilities on a standardized scale and see exactly what to level up before each technical interview round.",
    detail: "Gap analysis",
    span: "",
  },
  {
    icon: Calendar,
    title: "Interview Countdowns",
    description:
      "Automatic countdown alerts for upcoming rounds and follow-up deadlines. Never miss a recruiter check-in or system design prep window.",
    detail: "Relative time",
    span: "md:col-span-2",
  },
];

/* ─────────────────────────── Component ─────────────────────────── */

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* Shared Navbar */}
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          {/* Headline */}
          <ScrollReveal>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-slate-950 dark:text-white">
              Your entire job search,{" "}
              <span className="text-slate-500 dark:text-slate-400">
                finally organized.
              </span>
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delayMs={80}>
            <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Track applications, interview countdowns, salary negotiations, and
              skill gaps — all in one disciplined workspace built for engineers.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delayMs={140}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/login">
                <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 cursor-pointer">
                  <span>Try Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/register">
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                  Create Account
                </button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Trust Signals */}
          <ScrollReveal delayMs={200}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-500 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Private workspace
              </span>
              <span className="flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5" />
                CSV export
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                Board + Table views
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Hero Product Preview — Restrained Card */}
        <ScrollReveal delayMs={260}>
          <div className="mx-auto mt-14 max-w-4xl px-5">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
              {/* Window bar */}
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="ml-3 text-2xs font-medium text-slate-400 dark:text-slate-500">
                  ApplyDock — Pipeline
                </span>
              </div>

              {/* Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 dark:bg-slate-800">
                {[
                  { label: "Active", value: "8", color: "text-slate-900 dark:text-white" },
                  { label: "Interviews", value: "3", color: "text-amber-600 dark:text-amber-400" },
                  { label: "Offers", value: "1", color: "text-emerald-600 dark:text-emerald-400" },
                  { label: "Avg Target", value: "৳155K/mo", color: "text-slate-900 dark:text-white" },
                ].map((m) => (
                  <div key={m.label} className="bg-white px-4 py-3 dark:bg-slate-900">
                    <div className="text-2xs font-medium text-slate-500 dark:text-slate-500">
                      {m.label}
                    </div>
                    <div className={`text-lg font-semibold tracking-tight ${m.color}`}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Application Rows */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  {
                    role: "Senior Backend Engineer",
                    company: "bKash Limited",
                    stage: "Interview",
                    stageColor: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
                    salary: "৳140K–৳180K",
                    note: "System Design in 2 days",
                    noteIcon: Calendar,
                  },
                  {
                    role: "Lead Full Stack Engineer",
                    company: "Brain Station 23",
                    stage: "Offer",
                    stageColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
                    salary: "৳155K",
                    note: "Accepted — includes festival bonuses",
                    noteIcon: Check,
                  },
                  {
                    role: "Senior Frontend Engineer",
                    company: "Pathao",
                    stage: "Applied",
                    stageColor: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
                    salary: "৳125K–৳160K",
                    note: "Follow-up in 4 days",
                    noteIcon: Clock,
                  },
                ].map((row) => (
                  <div
                    key={row.role}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3.5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`shrink-0 rounded-md px-2 py-0.5 text-2xs font-semibold ${row.stageColor}`}>
                          {row.stage}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 truncate dark:text-white">
                          {row.role}
                        </h4>
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span>{row.company}</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {row.salary}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-2xs text-slate-500 dark:text-slate-400 shrink-0">
                      <row.noteIcon className="h-3 w-3" />
                      <span>{row.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════ FEATURES ═══════════════════════ */}
      <section
        id="features"
        className="relative border-t border-slate-200/80 bg-surface-subtle py-20 sm:py-24 dark:border-slate-800"
      >
        <div className="mx-auto max-w-6xl px-5">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-slate-950 dark:text-white">
                Everything you need, nothing you don&apos;t.
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                No spreadsheet formulas, no missed recruiter emails, no guessing
                where your skills stand.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} delayMs={i * 60}>
                <div
                  className={`group h-full rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 ${f.span}`}
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <f.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="font-display text-lg text-slate-950 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ COMPARISON ═══════════════════════ */}
      <section
        id="comparison"
        className="relative border-t border-slate-200/80 bg-background py-20 sm:py-24 dark:border-slate-800"
      >
        <div className="mx-auto max-w-5xl px-5">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-xl text-center">
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-slate-950 dark:text-white">
                Why engineers switch from Excel&nbsp;\&&nbsp;Notion.
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Generic spreadsheets weren&apos;t designed for technical job
                search management.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* The Old Way */}
            <ScrollReveal>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-400">
                  <CloseIcon className="h-4 w-4" />
                  <span>Messy Spreadsheets</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  {[
                    "Manual date calculations and missed follow-up deadlines",
                    "Zero skill gap analysis against job descriptions",
                    "Clunky horizontal scrolling on smaller screens",
                    "Disconnected notes with no structured compensation view",
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
              <div className="h-full rounded-xl border border-emerald-200 bg-white p-6 dark:border-emerald-900/60 dark:bg-slate-900">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span>The ApplyDock Way</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {[
                    "Adaptive Kanban board with automated countdown alerts",
                    "Integrated 1–5 skill proficiency profiler and sprint tasks",
                    "Slide-over inspector for job requirements, contacts, and logs",
                    "Full ownership with instant RFC 4180 CSV export anytime",
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

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section
        id="faq"
        className="relative border-t border-slate-200/80 bg-surface-subtle py-20 sm:py-24 dark:border-slate-800"
      >
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-xl text-center">
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-slate-950 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                Everything you need to know about ApplyDock and how it works.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={60}>
            <div className="space-y-2.5">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900"
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
                          isOpen ? "rotate-180" : ""
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

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="relative border-t border-slate-200/80 bg-background py-20 sm:py-24 dark:border-slate-800">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl px-5 text-center">
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-slate-950 leading-tight dark:text-white">
              Take control of your next career move.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-slate-600 dark:text-slate-400">
              Organize opportunities, bridge skill gaps, and interview with
              complete clarity.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 cursor-pointer">
                  Create Free Workspace
                </button>
              </Link>
              <Link href="/login">
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                  Sign In as Demo User
                </button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="border-t border-slate-200/80 bg-background py-8 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xs text-slate-500 dark:text-slate-500">
              Smart Job Search &amp; Skill Tracker
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
