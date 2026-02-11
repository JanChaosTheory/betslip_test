"use client";

import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { TABS } from "../data/match";
import { cn } from "@/lib/utils";

const TABS_DURATION_MS = 280;
const TABS_EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)";

type TabsRowProps = {
  /** When true (mobile scroll down), tabs animate out; wrapper height collapses to 0. */
  hidden?: boolean;
};

function setRef<T>(ref: React.ForwardedRef<T> | undefined, el: T | null) {
  if (typeof ref === "function") ref(el);
  else if (ref) (ref as React.MutableRefObject<T | null>).current = el;
}

export const TabsRow = forwardRef<HTMLDivElement, TabsRowProps>(function TabsRow(
  { hidden = false },
  ref
) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(48);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const fn = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useLayoutEffect(() => {
    if (!hidden && innerRef.current) {
      const h = innerRef.current.offsetHeight;
      if (h > 0) setMeasuredHeight(h);
    }
  }, [hidden]);

  const duration = prefersReducedMotion ? 0 : TABS_DURATION_MS;
  const innerDelayMs = prefersReducedMotion ? 0 : hidden ? 50 : 30;
  const heightTransition = `height ${duration}ms ${TABS_EASING}`;
  const opacityTransition = `opacity ${duration}ms ${TABS_EASING} ${innerDelayMs}ms, transform ${duration}ms ${TABS_EASING} ${innerDelayMs}ms`;

  return (
    <div
      className={cn(hidden && "pointer-events-none")}
      style={{
        overflow: "hidden",
        height: hidden ? 0 : measuredHeight,
        transition: heightTransition,
      }}
      aria-hidden={hidden}
    >
      <div
        ref={(el) => {
          innerRef.current = el;
          setRef(ref, el);
        }}
        className={cn(
          "theme-transition w-full max-w-full border-b border-border bg-background px-4 py-2"
        )}
        style={{
          opacity: hidden ? 0 : 1,
          transform: hidden ? "translateY(-6px)" : "translateY(0)",
          transition: opacityTransition,
          willChange: "transform, opacity",
        }}
      >
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
    </div>
  );
});
