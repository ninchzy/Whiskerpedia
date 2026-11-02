import type { ReactNode } from "react";
import type { IllustrationName } from "@/lib/types";

/** Small hand-drawn style doodle icons, stroke-based so they inherit `currentColor`. */
const paths: Record<IllustrationName, ReactNode> = {
  whisker: (
    <>
      <circle cx="24" cy="26" r="9" fill="var(--fill)" />
      <path d="M15 24 L3 20 M15 27 L3 28 M16 30 L5 35 M33 24 L45 20 M33 27 L45 28 M32 30 L43 35" />
      <path d="M21 27 h6 l-3 3 z" />
    </>
  ),
  paw: (
    <>
      <ellipse cx="24" cy="31" rx="9" ry="8" fill="var(--fill)" />
      <circle cx="13" cy="20" r="4" fill="var(--fill)" />
      <circle cx="20" cy="13" r="4" fill="var(--fill)" />
      <circle cx="28" cy="13" r="4" fill="var(--fill)" />
      <circle cx="35" cy="20" r="4" fill="var(--fill)" />
    </>
  ),
  eye: (
    <>
      <path d="M4 24 Q24 6 44 24 Q24 42 4 24 Z" fill="var(--fill)" />
      <ellipse cx="24" cy="24" rx="4" ry="9" fill="currentColor" />
    </>
  ),
  ear: (
    <>
      <path d="M12 40 L16 6 L38 28 Z" fill="var(--fill)" />
      <path d="M17 33 L19 15 L30 27" />
      <path d="M38 8 q5 5 0 10 M42 4 q8 9 0 18" />
    </>
  ),
  nose: (
    <>
      <path d="M16 20 h16 l-8 9 z" fill="var(--fill)" />
      <path d="M24 29 q-4 7 -10 4 M24 29 q4 7 10 4" />
      <path d="M10 10 q3 -3 6 0 M32 10 q3 -3 6 0" />
    </>
  ),
  heart: <path d="M24 41 C8 30 4 21 9 14 C14 7 22 9 24 16 C26 9 34 7 39 14 C44 21 40 30 24 41 Z" fill="var(--fill)" />,
  moon: (
    <>
      <path d="M30 6 A18 18 0 1 0 42 32 A14 14 0 1 1 30 6 Z" fill="var(--fill)" />
      <path d="M36 12 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 z" />
    </>
  ),
  fish: (
    <>
      <path d="M6 24 C14 12 30 12 36 24 C30 36 14 36 6 24 Z" fill="var(--fill)" />
      <path d="M36 24 L44 16 V32 Z" fill="var(--fill)" />
      <circle cx="14" cy="22" r="1.6" fill="currentColor" />
    </>
  ),
  yarn: (
    <>
      <circle cx="22" cy="24" r="15" fill="var(--fill)" />
      <path d="M10 16 Q22 22 34 14 M8 26 Q22 32 36 22 M12 34 Q24 38 34 30 M16 10 Q12 24 20 38" />
      <path d="M36 32 q6 4 8 10" />
    </>
  ),
  mouse: (
    <>
      <path d="M8 32 C8 20 20 14 30 18 L40 28 C36 34 22 36 8 32 Z" fill="var(--fill)" />
      <circle cx="24" cy="16" r="5" fill="var(--fill)" />
      <circle cx="34" cy="26" r="1.5" fill="currentColor" />
      <path d="M8 32 q-6 4 -2 10" />
    </>
  ),
  dna: (
    <>
      <path d="M14 4 C14 18 34 22 34 44 M34 4 C34 18 14 22 14 44" />
      <path d="M17 12 h14 M19 20 h10 M19 28 h10 M17 36 h14" />
    </>
  ),
  kitten: (
    <>
      <path d="M10 18 L12 6 L20 13 Q24 12 28 13 L36 6 L38 18 Q42 30 30 36 Q24 38 18 36 Q6 30 10 18 Z" fill="var(--fill)" />
      <path d="M18 22 q2 -2 4 0 M26 22 q2 -2 4 0 M22 28 h4 l-2 2 z" />
      <path d="M16 38 q8 6 16 0" />
    </>
  ),
  scroll: (
    <>
      <path d="M10 8 H34 V40 H14 Q10 40 10 36 Z" fill="var(--fill)" />
      <path d="M34 8 q6 0 6 5 v3 h-6 M16 16 h12 M16 22 h12 M16 28 h8" />
    </>
  ),
  wave: (
    <>
      <path d="M4 24 q5 -12 10 0 t10 0 t10 0 t10 0" />
      <path d="M4 34 q5 -8 10 0 t10 0 t10 0 t10 0" opacity="0.5" />
      <circle cx="24" cy="12" r="5" fill="var(--fill)" />
    </>
  ),
  star: <path d="M24 4 L29 17 L43 18 L32 27 L36 41 L24 33 L12 41 L16 27 L5 18 L19 17 Z" fill="var(--fill)" />,
  box: (
    <>
      <path d="M6 18 L24 10 L42 18 V36 L24 44 L6 36 Z" fill="var(--fill)" />
      <path d="M6 18 L24 26 L42 18 M24 26 V44" />
      <path d="M17 12 L14 6 L20 9 M31 12 L34 6 L28 9" />
    </>
  ),
  bowl: (
    <>
      <path d="M4 22 H44 C44 34 34 40 24 40 C14 40 4 34 4 22 Z" fill="var(--fill)" />
      <path d="M14 18 q2 -6 6 -2 q4 -6 8 0 q4 -4 6 2" />
    </>
  ),
  water: (
    <>
      <path d="M24 4 C24 4 10 20 10 29 A14 14 0 0 0 38 29 C38 20 24 4 24 4 Z" fill="var(--fill)" />
      <path d="M17 30 q1 5 6 6" />
    </>
  ),
  litter: (
    <>
      <path d="M4 22 H44 L40 40 H8 Z" fill="var(--fill)" />
      <path d="M10 22 q4 -6 8 0 q4 -6 8 0 q4 -6 8 0 q4 -6 6 0" />
      <path d="M30 6 L36 18" />
    </>
  ),
  brush: (
    <>
      <rect x="6" y="18" width="26" height="12" rx="6" fill="var(--fill)" />
      <path d="M32 24 H44 M10 30 v6 M15 30 v6 M20 30 v6 M25 30 v6" />
    </>
  ),
  scratch: (
    <>
      <rect x="16" y="6" width="16" height="32" rx="3" fill="var(--fill)" />
      <path d="M16 12 L32 16 M16 20 L32 24 M16 28 L32 32 M8 42 H40" />
    </>
  ),
  home: (
    <>
      <path d="M6 22 L24 8 L42 22 V42 H6 Z" fill="var(--fill)" />
      <path d="M20 42 V30 H28 V42" />
      <path d="M33 13 V6 H38 V17" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M12 6 V18 A8 8 0 0 0 28 18 V6" />
      <path d="M20 26 V32 A8 8 0 0 0 36 32 V28" />
      <circle cx="36" cy="24" r="5" fill="var(--fill)" />
    </>
  ),
  tooth: <path d="M12 8 C18 4 30 4 36 8 C42 14 38 24 34 30 L32 42 C30 44 28 42 27 38 L24 30 L21 38 C20 42 18 44 16 42 L14 30 C10 24 6 14 12 8 Z" fill="var(--fill)" />,
  clock: (
    <>
      <circle cx="24" cy="24" r="17" fill="var(--fill)" />
      <path d="M24 13 V24 L31 29" />
    </>
  ),
  bubble: (
    <>
      <path d="M6 10 H42 V32 H22 L12 40 V32 H6 Z" fill="var(--fill)" />
      <path d="M14 20 h20 M14 25 h12" />
    </>
  ),
  cats: (
    <>
      <path d="M4 40 V22 L8 12 L13 18 L18 12 L22 22 V40 Z" fill="var(--fill)" />
      <path d="M26 40 V26 L29 18 L33 22 L37 18 L40 26 V40 Z" fill="var(--fill)" />
      <path d="M22 34 q2 -6 4 0" />
    </>
  ),
  leaf: (
    <>
      <path d="M8 40 C8 20 20 8 40 8 C40 28 28 40 8 40 Z" fill="var(--fill)" />
      <path d="M8 40 L30 18" />
    </>
  ),
  bag: (
    <>
      <path d="M8 16 H40 L37 42 H11 Z" fill="var(--fill)" />
      <path d="M17 16 V12 A7 7 0 0 1 31 12 V16" />
      <path d="M19 28 q5 5 10 0" />
    </>
  ),
  shield: (
    <>
      <path d="M24 4 L40 10 V22 C40 32 32 40 24 44 C16 40 8 32 8 22 V10 Z" fill="var(--fill)" />
      <path d="M24 14 V28 M24 33 v1" />
    </>
  ),
};

export function Doodle({
  name,
  className = "h-10 w-10",
  fill = "var(--color-pink-200)",
}: {
  name: IllustrationName;
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ ["--fill" as string]: fill }}
    >
      {paths[name]}
    </svg>
  );
}

/** Tiny decorative paw print. */
export function PawPrint({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="12" cy="16" rx="5" ry="4.2" />
      <circle cx="5.5" cy="10" r="2.3" />
      <circle cx="9.5" cy="5.8" r="2.3" />
      <circle cx="14.5" cy="5.8" r="2.3" />
      <circle cx="18.5" cy="10" r="2.3" />
    </svg>
  );
}
