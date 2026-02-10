"use client";

import { TABS } from "../data/match";
import { cn } from "@/lib/utils";

export function TabsRow() {
  return (
    <div className="theme-transition sticky top-[57px] z-30 flex gap-1 border-b-2 border-green-600 bg-background px-4 py-2">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          disabled={!tab.active}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium",
            tab.active
              ? "bg-green-600 text-white"
              : "cursor-default opacity-50 select-none hover:opacity-50 focus:outline-none focus:ring-0"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
