"use client";

import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import type { MarketRowOption } from "../data/match";

type SelectionCellProps = {
  option: MarketRowOption;
  selected: boolean;
  onToggle: () => void;
};

export function SelectionCell({ option, selected, onToggle }: SelectionCellProps) {
  const locked = option.locked ?? false;
  const showOdds = !locked && option.odds !== "0" && option.odds !== "";
  const labelIsDuplicateOdds =
    option.label != null &&
    option.label !== "" &&
    String(option.label).trim() === String(option.odds).trim();
  const showOnlyOdds = showOdds && labelIsDuplicateOdds;

  return (
    <button
      type="button"
      disabled={locked}
      onClick={locked ? undefined : onToggle}
      className={cn(
        "theme-transition flex h-full min-h-[var(--market-row-min-h)] w-full min-w-0 items-center justify-center rounded-md border border-border bg-transparent px-3 py-[7px]",
        !locked && !showOnlyOdds && "justify-between text-left",
        showOnlyOdds && "justify-center",
        locked && "cursor-default opacity-70 hover:bg-transparent",
        !locked && "hover:bg-muted/50",
        selected && "is-selected"
      )}
    >
      {locked ? (
        <Lock className="size-3.5 shrink-0 text-muted-foreground" />
      ) : showOnlyOdds ? (
        <span className="odds-text whitespace-nowrap">{option.odds}</span>
      ) : (
        <>
          <span className="min-w-0 line-clamp-2 break-words text-sm font-medium leading-snug">
            {option.label || ""}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            {showOdds && (
              <span className="odds-text whitespace-nowrap">{option.odds}</span>
            )}
          </span>
        </>
      )}
    </button>
  );
}
