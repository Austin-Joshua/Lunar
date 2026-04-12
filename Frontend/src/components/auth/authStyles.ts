import { cn } from "@/lib/utils";

/** Apple-style field: 17px body, 8–10px radius, clear light/dark borders. */
export const authFieldClass = cn(
  "w-full min-h-[48px] rounded-[10px] border px-4 py-3 text-[17px] font-normal leading-snug tracking-tight transition-shadow",
  "border-black/[0.12] bg-white text-[#1d1d1f] shadow-[0_1px_2px_rgba(0,0,0,0.04)] placeholder:text-black/40",
  "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25",
  "dark:border-white/12 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:placeholder:text-white/35 dark:focus:border-primary dark:focus:ring-primary/30",
);

export const authFieldWithIconClass = cn(authFieldClass, "pl-11");

export const authLabelClass = cn(
  "mb-1.5 block text-[13px] font-medium leading-tight text-[#1d1d1f] dark:text-white/90",
);

export const authPrimaryButtonClass = cn(
  "flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-4 text-[17px] font-semibold text-primary-foreground transition",
  "hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50",
);

export const authSecondaryLinkClass = cn(
  "text-[13px] font-medium text-primary underline-offset-4 hover:underline",
);
