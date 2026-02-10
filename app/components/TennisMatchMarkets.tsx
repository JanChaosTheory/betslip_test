"use client";

import { useState } from "react";
import type { Selection } from "../types";
import {
  tennisMatchMeta,
  winnerOutcomes,
  gameHandicapOutcomes,
  totalGamesOutcomes,
} from "../data/tennisMatch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type TennisMatchMarketsProps = {
  onAddToBetslip: (selection: Selection) => void;
  existingIds: Set<string>;
};

type OutcomeOptionProps = {
  selection: Selection;
  label: React.ReactNode;
  onAdd: () => void;
  added: boolean;
  layout?: "col" | "row";
  className?: string;
};

function OutcomeOption({
  selection,
  label,
  onAdd,
  added,
  layout = "col",
  className = "",
}: OutcomeOptionProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onAdd}
      disabled={added}
      className={cn(
        "min-h-[44px] border-2 font-semibold",
        layout === "row"
          ? "flex items-center justify-between gap-2"
          : "flex flex-col items-center justify-center gap-1",
        added
          ? "border-[var(--odds-accent)] bg-[var(--odds-accent)]/15 hover:bg-[var(--odds-accent)]/20"
          : "border-transparent",
        className
      )}
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="tabular-nums text-[var(--odds-accent)]">
        {selection.odds.toFixed(2)}
      </span>
    </Button>
  );
}

export function TennisMatchMarkets({ onAddToBetslip, existingIds }: TennisMatchMarketsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [winnerOpen, setWinnerOpen] = useState(true);
  const [handicapOpen, setHandicapOpen] = useState(true);
  const [totalGamesOpen, setTotalGamesOpen] = useState(true);

  const { tournament, start, matchName } = tennisMatchMeta;
  const tabs = ["Market 1", "Market 2", "Market 3", "Market 4"];

  const katieHandicaps = gameHandicapOutcomes.filter((s) => s.outcomeName.startsWith("Katie"));
  const alyciaHandicaps = gameHandicapOutcomes.filter((s) => s.outcomeName.startsWith("Alycia"));

  return (
    <Card className="w-full min-w-0 gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-2 border-b border-border px-4 py-3">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <span aria-hidden>&lt;</span>
          <span>{tournament}</span>
        </Button>
        <span className="text-sm text-muted-foreground">{start}</span>
      </CardHeader>

      <div className="border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold">{matchName}</h1>
      </div>

      <div className="flex gap-1 border-b border-border p-2">
        {tabs.map((label, i) => (
          <Button
            key={label}
            type="button"
            variant={i === activeTab ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(i)}
            className={cn(
              "flex-1",
              i === activeTab && "bg-[var(--tab-active)] text-zinc-900 hover:bg-[var(--tab-active)]/90 dark:text-white dark:hover:bg-[var(--tab-active)]/90"
            )}
          >
            {label}
          </Button>
        ))}
      </div>

      <CardContent className="gap-0 p-4">
        <Collapsible open={winnerOpen} onOpenChange={setWinnerOpen}>
          <section className="mb-2 overflow-hidden rounded-lg border border-border bg-card">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between px-4 py-3"
              >
                <span className="font-medium">Winner</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out", winnerOpen && "rotate-180")}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex justify-between gap-4 border-t border-border px-4 py-3">
                {winnerOutcomes.map((s) => (
                  <OutcomeOption
                    key={s.id}
                    selection={s}
                    label={s.outcomeName}
                    onAdd={() => onAddToBetslip(s)}
                    added={existingIds.has(s.id)}
                    className="flex-1"
                  />
                ))}
              </div>
            </CollapsibleContent>
          </section>
        </Collapsible>

        <Collapsible open={handicapOpen} onOpenChange={setHandicapOpen}>
          <section className="mb-2 overflow-hidden rounded-lg border border-border bg-card">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between px-4 py-3"
              >
                <span className="font-medium">Game Handicap</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out", handicapOpen && "rotate-180")}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-2 gap-4 border-t border-border px-4 py-3">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted-foreground">Katie Volynets</p>
                  {katieHandicaps.map((s) => (
                    <OutcomeOption
                      key={s.id}
                      selection={s}
                      label={s.outcomeName.replace("Katie Volynets ", "")}
                      onAdd={() => onAddToBetslip(s)}
                      added={existingIds.has(s.id)}
                      layout="row"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted-foreground">Alycia Parks</p>
                  {alyciaHandicaps.map((s) => (
                    <OutcomeOption
                      key={s.id}
                      selection={s}
                      label={s.outcomeName.replace("Alycia Parks ", "")}
                      onAdd={() => onAddToBetslip(s)}
                      added={existingIds.has(s.id)}
                      layout="row"
                    />
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </section>
        </Collapsible>

        <Collapsible open={totalGamesOpen} onOpenChange={setTotalGamesOpen}>
          <section className="overflow-hidden rounded-lg border border-border bg-card">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-between px-4 py-3"
              >
                <span className="font-medium">Total Games 2 way</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out", totalGamesOpen && "rotate-180")}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-t border-border">
                <div className="grid grid-cols-3 gap-2 px-4 py-3 text-center text-xs font-medium text-muted-foreground">
                  <span></span>
                  <span>Over</span>
                  <span>Under</span>
                </div>
                {(() => {
                  const over = totalGamesOutcomes.find((s) => s.outcomeName.startsWith("Over"));
                  const under = totalGamesOutcomes.find((s) => s.outcomeName.startsWith("Under"));
                  if (!over || !under) return null;
                  const line = over.outcomeName.replace("Over ", "");
                  return (
                    <div className="grid grid-cols-3 items-stretch gap-2 border-t border-border/50 px-4 py-2">
                      <span className="flex items-center text-sm">{line}</span>
                      <OutcomeOption
                        selection={over}
                        label="Over"
                        onAdd={() => onAddToBetslip(over)}
                        added={existingIds.has(over.id)}
                      />
                      <OutcomeOption
                        selection={under}
                        label="Under"
                        onAdd={() => onAddToBetslip(under)}
                        added={existingIds.has(under.id)}
                      />
                    </div>
                  );
                })()}
              </div>
            </CollapsibleContent>
          </section>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
