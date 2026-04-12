import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  children: React.ReactNode;
  /** e.g. "Sign in to LUNAR" */
  title: string;
  /** Supporting line under title */
  subtitle?: string;
  /** Small line above title */
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
  /** Replaces default fine print under the card */
  footerNote?: string;
  /** Admin pages use a slightly denser, system-dark-friendly shell */
  variant?: "store" | "admin";
};

/**
 * Apple ID–inspired layout: centered column, calm typography, works in light & dark.
 */
export const AuthShell: React.FC<AuthShellProps> = ({
  children,
  title,
  subtitle,
  eyebrow,
  backHref = "/",
  backLabel = "LUNAR Store",
  footerNote,
  variant = "store",
}) => {
  return (
    <div
      className={cn(
        "min-h-[100dvh] pb-safe pt-safe text-foreground antialiased selection:bg-primary/25",
        "bg-[#f5f5f7] dark:bg-black",
        variant === "admin" && "dark:bg-black",
      )}
    >
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col px-4 sm:max-w-[520px] sm:px-6 md:max-w-[560px] md:px-8 lg:max-w-[600px]">
        {/* Top bar: back + theme */}
        <header className="flex shrink-0 items-center justify-between gap-4 py-3 sm:py-4 md:py-5">
          <Link
            to={backHref}
            className="inline-flex min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-lg px-1 text-[15px] font-medium text-[#1d1d1f]/70 transition hover:text-[#1d1d1f] dark:text-white/60 dark:hover:text-white"
          >
            <ChevronLeft className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
            <span className="hidden sm:inline">{backLabel}</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <ThemeToggle className="h-11 w-11 shrink-0 border border-black/[0.08] bg-white/80 dark:border-white/10 dark:bg-white/5" />
        </header>

        <main className="flex flex-1 flex-col justify-center pb-8 pt-2 sm:pb-12 sm:pt-4 md:pb-16">
          <div
            className={cn(
              "rounded-[18px] border px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-11",
              "border-black/[0.06] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.06)]",
              "dark:border-white/[0.08] dark:bg-[#1c1c1e] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]",
            )}
          >
            <div className="mb-8 text-center md:mb-9">
              <p className="font-bold tracking-tight text-[#1d1d1f] dark:text-white">
                <span className="text-[21px] sm:text-[22px]">LUNAR</span>
                <span className="text-primary">.</span>
              </p>
              {eyebrow && (
                <p className="mt-3 text-[13px] font-medium leading-snug text-black/50 dark:text-white/50">{eyebrow}</p>
              )}
              <h1 className="mt-4 text-[28px] font-semibold leading-[1.1] tracking-tight text-[#1d1d1f] dark:text-white sm:text-[32px] md:text-[34px]">
                {title}
              </h1>
              {subtitle && (
                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-black/55 dark:text-white/55 md:text-[17px]">
                  {subtitle}
                </p>
              )}
            </div>
            {children}
          </div>

          <p className="mt-8 text-center text-[12px] leading-relaxed text-black/45 dark:text-white/40 sm:text-[13px]">
            {footerNote ??
              "Secure sign-in. Passwords are hashed; we never store them in plain text."}
          </p>
        </main>
      </div>
    </div>
  );
};
