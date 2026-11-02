"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { readStore, writeStore } from "@/lib/storage";
import { MascotArt, type MascotPose } from "./MascotArt";
import { onMascotSay } from "./bus";

/** `quiet` pages never pop the bubble open on their own — it would cover game and quiz buttons. */
const contextual: { match: (p: string) => boolean; text: string; pose: MascotPose; quiet?: boolean }[] = [
  { match: (p) => p === "/", text: `Hi, I'm ${site.mascotName}! Welcome to my little corner of the cat world. Tap me any time for a tip.`, pose: "wave" },
  { match: (p) => p === "/breeds", text: "Tip: filters stack! Try “Apartment-friendly” with “Low” grooming to narrow things down.", pose: "curious" },
  { match: (p) => p.startsWith("/breeds/"), text: "Remember: breed traits are tendencies, not promises. Every cat is an individual!", pose: "reading" },
  { match: (p) => p === "/compare", text: "Pick up to three breeds and I'll line them up side by side.", pose: "curious" },
  { match: (p) => p === "/facts", text: "Look for the little evidence badge — it shows how sure scientists are.", pose: "reading" },
  { match: (p) => p.startsWith("/care"), text: "Small daily habits make the happiest cats. And when in doubt, call your vet!", pose: "sign" },
  { match: (p) => p === "/quiz", text: "I'll be your quiz host today! Answer honestly — there are no wrong answers.", pose: "happy", quiet: true },
  { match: (p) => p === "/games", text: "Game time! I've heard every cat myth there is… can you spot them?", pose: "celebrate" },
  { match: (p) => p.startsWith("/games/"), text: "Good luck! Tap me if you'd like a cat tip between rounds.", pose: "celebrate", quiet: true },
  { match: (p) => p === "/favorites", text: "Your treasure chest of favorite cats and facts lives here.", pose: "happy" },
  { match: (p) => p === "/search", text: "Sniff, sniff… I found these for you!", pose: "curious" },
];

const tips = [
  "Cats often prefer water away from their food bowl. Try a second water station!",
  "End play sessions with a ‘catch’ and a small snack — it completes the hunt.",
  "One litter box per cat, plus one extra, keeps everyone happy.",
  "A slow blink is a friendly cat hello. Try one!",
  "Lilies are very toxic to cats — even the pollen.",
  "Scratching posts work best right where your cat already likes to scratch.",
  "Cats hide pain well. Changes in behavior are worth mentioning to your vet.",
  "Puzzle feeders turn mealtime into a fun little hunt.",
];

export function FloatingMascot() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState<{ text: string; pose: MascotPose }>({ text: "", pose: "happy" });
  const tipIndex = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => setHidden(readStore("mascot-hidden", false)), []);

  const show = useCallback((text: string, pose: MascotPose, autoClose = 9000) => {
    setMsg({ text, pose });
    setOpen(true);
    clearTimeout(timer.current);
    if (autoClose) timer.current = setTimeout(() => setOpen(false), autoClose);
  }, []);

  // Contextual greeting on each page; only auto-open on wider screens so it never covers content on phones.
  useEffect(() => {
    const ctx = contextual.find((c) => c.match(pathname));
    if (!ctx) return;
    setMsg({ text: ctx.text, pose: ctx.pose });
    if (ctx.quiet) {
      setOpen(false);
      return;
    }
    if (window.matchMedia("(min-width: 768px)").matches) {
      const t = setTimeout(() => show(ctx.text, ctx.pose), 900);
      return () => clearTimeout(t);
    }
  }, [pathname, show]);

  useEffect(() => onMascotSay((m) => show(m.text, m.pose ?? "happy")), [show]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const hide = () => {
    setHidden(true);
    setOpen(false);
    writeStore("mascot-hidden", true);
  };
  const unhide = () => {
    setHidden(false);
    writeStore("mascot-hidden", false);
    show(`${site.mascotName} is back! Missed me?`, "wave");
  };

  if (hidden) {
    return (
      <button
        type="button"
        onClick={unhide}
        className="no-print fixed right-0 bottom-24 z-30 rounded-l-full bg-pink-200 py-2 pr-2 pl-3 font-display text-sm font-semibold text-clay-700 shadow-md hover:bg-pink-300"
        aria-label={`Bring back ${site.mascotName} the mascot`}
      >
        🐾
      </button>
    );
  }

  return (
    <div className="no-print pointer-events-none fixed right-3 bottom-3 z-30 flex flex-col items-end gap-2 sm:right-5 sm:bottom-5">
      {open && msg.text && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto relative max-w-[min(18rem,calc(100vw-2rem))] animate-fade-up rounded-3xl rounded-br-md border-2 border-pink-200 bg-cream-50 p-4 pr-9 text-[0.95rem] leading-snug text-ink shadow-[var(--shadow-lift)]"
        >
          <p className="mb-1 font-display text-xs font-semibold tracking-widest text-clay-600 uppercase">{site.mascotName} says</p>
          <p>{msg.text}</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-ink-faint hover:bg-cream-200 hover:text-ink"
            aria-label="Close message"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
          <button type="button" onClick={hide} className="mt-2 text-xs font-semibold text-ink-soft underline underline-offset-2 hover:text-ink">
            Hide {site.mascotName}
          </button>
        </div>
      )}
      <button
        type="button"
        className="mascot pointer-events-auto rounded-full transition-transform hover:-translate-y-1"
        onClick={() => {
          if (open) {
            const tip = tips[tipIndex.current % tips.length];
            tipIndex.current += 1;
            show(tip, "curious");
          } else {
            show(msg.text || tips[0], msg.pose);
          }
        }}
        aria-label={`${site.mascotName} the mascot — tap for a cat tip`}
      >
        <span className="block h-16 w-16 rounded-full bg-pink-100 p-1 shadow-[var(--shadow-soft)] ring-4 ring-cream-50 md:h-24 md:w-24 md:p-1.5">
          <MascotArt pose={open ? msg.pose : "happy"} className="h-full w-full" title="" />
        </span>
      </button>
    </div>
  );
}
