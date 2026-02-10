"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

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
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "theme-transition relative flex h-9 w-[4.25rem] shrink-0 items-center rounded-full border border-border bg-muted/90 px-1 shadow-inner",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <span className="flex size-8 flex-1 items-center justify-center text-muted-foreground">
        <Sun className="size-4" />
      </span>
      <span className="flex size-8 flex-1 items-center justify-center text-muted-foreground">
        <Moon className="size-4" />
      </span>
      <span
        className={cn(
          "theme-transition absolute left-0 top-0.5 z-10 size-8 rounded-full bg-background shadow-md ring-1 ring-black/10 transition-[transform] duration-200 ease-out",
          "dark:bg-zinc-600 dark:ring-white/10"
        )}
        style={{ transform: isDark ? "translateX(30px)" : "translateX(0)" }}
      />
    </button>
  );
}
