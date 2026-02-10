"use client";

import type { Selection } from "../types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type SelectionRowProps = {
  selection: Selection;
  onRemove: (id: string) => void;
};

export function SelectionRow({ selection, onRemove }: SelectionRowProps) {
  return (
    <li className="flex items-start justify-between gap-2 border-b border-border py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{selection.eventName}</p>
        <p className="text-xs text-muted-foreground">
          {selection.marketName} · {selection.outcomeName}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm font-semibold tabular-nums text-[var(--odds-accent)]">
          {selection.odds.toFixed(2)}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(selection.id)}
          aria-label={`Remove ${selection.outcomeName}`}
          className="size-8 shrink-0"
        >
          <X className="size-4" />
        </Button>
      </div>
    </li>
  );
}
