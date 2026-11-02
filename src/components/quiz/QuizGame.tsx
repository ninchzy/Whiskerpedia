"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { quizQuestions } from "@/data/quiz";
import { scoreBreeds, type Answers } from "@/lib/matching";
import { MascotArt } from "@/components/mascot/MascotArt";
import { mascotSay } from "@/components/mascot/bus";
import { Doodle } from "@/components/illustrations/Doodle";
import { Icon } from "@/components/ui/Icon";
import { QuizResult } from "./QuizResult";

type Stage = "intro" | "questions" | "result";

const hostLines = [
  "Let's start easy!",
  "Ooh, I love this one.",
  "Every home can be cat-friendly!",
  "Brushing time can be bonding time.",
  "Pounce or snooze?",
  "Mrrrow? 😺",
  "Safety first for everyone at home.",
  "Last one — make it count!",
];

export function QuizGame() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const q = quizQuestions[step];
  const total = quizQuestions.length;
  const results = useMemo(() => (stage === "result" ? scoreBreeds(quizQuestions, answers) : []), [stage, answers]);

  useEffect(() => {
    if (stage !== "intro") headingRef.current?.focus();
  }, [stage, step]);
  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const next = () => {
    clearTimeout(advanceTimer.current);
    if (step < total - 1) setStep(step + 1);
    else {
      setStage("result");
      mascotSay("Ta-da! I found your purrfect match! 🎉", "celebrate");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    clearTimeout(advanceTimer.current);
    if (step > 0) setStep(step - 1);
    else setStage("intro");
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setStage("intro");
    window.scrollTo({ top: 0 });
  };

  if (stage === "intro") {
    return (
      <div className="relative overflow-hidden rounded-[2.5rem] bg-pink-100 px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="bg-dots absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative">
          <MascotArt pose="wave" className="mascot mx-auto h-44 w-44 sm:h-56 sm:w-56" />
          <p className="eyebrow mt-4">The purrfect match game</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-6xl">Let&apos;s Find Your Purrfect Match!</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft sm:text-xl">
            Answer a few little questions and meet the cat that might be your new best friend.
          </p>
          <button type="button" className="btn btn-primary mt-8 px-10 text-xl" onClick={() => setStage("questions")}>
            Let&apos;s Play! <Icon name="sparkle" />
          </button>
          <p className="hand mt-5 text-clay-700">8 questions · no sign-up · about 2 minutes</p>
        </div>
      </div>
    );
  }

  if (stage === "result") {
    return <QuizResult results={results} answers={answers} onRestart={restart} onBack={() => { setStage("questions"); setStep(total - 1); }} />;
  }

  const selected = answers[q.id];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="sr-only">Find your purrfect match quiz</h1>
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-ink-soft">
          <span>
            Question {step + 1} of {total}
          </span>
          <span>{Math.round((step / total) * 100)}% done</span>
        </div>
        <div
          className="h-3.5 overflow-hidden rounded-full bg-cream-200"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={step + 1}
          aria-label={`Question ${step + 1} of ${total}`}
        >
          <div className="h-full rounded-full bg-gradient-to-r from-pink-300 to-clay-400 transition-all duration-500" style={{ width: `${((step + (selected ? 1 : 0)) / total) * 100}%` }} />
        </div>
      </div>

      <div key={q.id} className="animate-fade-up">
        <div className="flex items-end gap-3">
          <MascotArt pose={step === total - 1 ? "surprised" : step % 2 ? "curious" : "happy"} className="mascot h-20 w-20 shrink-0 sm:h-24 sm:w-24" />
          <p className="relative mb-4 rounded-3xl rounded-bl-md bg-cream-50 px-4 py-2 font-display text-ink-soft shadow-sm">{hostLines[step]}</p>
        </div>

        <fieldset className="mt-4">
          <legend className="w-full">
            <h2 ref={headingRef} tabIndex={-1} className="text-3xl font-semibold outline-none sm:text-4xl">
              {q.question}
            </h2>
            <span className="mt-2 block text-ink-soft">{q.hint}</span>
          </legend>

          <div className={`mt-6 grid gap-3 ${q.options.length > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
            {q.options.map((o) => {
              const on = selected === o.id;
              return (
                <label
                  key={o.id}
                  className={`group relative flex min-h-24 cursor-pointer items-center gap-4 rounded-[1.5rem] border-3 p-4 transition-all duration-200 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay-600 ${
                    on ? "-translate-y-1 border-clay-500 bg-pink-50 shadow-[var(--shadow-lift)]" : "border-transparent bg-cream-50 shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:border-pink-200"
                  }`}
                  onClick={(e) => {
                    // Auto-advance for pointer clicks only; keyboard users move on with the Next button.
                    if (e.detail > 0) {
                      clearTimeout(advanceTimer.current);
                      advanceTimer.current = setTimeout(next, 420);
                    }
                  }}
                >
                  <input type="radio" name={q.id} value={o.id} checked={on} onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))} className="sr-only" />
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:rotate-[-6deg] ${on ? "bg-clay-400 text-cream-50" : "bg-pink-100 text-ink"}`}
                  >
                    <Doodle name={o.icon} className="h-9 w-9" fill={on ? "var(--color-clay-300)" : "var(--color-pink-200)"} />
                  </span>
                  <span className="font-display text-lg leading-snug font-medium">{o.label}</span>
                  {on && (
                    <span className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-clay-600 text-white">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" className="btn btn-ghost" onClick={back}>
          <Icon name="arrow-left" className="h-4 w-4" /> Back
        </button>
        <button type="button" className="btn btn-primary" onClick={next} disabled={!selected}>
          {step === total - 1 ? "See my match" : "Next"} <Icon name="arrow" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
