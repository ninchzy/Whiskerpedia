import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/config/site";
import { breeds, featuredBreedSlugs } from "@/data/breeds";
import { careGuides } from "@/data/care";
import { facts } from "@/data/facts";
import { games } from "@/data/pages";
import { pageMeta } from "@/lib/seo";
import { BreedImage } from "@/components/breeds/BreedImage";
import { Doodle, PawPrint } from "@/components/illustrations/Doodle";
import { MascotArt } from "@/components/mascot/MascotArt";
import { BreedCard } from "@/components/breeds/BreedCard";
import { GuideCard } from "@/components/care/GuideCard";
import { Carousel } from "@/components/home/Carousel";
import { FactOfTheDay } from "@/components/home/FactOfTheDay";
import { CatOfTheDay } from "@/components/home/CatOfTheDay";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, WavyDivider } from "@/components/ui/Decor";
import { Icon } from "@/components/ui/Icon";
import type { IllustrationName } from "@/lib/types";

export const metadata: Metadata = {
  ...pageMeta({ title: `${site.name} — ${site.tagline}`, description: site.description, path: "/" }),
  title: { absolute: `${site.name} — A whole world of cats, just for you` },
};

const discovery: { title: string; text: string; href: string; cta: string; tint: string; fill: string; icon: IllustrationName }[] = [
  { title: "Meet the Breeds", text: "Explore two dozen cats from around the world, from gentle giants to wavy-coated rascals.", href: "/breeds", cta: "Browse breeds", tint: "bg-pink-100", fill: "var(--color-pink-200)", icon: "cats" },
  { title: "Did You Know?", text: "Discover surprising, fact-checked feline secrets — with sources.", href: "/facts", cta: "Read cat facts", tint: "bg-lavender-100", fill: "var(--color-lavender-200)", icon: "star" },
  { title: "Cat Care 101", text: "Practical, vet-informed guides to keep cats happy and healthy.", href: "/care", cta: "Open the library", tint: "bg-sage-100", fill: "var(--color-sage-200)", icon: "heart" },
  { title: "Who's Your Cat Match?", text: "Eight playful questions to discover breeds that suit your lifestyle.", href: "/quiz", cta: "Take the quiz", tint: "bg-butter-100", fill: "var(--color-butter-200)", icon: "paw" },
];

const heroBreed = breeds.find((b) => b.slug === "maine-coon")!;
const featured = featuredBreedSlugs.map((s) => breeds.find((b) => b.slug === s)!);
const careHighlights = ["preparing-your-home", "play-and-enrichment", "body-language"].map((s) => careGuides.find((g) => g.slug === s)!);
const gamePreview = games.filter((g) => ["guess-the-breed", "fact-or-fiction", "personality", "dream-cat"].includes(g.slug));

export default function HomePage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="container-page relative pt-6 pb-16 sm:pt-12 lg:pb-24" aria-labelledby="hero-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-fade-up">
            <p className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2">
              <PawPrint className="h-4 w-4" /> Your little corner of the cat world
            </p>
            <h1 id="hero-title" className="text-5xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">
              A Whole World of Cats,{" "}
              <span className="relative inline-block text-clay-500">
                Just for You.
                <svg viewBox="0 0 300 20" className="absolute -bottom-2 left-0 h-3 w-full text-pink-300" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 14 C60 4 120 4 160 10 S260 16 297 6" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Discover breeds from every corner of the globe, learn the science behind purrs and slow blinks, and find a feline companion that fits your life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quiz" className="btn btn-primary text-lg">
                Find Your Purrfect Match <Icon name="arrow" className="h-5 w-5" />
              </Link>
              <Link href="/breeds" className="btn btn-secondary text-lg">
                Explore Cat Breeds
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
              <span className="flex -space-x-2" aria-hidden="true">
                {["ragdoll", "siamese", "bengal"].map((s) => (
                  <BreedImage key={s} breed={breeds.find((b) => b.slug === s)!} alt="" thumbnail sizes="32px" className="h-8 w-8 rounded-full ring-2 ring-cream-100" />
                ))}
              </span>
              {breeds.length} breeds · {facts.length} facts · {careGuides.length} care guides · {games.length - 2} games &amp; tools
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Floating decorations */}
            <Doodle name="heart" className="absolute -top-2 left-6 z-20 h-10 w-10 animate-float text-clay-500" fill="var(--color-pink-200)" />
            <Doodle name="star" className="absolute top-10 -right-2 z-20 h-9 w-9 animate-float text-clay-500 [animation-delay:1.5s]" fill="var(--color-butter-200)" />
            <Doodle name="yarn" className="absolute -bottom-4 right-10 z-20 h-12 w-12 animate-float text-lavender-600 [animation-delay:0.8s]" fill="var(--color-lavender-200)" />
            <PawPrint className="absolute top-1/2 -left-4 z-20 h-6 w-6 rotate-[-20deg] text-pink-300" />

            {/* Mascot peeking from behind the card */}
            <div className="absolute bottom-6 -left-6 z-0 w-36 -rotate-6 sm:-left-14 sm:w-44">
              <MascotArt pose="wave" className="mascot w-full" />
            </div>

            <div className="relative z-10 ml-16 rotate-2 rounded-[2.25rem] bg-clay-400 p-4 pb-5 shadow-[var(--shadow-lift)] sm:ml-24">
              <BreedImage breed={heroBreed} alt="A fluffy silver tabby Maine Coon sitting upright" preload sizes="(min-width: 1024px) 26rem, (min-width: 640px) 20rem, 70vw" className="aspect-square rounded-[1.6rem]" />
              <p className="mt-3 text-center font-display font-semibold tracking-[0.25em] text-cream-50">MAINE COON</p>
            </div>
            <p className="hand absolute -top-14 -left-2 z-20 -rotate-[5deg] text-2xl text-clay-700 sm:-left-10">
              Psst… cats have secrets!
              <svg viewBox="0 0 60 40" className="ml-24 h-8 w-12 text-clay-500" aria-hidden="true">
                <path d="M5 5 C25 5 40 15 45 32 M45 32 l-9 -4 M45 32 l3 -9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Quick discovery ───────── */}
      <section className="container-page pb-20" aria-label="Start exploring">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {discovery.map((d, i) => (
            <li key={d.href}>
              <Reveal delay={i * 80} className="h-full">
                <article className={`card-hover group relative flex h-full flex-col rounded-[1.75rem] ${d.tint} p-6`}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-50 text-ink shadow-sm transition-transform group-hover:rotate-[-8deg]">
                    <Doodle name={d.icon} className="h-10 w-10" fill={d.fill} />
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold">
                    <Link href={d.href} className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none">
                      {d.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{d.text}</p>
                  <span className="mt-4 font-display font-semibold text-clay-700" aria-hidden="true">
                    {d.cta} →
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Featured breeds ───────── */}
      <WavyDivider color="var(--color-cream-200)" />
      <section className="bg-cream-200 py-16" aria-labelledby="featured-title">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Featured breeds" title="Popular Faces, Purr-sonal Stories" align="left" id="featured-title">
              Six of the world&apos;s best-loved breeds. Tap the heart to save your favorites.
            </SectionHeading>
            <Link href="/breeds" className="btn btn-secondary mb-10">
              See all {breeds.length} breeds
            </Link>
          </div>
          <Carousel label="Featured breeds">
            {featured.map((b) => (
              <BreedCard key={b.slug} breed={b} compact />
            ))}
          </Carousel>
        </div>
      </section>
      <WavyDivider color="var(--color-cream-200)" flip />

      {/* ───────── Fact + cat of the day ───────── */}
      <section className="container-page py-16" aria-label="Daily discoveries">
        <Reveal>
          <FactOfTheDay />
        </Reveal>
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading eyebrow="Cat of the day" title="Today's Star Whiskers" align="left">
              Every day, a new (fictional) feline friend drops by with a quirky personality and a real fact to share. Come back tomorrow to meet the next one!
            </SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <CatOfTheDay />
          </Reveal>
        </div>
      </section>

      {/* ───────── Quiz invitation ───────── */}
      <section className="relative overflow-hidden bg-pink-200 py-16 sm:py-20" aria-labelledby="quiz-invite">
        <div className="bg-dots absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 md:grid-cols-[1fr_1.4fr]">
          <div className="mx-auto w-56 sm:w-72">
            <MascotArt pose="sign" signText="Quiz!" className="mascot w-full drop-shadow" />
          </div>
          <div>
            <p className="eyebrow">The matching game</p>
            <h2 id="quiz-invite" className="mt-3 text-4xl font-semibold sm:text-5xl">
              Your Future Feline Bestie Is Waiting.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink">
              Tell us about your days, your home and how much brushing you&apos;re up for. Mochi will match you with breeds whose typical traits fit — and be honest about the commitments, too.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/quiz" className="btn btn-primary text-lg">
                Let&apos;s Play! <Icon name="sparkle" className="h-5 w-5" />
              </Link>
              <span className="hand text-clay-700">8 questions · about 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Care highlights ───────── */}
      <section className="container-page py-20" aria-labelledby="care-title">
        <SectionHeading eyebrow="Cat care library" title="Little Habits, Happy Cats" id="care-title">
          Beginner-friendly guides reviewed against veterinary and welfare sources. Educational, never diagnostic.
        </SectionHeading>
        <ul className="grid gap-5 md:grid-cols-3">
          {careHighlights.map((g, i) => (
            <li key={g.slug}>
              <Reveal delay={i * 80} className="h-full">
                <GuideCard guide={g} />
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/care" className="btn btn-secondary">
            Browse all care guides
          </Link>
          <Link href="/care/checklist" className="btn btn-soft">
            ✅ New cat checklist
          </Link>
        </div>
      </section>

      {/* ───────── Games preview ───────── */}
      <WavyDivider color="var(--color-lavender-100)" />
      <section className="bg-lavender-100 py-16" aria-labelledby="games-title">
        <div className="container-page">
          <SectionHeading eyebrow="Fun & games" title="Paws for a Little Play" id="games-title">
            Quick, cosy games for cat lovers of every age. No sign-ups, just fun.
          </SectionHeading>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gamePreview.map((g, i) => (
              <li key={g.slug}>
                <Reveal delay={i * 80} className="h-full">
                  <article className="card card-hover group relative flex h-full flex-col p-6">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${g.tint} text-ink transition-transform group-hover:scale-110`}>
                      <Doodle name={g.icon} className="h-9 w-9" fill="var(--color-cream-50)" />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold">
                      <Link href={g.href} className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none">
                        {g.title}
                      </Link>
                    </h3>
                    <p className="mt-2 flex-1 text-ink-soft">{g.description}</p>
                    <span className="mt-4 font-display font-semibold text-clay-700" aria-hidden="true">
                      Play →
                    </span>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/games" className="btn btn-primary">
              All games
            </Link>
          </div>
        </div>
      </section>
      <WavyDivider color="var(--color-lavender-100)" flip />
    </>
  );
}
