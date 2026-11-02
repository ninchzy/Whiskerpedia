"use client";

import { useEffect, useState } from "react";
import { facts, factCategories } from "@/data/facts";
import type { Fact, FactCategory } from "@/lib/types";
import { FactCard } from "./FactCard";
import { Icon } from "@/components/ui/Icon";
import { MascotArt } from "@/components/mascot/MascotArt";

export function FactsBrowser() {
  const [category, setCategory] = useState<FactCategory | "all">("all");
  const [random, setRandom] = useState<Fact | null>(null);

  // Support /facts#fact-id links from search: show all and scroll to it.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && facts.some((f) => f.id === id)) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "center" }));
    }
    const c = new URLSearchParams(window.location.search).get("category");
    if (c && factCategories.some((x) => x.id === c)) setCategory(c as FactCategory);
  }, []);

  const shown = category === "all" ? facts : facts.filter((f) => f.category === category);

  const pickRandom = () => {
    const pool = facts.filter((f) => f.id !== random?.id);
    setRandom(pool[Math.floor(Math.random() * pool.length)]);
  };

  return (
    <div>
      <div className="mb-10 grid items-center gap-6 rounded-[2rem] bg-lavender-100 p-6 sm:p-8 md:grid-cols-[auto_1fr]">
        <MascotArt pose={random ? "surprised" : "curious"} className="mascot mx-auto h-32 w-32" />
        <div aria-live="polite">
          {random ? (
            <div key={random.id} className="animate-fade-up">
              <p className="eyebrow">Random cat fact</p>
              <h2 className="mt-2 text-2xl font-semibold">{random.title}</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{random.body}</p>
            </div>
          ) : (
            <div>
              <p className="eyebrow">Feeling curious?</p>
              <h2 className="mt-2 text-2xl font-semibold">Let Mochi pick a fact for you</h2>
            </div>
          )}
          <button type="button" className="btn btn-primary mt-4" onClick={pickRandom}>
            <Icon name="sparkle" className="h-4 w-4" /> {random ? "Another random fact" : "Random cat fact"}
          </button>
        </div>
      </div>

      <div role="group" aria-label="Filter facts by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:flex-wrap">
        {[{ id: "all" as const, label: "All facts" }, ...factCategories].map((c) => {
          const n = c.id === "all" ? facts.length : facts.filter((f) => f.category === c.id).length;
          const on = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                on ? "border-clay-500 bg-clay-500 text-white" : "border-cream-300 bg-cream-50 text-ink-soft hover:border-clay-300"
              }`}
            >
              {c.label} <span className={on ? "text-white/85" : "text-ink-faint"}>({n})</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} facts
      </p>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((f) => (
          <li key={f.id}>
            <FactCard fact={f} />
          </li>
        ))}
      </ul>
    </div>
  );
}
