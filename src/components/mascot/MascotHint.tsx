"use client";

import { useEffect } from "react";
import type { MascotPose } from "./MascotArt";
import { mascotSay } from "./bus";

/** Drop into any page to give the floating mascot a page-specific message (desktop only, after a short delay). */
export function MascotHint({ text, pose = "sign", delay = 1600 }: { text: string; pose?: MascotPose; delay?: number }) {
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const t = setTimeout(() => mascotSay(text, pose), delay);
    return () => clearTimeout(t);
  }, [text, pose, delay]);
  return null;
}
