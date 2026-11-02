import { breeds } from "@/data/breeds";
import { facts, categoryLabel } from "@/data/facts";
import { careGuides, careCategoryLabel } from "@/data/care";
import { games } from "@/data/pages";

export type SearchType = "breed" | "fact" | "guide" | "game";

export interface SearchItem {
  type: SearchType;
  title: string;
  description: string;
  href: string;
  keywords: string;
}

export const searchTypeLabels: Record<SearchType, string> = {
  breed: "Breeds",
  fact: "Cat facts",
  guide: "Care guides",
  game: "Games & tools",
};

export const searchIndex: SearchItem[] = [
  ...breeds.map((b) => ({
    type: "breed" as const,
    title: b.name,
    description: b.tagline,
    href: `/breeds/${b.slug}`,
    keywords: [b.origin, b.coatLength, b.size, b.coatType, b.colors, ...b.temperament, b.sociability, b.environment, b.health.map((h) => h.name).join(" ")].join(" "),
  })),
  ...facts.map((f) => ({
    type: "fact" as const,
    title: f.title,
    description: f.body,
    href: `/facts#${f.id}`,
    keywords: categoryLabel(f.category),
  })),
  ...careGuides.map((g) => ({
    type: "guide" as const,
    title: g.title,
    description: g.summary,
    href: `/care/${g.slug}`,
    keywords: [careCategoryLabel(g.category), g.intro, ...g.sections.map((s) => s.heading)].join(" "),
  })),
  ...games.map((g) => ({ type: "game" as const, title: g.title, description: g.description, href: g.href, keywords: g.keywords })),
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ");

const prepared = searchIndex.map((item) => ({
  item,
  title: normalize(item.title),
  keywords: normalize(item.keywords),
  description: normalize(item.description),
}));

/** Simple ranked search: every query word must appear somewhere; title hits weigh most. */
export function search(query: string, limit = 50): SearchItem[] {
  const tokens = normalize(query).split(/\s+/).filter((t) => t.length > 0);
  if (!tokens.length) return [];

  const scored: { item: SearchItem; score: number }[] = [];
  for (const p of prepared) {
    let score = 0;
    let all = true;
    for (const t of tokens) {
      let s = 0;
      if (p.title.includes(t)) s += new RegExp(`(^|\\s)${t}`).test(p.title) ? 8 : 5;
      if (p.keywords.includes(t)) s += 3;
      if (p.description.includes(t)) s += 1;
      if (s === 0) {
        all = false;
        break;
      }
      score += s;
    }
    if (all) scored.push({ item: p.item, score: score + (p.item.type === "breed" ? 0.5 : 0) });
  }
  return scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title)).slice(0, limit).map((s) => s.item);
}
