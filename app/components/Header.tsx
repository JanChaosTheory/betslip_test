"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronLeft, ChevronDown, Play, Bell } from "lucide-react";
import { BREADCRUMB, PAGE_TITLE, DATE_TIME } from "../data/match";

export function Header() {
  return (
    <header className="theme-transition sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background px-4 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button variant="ghost" size="icon" className="shrink-0" aria-label="Back">
          <ChevronLeft className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-muted-foreground">{BREADCRUMB}</p>
          <div className="flex items-center gap-1">
            <h1 className="truncate text-lg font-semibold">{PAGE_TITLE}</h1>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm text-muted-foreground">{DATE_TIME}</span>
        <Button variant="ghost" size="icon" aria-label="Video">
          <Play className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-5" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
