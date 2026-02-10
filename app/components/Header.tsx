"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { BREADCRUMB, PAGE_TITLE, DATE_TIME } from "../data/match";
import { cn } from "@/lib/utils";

type HeaderProps = {
  selectionCount?: number;
  onOpenBetslip?: () => void;
};

export function Header({ selectionCount = 0, onOpenBetslip }: HeaderProps) {
  const showBetslipPill = selectionCount > 0 && onOpenBetslip;

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
        {showBetslipPill && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenBetslip}
            className={cn(
              "rounded-full font-medium",
              "bg-primary/15 text-primary hover:bg-primary/25"
            )}
          >
            Betslip ({selectionCount})
          </Button>
        )}
        <span className="text-sm text-muted-foreground">{DATE_TIME}</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
