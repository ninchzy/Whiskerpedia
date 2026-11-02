import Link from "next/link";
import type { Metadata } from "next";
import { search, searchTypeLabels, type SearchType } from "@/lib/search";
import { MascotArt } from "@/components/mascot/MascotArt";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Search",
  description: "Search cat breeds, facts, care guides and games.",
  robots: { index: false },
};

const typeTint: Record<SearchType, string> = {
  breed: "bg-pink-100 text-pink-600",
  fact: "bg-butter-100 text-butter-700",
  guide: "bg-sage-100 text-sage-600",
  game: "bg-lavender-100 text-lavender-600",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string }> }) {
  const { q = "", type } = await searchParams;
  const query = q.slice(0, 100);
  const all = search(query, 200);
  const activeType = type && type in searchTypeLabels ? (type as SearchType) : null;
  const results = activeType ? all.filter((r) => r.type === activeType) : all;
  const counts = Object.fromEntries((Object.keys(searchTypeLabels) as SearchType[]).map((t) => [t, all.filter((r) => r.type === t).length])) as Record<SearchType, number>;

  const href = (t: SearchType | null) => `/search?q=${encodeURIComponent(query)}${t ? `&type=${t}` : ""}`;

  return (
    <section className="container-page pt-8 sm:pt-12">
      <h1 className="text-4xl font-bold">Search</h1>
      <form action="/search" className="mt-5 flex max-w-2xl gap-2" role="search">
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <div className="relative flex-1">
          <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-clay-500" />
          <input id="q" name="q" type="search" defaultValue={query} className="input pl-12" placeholder="Try “Maine Coon”, “purring” or “litter”" />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {query.trim() ? (
        <>
          <p className="mt-6 text-ink-soft" role="status">
            {all.length} result{all.length === 1 ? "" : "s"} for <strong className="text-ink">“{query}”</strong>
          </p>
          {all.length > 0 && (
            <nav aria-label="Filter results by type" className="mt-4 flex flex-wrap gap-2">
              <Link href={href(null)} aria-current={!activeType ? "page" : undefined} className={`pill px-4 py-2 text-sm ${!activeType ? "bg-clay-600 text-white" : "bg-cream-50 text-ink-soft shadow-sm"}`}>
                All ({all.length})
              </Link>
              {(Object.keys(searchTypeLabels) as SearchType[]).map((t) =>
                counts[t] ? (
                  <Link
                    key={t}
                    href={href(t)}
                    aria-current={activeType === t ? "page" : undefined}
                    className={`pill px-4 py-2 text-sm ${activeType === t ? "bg-clay-600 text-white" : "bg-cream-50 text-ink-soft shadow-sm"}`}
                  >
                    {searchTypeLabels[t]} ({counts[t]})
                  </Link>
                ) : null,
              )}
            </nav>
          )}
          {results.length > 0 ? (
            <ul className="mt-8 grid max-w-3xl gap-3">
              {results.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="card card-hover flex items-start gap-4 p-5">
                    <span className={`pill mt-1 shrink-0 ${typeTint[r.type]}`}>{searchTypeLabels[r.type].replace(/s$/, "")}</span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-semibold">{r.title}</span>
                      <span className="line-clamp-2 block text-ink-soft">{r.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="card mt-8 flex max-w-xl flex-col items-center p-10 text-center">
              <MascotArt pose="surprised" className="h-32 w-32" />
              <p className="mt-4 font-display text-xl font-semibold">Mochi sniffed everywhere but found nothing.</p>
              <p className="mt-2 text-ink-soft">Check the spelling, try fewer words, or browse a section instead.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Link href="/breeds" className="btn btn-sm btn-secondary">
                  Breeds
                </Link>
                <Link href="/facts" className="btn btn-sm btn-secondary">
                  Facts
                </Link>
                <Link href="/care" className="btn btn-sm btn-secondary">
                  Care
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 flex items-center gap-4 text-ink-soft">
          <MascotArt pose="curious" className="h-24 w-24" />
          <p>What would you like to find? Search across {"breeds, facts, care guides and games"}.</p>
        </div>
      )}
    </section>
  );
}
