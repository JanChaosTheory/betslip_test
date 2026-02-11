"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SunSolidIcon } from "./SunSolidIcon";

/* Fixed geometry (both themes):
 * Track: h-10 (40px), w-[4.25rem] (68px), p-1 (4px) → inner 60×32
 * Thumb: size-8 (32px), top-1 left-1 → translateX(28px) when checked (see globals.css)
 * Formula: dx = 68 - 32 - 2*4 = 28
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-[4.25rem] shrink-0 rounded-full border border-border bg-muted/90 p-1"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      role="switch"
      data-state={isDark ? "checked" : "unchecked"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-checked={isDark}
      className={cn(
        "theme-toggle-track relative flex h-10 w-[4.25rem] shrink-0 items-stretch overflow-hidden rounded-full border border-border bg-muted/90 p-1 shadow-inner",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      {/* Icons: fixed positions, below thumb, never clip */}
      <span
        className="theme-toggle-icon theme-toggle-sun pointer-events-none absolute inset-y-0 left-2 z-0 flex items-center justify-center"
        aria-hidden
      >
        <SunSolidIcon className="size-4" />
      </span>
      <span
        className="theme-toggle-icon theme-toggle-moon pointer-events-none absolute inset-y-0 right-2 z-0 flex items-center justify-center"
        aria-hidden
      >
        <Moon className="size-4" fill="currentColor" strokeWidth={1.5} />
      </span>
      {/* Thumb: stays inside track inner bounds (top-1 left-1 + size-8), translate via CSS */}
      <span
        className={cn(
          "theme-toggle-knob absolute left-1 top-1 z-10 size-8 rounded-full bg-background shadow-md ring-1 ring-black/10",
          "dark:bg-zinc-600 dark:ring-white/10"
        )}
      />
    </button>
  );
}
