"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { MascotArt, type MascotPose } from "@/components/mascot/MascotArt";
import { PawBurst } from "@/components/ui/PawBurst";
import { Icon } from "@/components/ui/Icon";

export function GameProgress({ current, total, score }: { current: number; total: number; score: number }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between text-sm font-bold text-ink-soft">
        <span>
          Round {Math.min(current + 1, total)} of {total}
        </span>
        <span>
          Score: {score}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-cream-200" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current} aria-label={`${current} of ${total} answered`}>
        <div className="h-full rounded-full bg-gradient-to-r from-pink-300 to-clay-400 transition-all duration-500" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}

export function Feedback({ correct, title, children }: { correct: boolean; title?: string; children: ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-6 animate-fade-up rounded-[1.5rem] border-2 p-5 ${correct ? "border-sage-200 bg-sage-50" : "border-pink-200 bg-pink-50"}`}
    >
      <p className={`font-display text-xl font-semibold ${correct ? "text-sage-600" : "text-pink-600"}`}>{title ?? (correct ? "Purrfect! That's right." : "Not quite!")}</p>
      <div className="mt-1 leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export function GameOver({ score, total, onRestart, messages }: { score: number; total: number; onRestart: () => void; messages?: [number, string][] }) {
  const ratio = score / total;
  const pose: MascotPose = ratio >= 0.7 ? "celebrate" : ratio >= 0.4 ? "happy" : "surprised";
  const defaultMsgs: [number, string][] = [
    [0.9, "Certified cat genius! Mochi is impressed."],
    [0.7, "Wonderful! You really know your cats."],
    [0.4, "Nicely done — a few more facts and you'll be a pro."],
    [0, "Every expert starts somewhere. Have another go!"],
  ];
  const msg = (messages ?? defaultMsgs).find(([min]) => ratio >= min)?.[1];
  return (
    <div className="card relative overflow-hidden p-8 text-center sm:p-12">
      {ratio >= 0.7 && <PawBurst />}
      <MascotArt pose={pose} className="mx-auto h-40 w-40" />
      <h2 className="mt-4 text-3xl font-semibold" tabIndex={-1}>
        You scored {score} out of {total}
      </h2>
      <p className="mt-2 text-lg text-ink-soft">{msg}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          <Icon name="refresh" className="h-4 w-4" /> Play again
        </button>
        <Link href="/games" className="btn btn-secondary">
          More games
        </Link>
      </div>
    </div>
  );
}

export function GameIntro({ pose, title, children, onStart }: { pose: MascotPose; title: string; children: ReactNode; onStart: () => void }) {
  return (
    <div className="card p-8 text-center sm:p-12">
      <MascotArt pose={pose} className="mascot mx-auto h-36 w-36" />
      <h2 className="mt-4 text-3xl font-semibold">{title}</h2>
      <div className="mx-auto mt-2 max-w-md text-ink-soft">{children}</div>
      <button type="button" className="btn btn-primary mt-6" onClick={onStart}>
        Start game
      </button>
    </div>
  );
}

export function optionClass(state: "idle" | "correct" | "wrong" | "dim") {
  const base = "flex min-h-14 w-full items-center gap-3 rounded-2xl border-3 px-5 py-3 text-left font-display text-lg font-medium transition-all";
  if (state === "correct") return `${base} border-sage-600 bg-sage-100 text-ink`;
  if (state === "wrong") return `${base} border-pink-600 bg-pink-100 text-ink`;
  if (state === "dim") return `${base} border-transparent bg-cream-50 text-ink-faint`;
  return `${base} border-transparent bg-cream-50 shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-pink-200`;
}
