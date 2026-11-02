"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useFavorites, type FavoriteKind } from "./FavoritesProvider";

export function FavoriteButton({
  kind,
  id,
  name,
  className = "",
  size = "md",
  withLabel = false,
}: {
  kind: FavoriteKind;
  id: string;
  name: string;
  className?: string;
  size?: "sm" | "md";
  withLabel?: boolean;
}) {
  const { isFavorite, toggle, announce, ready } = useFavorites();
  const [pop, setPop] = useState(false);
  const active = ready && isFavorite(kind, id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={withLabel ? undefined : active ? `Remove ${name} from favorites` : `Save ${name} to favorites`}
      onClick={(e) => {
        // Favorite buttons often sit on clickable cards.
        e.preventDefault();
        e.stopPropagation();
        const added = toggle(kind, id);
        setPop(added);
        announce(added ? `${name} saved to favorites` : `${name} removed from favorites`);
      }}
      onAnimationEnd={() => setPop(false)}
      className={`relative z-10 inline-flex shrink-0 items-center justify-center gap-2 rounded-full transition-colors ${
        withLabel
          ? `btn btn-sm ${active ? "bg-pink-200 text-pink-600" : "btn-soft"}`
          : `${size === "sm" ? "h-9 w-9" : "h-11 w-11"} bg-cream-50/90 shadow-sm backdrop-blur hover:bg-pink-50 ${active ? "text-pink-600" : "text-ink-soft"}`
      } ${className}`}
    >
      <span className={pop ? "heart-pop" : ""}>
        <Icon name="heart" filled={active} className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      </span>
      {withLabel && <span>{active ? "Saved" : "Save to favorites"}</span>}
    </button>
  );
}
