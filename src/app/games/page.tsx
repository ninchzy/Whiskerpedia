import Link from "next/link";
import type { Metadata } from "next";
import { games } from "@/data/pages";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Doodle } from "@/components/illustrations/Doodle";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Fun & Games",
  description: "Cat-themed mini-games: Guess the Breed, Fact or Fiction, a personality generator, trivia and a dream cat builder.",
  path: "/games",
});

export default function GamesPage() {
  const playable = games.filter((g) => g.href.startsWith("/games/"));
  const tools = games.filter((g) => !g.href.startsWith("/games/"));
  return (
    <>
      <PageHero eyebrow="Fun & games" title="Paws for a Little Play" pose="celebrate" tint="bg-lavender-100" note="no sign-ups!">
        <p>Quick, cosy games for curious cat lovers. Every game works on phones and computers, and you can restart any time.</p>
      </PageHero>
      <section className="container-page mt-10" aria-labelledby="games-list">
        <h2 id="games-list" className="sr-only">
          Games
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {playable.map((g, i) => (
            <li key={g.slug}>
              <Reveal delay={i * 70} className="h-full">
                <article className={`card-hover group relative flex h-full flex-col rounded-[1.75rem] ${g.tint} p-7`}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-50 text-ink shadow-sm transition-transform group-hover:rotate-[-8deg]">
                    <Doodle name={g.icon} className="h-10 w-10" fill="var(--color-pink-200)" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold">
                    <Link href={g.href} className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none">
                      {g.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-ink-soft">{g.description}</p>
                  <span className="btn btn-primary btn-sm mt-5 self-start" aria-hidden="true">
                    Play now
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-2xl font-semibold">Handy cat tools</h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-3">
          {tools.map((g) => (
            <li key={g.slug}>
              <Link href={g.href} className="card card-hover flex h-full items-start gap-4 p-5">
                <Doodle name={g.icon} className="h-10 w-10 shrink-0 text-ink" fill="var(--color-butter-200)" />
                <span>
                  <span className="block font-display text-lg font-semibold">{g.title}</span>
                  <span className="block text-sm text-ink-soft">{g.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
