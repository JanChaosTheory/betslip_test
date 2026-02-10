"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { TabsRow } from "./components/TabsRow";
import { MarketPanel } from "./components/MarketPanel";
import { BetBoostCard } from "./components/BetBoostCard";
import {
  BetSlip,
  getStoredRemember,
  getStoredStake,
  setStoredStake,
  setStoredRemember,
  type LastResult,
} from "./components/Betslip";
import { SGMModal } from "./components/SGMModal";
import { MARKETS, BET_BOOST_CARDS, FOOTER_TEXT, PAGE_TITLE } from "./data/match";
import type { Market, Selection } from "./data/match";
import type { RowSelection } from "./components/MarketPanel";
import type { DisplaySelection } from "./components/BottomBetBar";

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
  return {
    id: `${marketId}:${optionId}`,
    event: PAGE_TITLE,
    marketLabel: marketTitle,
    optionLabel,
    odds: parseFloat(odds) || 0,
  };
}

function selectionsToRowSelections(
  selections: Selection[],
  markets: Market[]
): Record<string, RowSelection> {
  const out: Record<string, RowSelection> = {};
  for (const market of markets) {
    out[market.id] = Object.fromEntries(
      market.rows.map((r) => [r.id, null as string | null])
    );
  }
  for (const sel of selections) {
    const [marketId, optionId] = sel.id.split(":");
    if (!marketId || !optionId) continue;
    const market = markets.find((m) => m.id === marketId);
    if (!market) continue;
    for (const row of market.rows) {
      const opt = row.options.find((o) => o.id === optionId);
      if (opt) {
        out[marketId]![row.id] = optionId;
        break;
      }
    }
  }
  return out;
}

const PLACE_BET_DELAY_MS = 750;
const SUCCESS_MESSAGE_MS = 2500;

export default function Home() {
  const [marketOpen, setMarketOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(MARKETS.map((m) => [m.id, true]))
  );
  const [betslipSelections, setBetSlipSelections] = useState<Selection[]>([]);
  const [stake, setStake] = useState("");
  const [rememberStake, setRememberStake] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [lastResult, setLastResult] = useState<LastResult>("idle");
  const [sgmModalOpen, setSgmModalOpen] = useState(false);

  useEffect(() => {
    setStake(getStoredStake());
    setRememberStake(getStoredRemember());
  }, []);

  const rowSelections = useMemo(
    () => selectionsToRowSelections(betslipSelections, MARKETS),
    [betslipSelections]
  );

  const allLegs = useMemo((): DisplaySelection[] => {
    return betslipSelections.map((s) => ({
      marketTitle: s.marketLabel,
      optionLabel: s.optionLabel,
      odds: s.odds.toFixed(2),
    }));
  }, [betslipSelections]);

  const hasMultipleSelections = betslipSelections.length >= 2;

  useEffect(() => {
    if (hasMultipleSelections) setSgmModalOpen(true);
  }, [hasMultipleSelections]);

  const handleRowSelect = useCallback(
    (marketId: string, rowId: string, optionId: string | null) => {
      if (optionId === null) {
        setBetSlipSelections([]);
        return;
      }
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
      setBetSlipSelections([selection]);
    },
    []
  );

  const handleCloseSlip = useCallback(() => {
    setBetSlipSelections([]);
    setLastResult("idle");
  }, []);

  const handleStakeChange = useCallback((value: string) => {
    setStake(value);
    if (rememberStake) setStoredStake(value);
  }, [rememberStake]);

  const handleRememberChange = useCallback((checked: boolean) => {
    setRememberStake(checked);
    setStoredRemember(checked);
    if (checked) setStoredStake(stake);
    else setStoredStake("");
  }, [stake]);

  const handlePlaceBet = useCallback(() => {
    const n = parseFloat(stake);
    if (Number.isNaN(n) || n <= 0 || isPlacing || betslipSelections.length === 0)
      return;
    if (rememberStake) setStoredStake(stake);
    setIsPlacing(true);
    setLastResult("idle");
    setTimeout(() => {
      setLastResult("success");
      setBetSlipSelections([]);
      setIsPlacing(false);
      setTimeout(() => setLastResult("idle"), SUCCESS_MESSAGE_MS);
    }, PLACE_BET_DELAY_MS);
  }, [stake, rememberStake, isPlacing, betslipSelections.length]);

  const handleRemoveLeg = useCallback((index: number) => {
    const leg = allLegs[index];
    if (!leg) return;
    setBetSlipSelections((prev) =>
      prev.filter(
        (s) =>
          !(s.marketLabel === leg.marketTitle && s.optionLabel === leg.optionLabel)
      )
    );
  }, [allLegs]);

  return (
    <div className="theme-transition min-h-screen bg-background text-foreground">
      <Header />
      <TabsRow />

      <main className="mx-auto max-w-4xl pb-32">
        <div className="theme-transition border-b border-border">
          {MARKETS.map((market) => (
            <MarketPanel
              key={market.id}
              market={market}
              open={marketOpen[market.id] ?? true}
              onOpenChange={(open) =>
                setMarketOpen((prev) => ({ ...prev, [market.id]: open }))
              }
              rowSelections={rowSelections[market.id] ?? {}}
              onRowSelect={(rowId, optionId) =>
                handleRowSelect(market.id, rowId, optionId)
              }
            >
              {market.id === "to-win-match" && (
                <section className="theme-transition mt-4 border-t border-border pt-4">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {BET_BOOST_CARDS.map((card) => (
                      <div key={card.id} className="w-[280px] shrink-0">
                        <BetBoostCard card={card} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </MarketPanel>
          ))}
        </div>

        <footer className="theme-transition flex items-center justify-center gap-1 border-t border-border py-3 text-center text-xs text-muted-foreground">
          <span>{FOOTER_TEXT}</span>
          <span className="inline-block rotate-0">▼</span>
        </footer>
      </main>

      <BetSlip
        selections={betslipSelections}
        stake={stake}
        rememberStake={rememberStake}
        isPlacing={isPlacing}
        lastResult={lastResult}
        onStakeChange={handleStakeChange}
        onRememberChange={handleRememberChange}
        onPlaceBet={handlePlaceBet}
        onClose={handleCloseSlip}
      />

      <SGMModal
        open={sgmModalOpen}
        onOpenChange={setSgmModalOpen}
        legs={allLegs}
        onRemoveLeg={handleRemoveLeg}
      />
    </div>
  );
}
