"use client";

import type { Selection } from "../types";

type MockEventsProps = {
  onAddToBetslip: (selection: Selection) => void;
  existingIds: Set<string>;
};

const MOCK_EVENTS: Selection[] = [
  { id: "ev-1", eventName: "Chelsea vs Arsenal", marketName: "Match Result", outcomeName: "Chelsea", odds: 2.1 },
  { id: "ev-2", eventName: "Chelsea vs Arsenal", marketName: "Match Result", outcomeName: "Draw", odds: 3.4 },
  { id: "ev-3", eventName: "Chelsea vs Arsenal", marketName: "Match Result", outcomeName: "Arsenal", odds: 3.2 },
  { id: "ev-4", eventName: "Liverpool vs Man Utd", marketName: "Match Result", outcomeName: "Liverpool", odds: 1.85 },
  { id: "ev-5", eventName: "Liverpool vs Man Utd", marketName: "Match Result", outcomeName: "Draw", odds: 4.0 },
  { id: "ev-6", eventName: "Liverpool vs Man Utd", marketName: "Match Result", outcomeName: "Man Utd", odds: 4.2 },
  { id: "ev-7", eventName: "Real Madrid vs Barcelona", marketName: "Both Teams to Score", outcomeName: "Yes", odds: 1.72 },
  { id: "ev-8", eventName: "Real Madrid vs Barcelona", marketName: "Both Teams to Score", outcomeName: "No", odds: 2.05 },
];

export function MockEvents({ onAddToBetslip, existingIds }: MockEventsProps) {
  return (
    <section className="w-full min-w-0">
      <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">Events</h2>
      <ul className="space-y-2">
        {MOCK_EVENTS.map((selection) => {
          const added = existingIds.has(selection.id);
          return (
            <li
              key={selection.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                  {selection.eventName}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {selection.marketName} · {selection.outcomeName}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                  {selection.odds.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => onAddToBetslip(selection)}
                  disabled={added}
                  className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:disabled:opacity-50"
                >
                  {added ? "Added" : "Add"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
