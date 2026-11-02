"use client";

import Link from "next/link";
import { useState } from "react";
import { breeds } from "@/data/breeds";
import type { Breed } from "@/lib/types";
import { sample, shuffle } from "@/lib/shuffle";
import { BreedImage } from "@/components/breeds/BreedImage";
import { Icon } from "@/components/ui/Icon";
import { useScrollToGame } from "./useScrollToGame";
import { Feedback, GameIntro, GameOver, GameProgress, optionClass } from "./GameShell";

const ROUNDS = 8;
const pool = breeds.filter((b) => b.slug !== "domestic-shorthair");

interface Round {
  answer: Breed;
  options: Breed[];
}

function makeRounds(): Round[] {
  return sample(pool, ROUNDS).map((answer) => ({
    answer,
    options: shuffle([answer, ...sample(pool.filter((b) => b.slug !== answer.slug), 3)]),
  }));
}

export function GuessTheBreed() {
  const [rounds, setRounds] = useState<Round[] | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  useScrollToGame(rounds ? `${i}` : "intro");

  const start = () => {
    setRounds(makeRounds());
    setI(0);
    setPicked(null);
    setScore(0);
  };

  if (!rounds) {
    return (
      <GameIntro pose="curious" title="Can you name that cat?" onStart={start}>
        <p>
          We&apos;ll show you {ROUNDS} cat photos. Pick the breed from four options — look closely at the coat, ears, eyes and face shape.
        </p>
      </GameIntro>
    );
  }
  if (i >= rounds.length) return <GameOver score={score} total={rounds.length} onRestart={start} />;

  const r = rounds[i];
  const correct = picked === r.answer.slug;

  return (
    <div className="mx-auto max-w-2xl">
      <GameProgress current={i} total={rounds.length} score={score} />
      <div key={i} className="animate-fade-up">
        <div className="mx-auto max-w-xs rounded-[2rem] bg-clay-400 p-4 shadow-[var(--shadow-soft)]">
          <BreedImage breed={r.answer} alt="Mystery cat photo — which breed is it?" sizes="18rem" className="aspect-square rounded-[1.5rem]" />
          <p className="mt-3 text-center font-display font-semibold tracking-[0.25em] text-cream-50">WHO AM I?</p>
        </div>
        <h2 className="mt-6 text-center text-2xl font-semibold">Which breed is this?</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {r.options.map((o) => {
            const state = !picked ? "idle" : o.slug === r.answer.slug ? "correct" : o.slug === picked ? "wrong" : "dim";
            return (
              <li key={o.slug}>
                <button
                  type="button"
                  disabled={!!picked}
                  onClick={() => {
                    setPicked(o.slug);
                    if (o.slug === r.answer.slug) setScore((s) => s + 1);
                  }}
                  className={optionClass(state)}
                >
                  {state === "correct" && <Icon name="check" className="h-5 w-5 text-sage-600" />}
                  {state === "wrong" && <Icon name="x" className="h-5 w-5 text-pink-600" />}
                  {o.name}
                </button>
              </li>
            );
          })}
        </ul>
        {picked && (
          <>
            <Feedback correct={correct} title={correct ? "Purrfect! That's right." : `It's a ${r.answer.name}!`}>
              <p>
                <strong>Clues:</strong> {r.answer.identify}{" "}
                <Link href={`/breeds/${r.answer.slug}`} className="font-semibold text-clay-700 underline">
                  Read the profile
                </Link>
              </p>
            </Feedback>
            <div className="mt-5 text-right">
              <button type="button" className="btn btn-primary" onClick={() => { setI(i + 1); setPicked(null); }} autoFocus>
                {i === rounds.length - 1 ? "See my score" : "Next cat"} <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
