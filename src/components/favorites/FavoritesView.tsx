"use client";

import Link from "next/link";
import { useState } from "react";
import { breedMap } from "@/data/breeds";
import { factMap } from "@/data/facts";
import { careMap } from "@/data/care";
import { BreedCard } from "@/components/breeds/BreedCard";
import { FactCard } from "@/components/facts/FactCard";
import { GuideCard } from "@/components/care/GuideCard";
import { MascotArt } from "@/components/mascot/MascotArt";
import { SleepingLoader } from "@/components/ui/SleepingLoader";
import { useFavorites, type FavoriteKind } from "./FavoritesProvider";

const tabs: { id: FavoriteKind; label: string }[] = [
  { id: "breeds", label: "Breeds" },
  { id: "facts", label: "Facts" },
  { id: "guides", label: "Care guides" },
];

export function FavoritesView() {
  const { favorites, ready, count, clear, announce } = useFavorites();
  const [confirm, setConfirm] = useState(false);

  if (!ready) return <SleepingLoader label="Fetching your favorites…" />;

  if (count === 0) {
    return (
      <div className="card mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center">
        <MascotArt pose="sleeping" className="h-40 w-40" />
        <p className="mt-4 font-display text-2xl font-semibold">“Your collection is still waiting for its first little furball!”</p>
        <p className="mt-2 text-ink-soft">Tap the heart on any breed, fact or care guide to save it here. Favorites stay in this browser — no account needed.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/breeds" className="btn btn-primary">
            Explore breeds
          </Link>
          <Link href="/facts" className="btn btn-secondary">
            Browse facts
          </Link>
        </div>
      </div>
    );
  }

  const breedsList = favorites.breeds.map((s) => breedMap.get(s)).filter((b) => b !== undefined);
  const factsList = favorites.facts.map((s) => factMap.get(s)).filter((f) => f !== undefined);
  const guidesList = favorites.guides.map((s) => careMap.get(s)).filter((g) => g !== undefined);

  return (
    <div>
      <nav aria-label="Favorite types" className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <a key={t.id} href={`#fav-${t.id}`} className="pill bg-cream-50 px-4 py-2 text-sm text-ink-soft shadow-sm hover:bg-pink-100">
            {t.label} ({favorites[t.id].length})
          </a>
        ))}
      </nav>

      {breedsList.length > 0 && (
        <section id="fav-breeds" className="mb-12 scroll-mt-28" aria-labelledby="fav-breeds-title">
          <h2 id="fav-breeds-title" className="mb-5 text-2xl font-semibold">
            Saved breeds
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {breedsList.map((b) => (
              <li key={b.slug}>
                <BreedCard breed={b} compact />
              </li>
            ))}
          </ul>
          {breedsList.length >= 2 && (
            <Link href={`/compare?breeds=${breedsList.slice(0, 3).map((b) => b.slug).join(",")}`} className="btn btn-secondary mt-5">
              Compare my saved breeds
            </Link>
          )}
        </section>
      )}
      {factsList.length > 0 && (
        <section id="fav-facts" className="mb-12 scroll-mt-28" aria-labelledby="fav-facts-title">
          <h2 id="fav-facts-title" className="mb-5 text-2xl font-semibold">
            Saved facts
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {factsList.map((f) => (
              <li key={f.id}>
                <FactCard fact={f} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {guidesList.length > 0 && (
        <section id="fav-guides" className="mb-12 scroll-mt-28" aria-labelledby="fav-guides-title">
          <h2 id="fav-guides-title" className="mb-5 text-2xl font-semibold">
            Saved care guides
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guidesList.map((g) => (
              <li key={g.slug}>
                <GuideCard guide={g} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="rounded-2xl bg-cream-200 p-5">
        <p className="text-sm text-ink-soft">Tap a heart again to remove a single item. Favorites are stored only in this browser.</p>
        {confirm ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-semibold">Remove all {count} favorites?</span>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => {
                clear();
                setConfirm(false);
                announce("All favorites removed");
              }}
            >
              Yes, clear all
            </button>
            <button type="button" className="btn btn-sm btn-soft" onClick={() => setConfirm(false)}>
              Keep them
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn-sm btn-ghost mt-2" onClick={() => setConfirm(true)}>
            Clear all favorites
          </button>
        )}
      </div>
    </div>
  );
}
