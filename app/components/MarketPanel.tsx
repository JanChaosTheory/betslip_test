"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { SelectionCell } from "./SelectionCell";
import { MarketGrid } from "./MarketGrid";
import { MarketRowGridHeader, MarketRowGridRow } from "./MarketRowGrid";
import { cn } from "@/lib/utils";
import type { Market } from "../data/match";

export type RowSelection = Record<string, string | null>;

/** Apple-like accordion timing and easing (no bounce, calm). */
const DURATION_OPEN_MS = 250;
const DURATION_CLOSE_MS = 200;
const EASING_OPEN = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const EASING_CLOSE = "cubic-bezier(0.4, 0.0, 0.6, 1)";
const CHEVRON_DURATION_MS = 220;
const HEIGHT_TRANSITION = `height ${DURATION_CLOSE_MS}ms ${EASING_CLOSE}`;

type MarketAccordionContentProps = {
  open: boolean;
  children: React.ReactNode;
};

/**
 * Animated accordion body: content stays in DOM; height + opacity + translateY
 * animated with measured px height. Respects prefers-reduced-motion and
 * cancels in-flight transitions on rapid toggle.
 */
function MarketAccordionContent({ open, children }: MarketAccordionContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  const genRef = useRef(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const fn = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  openRef.current = open;

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const durationOpen = prefersReducedMotion ? 0 : DURATION_OPEN_MS;
    const durationClose = prefersReducedMotion ? 0 : DURATION_CLOSE_MS;
    genRef.current += 1;
    const gen = genRef.current;

    if (open) {
      container.style.height = "0px";
      container.style.overflow = "hidden";
      inner.style.opacity = "0.96";
      inner.style.transform = "translateY(-2px)";

      const onTransitionEnd = () => {
        if (genRef.current !== gen || !openRef.current) return;
        container.style.transition = "none";
        container.style.height = "auto";
        requestAnimationFrame(() => {
          if (genRef.current !== gen) return;
          container.style.transition = "";
        });
      };

      requestAnimationFrame(() => {
        if (genRef.current !== gen) return;
        const h = inner.scrollHeight;
        container.style.transition = `height ${durationOpen}ms ${EASING_OPEN}`;
        container.style.height = `${h}px`;
        inner.style.transition = `opacity ${durationOpen}ms ${EASING_OPEN}, transform ${durationOpen}ms ${EASING_OPEN}`;
        inner.style.opacity = "1";
        inner.style.transform = "translateY(0)";
        container.addEventListener("transitionend", onTransitionEnd, { once: true });
      });
    } else {
      // Collapse: 2-frame operation so browser sees transition. Radix must NOT wrap this
      // (no CollapsibleContent) or it sets hidden/display:none and kills the animation.
      container.style.overflow = "hidden";
      container.style.transition = "none";
      const lockedHeight = inner.scrollHeight;
      container.style.height = `${lockedHeight}px`;
      container.getBoundingClientRect(); // force reflow so lock is applied

      if (process.env.NODE_ENV === "development") {
        console.log("[accordion collapse]", {
          lockedHeight,
          computedTransition: window.getComputedStyle(container).transition,
          heightAfterLock: container.style.height,
        });
      }

      // Double rAF: step 2 in next frame so height 0 is a separate paint from the lock
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (genRef.current !== gen) return;
          container.style.transition = prefersReducedMotion ? "none" : HEIGHT_TRANSITION;
          inner.style.transition =
            prefersReducedMotion ? "none" : `opacity ${durationClose}ms ${EASING_CLOSE}, transform ${durationClose}ms ${EASING_CLOSE}`;
          inner.style.opacity = "0.96";
          inner.style.transform = "translateY(-2px)";
          container.style.height = "0px";
          if (process.env.NODE_ENV === "development") {
            console.log("[accordion collapse] set height 0");
          }
        });
      });
    }
  }, [open, prefersReducedMotion]);

  return (
    <div ref={containerRef} style={{ overflow: "hidden" }} aria-hidden={!open}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

type MarketPanelProps = {
  market: Market;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: Set<string>;
  onRowSelect: (rowId: string, optionId: string) => void;
  children?: React.ReactNode;
};

/** True if this market has a left-hand label column (e.g. "21.5", "2-0"). */
function hasLeftLabel(market: Market): boolean {
  return market.rows.some((r) => (r.rowLabel ?? "").trim() !== "");
}

/** Numeric row labels (e.g. totals 21.5, 6.5) use right-aligned variant for consistent alignment. */
function isNumericLabel(value: string | undefined): boolean {
  if (value == null || value === "") return false;
  return /^\d+(\.\d+)?$/.test(value);
}

export function MarketPanel({
  market,
  open,
  onOpenChange,
  selectedIds,
  onRowSelect,
  children,
}: MarketPanelProps) {
  const marketId = market.id;
  const isTable = market.columnHeaders && market.columnHeaders.length > 0;
  const isDoubleResult = market.layout === "doubleResult";
  const isThreeCol =
    isTable &&
    market.columnHeaders!.length === 3 &&
    market.rows[0]?.options.length === 3;
  const leftLabel = hasLeftLabel(market);
  const isSelected = (optionId: string) => selectedIds.has(`${marketId}:${optionId}`);

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <div className="theme-transition surface-panel border-b border-border">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="market-title-trigger theme-transition flex w-full items-center justify-between rounded-none px-4 py-3"
          >
            <span className="truncate font-semibold">{market.title}</span>
            <span className="flex items-center gap-2">
              <ChevronDown
                className={cn(
                  "size-6 shrink-0 text-foreground/80 transition-transform duration-[220ms]",
                  open && "rotate-180"
                )}
                style={{
                  transitionDuration: `${CHEVRON_DURATION_MS}ms`,
                  transitionTimingFunction: EASING_OPEN,
                }}
              />
            </span>
          </Button>
        </CollapsibleTrigger>
        <MarketAccordionContent open={open}>
          <div className="market-inner">
            {isDoubleResult ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {market.rows.map((row) => {
                  const opt = row.options[0]!;
                  return (
                    <SelectionCell
                      key={row.id}
                      option={opt}
                      selected={isSelected(opt.id)}
                      onToggle={() => onRowSelect(row.id, opt.id)}
                    />
                  );
                })}
              </div>
            ) : isTable ? (
              <MarketGrid
                variant={
                  isThreeCol ? "3col" : leftLabel ? "2col" : "2colNoLabel"
                }
              >
                {isThreeCol ? (
                  <>
                    <MarketRowGridHeader
                      columnCount={3}
                      label=""
                      headers={[
                        market.columnHeaders![0],
                        market.columnHeaders![1],
                        market.columnHeaders![2],
                      ]}
                    />
                    {market.rows.map((row, idx) => (
                      <MarketRowGridRow
                        key={row.id}
                        layout="withLabel"
                        variant="label"
                        labelOrValue={row.rowLabel ?? ""}
                        leftOption={row.options[0]!}
                        rightOption={row.options[1]!}
                        thirdOption={row.options[2]}
                        rowId={row.id}
                        marketId={marketId}
                        selectedIds={selectedIds}
                        onRowSelect={onRowSelect}
                        showRowSeparator={market.rows.length > 4}
                        isFirstRow={idx === 0}
                      />
                    ))}
                  </>
                ) : leftLabel ? (
                  <>
                    <MarketRowGridHeader
                      columnCount={2}
                      label={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![0] ?? ""
                          : ""
                      }
                      leftHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![1] ?? ""
                          : market.columnHeaders![0] ?? ""
                      }
                      rightHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![2] ?? ""
                          : market.columnHeaders![1] ?? ""
                      }
                    />
                    {market.rows.map((row, idx) => (
                      <MarketRowGridRow
                        key={row.id}
                        layout="withLabel"
                        variant={
                          isNumericLabel(row.rowLabel) ? "numeric" : "label"
                        }
                        labelOrValue={row.rowLabel ?? ""}
                        leftOption={row.options[0]!}
                        rightOption={row.options[1]!}
                        rowId={row.id}
                        marketId={marketId}
                        selectedIds={selectedIds}
                        onRowSelect={onRowSelect}
                        showRowSeparator={market.rows.length > 4}
                        isFirstRow={idx === 0}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <MarketRowGridHeader
                      columnCount={2}
                      noLabel
                      label=""
                      leftHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![1] ?? ""
                          : market.columnHeaders![0] ?? ""
                      }
                      rightHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![2] ?? ""
                          : market.columnHeaders![1] ?? ""
                      }
                    />
                    {market.rows.map((row, idx) => (
                      <MarketRowGridRow
                        key={row.id}
                        layout="noLabel"
                        variant="label"
                        labelOrValue=""
                        leftOption={row.options[0]!}
                        rightOption={row.options[1]!}
                        rowId={row.id}
                        marketId={marketId}
                        selectedIds={selectedIds}
                        onRowSelect={onRowSelect}
                        showRowSeparator={market.rows.length > 4}
                        isFirstRow={idx === 0}
                      />
                    ))}
                  </>
                )}
              </MarketGrid>
            ) : (
              <MarketGrid variant={leftLabel ? "2col" : "2colNoLabel"}>
                {market.rows.map((row, idx) => (
                  <MarketRowGridRow
                    key={row.id}
                    layout={leftLabel ? "withLabel" : "noLabel"}
                    variant="label"
                    labelOrValue={row.rowLabel ?? ""}
                    leftOption={row.options[0]!}
                    rightOption={row.options[1]!}
                    rowId={row.id}
                    marketId={marketId}
                    selectedIds={selectedIds}
                    onRowSelect={onRowSelect}
                    showRowSeparator={market.rows.length > 4}
                    isFirstRow={idx === 0}
                  />
                ))}
              </MarketGrid>
            )}
            {children}
          </div>
        </MarketAccordionContent>
      </div>
    </Collapsible>
  );
}
