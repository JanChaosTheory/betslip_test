"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BetBoostCard as BetBoostCardType } from "../data/match";

type BetBoostCardProps = {
  card: BetBoostCardType;
};

export function BetBoostCard({ card }: BetBoostCardProps) {
  const [selected, setSelected] = useState(false);

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => setSelected(!selected)}
      className={cn(
        "theme-transition cursor-pointer",
        selected && "ring-2 ring-green-600"
      )}
    >
      <CardContent className="p-4">
        <span className="mb-2 inline-block rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
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
          <span className="text-green-600">→</span>
          <span className="tabular-nums font-semibold text-green-600">{card.newOdds}</span>
        </div>
        <p className="text-xs text-muted-foreground">{card.stakeReturns}</p>
      </CardContent>
    </Card>
  );
}
