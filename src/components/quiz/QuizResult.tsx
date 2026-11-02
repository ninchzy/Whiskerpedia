"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { quizQuestions } from "@/data/quiz";
import { explainMatch, type Answers, type MatchResult } from "@/lib/matching";
import { BreedImage } from "@/components/breeds/BreedImage";
import { MascotArt } from "@/components/mascot/MascotArt";
import { PawBurst } from "@/components/ui/PawBurst";
import { PawMeter } from "@/components/ui/PawMeter";
import { Icon } from "@/components/ui/Icon";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

export function QuizResult({ results, answers, onRestart, onBack }: { results: MatchResult[]; answers: Answers; onRestart: () => void; onBack: () => void }) {
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared" | "manual">("idle");
  const top = results[0];
  const runnersUp = results.slice(1, 3);
  const { highlights, commitments, summary } = explainMatch(top);
  const b = top.breed;

  const shareText = `My purrfect match on ${site.name} is the ${b.name}! 🐾 Find yours:`;

  const share = async () => {
    const quizUrl = `${window.location.origin}/quiz`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `My ${site.name} match`, text: shareText, url: quizUrl });
        setShareState("shared");
        return;
      } catch (e) {
        if ((e as DOMException).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${quizUrl}`);
      setShareState("copied");
    } catch {
      setShareState("manual");
    }
  };

  return (
    <div>
      {/* Reveal */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-pink-100 px-6 py-10 sm:px-12 sm:py-14" aria-labelledby="match-title">
        <PawBurst />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="rotate-[-2deg] rounded-[2rem] bg-clay-400 p-4 pb-5 shadow-[var(--shadow-lift)]">
              <BreedImage breed={b} alt={`Photo of a ${b.name} cat`} sizes="(min-width: 640px) 22rem, 85vw" className="aspect-square animate-fade-up rounded-[1.5rem]" />
              <p className="mt-3 text-center font-display font-semibold tracking-[0.25em] text-cream-50 uppercase">{b.name}</p>
            </div>
            <MascotArt pose="celebrate" className="absolute -bottom-10 -left-8 h-32 w-32 sm:-left-14 sm:h-40 sm:w-40" />
          </div>

          <div className="animate-fade-up">
            <p className="eyebrow">Your Purrfect Match Is…</p>
            <h1 id="match-title" tabIndex={-1} className="mt-2 text-5xl font-bold sm:text-6xl">
              {b.name}!
            </h1>
            <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-cream-50 px-4 py-2">
              <span className="font-display text-2xl font-bold text-clay-600">{top.percent}%</span>
              <span className="text-sm leading-tight text-ink-soft">
                playful compatibility score
                <br />
                <span className="text-xs">based on your quiz preferences — not a scientific measure</span>
              </span>
            </div>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/breeds/${b.slug}`} className="btn btn-primary">
                Meet Your Match <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <button type="button" className="btn btn-secondary" onClick={share}>
                <Icon name="share" className="h-4 w-4" /> Share My Result
              </button>
              <FavoriteButton kind="breeds" id={b.slug} name={b.name} withLabel />
            </div>
            <p className="mt-3 min-h-6 text-sm font-semibold text-sage-600" role="status" aria-live="polite">
              {shareState === "copied" && "Copied to your clipboard — paste it anywhere!"}
              {shareState === "shared" && "Thanks for sharing! 🐾"}
            </p>
            {shareState === "manual" && (
              <label className="block text-sm text-ink-soft">
                Copy this to share:
                <input readOnly className="input mt-1 text-sm" value={`${shareText} ${window.location.origin}/quiz`} onFocus={(e) => e.currentTarget.select()} />
              </label>
            )}
          </div>
        </div>
      </section>

      {/* Why + commitments */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="card p-6 sm:p-8" aria-labelledby="why">
          <h2 id="why" className="text-2xl font-semibold">
            Why the {b.name} fits you
          </h2>
          <ul className="mt-4 space-y-3">
            {(highlights.length ? highlights : [{ label: "All-rounder", text: "A solid all-round fit across your answers." }]).map((h) => (
              <li key={h.label} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span>
                  <span className="font-display font-semibold">{h.label}: </span>
                  <span className="text-ink-soft">{h.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="card p-6 sm:p-8" aria-labelledby="consider">
          <h2 id="consider" className="text-2xl font-semibold">
            Things to consider
          </h2>
          <ul className="mt-4 space-y-3">
            {commitments.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-butter-100 text-butter-700" aria-hidden="true">
                  !
                </span>
                <span className="text-ink-soft">{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-sm font-bold">Grooming</p>
              <PawMeter value={b.traits.grooming} label="Grooming needs" variant="plain" />
            </div>
            <div>
              <p className="mb-1 text-sm font-bold">Activity</p>
              <PawMeter value={b.traits.activity} label="Activity needs" variant="plain" />
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            <strong>Commitment:</strong> {b.fit.commitment}
          </p>
        </section>
      </div>

      {/* Runners up */}
      <section className="mt-12" aria-labelledby="also">
        <h2 id="also" className="text-2xl font-semibold sm:text-3xl">
          You might also love…
        </h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {runnersUp.map((r) => (
            <li key={r.breed.slug}>
              <article className="card card-hover relative flex items-center gap-4 p-4">
                <BreedImage breed={r.breed} alt="" thumbnail sizes="112px" className="aspect-square w-28 shrink-0 rounded-2xl" />
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold">
                    <Link href={`/breeds/${r.breed.slug}`} className="after:absolute after:inset-0 after:rounded-[1.75rem]">
                      {r.breed.name}
                    </Link>
                  </h3>
                  <p className="text-sm font-bold text-clay-600">{r.percent}% playful match</p>
                  <p className="mt-1 text-sm text-ink-soft">{r.breed.tagline}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Adoption reminder */}
      <aside className="mt-10 grid items-center gap-6 rounded-[2rem] bg-sage-100 p-6 sm:grid-cols-[auto_1fr] sm:p-8">
        <MascotArt pose="sign" signText="Adopt!" className="mx-auto h-28 w-28" />
        <div>
          <h2 className="text-xl font-semibold">Every cat is an individual</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Breed traits are tendencies, not guarantees. Adopting an adult cat whose personality is already known can be an even better match than choosing by breed —
            shelters have cats of every type, including many pedigrees.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
            <Link href="/breeds/domestic-shorthair" className="text-clay-700 underline underline-offset-2">
              Meet the mixed-breed moggy
            </Link>
            <Link href="/care/adopting-vs-buying" className="text-clay-700 underline underline-offset-2">
              Adopting vs. buying
            </Link>
          </div>
        </div>
      </aside>

      {/* Transparency */}
      <details className="mt-8 rounded-[1.5rem] bg-cream-50 p-6 shadow-sm">
        <summary className="cursor-pointer font-display text-lg font-semibold">How does the matching work?</summary>
        <div className="mt-3 space-y-3 text-ink-soft">
          <p>
            Each answer adds weighted preferences — for example energy level, affection, grooming time, chattiness, space and who else lives with you. We score every
            breed&apos;s typical traits against those preferences (0–1 per trait), then take the weighted average. Grooming, chattiness and space answers act as limits:
            breeds above your limit lose points, breeds below it don&apos;t.
          </p>
          <p>
            No single answer can rule a breed out. Scottish Folds are never recommended because of the welfare issues linked to the ear fold, and mixed-breed cats get
            their own reminder above.
          </p>
          <h3 className="pt-2 font-display font-semibold text-ink">Your answers</h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {quizQuestions.map((q) => (
              <li key={q.id}>
                {q.question} <strong className="text-ink">{q.options.find((o) => o.id === answers[q.id])?.label ?? "—"}</strong>
              </li>
            ))}
          </ol>
          <h3 className="pt-2 font-display font-semibold text-ink">Top matches</h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm">
            {results.slice(0, 6).map((r) => (
              <li key={r.breed.slug}>
                {r.breed.name} — {r.percent}%
              </li>
            ))}
          </ol>
        </div>
      </details>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          <Icon name="arrow-left" className="h-4 w-4" /> Change my answers
        </button>
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          <Icon name="refresh" className="h-4 w-4" /> Try Again
        </button>
      </div>
    </div>
  );
}
