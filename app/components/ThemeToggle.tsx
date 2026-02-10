"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SunSolidIcon } from "./SunSolidIcon";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-[4.25rem] shrink-0 rounded-full border border-border bg-muted/90"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      data-state={isDark ? "checked" : "unchecked"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "theme-toggle-track relative h-9 w-[4.25rem] shrink-0 rounded-full border border-border bg-muted/90 shadow-inner",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <span className="theme-toggle-sun theme-toggle-icon theme-toggle-icon-left" aria-hidden>
        <SunSolidIcon className="size-4" />
      </span>
      <span className="theme-toggle-moon theme-toggle-icon theme-toggle-icon-right" aria-hidden>
        <Moon className="size-4" fill="currentColor" strokeWidth={1.5} />
      </span>
      <span
        className={cn(
          "theme-toggle-knob absolute left-1 top-0.5 z-10 size-8 rounded-full bg-background shadow-md ring-1 ring-black/10",
          "dark:bg-zinc-600 dark:ring-white/10"
        )}
      />
    </button>
  );
}
