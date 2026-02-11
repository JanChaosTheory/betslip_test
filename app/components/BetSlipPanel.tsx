"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { Selection } from "../data/match";
import type { BetSlipStatus } from "../hooks/useBetSlip";
import { cn } from "@/lib/utils";

type BetSlipPanelProps = {
  selections: Selection[];
  isOpen: boolean;
  isCollapsed: boolean;
  stake: string;
  remember: boolean;
  status: BetSlipStatus;
  canPlaceBet: boolean;
  onStakeChange: (value: string) => void;
  onRememberChange: (checked: boolean) => void;
  onPlaceBet: () => void;
  onToggleCollapsed: () => void;
  onRemoveSelection: (id: string) => void;
  onClearSlip: () => void;
};

export function BetSlipPanel({
  selections,
  isOpen,
  isCollapsed,
  stake,
  remember,
  status,
  canPlaceBet,
  onStakeChange,
  onRememberChange,
  onPlaceBet,
  onToggleCollapsed,
  onRemoveSelection,
  onClearSlip,
}: BetSlipPanelProps) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(t);
    }
    setMounted(false);
  }, [isOpen]);

  const hasContent = selections.length > 0 || status === "success";
  const isPlacing = status === "placing";
  const stakeEmpty = stake.trim() === "";
  const showNextStep = selections.length >= 1 && stakeEmpty && status !== "success";
  const showCombineHint = selections.length === 1 && stakeEmpty && status !== "success";

  if (!isOpen || !hasContent) return null;

  return (
    <>
      <div
        aria-hidden
        className="betslip-overlay fixed inset-0 z-40 pointer-events-none"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Betslip"
        className={cn(
          "theme-transition betslip-panel--open fixed z-50 flex flex-col rounded-xl border bg-card",
          "duration-[200ms] ease-out",
          mounted && isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
        right: "calc(env(safe-area-inset-right, 0px) + 16px)",
        width: "min(calc(100vw - 32px), 420px)",
        maxWidth: 460,
        minWidth: 380,
        transitionProperty: "transform, opacity",
      }}
    >
      <Card className="flex flex-1 flex-col overflow-hidden border-0 shadow-none">
        {/* Header - entire row clickable to expand/collapse */}
        <div
          className={cn(
            "betslip-panel-header flex shrink-0 flex-col border-b border-border px-4",
            selections.length > 0 ? "py-2" : "py-3"
          )}
        >
          <button
            type="button"
            role="button"
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? "Expand betslip" : "Collapse betslip"}
            onClick={onToggleCollapsed}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggleCollapsed();
              }
            }}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between rounded-none border-0 bg-transparent py-0 text-left outline-none",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            )}
          >
            <span className="text-sm font-semibold">
              Betslip
              {selections.length > 0 && (
                <span className="ml-1.5 text-muted-foreground">
                  ({selections.length})
                </span>
              )}
            </span>
            <span className="flex shrink-0 items-center justify-center" aria-hidden>
              {isCollapsed ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </span>
          </button>
          {showNextStep && (
            <p className="mt-1 text-xs text-muted-foreground">
              Add stake to place your bet
            </p>
          )}
        </div>

        <div
          className={cn(
            "flex flex-col overflow-hidden transition-[max-height] duration-200 ease-out",
            isCollapsed && "max-h-0"
          )}
          style={!isCollapsed ? { maxHeight: 420 } : undefined}
        >
          {/* Clear Slip */}
          <div className="shrink-0 border-b border-border px-4 py-1.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto px-0 text-sm text-muted-foreground hover:text-foreground"
              onClick={onClearSlip}
              disabled={isPlacing || selections.length === 0}
            >
              Clear Slip
            </Button>
          </div>

          {status === "success" ? (
            <div className="flex flex-1 items-center justify-center px-4 py-8">
              <p className="text-accent text-sm font-medium" role="status">
                Bet placed.
              </p>
            </div>
          ) : (
            <>
              {/* Selections list - shrink to fit when few items; scroll when many */}
              <div className="min-h-0 max-h-[240px] overflow-y-auto">
                <ul className="divide-y divide-border px-4 pt-0.5 pb-1">
                  {selections.map((sel) => (
                    <li
                      key={sel.id}
                      className="selection-row theme-transition flex gap-2 rounded-md px-2 py-2.5 text-left"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveSelection(sel.id)}
                        disabled={isPlacing}
                        aria-label={`Remove ${sel.optionLabel}`}
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                      <div className="min-w-0 flex-1">
                        <p className="text-accent line-clamp-2 text-sm font-medium">
                          {sel.optionLabel}
                        </p>
                        {sel.type === "boost" ? (
                          <>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Bet Boost
                            </p>
                            {sel.meta?.legs?.length ? (
                              <p className="line-clamp-2 text-xs text-muted-foreground">
                                {sel.meta.legs.join(" · ")}
                              </p>
                            ) : null}
                          </>
                        ) : (
                          <>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {sel.marketLabel}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {sel.eventName}
                            </p>
                          </>
                        )}
                      </div>
                      <span className="odds-text shrink-0 text-sm">
                        {sel.odds.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {showCombineHint && (
                <p className="shrink-0 px-4 pb-1 pt-0.5 text-xs text-muted-foreground">
                  Add more selections to combine odds
                </p>
              )}

              {/* Bottom: stake, remember, Place Bet - always visible, not cropped */}
              <div className="shrink-0 space-y-3 border-t border-border px-4 py-2.5" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}>
                <div className="flex items-center gap-3">
                  <label htmlFor="betslip-stake" className="text-sm text-muted-foreground">
                    Stake
                  </label>
                  <div className="relative ml-auto w-24">
                    <span
                      className="pointer-events-none absolute left-3 inset-y-0 flex items-center text-muted-foreground"
                      aria-hidden
                    >
                      $
                    </span>
                    <Input
                      id="betslip-stake"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={0.01}
                      placeholder="0.00"
                      value={stake}
                      onChange={(e) => onStakeChange(e.target.value)}
                      disabled={isPlacing}
                      className={cn(
                        "w-full pl-7 text-right tabular-nums",
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="betslip-remember"
                    checked={remember}
                    onCheckedChange={onRememberChange}
                    disabled={isPlacing}
                  />
                  <label
                    htmlFor="betslip-remember"
                    className="text-sm text-muted-foreground"
                  >
                    Remember
                  </label>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={onPlaceBet}
                  disabled={!canPlaceBet}
                  className="w-full gap-2"
                >
                  {isPlacing ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      <span>Placing…</span>
                    </>
                  ) : (
                    "Place Bet"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
    </>
  );
}
