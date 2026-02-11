"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Header } from "./components/Header";
import { TabsRow } from "./components/TabsRow";
import { MarketPanel } from "./components/MarketPanel";
import { BetBoostCard } from "./components/BetBoostCard";
import { BetSlipPanel } from "./components/BetSlipPanel";
import { MobileBetslipDock } from "./components/MobileBetslipDock";
import { useBetSlip } from "./hooks/useBetSlip";
import { useIsMobile } from "./hooks/useMediaQuery";
import { useHideTabsOnScroll } from "./hooks/useHideTabsOnScroll";
import { useScrolled } from "./hooks/useScrolled";
import { cn } from "@/lib/utils";
import { MARKETS, BET_BOOST_CARDS, FOOTER_TEXT, PAGE_TITLE } from "./data/match";
import type { BetBoostCard as BetBoostCardType, Market, Selection } from "./data/match";

function getOption(market: Market, rowId: string, optionId: string) {
  const row = market.rows.find((r) => r.id === rowId);
  return row?.options.find((o) => o.id === optionId);
}

function buildSelection(
  marketId: string,
  marketTitle: string,
  optionId: string,
  optionLabel: string,
  odds: string
): Selection {
  const oddsNum = parseFloat(odds);
  return {
    id: `${marketId}:${optionId}`,
    eventName: PAGE_TITLE,
    marketId,
    marketLabel: marketTitle,
    optionId,
    optionLabel,
    odds: Number.isFinite(oddsNum) ? oddsNum : 0,
  };
}

const BET_BOOST_EVENT_ID = "linda-maya";

function buildBoostSelection(card: BetBoostCardType): Selection {
  const id = `boost:${BET_BOOST_EVENT_ID}:${card.id}`;
  const oddsNum = parseFloat(card.newOdds);
  const originalOdds = card.oldOdds ? parseFloat(card.oldOdds) : undefined;
  return {
    id,
    type: "boost",
    eventName: card.matchTitle,
    marketId: "",
    marketLabel: "Bet Boost",
    optionId: card.id,
    optionLabel: card.matchTitle,
    odds: Number.isFinite(oddsNum) ? oddsNum : 0,
    meta: {
      legs: card.bullets,
      ...(Number.isFinite(originalOdds) && originalOdds !== undefined
        ? { originalOdds }
        : {}),
    },
  };
}

export default function Home() {
  const [marketOpen, setMarketOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(MARKETS.map((m) => [m.id, true]))
  );

  const isMobile = useIsMobile();
  const tabsHidden = useHideTabsOnScroll();
  const isScrolled = useScrolled(4);
  const betslip = useBetSlip();
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRowRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(152);
  const [tabsHeight, setTabsHeight] = useState(48);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const fn = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  useLayoutEffect(() => {
    const updateHeights = () => {
      const h = headerRef.current?.offsetHeight;
      const t = tabsRowRef.current?.offsetHeight;
      if (h != null && h > 0) setHeaderHeight(h);
      if (t != null && t > 0) setTabsHeight(t);
    };
    updateHeights();
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateHeights);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile, tabsHidden]);
  const selectedIds = useMemo(
    () => new Set(betslip.selections.map((s) => s.id)),
    [betslip.selections]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") betslip.close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [betslip.close]);

  const handleClearSlip = useCallback(() => {
    betslip.clearAll();
  }, [betslip.clearAll]);

  const handleRowSelect = useCallback(
    (marketId: string, rowId: string, optionId: string) => {
      const market = MARKETS.find((m) => m.id === marketId);
      if (!market) return;
      const opt = getOption(market, rowId, optionId);
      if (!opt || opt.locked) return;

      const selection = buildSelection(
        marketId,
        market.title,
        optionId,
        opt.label,
        opt.odds
      );
      betslip.toggleSelection(selection);
    },
    [betslip.toggleSelection]
  );

  const handleToggleBoost = useCallback(
    (card: BetBoostCardType) => {
      const selection = buildBoostSelection(card);
      betslip.toggleSelection(selection);
    },
    [betslip.toggleSelection]
  );

  const spacerHeight = isMobile
    ? tabsHidden
      ? Math.max(0, headerHeight - tabsHeight)
      : headerHeight
    : undefined;

  return (
    <div className="theme-transition min-h-screen min-w-0 bg-background text-foreground">
      <div
        ref={headerRef}
        className={cn(
          isMobile
            ? "fixed top-0 left-0 right-0 z-[999] w-full max-w-full bg-background"
            : "sticky top-0 z-40 w-full max-w-full bg-background",
          isMobile && isScrolled && "header-scrolled"
        )}
      >
        <Header
          selectionCount={betslip.selections.length}
          onOpenBetslip={betslip.open}
        />
        <TabsRow ref={tabsRowRef} hidden={isMobile && tabsHidden} />
      </div>

      <div
        style={
          isMobile && spacerHeight !== undefined
            ? {
                paddingTop: spacerHeight,
                transition: prefersReducedMotion
                  ? undefined
                  : "padding-top 280ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }
            : undefined
        }
      >
        <main
          className="w-full max-w-full px-4 md:mx-auto md:max-w-4xl md:px-0"
          style={
            isMobile && betslip.selections.length > 0
              ? {
                  paddingBottom:
                    "calc(80px + env(safe-area-inset-bottom, 0px))",
                }
              : undefined
          }
        >
        <div className="theme-transition min-w-0 border-b border-border">
          {MARKETS.map((market) => (
            <MarketPanel
              key={market.id}
              market={market}
              open={marketOpen[market.id] ?? true}
              onOpenChange={(open) =>
                setMarketOpen((prev) => ({ ...prev, [market.id]: open }))
              }
              selectedIds={selectedIds}
              onRowSelect={(rowId, optionId) =>
                handleRowSelect(market.id, rowId, optionId)
              }
            >
              {market.id === "to-win-match" && (
                <section className="theme-transition mt-4 min-w-0 border-t border-border pt-4">
                  <div className="max-w-full overflow-hidden">
                    <div className="bet-boost-scroll flex gap-4">
                      {BET_BOOST_CARDS.map((card) => (
                        <div key={card.id} className="min-w-[280px] shrink-0">
                          <BetBoostCard
                            card={card}
                            isSelected={selectedIds.has(
                              `boost:${BET_BOOST_EVENT_ID}:${card.id}`
                            )}
                            onToggle={() => handleToggleBoost(card)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </MarketPanel>
          ))}
        </div>

        <footer className="theme-transition flex min-w-0 items-center justify-center gap-1 border-t border-border py-3 text-center text-xs text-muted-foreground">
          <span>{FOOTER_TEXT}</span>
          <span className="inline-block rotate-0">▼</span>
        </footer>
      </main>
      </div>

      {isMobile && betslip.selections.length > 0 && !betslip.isOpen && (
        <MobileBetslipDock
          count={betslip.selections.length}
          onExpand={betslip.open}
        />
      )}
      <BetSlipPanel
        selections={betslip.selections}
        isOpen={betslip.isOpen}
        isCollapsed={betslip.isCollapsed}
        stake={betslip.stake}
        remember={betslip.remember}
        status={betslip.status}
        canPlaceBet={betslip.canPlaceBet}
        onStakeChange={betslip.setStake}
        onRememberChange={betslip.setRemember}
        onPlaceBet={betslip.placeBet}
        onToggleCollapsed={betslip.toggleCollapsed}
        onRemoveSelection={betslip.removeSelection}
        onClearSlip={handleClearSlip}
      />
    </div>
  );
}
