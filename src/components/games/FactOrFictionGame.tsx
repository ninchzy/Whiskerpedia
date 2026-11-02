"use client";

import { useState } from "react";
import { factOrFiction, type FactOrFiction } from "@/data/games";
import { sample } from "@/lib/shuffle";
import { MascotArt } from "@/components/mascot/MascotArt";
import { Icon } from "@/components/ui/Icon";
import { useScrollToGame } from "./useScrollToGame";
import { Feedback, GameIntro, GameOver, GameProgress } from "./GameShell";

const ROUNDS = 10;

export function FactOrFictionGame() {
  const [rounds, setRounds] = useState<FactOrFiction[] | null>(null);
  const [i, setI] = useState(0);
  const [guess, setGuess] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  useScrollToGame(rounds ? `${i}` : "intro");

  const start = () => {
    setRounds(sample(factOrFiction, ROUNDS));
    setI(0);
    setGuess(null);
    setScore(0);
  };

  if (!rounds) {
    return (
      <GameIntro pose="surprised" title="Myth or meow-th?" onStart={start}>
        <p>{ROUNDS} statements about cats. Decide whether each is a fact or a bit of fiction — then find out why.</p>
      </GameIntro>
    );
  }
  if (i >= rounds.length) return <GameOver score={score} total={rounds.length} onRestart={start} />;

  const r = rounds[i];
  const answer = (g: boolean) => {
    setGuess(g);
    if (g === r.isFact) setScore((s) => s + 1);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <GameProgress current={i} total={rounds.length} score={score} />
      <div key={i} className="animate-fade-up">
        <div className="relative rounded-[2rem] bg-lavender-100 p-8 pt-12 text-center sm:p-12">
          <MascotArt pose={guess === null ? "curious" : guess === r.isFact ? "celebrate" : "surprised"} className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2" />
          <p className="eyebrow">Fact or fiction?</p>
          <h2 className="mt-3 text-2xl leading-snug font-semibold sm:text-3xl">“{r.statement}”</h2>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[true, false].map((val) => {
            const chosen = guess === val;
            const isRight = r.isFact === val;
            const tone = guess === null ? "bg-cream-50 shadow-[var(--shadow-soft)] hover:-translate-y-0.5" : isRight ? "bg-sage-100 border-sage-600" : chosen ? "bg-pink-100 border-pink-600" : "bg-cream-50 text-ink-faint";
            return (
              <button
                key={String(val)}
                type="button"
                disabled={guess !== null}
                onClick={() => answer(val)}
                className={`flex min-h-16 items-center justify-center gap-2 rounded-2xl border-3 border-transparent font-display text-xl font-semibold transition-all ${tone}`}
              >
                {val ? "✅ Fact" : "🙀 Fiction"}
              </button>
            );
          })}
        </div>
        {guess !== null && (
          <>
            <Feedback correct={guess === r.isFact} title={guess === r.isFact ? "You got it!" : `Actually, that's ${r.isFact ? "a fact" : "fiction"}.`}>
              <p>{r.explain}</p>
            </Feedback>
            <div className="mt-5 text-right">
              <button type="button" className="btn btn-primary" autoFocus onClick={() => { setI(i + 1); setGuess(null); }}>
                {i === rounds.length - 1 ? "See my score" : "Next statement"} <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
