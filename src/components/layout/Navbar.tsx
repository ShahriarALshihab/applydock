"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Logo } from "@/components/layout/Logo";

export function Navbar() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Trigger floating pill transformation after 28px scroll
      setIsScrolled(window.scrollY > 28);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      <div
        className={`mx-auto pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between ${
          isScrolled
            ? "mt-3 sm:mt-4 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-4xl rounded-full bg-white/95 dark:bg-[#10131b]/95 border border-slate-200/90 dark:border-slate-800/90 shadow-[0_8px_30px_rgba(0,0,0,0.07)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md px-4 sm:px-6 py-2"
            : "w-full max-w-6xl px-4 sm:px-6 pt-4 sm:pt-6 pb-2 bg-transparent border-b border-transparent"
        }`}
      >
        {/* Clickable Logo Lockup */}
        <Logo size={isScrolled ? "sm" : "md"} />

        {/* Central Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600 dark:text-slate-300">
          <Link
            href="#features"
            className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
          >
            Features
          </Link>
          <Link
            href="#comparison"
            className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
          >
            Why ApplyDock
          </Link>
          <Link
            href="#faq"
            className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
          >
            FAQ
          </Link>
        </nav>

        {/* Right Actions: Theme Toggle + Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {status === "authenticated" && session?.user ? (
            <Link href="/dashboard">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 sm:px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-slate-800 active:scale-97 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 cursor-pointer">
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <button className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer rounded-full">
                  Sign In
                </button>
              </Link>

              <Link href="/register">
                <button className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 sm:px-4 py-1.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-slate-800 active:scale-97 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 cursor-pointer">
                  <span>Get Started</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
