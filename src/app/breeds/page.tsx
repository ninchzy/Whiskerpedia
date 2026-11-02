import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { BreedExplorer } from "@/components/breeds/BreedExplorer";
import Link from "next/link";
import { breeds } from "@/data/breeds";

export const metadata: Metadata = pageMeta({
  title: "Cat Breeds",
  description: `Search and filter ${breeds.length} cat breeds by coat, size, activity, grooming, sociability, living space and shedding.`,
  path: "/breeds",
});

export default function BreedsPage() {
  return (
    <>
      <PageHero eyebrow="Breed explorer" title="Find Your Kind of Cat" pose="curious" tint="bg-pink-100" note="filters stack!">
        <p>
          Explore {breeds.length} breeds from around the world. Combine filters to narrow things down, or{" "}
          <Link href="/compare" className="font-semibold text-clay-700 underline underline-offset-2">
            compare breeds side by side
          </Link>
          .
        </p>
      </PageHero>
      <section className="container-page mt-10">
        <BreedExplorer />
      </section>
    </>
  );
}
