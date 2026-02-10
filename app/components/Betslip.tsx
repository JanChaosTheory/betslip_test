"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2, X } from "lucide-react";
import type { Selection } from "../data/match";
import type { BetSlipStatus } from "../hooks/useBetSlip";

const STORAGE_KEY_STAKE = "betslip_stake";
const STORAGE_KEY_REMEMBER = "betslip_remember";

export function getStoredStake(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STORAGE_KEY_STAKE) ?? "";
}

export function getStoredRemember(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY_REMEMBER) === "true";
}

export function setStoredStake(value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY_STAKE, value);
}

export function setStoredRemember(value: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY_REMEMBER, value ? "true" : "false");
}

type BetSlipProps = {
  selected: Selection | null;
  stake: string;
  remember: boolean;
  status: BetSlipStatus;
  canPlaceBet: boolean;
  onStakeChange: (value: string) => void;
  onRememberChange: (checked: boolean) => void;
  onPlaceBet: () => void;
  onClose: () => void;
};

export function BetSlip({
  selected,
  stake,
  remember,
  status,
  canPlaceBet,
  onStakeChange,
  onRememberChange,
  onPlaceBet,
  onClose,
}: BetSlipProps) {
  const showBar = selected != null || status === "success";
  if (!showBar) return null;

  const summaryLine = selected
    ? `${selected.marketLabel} • ${selected.optionLabel}`
    : "";

  return (
    <div className="theme-transition fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
        {selected ? (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close betslip"
              className="shrink-0"
            >
              <X className="size-5" />
            </Button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" title={summaryLine}>
                {summaryLine}
              </p>
            </div>
            <span className="shrink-0 tabular-nums text-sm font-semibold text-amber-400">
              {selected.odds.toFixed(2)}
            </span>
            <div className="flex shrink-0 items-center gap-2">
              <label htmlFor="betslip-stake" className="sr-only">
                Stake
              </label>
              <Input
                id="betslip-stake"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                placeholder="Stake"
                value={stake}
                onChange={(e) => onStakeChange(e.target.value)}
                disabled={status === "placing"}
                className="h-9 w-24 rounded-full"
              />
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Switch
                id="betslip-remember"
                checked={remember}
                onCheckedChange={onRememberChange}
                disabled={status === "placing"}
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
              className="shrink-0 gap-2"
            >
              {status === "placing" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  <span>Placing…</span>
                </>
              ) : (
                "Place Bet"
              )}
            </Button>
          </>
        ) : (
          <div className="flex w-full items-center justify-between">
            <p className="text-accent text-sm font-medium" role="status">
              Bet placed.
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Dismiss"
            >
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
