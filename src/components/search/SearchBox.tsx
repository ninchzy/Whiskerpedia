"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import type { SearchItem, SearchType } from "@/lib/search";

type SearchModule = typeof import("@/lib/search");

const typeTint: Record<SearchType, string> = {
  breed: "bg-pink-100 text-pink-600",
  fact: "bg-butter-100 text-butter-700",
  guide: "bg-sage-100 text-sage-600",
  game: "bg-lavender-100 text-lavender-600",
};

/**
 * Accessible combobox: results appear as you type, arrow keys move through
 * them, Enter opens one (or the full results page), Escape closes the list.
 */
export function SearchBox({ autoFocus = false, onNavigate }: { autoFocus?: boolean; onNavigate?: () => void }) {
  const router = useRouter();
  const id = useId();
  const listId = `${id}-list`;
  const [query, setQuery] = useState("");
  const [mod, setMod] = useState<SearchModule | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // The index is loaded lazily, the first time someone reaches for search.
  const load = () => {
    if (mod) return;
    import("@/lib/search")
      .then((m) => setMod(m))
      .catch(() => setLoadError(true));
  };

  useEffect(() => {
    if (autoFocus) {
      load();
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus]);

  const results: SearchItem[] = mod && query.trim() ? mod.search(query, 7) : [];

  const go = (href: string) => {
    setOpen(false);
    onNavigate?.();
    router.push(href);
  };

  const submit = () => {
    if (active >= 0 && results[active]) return go(results[active].href);
    if (query.trim()) go(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label htmlFor={`${id}-input`} className="sr-only">
        Search breeds, facts, care guides and games
      </label>
      <div className="relative">
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-clay-500" />
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="search"
          role="combobox"
          aria-expanded={open && query.trim().length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
          autoComplete="off"
          placeholder="Search breeds, facts, care…"
          className="input pl-12"
          value={query}
          onFocus={() => {
            load();
            setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(results.length, a + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(-1, a - 1));
            } else if (e.key === "Escape") {
              setOpen(false);
              setActive(-1);
            }
          }}
        />
      </div>

      {open && query.trim() && (
        <div className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-3xl border border-cream-300 bg-cream-50 shadow-[var(--shadow-lift)]">
          <ul id={listId} role="listbox" aria-label="Search suggestions" className="max-h-[60vh] overflow-y-auto p-2">
            {loadError && <li className="px-4 py-3 text-sm text-ink-soft">Search is unavailable right now. Please try again.</li>}
            {!mod && !loadError && <li className="px-4 py-3 text-sm text-ink-soft">Sniffing around…</li>}
            {mod && results.length === 0 && (
              <li className="px-4 py-3 text-sm text-ink-soft">No matches for “{query}”. Try a breed name, “purring” or “litter”.</li>
            )}
            {results.map((r, i) => (
              <li
                key={r.href}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  go(r.href);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-2.5 ${i === active ? "bg-cream-200" : ""}`}
              >
                <span className={`pill mt-0.5 shrink-0 ${typeTint[r.type]}`}>{mod?.searchTypeLabels[r.type].replace(/s$/, "")}</span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold text-ink">{r.title}</span>
                  <span className="block truncate text-sm text-ink-soft">{r.description}</span>
                </span>
              </li>
            ))}
            {mod && results.length > 0 && (
              <li
                id={`${id}-opt-${results.length}`}
                role="option"
                aria-selected={active === results.length}
                onMouseDown={(e) => {
                  e.preventDefault();
                  go(`/search?q=${encodeURIComponent(query.trim())}`);
                }}
                className={`mt-1 cursor-pointer rounded-2xl px-3 py-2.5 text-sm font-bold text-clay-700 ${active === results.length ? "bg-cream-200" : ""}`}
              >
                See all results for “{query}” →
              </li>
            )}
          </ul>
        </div>
      )}
    </form>
  );
}
