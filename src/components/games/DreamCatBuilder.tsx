"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { breeds } from "@/data/breeds";
import type { CatLook, CoatPattern, EarShape } from "@/lib/types";
import { shade } from "@/lib/color";
import { readStore, writeStore } from "@/lib/storage";
import { CatPortrait } from "@/components/illustrations/CatPortrait";
import { Icon } from "@/components/ui/Icon";

const coats = [
  { name: "Cream", hex: "#F6E7CF" },
  { name: "Ginger", hex: "#E39A52" },
  { name: "Black", hex: "#2E2A2B" },
  { name: "Blue-grey", hex: "#8A95A3" },
  { name: "Brown", hex: "#9A6B45" },
  { name: "White", hex: "#FBF8F4" },
  { name: "Chocolate", hex: "#6B4A36" },
  { name: "Silver", hex: "#C9CCD0" },
  { name: "Lilac", hex: "#CDBFC4" },
  { name: "Cinnamon", hex: "#C67F45" },
];
const eyes = [
  { name: "Gold", hex: "#D9A23A" },
  { name: "Green", hex: "#5FB04F" },
  { name: "Blue", hex: "#4C8BD6" },
  { name: "Copper", hex: "#D9862F" },
  { name: "Aqua", hex: "#3FB3A8" },
  { name: "Hazel", hex: "#A8A04A" },
];
const patterns: { id: CoatPattern; name: string }[] = [
  { id: "solid", name: "Solid" },
  { id: "tabby", name: "Classic tabby" },
  { id: "mackerel", name: "Striped tabby" },
  { id: "spotted", name: "Spotted" },
  { id: "ticked", name: "Ticked" },
  { id: "bicolor", name: "Tuxedo" },
  { id: "pointed", name: "Colorpoint" },
  { id: "mitted", name: "Mitted" },
  { id: "calico", name: "Calico" },
  { id: "tortie", name: "Tortoiseshell" },
];
const ears: { id: EarShape; name: string }[] = [
  { id: "normal", name: "Classic" },
  { id: "large", name: "Big & bold" },
  { id: "small", name: "Petite" },
  { id: "tufted", name: "Lynx tufts" },
];
const fluffLabels = ["Sleek", "Fluffy", "Cloud"];
const traitOptions = ["Cuddly", "Playful", "Chatty", "Curious", "Sleepy", "Brave", "Shy", "Mischievous", "Gentle", "Dramatic"];
const traitLines: Record<string, string> = {
  Cuddly: "never misses a chance to curl up on a lap",
  Playful: "turns every bottle cap into a hockey puck",
  Chatty: "has opinions about everything — and shares them",
  Curious: "must inspect every bag that enters the house",
  Sleepy: "has mastered the art of the twelve-hour nap",
  Brave: "greets the vacuum cleaner with a steely stare",
  Shy: "warms up slowly, then becomes your shadow",
  Mischievous: "knows exactly which mug sits nearest the edge",
  Gentle: "pats your cheek with soft, velvet paws",
  Dramatic: "acts like dinner is three hours late (it's two minutes)",
};
const NAME_RE = /^[\p{L}][\p{L} '\-]{0,19}$/u;

interface Dream {
  name: string;
  coat: number;
  pattern: CoatPattern;
  eye: number;
  oddEyed: boolean;
  fluff: 0 | 1 | 2;
  ears: EarShape;
  face: "round" | "wedge";
  curly: boolean;
  hairless: boolean;
  traits: string[];
}

const initial: Dream = { name: "Marshmallow", coat: 0, pattern: "tabby", eye: 1, oddEyed: false, fluff: 1, ears: "normal", face: "round", curly: false, hairless: false, traits: ["Cuddly", "Curious"] };

function toLook(d: Dream): CatLook {
  const coat = coats[d.coat].hex;
  const pointed = d.pattern === "pointed" || d.pattern === "mitted";
  let accent = shade(coat, -0.38);
  let accent2: string | undefined;
  let base = coat;
  if (d.pattern === "bicolor") accent = "#FBF8F4";
  if (pointed) {
    base = shade(coat, 0.7);
    accent = coat === coats[5].hex ? "#8A7A70" : shade(coat, -0.15);
  }
  if (d.pattern === "calico") {
    base = "#FBF4EA";
    accent = "#E3995A";
    accent2 = "#4A3A33";
  }
  if (d.pattern === "tortie") {
    base = coat;
    accent = "#C6733A";
    accent2 = "#E3A56A";
  }
  return {
    coat: base,
    accent,
    accent2,
    pattern: d.hairless ? "solid" : d.pattern,
    eyes: eyes[d.eye].hex,
    eyes2: d.oddEyed ? (d.eye === 2 ? eyes[0].hex : eyes[2].hex) : undefined,
    ears: d.hairless ? "large" : d.ears,
    face: d.face,
    fluff: d.hairless || d.curly ? 0 : d.fluff,
    hairless: d.hairless,
    curly: !d.hairless && d.curly,
    build: 1,
  };
}

/** Find the real breed whose drawn look is closest — just for fun. */
function closestBreed(d: Dream) {
  const coatLen = d.hairless ? "hairless" : d.fluff === 2 ? "long" : d.fluff === 1 ? "medium" : "short";
  let best = breeds[0];
  let bestScore = -1;
  for (const b of breeds) {
    let s = 0;
    if (b.coatLength === coatLen) s += 3;
    else if (coatLen !== "hairless" && b.coatLength !== "hairless" && Math.abs(["short", "medium", "long"].indexOf(b.coatLength) - ["short", "medium", "long"].indexOf(coatLen)) === 1) s += 1;
    if (b.look.ears === d.ears) s += 1.5;
    if (b.look.face === d.face) s += 1;
    if (!!b.look.curly === d.curly) s += d.curly ? 3 : 0.3;
    if (b.look.pattern === d.pattern || (d.pattern === "pointed" && b.look.pattern === "mitted")) s += 1.5;
    if (b.quizExcluded) s -= 5;
    if (s > bestScore) {
      bestScore = s;
      best = b;
    }
  }
  return best;
}

export function DreamCatBuilder() {
  const [d, setD] = useState<Dream>(initial);
  const [saved, setSaved] = useState<"idle" | "saved" | "error">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = readStore<Dream | null>("dream-cat", null);
    if (stored && typeof stored === "object" && "coat" in stored) setD({ ...initial, ...stored });
  }, []);

  const set = <K extends keyof Dream>(k: K, v: Dream[K]) => {
    setD((prev) => ({ ...prev, [k]: v }));
    setSaved("idle");
  };

  const look = useMemo(() => toLook(d), [d]);
  const match = useMemo(() => closestBreed(d), [d]);
  const nameValid = NAME_RE.test(d.name.trim());
  const displayName = nameValid ? d.name.trim() : "Your dream cat";

  const coatText = d.hairless
    ? `a velvety, hairless ${coats[d.coat].name.toLowerCase()} cat`
    : `a ${fluffLabels[d.fluff].toLowerCase()}${d.curly ? ", curly-coated" : ""} ${["pointed", "mitted"].includes(d.pattern) ? `${coats[d.coat].name.toLowerCase()}-point` : d.pattern === "calico" || d.pattern === "tortie" ? "" : coats[d.coat].name.toLowerCase()} ${patterns.find((p) => p.id === d.pattern)!.name.toLowerCase()}`.replace(/\s+/g, " ");
  const eyeText = d.oddEyed ? `odd eyes (one ${eyes[d.eye].name.toLowerCase()}, one ${d.eye === 2 ? "gold" : "blue"})` : `${eyes[d.eye].name.toLowerCase()} eyes`;
  const description = `${displayName} is ${coatText.trim()} with ${eyeText}.${d.traits.length ? ` This ${d.traits.map((t) => t.toLowerCase()).join(", ")} kitty ${d.traits.map((t) => traitLines[t]).join(", and ")}.` : ""}`;

  const swatch = (on: boolean) =>
    `h-10 w-10 rounded-full border-3 transition-transform hover:scale-110 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay-600 ${on ? "scale-110 border-clay-600" : "border-cream-50 shadow"}`;
  const chip = (on: boolean) =>
    `cursor-pointer rounded-full border-2 px-3.5 py-1.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-clay-600 ${on ? "border-clay-500 bg-clay-500 text-white" : "border-cream-300 bg-cream-50 text-ink-soft hover:border-clay-300"}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
      {/* Controls */}
      <form className="card space-y-6 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()} aria-label="Dream cat options">
        <div>
          <label htmlFor="dream-name" className="font-display text-lg font-semibold">
            Name
          </label>
          <input
            id="dream-name"
            className="input mt-2"
            value={d.name}
            maxLength={20}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!nameValid}
            aria-describedby="dream-name-hint"
          />
          <p id="dream-name-hint" className={`mt-1 text-sm ${nameValid ? "text-ink-faint" : "font-semibold text-pink-600"}`}>
            {nameValid ? "Up to 20 letters." : "Please use letters, spaces, apostrophes or hyphens (up to 20)."}
          </p>
        </div>

        <fieldset>
          <legend className="font-display text-lg font-semibold">Coat color</legend>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {coats.map((c, i) => (
              <label key={c.name} className={swatch(d.coat === i)} style={{ background: c.hex }} title={c.name}>
                <input type="radio" name="coat" className="sr-only" checked={d.coat === i} onChange={() => set("coat", i)} />
                <span className="sr-only">{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset disabled={d.hairless}>
          <legend className="font-display text-lg font-semibold">Pattern {d.hairless && <span className="text-sm font-normal text-ink-faint">(n/a for hairless)</span>}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {patterns.map((p) => (
              <label key={p.id} className={chip(d.pattern === p.id)}>
                <input type="radio" name="pattern" className="sr-only" checked={d.pattern === p.id} onChange={() => set("pattern", p.id)} />
                {p.name}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-lg font-semibold">Eye color</legend>
          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            {eyes.map((c, i) => (
              <label key={c.name} className={swatch(d.eye === i)} style={{ background: c.hex }} title={c.name}>
                <input type="radio" name="eyes" className="sr-only" checked={d.eye === i} onChange={() => set("eye", i)} />
                <span className="sr-only">{c.name}</span>
              </label>
            ))}
            <label className={`${chip(d.oddEyed)} ml-1`}>
              <input type="checkbox" className="sr-only" checked={d.oddEyed} onChange={(e) => set("oddEyed", e.target.checked)} />
              Odd-eyed
            </label>
          </div>
        </fieldset>

        <div>
          <label htmlFor="fluff" className="font-display text-lg font-semibold">
            Fluffiness: <span className="text-clay-600">{d.hairless ? "Hairless" : fluffLabels[d.fluff]}</span>
          </label>
          <input
            id="fluff"
            type="range"
            min={0}
            max={2}
            step={1}
            value={d.fluff}
            disabled={d.hairless || d.curly}
            onChange={(e) => set("fluff", Number(e.target.value) as 0 | 1 | 2)}
            aria-valuetext={fluffLabels[d.fluff]}
            className="mt-3 w-full accent-clay-500"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <label className={chip(d.curly)}>
              <input type="checkbox" className="sr-only" checked={d.curly} onChange={(e) => set("curly", e.target.checked)} />
              Curly coat
            </label>
            <label className={chip(d.hairless)}>
              <input type="checkbox" className="sr-only" checked={d.hairless} onChange={(e) => set("hairless", e.target.checked)} />
              Hairless
            </label>
          </div>
        </div>

        <fieldset>
          <legend className="font-display text-lg font-semibold">Ears & face</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ears.map((e) => (
              <label key={e.id} className={chip(d.ears === e.id)}>
                <input type="radio" name="ears" className="sr-only" checked={d.ears === e.id} onChange={() => set("ears", e.id)} />
                {e.name}
              </label>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["round", "wedge"] as const).map((f) => (
              <label key={f} className={chip(d.face === f)}>
                <input type="radio" name="face" className="sr-only" checked={d.face === f} onChange={() => set("face", f)} />
                {f === "round" ? "Round face" : "Elegant wedge"}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-lg font-semibold">
            Personality <span className="text-sm font-normal text-ink-faint">(pick up to 3)</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {traitOptions.map((t) => {
              const on = d.traits.includes(t);
              const full = !on && d.traits.length >= 3;
              return (
                <label key={t} className={`${chip(on)} ${full ? "cursor-not-allowed opacity-50" : ""}`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={on}
                    disabled={full}
                    onChange={() => set("traits", on ? d.traits.filter((x) => x !== t) : [...d.traits, t])}
                  />
                  {t}
                </label>
              );
            })}
          </div>
        </fieldset>
      </form>

      {/* Preview */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <article className="rounded-[2rem] bg-clay-400 p-4 shadow-[var(--shadow-lift)]" aria-live="polite" aria-labelledby="dream-title">
          <div className="bg-plaid overflow-hidden rounded-[1.5rem]">
            <CatPortrait look={look} title={`Illustration of ${displayName}`} className="mx-auto aspect-square w-full max-w-sm" />
          </div>
          <div className="mt-4 rounded-[1.5rem] bg-cream-50 p-5">
            <h2 id="dream-title" className="text-center text-3xl font-bold">
              {displayName}
            </h2>
            <div className="dotted-rule my-3" aria-hidden="true" />
            <p className="leading-relaxed text-ink-soft">{description}</p>
            <p className="mt-4 rounded-2xl bg-sage-50 px-4 py-3 text-sm text-ink-soft">
              <span className="font-bold text-sage-600">Closest real-world look: </span>
              <Link href={`/breeds/${match.slug}`} className="font-semibold text-clay-700 underline underline-offset-2">
                {match.name}
              </Link>{" "}
              — though a shelter cat could look just like this, too!
            </p>
          </div>
        </article>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!nameValid}
            onClick={() => setSaved(writeStore("dream-cat", d) ? "saved" : "error")}
          >
            <Icon name="heart" className="h-4 w-4" /> Save my dream cat
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(description);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
              } catch {
                setCopied(false);
              }
            }}
          >
            <Icon name="copy" className="h-4 w-4" /> {copied ? "Copied!" : "Copy description"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setD(initial)}>
            Reset
          </button>
        </div>
        <p className="mt-2 min-h-5 text-sm font-semibold" role="status" aria-live="polite">
          {saved === "saved" && <span className="text-sage-600">Saved in this browser — it&apos;ll be here next time.</span>}
          {saved === "error" && <span className="text-pink-600">Couldn&apos;t save (browser storage is unavailable).</span>}
        </p>
      </div>
    </div>
  );
}
