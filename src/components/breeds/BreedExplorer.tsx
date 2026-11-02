"use client";

import { useEffect, useMemo, useState } from "react";
import { breeds } from "@/data/breeds";
import type { Breed } from "@/lib/types";
import { levelBand } from "@/lib/levels";
import { BreedCard } from "./BreedCard";
import { Icon } from "@/components/ui/Icon";
import { MascotArt } from "@/components/mascot/MascotArt";

type GroupId = "coat" | "size" | "activity" | "grooming" | "sociability" | "environment" | "shedding";

const groups: { id: GroupId; label: string; options: { value: string; label: string }[]; get: (b: Breed) => string }[] = [
  {
    id: "coat",
    label: "Coat length",
    options: [
      { value: "short", label: "Short" },
      { value: "medium", label: "Medium" },
      { value: "long", label: "Long" },
      { value: "hairless", label: "Hairless" },
    ],
    get: (b) => b.coatLength,
  },
  {
    id: "size",
    label: "Size",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
    get: (b) => b.size,
  },
  {
    id: "activity",
    label: "Activity level",
    options: [
      { value: "low", label: "Low" },
      { value: "moderate", label: "Moderate" },
      { value: "high", label: "High" },
    ],
    get: (b) => levelBand(b.traits.activity),
  },
  {
    id: "grooming",
    label: "Grooming needs",
    options: [
      { value: "low", label: "Low" },
      { value: "moderate", label: "Moderate" },
      { value: "high", label: "High" },
    ],
    get: (b) => levelBand(b.traits.grooming),
  },
  {
    id: "sociability",
    label: "Sociability",
    options: [
      { value: "independent", label: "Independent" },
      { value: "balanced", label: "Balanced" },
      { value: "affectionate", label: "Affectionate" },
    ],
    get: (b) => b.sociability,
  },
  {
    id: "environment",
    label: "Living environment",
    options: [
      { value: "apartment", label: "Apartment-friendly" },
      { value: "adaptable", label: "Adaptable" },
      { value: "space", label: "Benefits from more space" },
    ],
    get: (b) => b.environment,
  },
  {
    id: "shedding",
    label: "Shedding",
    options: [
      { value: "low", label: "Low" },
      { value: "moderate", label: "Moderate" },
      { value: "high", label: "High" },
    ],
    get: (b) => levelBand(b.traits.shedding),
  },
];

const sorts = {
  az: { label: "A–Z", fn: (a: Breed, b: Breed) => a.name.localeCompare(b.name) },
  affection: { label: "Most affectionate", fn: (a: Breed, b: Breed) => b.traits.affection - a.traits.affection || a.name.localeCompare(b.name) },
  grooming: { label: "Easiest grooming", fn: (a: Breed, b: Breed) => a.traits.grooming - b.traits.grooming || a.name.localeCompare(b.name) },
  activity: { label: "Most active", fn: (a: Breed, b: Breed) => b.traits.activity - a.traits.activity || a.name.localeCompare(b.name) },
} as const;
type SortKey = keyof typeof sorts;

type Selected = Record<GroupId, string[]>;
const emptySelected = (): Selected => ({ coat: [], size: [], activity: [], grooming: [], sociability: [], environment: [], shedding: [] });

export function BreedExplorer() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Selected>(emptySelected);
  const [sort, setSort] = useState<SortKey>("az");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore filters from the URL so filtered views can be shared.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next = emptySelected();
    for (const g of groups) {
      const v = params.get(g.id);
      if (v) next[g.id] = v.split(",").filter((x) => g.options.some((o) => o.value === x));
    }
    setSelected(next);
    setQuery(params.get("q") ?? "");
    const s = params.get("sort");
    if (s && s in sorts) setSort(s as SortKey);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    for (const g of groups) if (selected[g.id].length) params.set(g.id, selected[g.id].join(","));
    if (sort !== "az") params.set("sort", sort);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [query, selected, sort, hydrated]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return breeds
      .filter((b) => {
        if (q) {
          const hay = [b.name, b.origin, b.tagline, ...b.temperament, b.colors].join(" ").toLowerCase();
          if (!q.split(/\s+/).every((t) => hay.includes(t))) return false;
        }
        return groups.every((g) => selected[g.id].length === 0 || selected[g.id].includes(g.get(b)));
      })
      .sort(sorts[sort].fn);
  }, [query, selected, sort]);

  const activeCount = Object.values(selected).reduce((n, v) => n + v.length, 0);
  const clearAll = () => {
    setSelected(emptySelected());
    setQuery("");
  };

  const toggle = (g: GroupId, value: string) =>
    setSelected((s) => ({ ...s, [g]: s[g].includes(value) ? s[g].filter((v) => v !== value) : [...s[g], value] }));

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      {/* Filters */}
      <aside aria-label="Breed filters">
        <button
          type="button"
          className="btn btn-soft w-full justify-between lg:hidden"
          aria-expanded={filtersOpen}
          aria-controls="breed-filters"
          onClick={() => setFiltersOpen((o) => !o)}
        >
          <span className="flex items-center gap-2">
            <Icon name="filter" /> Filters {activeCount > 0 && <span className="pill bg-clay-600 text-white">{activeCount}</span>}
          </span>
          <Icon name="chevron-down" className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
        </button>
        <div id="breed-filters" className={`${filtersOpen ? "block" : "hidden"} mt-4 space-y-6 lg:sticky lg:top-28 lg:mt-0 lg:block`}>
          {groups.map((g) => (
            <fieldset key={g.id}>
              <legend className="mb-2 font-display font-semibold text-ink">{g.label}</legend>
              <div className="flex flex-wrap gap-2">
                {g.options.map((o) => {
                  const on = selected[g.id].includes(o.value);
                  return (
                    <label
                      key={o.value}
                      className={`cursor-pointer rounded-full border-2 px-3.5 py-1.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay-600 ${
                        on ? "border-clay-500 bg-clay-500 text-white" : "border-cream-300 bg-cream-50 text-ink-soft hover:border-clay-300"
                      }`}
                    >
                      <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(g.id, o.value)} />
                      {on && <span aria-hidden="true">✓ </span>}
                      {o.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
          <button type="button" onClick={clearAll} disabled={activeCount === 0 && !query} className="btn btn-secondary btn-sm w-full">
            Clear all filters
          </button>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <label htmlFor="breed-search" className="sr-only">
              Search breeds
            </label>
            <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-clay-500" />
            <input
              id="breed-search"
              type="search"
              className="input pl-12"
              placeholder="Find your kind of cat…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="input w-auto py-2 pr-8">
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mb-4 text-sm font-semibold text-ink-soft" role="status" aria-live="polite">
          {results.length === breeds.length ? `Showing all ${breeds.length} breeds` : `${results.length} of ${breeds.length} breeds match`}
        </p>

        {results.length === 0 ? (
          <div className="card flex flex-col items-center px-6 py-14 text-center">
            <MascotArt pose="surprised" className="h-36 w-36" />
            <h2 className="mt-4 text-2xl font-semibold">No breeds match all of those filters</h2>
            <p className="mt-2 max-w-md text-ink-soft">
              That&apos;s a very specific cat! Try removing a filter or two — and remember, shelter cats come in every combination.
            </p>
            <button type="button" className="btn btn-primary mt-6" onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((b) => (
              <li key={b.slug}>
                <BreedCard breed={b} headingLevel={2} />
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 rounded-2xl bg-sage-50 px-5 py-4 text-sm leading-relaxed text-ink-soft">
          <strong className="text-sage-600">Good to know:</strong> filters describe typical breed tendencies. Individual cats vary widely in personality, energy and
          care needs — meeting the cat is always the best guide.
        </p>
      </div>
    </div>
  );
}
