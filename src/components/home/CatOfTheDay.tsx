"use client";

import { useEffect, useState } from "react";
import { featuredCats } from "@/data/games";
import { dayIndex } from "@/lib/daily";
import { CatPortrait } from "@/components/illustrations/CatPortrait";
import { SleepingLoader } from "@/components/ui/SleepingLoader";

/** Daily featured (fictional) cat, laid out like a stationery profile card. */
export function CatOfTheDay() {
  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => setIndex(dayIndex(featuredCats.length, 3)), []);

  if (index === null) {
    return (
      <div className="card flex min-h-[22rem] items-center justify-center">
        <SleepingLoader label="Waking up today's cat…" />
      </div>
    );
  }

  const cat = featuredCats[index];
  return (
    <article className="card animate-fade-up overflow-hidden p-4 sm:p-6" aria-labelledby="cotd-name">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,13rem)_1fr]">
        <div className="rounded-[1.5rem] bg-clay-400 p-3 pb-4">
          <div className="bg-plaid overflow-hidden rounded-[1.1rem]">
            <CatPortrait look={cat.look} className="mx-auto aspect-square w-full" title={`Illustration of ${cat.name}`} />
          </div>
          <p className="mt-3 text-center font-display text-sm font-semibold tracking-[0.2em] text-cream-50">CAT OF THE DAY</p>
        </div>
        <div className="flex flex-col">
          <h3 id="cotd-name" className="text-center text-4xl font-bold text-ink sm:text-left">
            {cat.name}
          </h3>
          <div className="dotted-rule my-3" aria-hidden="true" />
          <p className="text-center font-display text-lg font-semibold text-clay-600 sm:text-left">{cat.title}</p>
          <p className="mt-2 leading-relaxed text-ink-soft">{cat.personality}</p>
          <dl className="mt-4 grid gap-2.5">
            <div className="flex items-center gap-3">
              <dt className="w-24 shrink-0 font-display font-semibold text-ink-soft">Loves</dt>
              <dd className="flex-1 rounded-full border-2 border-clay-400 bg-cream-50 px-4 py-1.5 text-center font-display font-semibold text-clay-700">
                {cat.likes}
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="w-24 shrink-0 font-display font-semibold text-ink-soft">Not a fan of</dt>
              <dd className="flex-1 rounded-full border-2 border-clay-400 bg-cream-50 px-4 py-1.5 text-center font-display font-semibold text-clay-700">
                {cat.dislikes}
              </dd>
            </div>
          </dl>
          <p className="mt-4 rounded-2xl bg-sage-50 px-4 py-3 text-sm leading-relaxed text-ink-soft">
            <span className="font-bold text-sage-600">Fun fact: </span>
            {cat.funFact}
          </p>
        </div>
      </div>
    </article>
  );
}
