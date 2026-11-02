import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { breeds } from "@/data/breeds";
import { careGuides } from "@/data/care";
import { games } from "@/data/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/breeds", "/compare", "/facts", "/care", "/quiz", "/games", "/about", "/privacy", "/terms", "/accessibility"];
  const paths = [
    ...staticPaths,
    ...games.map((g) => g.href),
    ...breeds.map((b) => `/breeds/${b.slug}`),
    ...careGuides.map((g) => `/care/${g.slug}`),
  ];
  return [...new Set(paths)].map((p) => ({ url: `${site.url}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
