"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileBetslipDockProps = {
  count: number;
  onExpand: () => void;
  className?: string;
};

/**
 * Mobile-only sticky bar showing collapsed betslip (header row). Shown when
 * betCount > 0 and panel is closed. Tap to expand the full panel.
 */
export function MobileBetslipDock({
  count,
  onExpand,
  className,
}: MobileBetslipDockProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Expand betslip"
      onClick={onExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand();
        }
      }}
      className={cn(
        "theme-transition fixed bottom-0 left-0 right-0 z-40 flex cursor-pointer items-center justify-between border-t border-border bg-card px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.3)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "min-h-[56px] py-3 transition-[opacity,transform] duration-200 ease-out",
        "md:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <span className="text-sm font-semibold">
        Betslip
        <span className="ml-1.5 text-muted-foreground">({count})</span>
      </span>
      <span className="flex shrink-0 items-center justify-center" aria-hidden>
        <ChevronUp className="size-5 text-muted-foreground" />
      </span>
    </div>
  );
}
