import Link from "next/link";
import type { Metadata } from "next";
import { careCategories, careGuides } from "@/data/care";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { GuideCard } from "@/components/care/GuideCard";
import { Doodle } from "@/components/illustrations/Doodle";

export const metadata: Metadata = pageMeta({
  title: "Cat Care Library",
  description: "Beginner-friendly cat care guides: getting started, feeding, litter boxes, grooming, play, vet visits, senior care and behavior.",
  path: "/care",
});

export default function CarePage() {
  return (
    <>
      <PageHero eyebrow="Cat care library" title="Everything a Happy Cat Needs" pose="sign" signText="Tips!" tint="bg-sage-100">
        <p>
          {careGuides.length} practical guides for new and experienced cat people. Our health content is educational, not diagnostic — your veterinarian is always the
          best source of advice for your cat.
        </p>
      </PageHero>

      <section className="container-page mt-10">
        <Link
          href="/care/checklist"
          className="card-hover flex flex-col items-start gap-4 rounded-[1.75rem] border-2 border-dashed border-sage-200 bg-sage-50 p-6 sm:flex-row sm:items-center"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cream-50 text-ink">
            <Doodle name="litter" className="h-9 w-9" fill="var(--color-sage-200)" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-xl font-semibold">Bringing a cat home soon?</span>
            <span className="block text-ink-soft">Use the interactive new cat checklist to track supplies, vet visits and first-week essentials.</span>
          </span>
          <span className="btn btn-primary">Open checklist</span>
        </Link>

        <nav aria-label="Care categories" className="mt-10 flex flex-wrap gap-2">
          {careCategories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={`pill ${c.tint} px-4 py-2 text-sm text-ink hover:brightness-95`}>
              {c.label}
            </a>
          ))}
        </nav>

        {careCategories.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="mt-12 scroll-mt-28">
            <div className="mb-5">
              <h2 id={`${c.id}-title`} className="text-3xl font-semibold">
                {c.label}
              </h2>
              <p className="mt-1 text-ink-soft">{c.blurb}</p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {careGuides
                .filter((g) => g.category === c.id)
                .map((g) => (
                  <li key={g.slug}>
                    <GuideCard guide={g} />
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </section>
    </>
  );
}
