"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** With left label column (e.g. Set Betting, Total Games 2-Way). */
const GRID_2COL = {
  gridTemplateColumns: "var(--label-col) minmax(0, 1fr) minmax(0, 1fr)",
  gridAutoRows: "minmax(var(--market-row-min-h), auto)",
} as const;

/** No left label – two equal columns only (e.g. To Win Match, Match Handicap). */
const GRID_2COL_NO_LABEL = {
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  gridAutoRows: "minmax(var(--market-row-min-h), auto)",
} as const;

const GRID_3COL = {
  gridTemplateColumns:
    "var(--label-col) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
  gridAutoRows: "minmax(var(--market-row-min-h), auto)",
} as const;

export type MarketGridVariant = "2col" | "2colNoLabel" | "3col";

type MarketGridProps = {
  variant: MarketGridVariant;
  className?: string;
  children: ReactNode;
};

export function MarketGrid({
  variant,
  className,
  children,
}: MarketGridProps) {
  const gridStyle =
    variant === "3col"
      ? GRID_3COL
      : variant === "2colNoLabel"
        ? GRID_2COL_NO_LABEL
        : GRID_2COL;
  return (
    <div
      className={cn(
        "grid gap-y-[var(--market-gap-y)] gap-x-[var(--market-gap-x)] pt-1.5",
        className
      )}
      style={gridStyle}
    >
      {children}
    </div>
  );
}

export { GRID_2COL, GRID_2COL_NO_LABEL, GRID_3COL };
