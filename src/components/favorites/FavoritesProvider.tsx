"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { readStore, writeStore } from "@/lib/storage";

export type FavoriteKind = "breeds" | "facts" | "guides";
type FavoriteState = Record<FavoriteKind, string[]>;

const EMPTY: FavoriteState = { breeds: [], facts: [], guides: [] };

interface FavoritesContextValue {
  favorites: FavoriteState;
  ready: boolean;
  count: number;
  isFavorite: (kind: FavoriteKind, id: string) => boolean;
  toggle: (kind: FavoriteKind, id: string) => boolean;
  remove: (kind: FavoriteKind, id: string) => void;
  clear: () => void;
  announcement: string;
  announce: (msg: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteState>(EMPTY);
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const stored = readStore<Partial<FavoriteState>>("favorites", {});
    setFavorites({
      breeds: Array.isArray(stored.breeds) ? stored.breeds : [],
      facts: Array.isArray(stored.facts) ? stored.facts : [],
      guides: Array.isArray(stored.guides) ? stored.guides : [],
    });
    setReady(true);

    // Keep tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key?.endsWith(":favorites")) {
        const next = readStore<FavoriteState>("favorites", EMPTY);
        setFavorites({ ...EMPTY, ...next });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback((fn: (prev: FavoriteState) => FavoriteState) => {
    setFavorites((prev) => {
      const next = fn(prev);
      writeStore("favorites", next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((kind: FavoriteKind, id: string) => favorites[kind].includes(id), [favorites]);

  const toggle = useCallback(
    (kind: FavoriteKind, id: string) => {
      const adding = !favorites[kind].includes(id);
      update((prev) => ({
        ...prev,
        [kind]: adding ? [...prev[kind].filter((x) => x !== id), id] : prev[kind].filter((x) => x !== id),
      }));
      return adding;
    },
    [favorites, update],
  );

  const remove = useCallback((kind: FavoriteKind, id: string) => update((prev) => ({ ...prev, [kind]: prev[kind].filter((x) => x !== id) })), [update]);
  const clear = useCallback(() => update(() => EMPTY), [update]);
  const announce = useCallback((msg: string) => {
    setAnnouncement("");
    // Re-set on the next frame so screen readers repeat identical messages.
    requestAnimationFrame(() => setAnnouncement(msg));
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      ready,
      count: favorites.breeds.length + favorites.facts.length + favorites.guides.length,
      isFavorite,
      toggle,
      remove,
      clear,
      announcement,
      announce,
    }),
    [favorites, ready, isFavorite, toggle, remove, clear, announcement, announce],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
