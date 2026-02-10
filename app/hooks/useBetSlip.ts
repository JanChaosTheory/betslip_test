"use client";

import { useCallback, useEffect, useState } from "react";
import type { Selection } from "../data/match";
import {
  getStoredRemember,
  getStoredStake,
  setStoredStake,
  setStoredRemember,
} from "../components/Betslip";

export type BetSlipStatus = "idle" | "placing" | "success" | "error";

const PLACE_BET_DELAY_MS = 800;
const SUCCESS_VISIBLE_MS = 1200;

export function useBetSlip() {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [stake, setStake] = useState("");
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState<BetSlipStatus>("idle");

  useEffect(() => {
    setStake(getStoredStake());
    setRemember(getStoredRemember());
  }, []);

  const stakeNumber = parseFloat(stake);
  const isStakeValid =
    typeof stake === "string" &&
    stake.trim() !== "" &&
    Number.isFinite(stakeNumber) &&
    stakeNumber > 0;
  const canPlaceBet =
    selections.length > 0 && isStakeValid && status !== "placing";

  const open = useCallback(() => {
    setIsOpen(true);
    setIsCollapsed(false);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((c) => !c);
  }, []);

  const toggleSelection = useCallback((selection: Selection) => {
    setSelections((prev) => {
      const exists = prev.some((s) => s.id === selection.id);
      if (exists) {
        const next = prev.filter((s) => s.id !== selection.id);
        if (next.length === 0) setIsOpen(false);
        return next;
      }
      if (prev.length === 0) {
        setIsOpen(true);
        setIsCollapsed(false);
      }
      return [...prev, selection];
    });
  }, []);

  const removeSelection = useCallback((id: string) => {
    setSelections((prev) => {
      const next = prev.filter((s) => s.id !== id);
      if (next.length === 0) setIsOpen(false);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelections([]);
    setIsOpen(false);
  }, []);

  const setStakeValue = useCallback((value: string) => {
    setStake(value);
    if (remember) setStoredStake(value);
  }, [remember]);

  const setRememberValue = useCallback((checked: boolean) => {
    setRemember(checked);
    setStoredRemember(checked);
    if (checked) setStoredStake(stake);
    else setStoredStake("");
  }, [stake]);

  const placeBet = useCallback(() => {
    if (!canPlaceBet || selections.length === 0) return;
    if (remember) setStoredStake(stake);
    setStatus("placing");
    setTimeout(() => {
      setStatus("success");
      setSelections([]);
      if (!remember) setStake("");
      setTimeout(() => {
        setStatus("idle");
        setIsOpen(false);
      }, SUCCESS_VISIBLE_MS);
    }, PLACE_BET_DELAY_MS);
  }, [canPlaceBet, selections.length, stake, remember]);

  return {
    selections,
    isOpen,
    isCollapsed,
    stake,
    remember,
    status,
    canPlaceBet,
    open,
    close,
    toggleCollapsed,
    toggleSelection,
    removeSelection,
    clearAll,
    setStake: setStakeValue,
    setRemember: setRememberValue,
    placeBet,
  };
}
