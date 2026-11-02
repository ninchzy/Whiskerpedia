"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { breeds, getBreed } from "@/data/breeds";
import type { Breed } from "@/lib/types";
import { BreedImage } from "./BreedImage";
import { PawMeter } from "@/components/ui/PawMeter";
import { Icon } from "@/components/ui/Icon";
import { MascotArt } from "@/components/mascot/MascotArt";

const MAX = 3;
const sorted = [...breeds].sort((a, b) => a.name.localeCompare(b.name));

const explain = {
  activity: (b: Breed) => (b.traits.activity >= 4 ? "Needs daily, energetic play." : b.traits.activity <= 2 ? "Usually content with gentle play." : "Enjoys regular play sessions."),
  grooming: (b: Breed) => b.care.grooming,
  shedding: (b: Breed) => (b.traits.shedding >= 4 ? "Expect hair on furniture, especially in moults." : b.traits.shedding <= 1 ? "Light shedding (not hypoallergenic)." : "Moderate, seasonal shedding."),
  vocal: (b: Breed) => (b.traits.vocal >= 4 ? "Often talkative and loud." : b.traits.vocal <= 1 ? "Typically quiet; may chirp." : "Some conversation."),
};

const socText = { independent: "Independent", balanced: "Balanced", affectionate: "Affectionate" } as const;

export function CompareTool() {
  const [selected, setSelected] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("breeds");
    const initial = (raw ?? "maine-coon,ragdoll")
      .split(",")
      .filter((s, i, arr) => getBreed(s) && arr.indexOf(s) === i)
      .slice(0, MAX);
    setSelected(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.history.replaceState(null, "", selected.length ? `?breeds=${selected.join(",")}` : window.location.pathname);
  }, [selected, ready]);

  const chosen = selected.map((s) => getBreed(s)!).filter(Boolean);

  const setAt = (i: number, slug: string) =>
    setSelected((prev) => {
      const next = [...prev];
      if (!slug) next.splice(i, 1);
      else next[i] = slug;
      return next.filter((s, idx) => next.indexOf(s) === idx);
    });

  const rows: { label: string; render: (b: Breed) => ReactNode }[] = [
    { label: "Typical size", render: (b) => <p className="capitalize">{b.size} · {b.weight}</p> },
    {
      label: "Activity level",
      render: (b) => (
        <>
          <PawMeter value={b.traits.activity} label={`${b.name} activity`} variant="plain" />
          <p className="mt-1 text-sm text-ink-soft">{explain.activity(b)}</p>
        </>
      ),
    },
    {
      label: "Grooming needs",
      render: (b) => (
        <>
          <PawMeter value={b.traits.grooming} label={`${b.name} grooming`} variant="plain" />
          <p className="mt-1 text-sm text-ink-soft">{explain.grooming(b)}</p>
        </>
      ),
    },
    {
      label: "Shedding",
      render: (b) => (
        <>
          <PawMeter value={b.traits.shedding} label={`${b.name} shedding`} variant="plain" />
          <p className="mt-1 text-sm text-ink-soft">{explain.shedding(b)}</p>
        </>
      ),
    },
    {
      label: "Sociability",
      render: (b) => (
        <>
          <p className="font-semibold">{socText[b.sociability]}</p>
          <PawMeter value={b.traits.affection} label={`${b.name} affection`} variant="plain" />
        </>
      ),
    },
    {
      label: "Vocalization",
      render: (b) => (
        <>
          <PawMeter value={b.traits.vocal} label={`${b.name} vocalization`} variant="plain" />
          <p className="mt-1 text-sm text-ink-soft">{explain.vocal(b)}</p>
        </>
      ),
    },
    {
      label: "Common health considerations",
      render: (b) => (
        <ul className="list-disc space-y-1 pl-4 text-sm text-ink-soft">
          {b.health.map((h) => (
            <li key={h.name}>{h.name}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "May suit",
      render: (b) => (
        <ul className="space-y-1 text-sm text-ink-soft">
          {b.fit.suits.map((s) => (
            <li key={s}>✓ {s}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: MAX }).map((_, i) => {
          const slug = selected[i] ?? "";
          const disabled = i > selected.length;
          return (
            <label key={i} className={`block ${disabled ? "opacity-50" : ""}`}>
              <span className="mb-1.5 block font-display font-semibold">Breed {i + 1}</span>
              <select className="input" value={slug} disabled={disabled} onChange={(e) => setAt(i, e.target.value)}>
                <option value="">{i === 0 ? "Choose a breed" : "— None —"}</option>
                {sorted.map((b) => (
                  <option key={b.slug} value={b.slug} disabled={selected.includes(b.slug) && b.slug !== slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>

      {ready && chosen.length < 2 && (
        <div className="card mt-8 flex flex-col items-center p-10 text-center">
          <MascotArt pose="curious" className="h-32 w-32" />
          <p className="mt-4 text-lg text-ink-soft">Pick at least two breeds to see them side by side.</p>
        </div>
      )}

      {chosen.length >= 2 && (
        <div className="mt-8 overflow-x-auto rounded-[1.75rem] bg-cream-50 shadow-[var(--shadow-soft)]">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">Comparison of {chosen.map((b) => b.name).join(", ")}</caption>
            <thead>
              <tr>
                <th scope="col" className="w-44 p-4">
                  <span className="sr-only">Trait</span>
                </th>
                {chosen.map((b) => (
                  <th key={b.slug} scope="col" className="p-4 align-bottom">
                    <BreedImage breed={b} alt="" thumbnail sizes="112px" className="mx-auto aspect-square w-28 rounded-2xl" />
                    <Link href={`/breeds/${b.slug}`} className="mt-2 block text-center font-display text-lg font-semibold text-ink hover:text-clay-700 hover:underline">
                      {b.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={i % 2 ? "" : "bg-cream-100/70"}>
                  <th scope="row" className="p-4 align-top font-display font-semibold text-ink">
                    {r.label}
                  </th>
                  {chosen.map((b) => (
                    <td key={b.slug} className="p-4 align-top">
                      {r.render(b)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 flex gap-2 rounded-2xl bg-sage-50 px-5 py-4 text-sm leading-relaxed text-ink-soft">
        <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" />
        Comparisons describe typical breed tendencies drawn from registry and veterinary sources — not guaranteed behavior. Individual cats can differ a lot from their
        breed&apos;s reputation.
      </p>
    </div>
  );
}
