"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { PAGE_TITLE } from "../data/match";

export type DisplaySelection = {
  marketTitle: string;
  optionLabel: string;
  odds: string;
};

type BottomBetBarProps = {
  selection: DisplaySelection | null;
  onClose: () => void;
};

export function BottomBetBar({ selection, onClose }: BottomBetBarProps) {
  if (!selection) return null;

  return (
    <div className="theme-transition fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-5" />
          </Button>
          <div className="min-w-0 flex-1 px-4 text-center">
            <p className="truncate font-medium">{selection.optionLabel}</p>
            <p className="truncate text-sm text-muted-foreground">
              {selection.marketTitle} · {PAGE_TITLE}
            </p>
          </div>
          <span className="tabular-nums font-semibold">{selection.odds}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Set Stake
          </Button>
          <div className="flex items-center gap-2">
            <Switch />
            <span className="text-sm text-muted-foreground">Remember</span>
          </div>
          <Button size="sm" className="ml-auto">
            Place Bet
          </Button>
        </div>
      </div>
    </div>
  );
}
