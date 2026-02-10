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
  const showOdds = !locked || (option.odds !== "0" && option.odds !== "");

  return (
    <button
      type="button"
      disabled={locked}
      onClick={locked ? undefined : onToggle}
      className={cn(
        "theme-transition flex h-full min-h-[var(--market-row-min-h)] w-full min-w-0 items-center justify-between rounded-md border border-border bg-transparent px-3 py-[7px] text-left",
        locked && "cursor-default opacity-70 hover:bg-transparent",
        !locked && "hover:bg-muted/50",
        selected && "is-selected"
      )}
    >
      <span className="min-w-0 line-clamp-2 break-words text-sm font-medium leading-snug">
        {option.label || (locked ? "—" : "")}
      </span>
      <span className="flex shrink-0 items-center gap-1.5">
        {locked && <Lock className="size-3.5 text-muted-foreground" />}
        {showOdds && (
          <span className="odds-text whitespace-nowrap">
            {option.odds}
          </span>
        )}
      </span>
    </button>
  );
}
