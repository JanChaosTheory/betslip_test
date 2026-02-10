"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Loader2, X } from "lucide-react";
import type { Selection } from "../data/match";

const STORAGE_KEY_STAKE = "betslip-stake";
const STORAGE_KEY_REMEMBER = "betslip-remember";

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

export type LastResult = "idle" | "success" | "error";

type BetSlipProps = {
  selections: Selection[];
  stake: string;
  rememberStake: boolean;
  isPlacing: boolean;
  lastResult: LastResult;
  onStakeChange: (value: string) => void;
  onRememberChange: (checked: boolean) => void;
  onPlaceBet: () => void;
  onClose: () => void;
};

function isValidStake(stake: string): boolean {
  const n = parseFloat(stake);
  return !Number.isNaN(n) && n > 0;
}

export function BetSlip({
  selections,
  stake,
  rememberStake,
  isPlacing,
  lastResult,
  onStakeChange,
  onRememberChange,
  onPlaceBet,
  onClose,
}: BetSlipProps) {
  const showBar = selections.length > 0 || lastResult === "success";
  if (!showBar) return null;

  const selection = selections[0];
  const canPlace = selection && isValidStake(stake) && !isPlacing;
  const titleLine = selection
    ? `${selection.marketLabel} · ${selection.optionLabel}`
    : "";

  return (
    <div className="theme-transition fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3">
        {selection ? (
          <>
            <div className="flex h-8 items-center gap-2">
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
                <p className="truncate text-sm font-medium" title={titleLine}>
                  {titleLine}
                </p>
              </div>
              <span className="shrink-0 tabular-nums text-sm font-semibold text-amber-400">
                {selection.odds.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
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
                  disabled={isPlacing}
                  className="h-9 w-24"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="betslip-remember"
                  checked={rememberStake}
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
                disabled={!canPlace}
                className="ml-auto gap-2"
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
        ) : (
          <div className="flex h-8 items-center justify-between">
            <p className="text-sm font-medium text-green-600" role="status">
              Bet placed successfully.
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onClose()}
              aria-label="Dismiss"
            >
              Dismiss
            </Button>
          </div>
        )}
        {lastResult === "error" && selection && (
          <p className="text-sm font-medium text-destructive" role="alert">
            Something went wrong. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
