"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "./useMediaQuery";

const SCROLL_TOP_THRESHOLD = 24;
const SCROLL_DOWN_ACCUMULATED_THRESHOLD = 12;
const TOGGLE_LOCK_MS = 220;

/**
 * Returns true when tabs should be hidden (scroll down). MOBILE ONLY (< 768px).
 * Same logic and transitions as before: no scroll listener on desktop, no jumpiness.
 * - scrollY < 24: force tabs visible.
 * - Scroll up: show tabs immediately.
 * - Scroll down: hide after accumulated down >= 12px; lock 220ms after toggle.
 */
export function useHideTabsOnScroll(): boolean {
  const isMobile = useIsMobile();
  const [tabsHidden, setTabsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const accumulatedDown = useRef(0);
  const ticking = useRef(false);
  const lockUntil = useRef(0);
  const hiddenRef = useRef(tabsHidden);
  hiddenRef.current = tabsHidden;

  const onScroll = useCallback(() => {
    if (!isMobile) {
      setTabsHidden(false);
      return;
    }
    if (Date.now() < lockUntil.current) return;

    const scrollY = window.scrollY ?? window.pageYOffset;
    if (scrollY < SCROLL_TOP_THRESHOLD) {
      accumulatedDown.current = 0;
      if (hiddenRef.current) {
        setTabsHidden(false);
        lockUntil.current = Date.now() + TOGGLE_LOCK_MS;
      }
      lastScrollY.current = scrollY;
      return;
    }
    const delta = scrollY - lastScrollY.current;
    if (delta < 0) {
      accumulatedDown.current = 0;
      if (hiddenRef.current) {
        setTabsHidden(false);
        lockUntil.current = Date.now() + TOGGLE_LOCK_MS;
      }
    } else if (delta > 0) {
      accumulatedDown.current += delta;
      if (
        accumulatedDown.current >= SCROLL_DOWN_ACCUMULATED_THRESHOLD &&
        !hiddenRef.current
      ) {
        setTabsHidden(true);
        lockUntil.current = Date.now() + TOGGLE_LOCK_MS;
      }
    }
    lastScrollY.current = scrollY;
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      setTabsHidden(false);
      return;
    }
    lastScrollY.current = window.scrollY ?? window.pageYOffset;
    accumulatedDown.current = 0;

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          onScroll();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, onScroll]);

  return isMobile ? tabsHidden : false;
}
