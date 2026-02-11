"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { BREADCRUMB, PAGE_TITLE } from "../data/match";
import { cn } from "@/lib/utils";

type HeaderProps = {
  selectionCount?: number;
  onOpenBetslip?: () => void;
};

export function Header({ selectionCount = 0, onOpenBetslip }: HeaderProps) {
  const showBetslipPill = selectionCount > 0 && onOpenBetslip;

  return (
    <header className="theme-transition w-full max-w-full border-b border-border bg-background px-4 py-3">
      <div className="mx-auto flex min-h-[44px] min-w-0 max-w-4xl items-center justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button variant="ghost" size="icon" className="shrink-0" aria-label="Back">
          <ChevronLeft className="size-5" />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-muted-foreground">{BREADCRUMB}</p>
          <div className="flex items-center gap-1">
            <h1 className="min-w-0 line-clamp-2 text-lg font-semibold">{PAGE_TITLE}</h1>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {onOpenBetslip && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenBetslip}
            aria-hidden={!showBetslipPill}
            tabIndex={showBetslipPill ? 0 : -1}
            className={cn(
              "rounded-full font-medium transition-[opacity,transform] duration-200 ease-out",
              "bg-primary/15 text-primary hover:bg-primary/25",
              showBetslipPill
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "pointer-events-none translate-y-1 opacity-0"
            )}
          >
            Betslip ({selectionCount})
          </Button>
        )}
        <ThemeToggle />
      </div>
      </div>
    </header>
  );
}
