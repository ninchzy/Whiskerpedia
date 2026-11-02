"use client";

import { useState } from "react";
import type { Breed } from "@/lib/types";
import { breedPhotos } from "@/data/photos";
import { CatPortrait } from "@/components/illustrations/CatPortrait";
import { BreedImage, PhotoCredit } from "./BreedImage";

type View = { id: string; label: string; kind: "photo" | "art"; happy?: boolean; alt: string };

export function BreedGallery({ breed }: { breed: Breed }) {
  const views: View[] = [
    ...(breedPhotos[breed.slug] ? [{ id: "photo", label: "Photo", kind: "photo" as const, alt: `Photo of a ${breed.name} cat` }] : []),
    { id: "art", label: "Illustration", kind: "art", alt: `Illustration of a ${breed.name}` },
    { id: "content", label: "Content illustration", kind: "art", happy: true, alt: `Illustration of a contented ${breed.name} with closed eyes` },
  ];
  const [active, setActive] = useState(0);
  const view = views[active];

  return (
    <div>
      <div className="rounded-[2rem] bg-clay-400 p-4 pb-5 shadow-[var(--shadow-soft)]">
        <div key={view.id} className="animate-fade-up overflow-hidden rounded-[1.5rem]">
          {view.kind === "photo" ? (
            <BreedImage breed={breed} alt={view.alt} preload sizes="(min-width: 1024px) 22rem, 90vw" className="aspect-square" />
          ) : (
            <div className="bg-plaid">
              <CatPortrait look={breed.look} happy={view.happy} title={view.alt} className="mx-auto aspect-square w-full max-w-sm" />
            </div>
          )}
        </div>
        <p className="mt-3 text-center font-display text-sm font-semibold tracking-[0.25em] text-cream-50 uppercase">{breed.name}</p>
      </div>
      <div className="mt-3 flex justify-center gap-2" role="group" aria-label="Gallery views">
        {views.map((v, i) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`h-16 w-16 overflow-hidden rounded-2xl border-3 transition ${i === active ? "border-clay-500" : "border-transparent opacity-80 hover:opacity-100"}`}
          >
            {v.kind === "photo" ? (
              <BreedImage breed={breed} alt="" thumbnail sizes="64px" className="h-full w-full" />
            ) : (
              <span className="bg-plaid block h-full w-full">
                <CatPortrait look={breed.look} happy={v.happy} className="h-full w-full" />
              </span>
            )}
            <span className="sr-only">{v.label}</span>
          </button>
        ))}
      </div>
      {view.kind === "photo" ? (
        <PhotoCredit slug={breed.slug} className="mt-2 text-center" />
      ) : (
        <p className="mt-2 text-center text-xs text-ink-faint">Original illustration — real cats vary in color and pattern.</p>
      )}
    </div>
  );
}
