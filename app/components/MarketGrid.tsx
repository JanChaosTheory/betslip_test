"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Single grid layout for all markets. Column widths never change by variant – label column is always var(--label-col). */
const GRID_2COL = {
  gridTemplateColumns: "var(--label-col) minmax(0, 1fr) minmax(0, 1fr)",
  gridAutoRows: "minmax(var(--market-row-min-h), auto)",
} as const;

const GRID_3COL = {
  gridTemplateColumns:
    "var(--label-col) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
  gridAutoRows: "minmax(var(--market-row-min-h), auto)",
} as const;

export type MarketGridVariant = "2col" | "3col";

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
  return (
    <div
      className={cn(
        "grid gap-y-[var(--market-gap-y)] gap-x-[var(--market-gap-x)] pt-2",
        className
      )}
      style={variant === "3col" ? GRID_3COL : GRID_2COL}
    >
      {children}
    </div>
  );
}

export { GRID_2COL, GRID_3COL };
