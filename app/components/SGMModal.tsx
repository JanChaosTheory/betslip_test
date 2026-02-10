"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PAGE_TITLE } from "../data/match";
import type { DisplaySelection } from "./BottomBetBar";

type SGMModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  legs: DisplaySelection[];
  onRemoveLeg: (index: number) => void;
};

export function SGMModal({
  open,
  onOpenChange,
  legs,
  onRemoveLeg,
}: SGMModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-transition max-w-md bg-card sm:max-w-md">
        <DialogHeader className="flex flex-row items-start justify-between gap-4">
          <DialogTitle className="text-lg">Selections</DialogTitle>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-sm text-muted-foreground underline"
            >
              Show Options
            </button>
            <span className="text-sm text-muted-foreground">Balance</span>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            SAME GAME MULTI
          </p>
          <p className="font-medium">{PAGE_TITLE}</p>
          <ul className="space-y-2">
            {legs.map((leg, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2"
              >
                <div>
                  <p className="font-medium">{leg.optionLabel}</p>
                  <p className="text-sm text-muted-foreground">{leg.marketTitle}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveLeg(i)}
                  aria-label="Remove"
                >
                  <X className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-1 text-sm font-medium text-muted-foreground"
          >
            Singles
            <span className="inline-block rotate-0 transition-transform">▼</span>
          </button>
        </div>
        <div className="sticky bottom-0 -mx-6 -mb-6 mt-4 border-t border-border bg-card p-4">
          <Button className="w-full">Place Bet $0.00</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
