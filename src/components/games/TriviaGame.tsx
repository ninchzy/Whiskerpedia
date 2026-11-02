"use client";

import { useState } from "react";
import { trivia, type TriviaQuestion } from "@/data/games";
import { sample, shuffle } from "@/lib/shuffle";
import { Icon } from "@/components/ui/Icon";
import { useScrollToGame } from "./useScrollToGame";
import { Feedback, GameIntro, GameOver, GameProgress, optionClass } from "./GameShell";

const ROUNDS = 10;

export function TriviaGame() {
  const [rounds, setRounds] = useState<TriviaQuestion[] | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  useScrollToGame(rounds ? `${i}` : "intro");

  const start = () => {
    // Shuffle answer positions too, so the correct option is never predictable.
    setRounds(
      sample(trivia, ROUNDS).map((q) => {
        const order = shuffle(q.options.map((_, idx) => idx));
        return { ...q, options: order.map((idx) => q.options[idx]), answer: order.indexOf(q.answer) };
      }),
    );
    setI(0);
    setPicked(null);
    setScore(0);
  };

  if (!rounds) {
    return (
      <GameIntro pose="reading" title="The Cat Trivia Challenge" onStart={start}>
        <p>
          {ROUNDS} questions drawn from a pool of {trivia.length}, so every game is a little different. Ready to prove your purr-fessional knowledge?
        </p>
      </GameIntro>
    );
  }
  if (i >= rounds.length) return <GameOver score={score} total={rounds.length} onRestart={start} />;

  const q = rounds[i];
  return (
    <div className="mx-auto max-w-2xl">
      <GameProgress current={i} total={rounds.length} score={score} />
      <div key={i} className="animate-fade-up">
        <p className="eyebrow">Question {i + 1}</p>
        <h2 className="mt-2 text-2xl leading-snug font-semibold sm:text-3xl">{q.q}</h2>
        <ul className="mt-6 grid gap-3">
          {q.options.map((o, idx) => {
            const state = picked === null ? "idle" : idx === q.answer ? "correct" : idx === picked ? "wrong" : "dim";
            return (
              <li key={o}>
                <button
                  type="button"
                  disabled={picked !== null}
                  className={optionClass(state)}
                  onClick={() => {
                    setPicked(idx);
                    if (idx === q.answer) setScore((s) => s + 1);
                  }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-clay-700" aria-hidden="true">
                    {"ABCD"[idx]}
                  </span>
                  {o}
                </button>
              </li>
            );
          })}
        </ul>
        {picked !== null && (
          <>
            <Feedback correct={picked === q.answer}>
              <p>
                {picked !== q.answer && (
                  <>
                    The answer is <strong>{q.options[q.answer]}</strong>.{" "}
                  </>
                )}
                {q.explain}
              </p>
            </Feedback>
            <div className="mt-5 text-right">
              <button type="button" className="btn btn-primary" autoFocus onClick={() => { setI(i + 1); setPicked(null); }}>
                {i === rounds.length - 1 ? "See my score" : "Next question"} <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
