"use client";

import { useState } from "react";
import { featuredCats, personalityQuestions, personalityTypes, type PersonalityTrait } from "@/data/games";
import type { CatLook, Level } from "@/lib/types";
import { CatPortrait } from "@/components/illustrations/CatPortrait";
import { PawMeter } from "@/components/ui/PawMeter";
import { Icon } from "@/components/ui/Icon";
import { MascotArt } from "@/components/mascot/MascotArt";
import { PawBurst } from "@/components/ui/PawBurst";
import { useScrollToGame } from "./useScrollToGame";

const NAMES = ["Mochi", "Tofu", "Pickles", "Waffles", "Miso", "Nori", "Pudding", "Bean", "Sesame", "Clementine", "Dumpling", "Maple", "Toast", "Olive"];
const NAME_RE = /^[\p{L}][\p{L} '\-]{0,19}$/u;

const coatName: Record<CatLook["pattern"], string> = {
  solid: "Solid",
  tabby: "Tabby",
  mackerel: "Tabby",
  pointed: "Colorpoint",
  mitted: "Mitted",
  bicolor: "Tuxedo",
  calico: "Calico",
  tortie: "Tortie",
  spotted: "Spotted",
  ticked: "Ticked",
  mink: "Mink",
};

const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

interface CardData {
  name: string;
  trait: PersonalityTrait;
  look: CatLook;
  like: string;
  dislike: string;
  quirk: string;
  activity: string;
  levels: { sass: Level; cuddle: Level; zoom: Level; curious: Level };
}

function toLevel(points: number): Level {
  return Math.max(1, Math.min(5, 1 + Math.round(points * 0.6 + Math.random() * 0.8))) as Level;
}

export function PersonalityGenerator() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [card, setCard] = useState<CardData | null>(null);
  useScrollToGame(card ? `${card.name}|${card.like}|${card.dislike}|${card.quirk}|${card.activity}` : "form");

  const complete = personalityQuestions.every((q) => answers[q.id]);

  const generate = (keepName?: string) => {
    const trimmed = (keepName ?? name).trim();
    if (trimmed && !NAME_RE.test(trimmed)) {
      setError("Names can use letters, spaces, apostrophes and hyphens (up to 20 characters).");
      return;
    }
    if (!complete) {
      setError("Answer all four questions to generate your card.");
      return;
    }
    setError("");
    const totals: Record<PersonalityTrait, number> = { calm: 0, curious: 0, social: 0, sassy: 0, playful: 0 };
    for (const q of personalityQuestions) {
      const opt = q.options.find((o) => o.id === answers[q.id]);
      for (const [k, v] of Object.entries(opt?.score ?? {})) totals[k as PersonalityTrait] += v as number;
    }
    const top = (Object.keys(totals) as PersonalityTrait[]).sort((a, b) => totals[b] - totals[a] || Math.random() - 0.5)[0];
    const p = personalityTypes[top];
    setCard({
      name: trimmed || pick(NAMES),
      trait: top,
      look: pick(featuredCats).look,
      like: pick(p.likes),
      dislike: pick(p.dislikes),
      quirk: pick(p.quirks),
      activity: pick(p.activities),
      levels: { sass: toLevel(totals.sassy), cuddle: toLevel(totals.social + totals.calm * 0.5), zoom: toLevel(totals.playful), curious: toLevel(totals.curious) },
    });
  };

  if (card) {
    const p = personalityTypes[card.trait];
    return (
      <div>
        <article className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-clay-400 p-3 shadow-[var(--shadow-lift)] sm:p-4" aria-labelledby="pcard-name">
          <PawBurst />
          <div className="relative rounded-[1.6rem] bg-cream-50 p-4 sm:p-6">
            <div className="grid gap-6 md:grid-cols-[minmax(0,17rem)_1fr]">
              <div className="rounded-[1.25rem] bg-clay-400 p-3 pb-4">
                <div className="bg-plaid overflow-hidden rounded-[1rem]">
                  <CatPortrait look={card.look} title={`Illustration of ${card.name}`} className="aspect-square w-full animate-fade-up" />
                </div>
                <p className="mt-3 text-center font-display font-semibold tracking-[0.2em] text-cream-50">{coatName[card.look.pattern]} Cat</p>
              </div>
              <div className="flex flex-col">
                <h2 id="pcard-name" className="text-center text-5xl font-bold sm:text-6xl">
                  {card.name}
                </h2>
                <div className="dotted-rule my-4" aria-hidden="true" />
                <p className="text-center font-display text-2xl font-bold text-clay-500">{p.type}</p>
                <p className="mt-1 text-center text-ink-soft">{p.tagline}</p>
                <dl className="mt-5 space-y-3">
                  {[
                    ["Loves", card.like],
                    ["Not a fan of", card.dislike],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center gap-3">
                      <dt className="w-28 shrink-0 font-display text-lg font-semibold text-ink-soft">{k}</dt>
                      <dd className="flex-1 rounded-full border-3 border-clay-400 px-4 py-2 text-center font-display text-lg font-semibold text-clay-600">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {(
                [
                  ["Sassiness", card.levels.sass],
                  ["Cuddliness", card.levels.cuddle],
                  ["Zoomies", card.levels.zoom],
                  ["Curiosity", card.levels.curious],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3">
                  <dt className="font-display text-xl font-bold text-clay-500">{k}</dt>
                  <dd>
                    <PawMeter value={v} label={k} showWord={false} />
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <p className="rounded-2xl bg-butter-50 px-4 py-3">
                <span className="block text-xs font-bold tracking-wide text-butter-700 uppercase">Favorite activity</span>
                <span className="font-display text-lg">{card.activity}</span>
              </p>
              <p className="rounded-2xl bg-lavender-50 px-4 py-3">
                <span className="block text-xs font-bold tracking-wide text-lavender-600 uppercase">Signature quirk</span>
                <span className="font-display text-lg">{card.quirk}</span>
              </p>
            </div>
          </div>
        </article>
        <p className="mt-4 text-center text-sm text-ink-faint">Just for fun — a fictional personality card, not a real assessment.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn btn-primary" onClick={() => generate(card.name)}>
            <Icon name="refresh" className="h-4 w-4" /> Shuffle details
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setCard(null);
              setAnswers({});
              setName("");
            }}
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="mx-auto max-w-3xl"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        generate();
      }}
    >
      <div className="mb-8 flex items-center gap-4 rounded-[2rem] bg-butter-100 p-5">
        <MascotArt pose="curious" className="h-20 w-20 shrink-0" />
        <p className="text-ink-soft">Answer four silly questions about your (real or imaginary) cat and we&apos;ll create a one-of-a-kind personality card.</p>
      </div>
      <div className="space-y-8">
        {personalityQuestions.map((q, qi) => (
          <fieldset key={q.id}>
            <legend className="font-display text-xl font-semibold">
              {qi + 1}. {q.question}
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((o) => {
                const on = answers[q.id] === o.id;
                return (
                  <label
                    key={o.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-3 px-4 py-3 font-semibold transition-all has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay-600 ${
                      on ? "border-clay-500 bg-pink-50" : "border-transparent bg-cream-50 shadow-sm hover:border-pink-200"
                    }`}
                  >
                    <input type="radio" name={q.id} className="sr-only" checked={on} onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))} />
                    <span className={`h-5 w-5 shrink-0 rounded-full border-2 ${on ? "border-clay-500 bg-clay-500 ring-3 ring-inset ring-cream-50" : "border-cream-300"}`} aria-hidden="true" />
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
        <div>
          <label htmlFor="pname" className="font-display text-xl font-semibold">
            5. Your cat&apos;s name <span className="text-base font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="pname"
            className="input mt-3 max-w-sm"
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            placeholder="Leave blank for a surprise"
            aria-invalid={!!error && !!name && !NAME_RE.test(name.trim())}
            aria-describedby={error ? "pgen-error" : undefined}
          />
        </div>
      </div>
      {error && (
        <p id="pgen-error" role="alert" className="mt-6 rounded-2xl bg-pink-50 px-4 py-3 font-semibold text-pink-600">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary mt-8 text-lg">
        <Icon name="sparkle" /> Generate my card
      </button>
    </form>
  );
}
