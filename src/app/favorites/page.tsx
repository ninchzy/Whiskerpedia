import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { FavoritesView } from "@/components/favorites/FavoritesView";

export const metadata: Metadata = {
  ...pageMeta({ title: "My Favorites", description: "Your saved cat breeds, facts and care guides.", path: "/favorites" }),
  robots: { index: false },
};

export default function FavoritesPage() {
  return (
    <>
      <PageHero eyebrow="My collection" title="My Favorite Things" pose="happy" tint="bg-pink-100">
        <p>Your saved breeds, facts and guides — all in one cosy place.</p>
      </PageHero>
      <section className="container-page mt-10">
        <FavoritesView />
      </section>
    </>
  );
}
