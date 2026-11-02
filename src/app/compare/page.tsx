import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { CompareTool } from "@/components/breeds/CompareTool";

export const metadata: Metadata = pageMeta({
  title: "Compare Cat Breeds",
  description: "Compare up to three cat breeds side by side: size, activity, grooming, shedding, sociability, vocalization and health considerations.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <>
      <PageHero eyebrow="Breed comparison" title="Side by Side, Paw by Paw" pose="curious" tint="bg-lavender-100">
        <p>Choose two or three breeds to compare their typical traits and care commitments.</p>
      </PageHero>
      <section className="container-page mt-10">
        <CompareTool />
      </section>
    </>
  );
}
