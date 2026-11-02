import type { Metadata } from "next";
import { facts, evidenceLabels } from "@/data/facts";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { FactsBrowser } from "@/components/facts/FactsBrowser";

export const metadata: Metadata = pageMeta({
  title: "Cat Facts Encyclopedia",
  description: `${facts.length} fact-checked cat facts on anatomy, senses, communication, purring, history and more — each labelled by strength of evidence.`,
  path: "/facts",
});

export default function FactsPage() {
  return (
    <>
      <PageHero eyebrow="Cat facts encyclopedia" title="The Secret Lives of Cats" pose="reading" tint="bg-butter-100" note="science-y!">
        <p>
          {facts.length} curiosities about whiskers, purrs, slow blinks and more. We separate well-established facts from ideas scientists are still debating.
        </p>
      </PageHero>
      <section className="container-page mt-8">
        <dl className="mb-10 grid gap-3 sm:grid-cols-3">
          {Object.entries(evidenceLabels).map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-cream-50 p-4 shadow-sm">
              <dt className="font-display font-semibold">{v.label}</dt>
              <dd className="mt-1 text-sm text-ink-soft">{v.hint}</dd>
            </div>
          ))}
        </dl>
        <FactsBrowser />
      </section>
    </>
  );
}
