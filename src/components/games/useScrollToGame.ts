"use client";

import { useEffect, useRef } from "react";
import { GAME_AREA_ID } from "./GamePage";

/**
 * When the game moves to a new screen (start, next round, results), bring the
 * play area back to the top of the viewport — otherwise a shorter screen can
 * leave the player looking at the footer.
 */
export function useScrollToGame(screenKey: unknown) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = document.getElementById(GAME_AREA_ID);
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    // Already sitting comfortably near the top? Leave the scroll alone.
    if (top >= 0 && top < window.innerHeight * 0.25) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [screenKey]);
}
