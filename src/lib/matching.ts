/*
 * Transparent, weighted matching.
 *
 * Every answer adds soft preferences (a target value + a weight) on a few
 * dimensions. For each breed we score every dimension between 0 and 1, then
 * take the weighted average. No single answer can exclude a breed — it can
 * only lower its score in proportion to its weight.
 */
import { breeds } from "@/data/breeds";
import type { Bonus, Dimension, HouseholdMember, Preference, QuizQuestion } from "@/data/quiz";
import type { Breed } from "@/lib/types";
import { levelWord } from "@/lib/levels";

export type Answers = Record<string, string>;

/** Breeds the quiz never recommends directly (mixed-breed cats get their own reminder card). */
const NOT_RANKED = new Set(["domestic-shorthair"]);

const SPACE_LEVEL: Record<Breed["environment"], number> = { apartment: 1, adaptable: 2, space: 3 };

type FactorKey = Dimension | HouseholdMember | Bonus;

export interface Factor {
  key: FactorKey;
  weight: number;
  /** 0–1 how well the breed fits this preference. */
  fit: number;
  target?: number;
  breedValue: number;
  mode?: Preference["mode"];
}

export interface MatchResult {
  breed: Breed;
  score: number;
  percent: number;
  factors: Factor[];
}

/** Combine all chosen options into a single preference profile. */
export function buildProfile(questions: QuizQuestion[], answers: Answers) {
  const prefs = new Map<Dimension, { sum: number; weight: number; mode: Preference["mode"] }>();
  const household = new Map<HouseholdMember, number>();
  const bonus = new Map<Bonus, number>();

  for (const q of questions) {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    if (!opt) continue;
    for (const [dim, p] of Object.entries(opt.prefs ?? {}) as [Dimension, Preference][]) {
      const cur = prefs.get(dim);
      if (!cur) {
        prefs.set(dim, { sum: p.target * p.weight, weight: p.weight, mode: p.mode ?? "match" });
      } else {
        cur.sum += p.target * p.weight;
        cur.weight += p.weight;
        // A limit ("max") from any answer wins over a "match".
        if (p.mode === "max") cur.mode = "max";
      }
    }
    for (const [m, w] of Object.entries(opt.household ?? {}) as [HouseholdMember, number][]) {
      household.set(m, (household.get(m) ?? 0) + w);
    }
    for (const [b, w] of Object.entries(opt.bonus ?? {}) as [Bonus, number][]) {
      bonus.set(b, (bonus.get(b) ?? 0) + w);
    }
  }

  const dims = [...prefs.entries()].map(([key, v]) => ({
    key,
    target: v.sum / v.weight,
    weight: v.weight,
    mode: v.mode,
  }));
  return { dims, household, bonus };
}

function breedValue(breed: Breed, dim: Dimension): number {
  if (dim === "space") return SPACE_LEVEL[breed.environment];
  return breed.traits[dim];
}

function dimensionFit(dim: Dimension, value: number, target: number, mode: Preference["mode"]) {
  const range = dim === "space" ? 2 : 4;
  if (mode === "max") {
    const over = Math.max(0, value - target);
    return Math.max(0, 1 - (over / range) * 1.3);
  }
  return Math.max(0, 1 - Math.abs(value - target) / range);
}

function bonusFit(breed: Breed, b: Bonus) {
  if (b === "fluffy") return breed.coatLength === "long" ? 1 : breed.coatLength === "medium" ? 0.6 : 0.1;
  return breed.distinctive ? 1 : 0.25;
}

export function scoreBreeds(questions: QuizQuestion[], answers: Answers): MatchResult[] {
  const profile = buildProfile(questions, answers);

  const results = breeds
    .filter((b) => !b.quizExcluded && !NOT_RANKED.has(b.slug))
    .map((breed) => {
      const factors: Factor[] = [];

      for (const d of profile.dims) {
        if (d.weight <= 0) continue;
        const v = breedValue(breed, d.key);
        factors.push({ key: d.key, weight: d.weight, fit: dimensionFit(d.key, v, d.target, d.mode), target: d.target, breedValue: v, mode: d.mode });
      }
      for (const [m, w] of profile.household) {
        const v = breed.household[m];
        factors.push({ key: m, weight: w, fit: (v - 1) / 4, breedValue: v });
      }
      for (const [b, w] of profile.bonus) {
        factors.push({ key: b, weight: w, fit: bonusFit(breed, b), breedValue: bonusFit(breed, b) });
      }

      const total = factors.reduce((s, f) => s + f.weight, 0);
      const score = total > 0 ? factors.reduce((s, f) => s + f.fit * f.weight, 0) / total : 0.5;
      return { breed, score, percent: Math.round(score * 100), factors };
    });

  // Stable, deterministic ordering: score, then alphabetical.
  return results.sort((a, b) => b.score - a.score || a.breed.name.localeCompare(b.breed.name));
}

/* ───────────────────── Explanations ───────────────────── */

export { levelWord };

const DIM_LABEL: Record<FactorKey, string> = {
  activity: "Energy level",
  affection: "Affection",
  playfulness: "Playfulness",
  curiosity: "Curiosity",
  vocal: "Chattiness",
  grooming: "Grooming",
  space: "Living space",
  children: "Children",
  dogs: "Dogs",
  cats: "Other cats",
  fluffy: "Fluffiness",
  distinctive: "Unique look",
};

function highlightText(f: Factor, breed: Breed): string {
  const lv = levelWord(f.breedValue);
  switch (f.key) {
    case "activity":
      return `Typically ${lv} energy — close to the activity level you described.`;
    case "affection":
      return `Usually ${lv} on affection, matching how cuddly you'd like your cat to be.`;
    case "playfulness":
      return `Playfulness tends to be ${lv}, in line with your play style.`;
    case "curiosity":
      return `Often ${lv} curiosity — a clever companion who enjoys puzzles.`;
    case "vocal":
      return f.mode === "max" ? `Tends to be ${lv} on chattiness, within your comfort zone.` : `Often expressive and talkative — just what you asked for.`;
    case "grooming":
      return `${breed.coatLength === "long" ? "Coat care" : "Grooming"} needs are ${lv}, which fits the time you have.`;
    case "space":
      return breed.environment === "apartment"
        ? "Commonly adapts well to apartment life with enough enrichment."
        : breed.environment === "adaptable"
          ? "Usually adapts to many home sizes with climbing space and play."
          : "Enjoys room to roam and climb — a good fit for your space.";
    case "children":
      return "Often patient and sociable with respectful children.";
    case "dogs":
      return "Frequently gets along with cat-friendly dogs after a careful introduction.";
    case "cats":
      return "Tends to be sociable with other cats when introduced gradually.";
    case "fluffy":
      return "A gorgeous, fluffy coat made for admiring (and brushing).";
    case "distinctive":
      return "A one-of-a-kind look that turns heads.";
  }
}

function concernText(f: Factor, breed: Breed): string | null {
  const lv = levelWord(f.breedValue);
  switch (f.key) {
    case "grooming":
      return `Grooming needs are ${lv} — plan for more brushing than you mentioned.`;
    case "activity":
      return f.breedValue > (f.target ?? 3)
        ? `Energy is usually ${lv}: expect to schedule daily, active play.`
        : `Usually more laid-back (${lv} energy) than you described — add play to keep things lively.`;
    case "vocal":
      return f.breedValue > (f.target ?? 3) ? `Can be quite talkative (${lv} chattiness).` : "Tends to be quieter than you might like.";
    case "affection":
      return f.breedValue > (f.target ?? 3)
        ? "May want more attention and company than you described."
        : "Often more independent than the cuddly cat you described.";
    case "space":
      return "Benefits from extra room to climb and explore — plan plenty of vertical space.";
    case "children":
    case "dogs":
    case "cats":
      return `With ${DIM_LABEL[f.key].toLowerCase()} at home, take introductions slowly and watch for stress.`;
    case "playfulness":
      return f.breedValue > (f.target ?? 3) ? "Often very playful — needs daily interactive sessions." : "Usually less playful than you described.";
    case "curiosity":
      return null;
    case "fluffy":
      return breed.coatLength === "hairless" ? "Hairless — the opposite of fluffy, but very cuddly!" : "Not a fluffy longhair.";
    case "distinctive":
      return null;
  }
}

export function explainMatch(result: MatchResult) {
  const { breed, factors } = result;
  const ranked = [...factors].sort((a, b) => b.fit * b.weight - a.fit * a.weight);

  const highlights = ranked
    .filter((f) => f.fit >= 0.72)
    .slice(0, 5)
    .map((f) => ({ label: DIM_LABEL[f.key], text: highlightText(f, breed) }));

  const concerns = factors
    .filter((f) => f.fit < 0.6)
    .sort((a, b) => a.fit * a.weight - b.fit * b.weight)
    .map((f) => concernText(f, breed))
    .filter((t): t is string => Boolean(t))
    .slice(0, 2);

  // Always surface the breed's real-world commitments too.
  const commitments = [...new Set([...concerns, ...breed.fit.challenges])].slice(0, 4);

  const t = breed.traits;
  const summary = `The ${breed.name} is typically ${levelWord(t.affection)} on affection with ${levelWord(
    t.activity,
  )} energy and ${levelWord(t.grooming)} grooming needs. ${breed.tagline}`;

  return { highlights, commitments, summary };
}

