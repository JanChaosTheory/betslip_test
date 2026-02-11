"use client";

import { TABS } from "../data/match";
import { cn } from "@/lib/utils";

export function TabsRow() {
  return (
    <div className="theme-transition sticky top-[57px] z-30 w-full max-w-full border-b border-border bg-background px-4 py-2">
      <div className="tabs-row-scroll mx-auto flex max-w-4xl flex-nowrap items-center gap-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          disabled={!tab.active}
          aria-disabled={!tab.active}
          aria-label={tab.active ? tab.label : `${tab.label} (Coming soon)`}
          className={cn(
            "theme-transition flex min-h-[2.25rem] flex-col items-center justify-center rounded-full px-4 py-2 text-sm font-medium leading-tight",
            tab.active
              ? "market-tab-active"
              : "cursor-not-allowed text-muted-foreground opacity-70 select-none hover:opacity-70 focus:outline-none focus:ring-0 disabled:pointer-events-none"
          )}
        >
          <span className="inline-block text-center">{tab.label}</span>
          {!tab.active && (
            <span className="mt-0.5 block text-[9px] font-normal uppercase tracking-wide opacity-50">
              Coming soon
            </span>
          )}
        </button>
      ))}
      </div>
    </div>
  );
}
