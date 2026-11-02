import type { Metadata } from "next";
import { site } from "@/config/site";

/** Per-page metadata with a canonical URL and matching Open Graph tags. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, title: `${title} · ${site.name}`, description, url: path },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description },
  };
}
