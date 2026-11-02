import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { careGuides, getGuide, careCategoryLabel } from "@/data/care";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { GuideCard } from "@/components/care/GuideCard";
import { GuideChecklist } from "@/components/care/GuideChecklist";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { MascotArt } from "@/components/mascot/MascotArt";
import { MascotHint } from "@/components/mascot/MascotHint";
import { Doodle } from "@/components/illustrations/Doodle";
import { Icon } from "@/components/ui/Icon";

export function generateStaticParams() {
  return careGuides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMeta({ title: guide.title, description: guide.summary, path: `/care/${guide.slug}` });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const related = guide.related.map((s) => getGuide(s)).filter((g) => g !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/care/${guide.slug}`,
  };

  return (
    <article className="container-page pt-6 sm:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MascotHint text={guide.reminder} pose="sign" />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/care" className="hover:text-ink hover:underline">
              Cat Care
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-semibold text-ink">
            {guide.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <header>
            <p className="eyebrow">
              {careCategoryLabel(guide.category)} · {guide.readMinutes} min read
            </p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{guide.title}</h1>
            <p className="mt-4 max-w-prose text-xl leading-relaxed text-ink-soft">{guide.intro}</p>
            <div className="mt-5">
              <FavoriteButton kind="guides" id={guide.slug} name={guide.title} withLabel />
            </div>
          </header>

          {guide.vetNote && (
            <aside role="note" className="mt-8 flex max-w-prose gap-3 rounded-2xl border-2 border-sage-200 bg-sage-50 p-4 text-ink-soft">
              <Doodle name="stethoscope" className="h-8 w-8 shrink-0 text-sage-600" fill="var(--color-sage-200)" />
              <p>
                This guide is for general education and isn&apos;t a substitute for veterinary care. If you&apos;re worried about your cat&apos;s health, contact your
                veterinarian — and never give human medicines or home remedies without their advice.
              </p>
            </aside>
          )}

          <div className="mt-10 space-y-10">
            {guide.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-semibold sm:text-3xl">{s.heading}</h2>
                {s.body && <p className="prose-cat mt-3">{s.body}</p>}
                {s.steps && (
                  <ol className="mt-4 max-w-prose space-y-3">
                    {s.steps.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-100 font-display text-sm font-bold text-clay-700" aria-hidden="true">
                          {i + 1}
                        </span>
                        <span className="pt-0.5 leading-relaxed text-ink-soft">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            ))}
          </div>

          {guide.checklist && (
            <div className="mt-10 max-w-prose">
              <GuideChecklist id={guide.slug} items={guide.checklist} />
            </div>
          )}

          <section aria-labelledby="refs" className="mt-10 max-w-prose rounded-[1.5rem] bg-cream-200 p-6">
            <h2 id="refs" className="text-lg font-semibold">
              Trustworthy references
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {guide.references.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-clay-700 underline underline-offset-2">
                    {r.label} <Icon name="external" className="h-3.5 w-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[1.75rem] bg-pink-100 p-5 text-center">
            <MascotArt pose="sign" signText="Tip!" className="mascot mx-auto h-36 w-36" />
            <p className="mt-2 font-display font-semibold text-clay-700">Mochi&apos;s reminder</p>
            <p className="mt-1 text-ink-soft">{guide.reminder}</p>
          </div>
          <Link href="/care/checklist" className="btn btn-soft w-full">
            ✅ New cat checklist
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-16">
          <h2 id="related" className="text-2xl font-semibold sm:text-3xl">
            Related guides
          </h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((g) => (
              <li key={g.slug}>
                <GuideCard guide={g} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
