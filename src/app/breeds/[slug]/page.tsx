import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { breeds, getBreed } from "@/data/breeds";
import { pageMeta } from "@/lib/seo";
import { BreedGallery } from "@/components/breeds/BreedGallery";
import { BreedCard } from "@/components/breeds/BreedCard";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { PawMeter } from "@/components/ui/PawMeter";
import { Icon } from "@/components/ui/Icon";
import { Doodle } from "@/components/illustrations/Doodle";
import { MascotHint } from "@/components/mascot/MascotHint";
import type { ReactNode } from "react";

export function generateStaticParams() {
  return breeds.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) return {};
  return pageMeta({ title: `${breed.name} — Breed Profile`, description: `${breed.description} Personality, care, health and lifestyle fit.`, path: `/breeds/${breed.slug}` });
}

const sociabilityText = {
  independent: "Independent — enjoys company on its own terms",
  balanced: "Balanced — social, but happy to do its own thing",
  affectionate: "Affectionate — tends to seek out people",
} as const;

const envText = {
  apartment: "Often apartment-friendly with enough enrichment",
  adaptable: "Adapts to many home sizes",
  space: "Benefits from extra room to climb and explore",
} as const;

function Section({ id, title, icon, tint, children }: { id: string; title: string; icon: Parameters<typeof Doodle>[0]["name"]; tint: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="card scroll-mt-28 p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tint} text-ink`}>
          <Doodle name={icon} className="h-8 w-8" fill="var(--color-cream-50)" />
        </span>
        <h2 id={`${id}-title`} className="text-2xl font-semibold sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default async function BreedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const breed = getBreed(slug);
  if (!breed) notFound();

  const similar = breed.similar.map((s) => getBreed(s)).filter((b) => b !== undefined);
  const t = breed.traits;

  const quick: [string, string][] = [
    ["Origin", breed.origin],
    ["Size", `${breed.size[0].toUpperCase()}${breed.size.slice(1)}`],
    ["Typical weight", breed.weight],
    ["Typical lifespan", breed.lifespan],
    ["Coat", breed.coatType],
    ["Common colors", breed.colors],
    ["Recognition", breed.recognition],
  ];

  return (
    <article className="container-page pt-6 sm:pt-10">
      <MascotHint text={`Fun fact: the ${breed.name} is ${breed.temperament[0].toLowerCase()} by reputation — but every cat is an individual!`} pose="reading" />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ink hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/breeds" className="hover:text-ink hover:underline">
              Cat Breeds
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-semibold text-ink">
            {breed.name}
          </li>
        </ol>
      </nav>

      {/* Overview */}
      <header className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr]">
        <BreedGallery breed={breed} />
        <div>
          <p className="eyebrow">{breed.origin}</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl lg:text-6xl">{breed.name}</h1>
          <p className="mt-2 text-ink-soft">
            <span className="sr-only">Pronunciation: </span>
            <span className="font-hand text-2xl text-clay-600">/{breed.pronunciation}/</span>
          </p>
          <div className="dotted-rule my-5" aria-hidden="true" />
          <p className="font-display text-xl font-semibold text-clay-600">{breed.tagline}</p>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{breed.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Common temperament traits">
            {breed.temperament.map((x) => (
              <li key={x} className="pill bg-pink-100 px-4 py-1.5 text-sm text-pink-600">
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <FavoriteButton kind="breeds" id={breed.slug} name={breed.name} withLabel />
            <Link href={`/compare?breeds=${breed.slug},${breed.similar[0]}`} className="btn btn-sm btn-secondary">
              <Icon name="scale" className="h-4 w-4" /> Compare breeds
            </Link>
          </div>

          <dl className="mt-8 grid gap-x-6 gap-y-4 rounded-[1.5rem] bg-cream-200 p-5 sm:grid-cols-2">
            {quick.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-bold tracking-wide text-clay-600 uppercase">{k}</dt>
                <dd className="mt-0.5 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {breed.quizExcluded && (
        <aside className="mt-8 flex gap-4 rounded-[1.5rem] border-2 border-butter-300 bg-butter-50 p-5" role="note">
          <Doodle name="shield" className="h-10 w-10 shrink-0 text-butter-700" fill="var(--color-butter-200)" />
          <div>
            <h2 className="text-lg font-semibold">An important welfare note</h2>
            <p className="mt-1 text-ink-soft">{breed.quizExcluded}</p>
          </div>
        </aside>
      )}

      <nav aria-label="On this page" className="no-scrollbar sticky top-16 z-20 -mx-4 mt-10 overflow-x-auto bg-cream-100/90 px-4 py-3 backdrop-blur sm:top-20">
        <ul className="flex gap-2 whitespace-nowrap">
          {[
            ["history", "History"],
            ["personality", "Personality"],
            ["care", "Care"],
            ["health", "Health"],
            ["right-for-you", "Right for you?"],
            ["similar", "Similar breeds"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="pill bg-cream-50 px-4 py-2 text-sm text-ink-soft shadow-sm hover:bg-pink-100 hover:text-clay-700">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 grid gap-6">
        <Section id="history" title="Origin & history" icon="scroll" tint="bg-butter-100">
          <p className="prose-cat">{breed.history}</p>
        </Section>

        <Section id="personality" title="Personality" icon="heart" tint="bg-pink-100">
          <p className="prose-cat">{breed.personality}</p>
          <div className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {(
              [
                ["Activity level", t.activity],
                ["Affection", t.affection],
                ["Playfulness", t.playfulness],
                ["Vocalization", t.vocal],
                ["Curiosity", t.curiosity],
              ] as const
            ).map(([label, v]) => (
              <div key={label}>
                <p className="mb-1.5 font-display font-semibold">{label}</p>
                <PawMeter value={v} label={label} />
              </div>
            ))}
            <div>
              <p className="mb-1.5 font-display font-semibold">Sociability</p>
              <p className="text-ink-soft">{sociabilityText[breed.sociability]}</p>
            </div>
          </div>

          <h3 className="mt-8 text-xl font-semibold">Living with children and other pets</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {(
              [
                ["Children", breed.household.children],
                ["Dogs", breed.household.dogs],
                ["Other cats", breed.household.cats],
              ] as const
            ).map(([label, v]) => (
              <div key={label} className="rounded-2xl bg-cream-200 p-4">
                <p className="mb-1.5 font-display font-semibold">{label}</p>
                <PawMeter value={v} label={`Typical compatibility with ${label.toLowerCase()}`} variant="plain" />
              </div>
            ))}
          </div>
          <p className="mt-4 text-ink-soft">{breed.compatibility}</p>
          <p className="mt-2 text-sm text-ink-faint">
            Compatibility describes breed tendencies only. Every introduction should be gradual and supervised, and children should be taught gentle handling.
          </p>
        </Section>

        <Section id="care" title="Care requirements" icon="brush" tint="bg-sage-100">
          <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 font-display font-semibold">Grooming needs</p>
              <PawMeter value={t.grooming} label="Grooming needs" />
            </div>
            <div>
              <p className="mb-1.5 font-display font-semibold">Shedding</p>
              <PawMeter value={t.shedding} label="Shedding" />
            </div>
          </div>
          <dl className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              ["Brushing & grooming", breed.care.grooming],
              ["Exercise & enrichment", breed.care.exercise],
              ["Feeding considerations", breed.care.feeding],
              [
                "Litter & environment",
                `${breed.care.environment ? `${breed.care.environment} ` : ""}${envText[breed.environment]}. Provide one litter box per cat plus one, scratching posts and safe high perches.`,
              ],
              [
                "Routine veterinary care",
                "Yearly check-ups (twice yearly for seniors), vaccinations and parasite prevention tailored by your vet, and regular dental checks.",
              ],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-sage-50 p-4">
                <dt className="font-display font-semibold text-sage-600">{k}</dt>
                <dd className="mt-1 leading-relaxed text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm">
            <Link href="/care" className="font-semibold text-clay-700 underline underline-offset-2">
              Explore the cat care library →
            </Link>
          </p>
        </Section>

        <Section id="health" title="Health considerations" icon="stethoscope" tint="bg-lavender-100">
          <p className="text-ink-soft">Conditions reported more often in this breed, according to veterinary and genetics sources:</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {breed.health.map((h) => (
              <li key={h.name} className="rounded-2xl border-2 border-lavender-100 bg-lavender-50 p-4">
                <p className="font-display font-semibold">{h.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{h.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-ink-soft">
            <strong className="text-ink">Screening & prevention: </strong>
            {breed.screening}
          </p>
          <aside className="mt-5 flex gap-3 rounded-2xl bg-butter-50 p-4 text-sm leading-relaxed text-ink-soft" role="note">
            <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-butter-700" />
            <p>
              A breed association doesn&apos;t mean a cat will develop a condition — individual health varies widely. This information is educational, not
              diagnostic. Your veterinarian is the best source of advice for your cat.
            </p>
          </aside>
        </Section>

        <Section id="right-for-you" title="Is this breed right for you?" icon="home" tint="bg-clay-100">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-sage-50 p-5">
              <h3 className="font-display text-lg font-semibold text-sage-600">May suit</h3>
              <ul className="mt-3 space-y-2">
                {breed.fit.suits.map((s) => (
                  <li key={s} className="flex gap-2 text-ink-soft">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-pink-50 p-5">
              <h3 className="font-display text-lg font-semibold text-pink-600">Potential challenges</h3>
              <ul className="mt-3 space-y-2">
                {breed.fit.challenges.map((s) => (
                  <li key={s} className="flex gap-2 text-ink-soft">
                    <span aria-hidden="true" className="mt-0.5 text-pink-600">
                      ●
                    </span>{" "}
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-display font-semibold">Time & grooming commitment</dt>
              <dd className="text-ink-soft">{breed.fit.commitment}</dd>
            </div>
            <div>
              <dt className="font-display font-semibold">Living environment</dt>
              <dd className="text-ink-soft">{envText[breed.environment]}.</dd>
            </div>
          </dl>
          <p className="mt-5 rounded-2xl bg-cream-200 p-4 text-sm text-ink-soft">
            💡 Thinking about this breed? Rescue groups often have pedigree and mixed-breed cats with similar traits — and an adult cat&apos;s personality is already
            known.{" "}
            <Link href="/care/adopting-vs-buying" className="font-semibold text-clay-700 underline">
              Adopting vs. buying
            </Link>
          </p>
        </Section>

        <section id="similar" aria-labelledby="similar-title" className="scroll-mt-28 pt-4">
          <h2 id="similar-title" className="text-2xl font-semibold sm:text-3xl">
            Similar breeds
          </h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((b) => (
              <li key={b.slug}>
                <BreedCard breed={b} compact />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sources-title" className="rounded-[1.5rem] bg-cream-200 p-6">
          <h2 id="sources-title" className="text-lg font-semibold">
            Sources & further reading
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {breed.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-clay-700 underline underline-offset-2">
                  {s.label} <Icon name="external" className="h-3.5 w-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
