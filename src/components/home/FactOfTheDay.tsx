"use client";

import { useEffect, useState } from "react";
import { facts, factCategories, evidenceLabels } from "@/data/facts";
import { dayIndex } from "@/lib/daily";
import { Doodle } from "@/components/illustrations/Doodle";
import { Icon } from "@/components/ui/Icon";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { MascotArt } from "@/components/mascot/MascotArt";

export function FactOfTheDay() {
  // Start from a fixed fact for the server render, then switch to today's on the client.
  const [index, setIndex] = useState(0);
  const [isToday, setIsToday] = useState(true);
  const [spin, setSpin] = useState(0);

  useEffect(() => setIndex(dayIndex(facts.length)), []);

  const fact = facts[index];
  const cat = factCategories.find((c) => c.id === fact.category)!;

  const another = () => {
    let next = index;
    while (next === index) next = Math.floor(Math.random() * facts.length);
    setIndex(next);
    setIsToday(false);
    setSpin((s) => s + 1);
  };

  return (
    <div className="relative grid items-center gap-8 overflow-hidden rounded-[2.25rem] bg-butter-100 p-6 sm:p-10 md:grid-cols-[auto_1fr]">
      <div className="relative mx-auto w-40 sm:w-48">
        <div className="absolute inset-4 rounded-full bg-butter-200" aria-hidden="true" />
        <MascotArt pose="reading" className="mascot relative w-full" />
      </div>
      <div aria-live="polite">
        <p className="eyebrow">{isToday ? "Cat fact of the day" : "Another fun fact"}</p>
        <div key={spin} className="animate-fade-up">
          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream-50 text-ink">
              <Doodle name={fact.icon} className="h-7 w-7" fill="var(--color-butter-300)" />
            </span>
            <h3 className="text-2xl font-semibold sm:text-3xl">{fact.title}</h3>
          </div>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">{fact.body}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className={`pill ${cat.color}`}>{cat.label}</span>
            <span className="pill bg-cream-50 text-ink-soft">{evidenceLabels[fact.evidence].label}</span>
            {fact.source && (
              <a href={fact.source.url} target="_blank" rel="noopener noreferrer" className="pill bg-cream-50 text-clay-700 hover:bg-cream-200">
                Source <Icon name="external" className="h-3 w-3" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" onClick={another}>
            <Icon name="refresh" className="h-4 w-4" /> Reveal another fact
          </button>
          <FavoriteButton kind="facts" id={fact.id} name={fact.title} withLabel />
        </div>
      </div>
    </div>
  );
}
