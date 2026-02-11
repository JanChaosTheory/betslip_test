"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Returns true when window.scrollY > threshold. Used for header shadow when content is under it.
 */
export function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  const check = useCallback(() => {
    const y = window.scrollY ?? window.pageYOffset;
    setScrolled(y > threshold);
  }, [threshold]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          check();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    check();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [check]);

  return scrolled;
}
