"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BetBoostCard as BetBoostCardType } from "../data/match";

type BetBoostCardProps = {
  card: BetBoostCardType;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export function BetBoostCard({
  card,
  isSelected,
  onToggle,
  disabled = false,
}: BetBoostCardProps) {
  const handleClick = () => {
    if (disabled) return;
    onToggle();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "bet-boost-card theme-transition cursor-pointer",
        !disabled && "hover:bg-muted/50",
        isSelected && "is-selected",
        disabled && "pointer-events-none opacity-60"
      )}
    >
      <CardContent className="px-4 pt-0 pb-4">
        <span className="bet-boost-pill mb-2 inline-block rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
          BET BOOST
        </span>
        <p className="mb-3 font-medium">{card.matchTitle}</p>
        <ul className="mb-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {card.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="mb-2 flex items-center gap-2">
          <span className="tabular-nums text-sm line-through text-muted-foreground">
            {card.oldOdds}
          </span>
          <span className="text-accent">→</span>
          <span className="odds-text">{card.newOdds}</span>
        </div>
        <p className="text-xs text-muted-foreground">{card.stakeReturns}</p>
      </CardContent>
    </Card>
  );
}
