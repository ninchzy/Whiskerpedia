"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { newOwnerChecklist } from "@/data/checklist";
import { readStore, writeStore } from "@/lib/storage";
import { Icon } from "@/components/ui/Icon";
import { MascotArt } from "@/components/mascot/MascotArt";
import { mascotSay } from "@/components/mascot/bus";
import { PawBurst } from "@/components/ui/PawBurst";

const allIds = newOwnerChecklist.flatMap((g) => g.items.map((i) => i.id));

export function CareChecklist() {
  const [done, setDone] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setDone(readStore<string[]>("new-cat-checklist", []).filter((id) => allIds.includes(id)));
    setLoaded(true);
  }, []);

  const save = (next: string[]) => {
    setDone(next);
    writeStore("new-cat-checklist", next);
  };

  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter((d) => d !== id) : [...done, id];
    save(next);
    if (next.length === allIds.length) mascotSay("Everything's ready! Your new cat is one lucky kitty. 🎉", "celebrate");
  };

  const pct = Math.round((done.length / allIds.length) * 100);
  const complete = done.length === allIds.length;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div className="space-y-6">
        {newOwnerChecklist.map((group) => {
          const groupDone = group.items.filter((i) => done.includes(i.id)).length;
          return (
            <fieldset key={group.id} className={`rounded-[1.75rem] ${group.tint} p-5 sm:p-6`}>
              <legend className="sr-only">{group.title}</legend>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold" aria-hidden="true">
                  {group.title}
                </h2>
                <span className="rounded-full bg-cream-50 px-3 py-1 text-sm font-bold text-ink-soft">
                  {groupDone}/{group.items.length}
                </span>
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item) => {
                  const on = done.includes(item.id);
                  return (
                    <li key={item.id} className="flex flex-wrap items-center gap-x-3 rounded-2xl bg-cream-50/70 px-3 py-2">
                      <label className="flex flex-1 cursor-pointer items-center gap-3">
                        <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle(item.id)} />
                        <span
                          aria-hidden="true"
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border-2 transition-all peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay-600 ${
                            on ? "scale-105 border-sage-600 bg-sage-600 text-white" : "border-cream-300 bg-cream-50"
                          }`}
                        >
                          {on && <Icon name="check" className="h-4 w-4" />}
                        </span>
                        <span>
                          <span className={`block font-semibold ${on ? "text-ink-faint line-through" : "text-ink"}`}>{item.label}</span>
                          {item.note && <span className="block text-sm text-ink-soft">{item.note}</span>}
                        </span>
                      </label>
                      {item.guide && (
                        <Link href={`/care/${item.guide}`} className="ml-10 text-sm font-semibold text-clay-700 underline underline-offset-2 sm:ml-0">
                          Guide<span className="sr-only">: {item.label}</span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          );
        })}
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="card relative overflow-hidden p-6 text-center">
          {complete && <PawBurst />}
          <MascotArt pose={complete ? "celebrate" : pct > 50 ? "happy" : "curious"} className="mx-auto h-32 w-32" />
          <p className="mt-2 font-display text-4xl font-bold text-clay-600" aria-hidden="true">
            {loaded ? pct : 0}%
          </p>
          <div
            className="mt-3 h-4 overflow-hidden rounded-full bg-cream-200"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={allIds.length}
            aria-valuenow={done.length}
            aria-label={`${done.length} of ${allIds.length} items done`}
          >
            <div className="h-full rounded-full bg-sage-600 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 text-ink-soft" aria-live="polite">
            {complete ? "All set — welcome home, little one!" : `${done.length} of ${allIds.length} done`}
          </p>
          <p className="mt-2 text-xs text-ink-faint">Saved in this browser only.</p>
          {done.length > 0 &&
            (confirmReset ? (
              <div className="mt-4 flex justify-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    save([]);
                    setConfirmReset(false);
                  }}
                >
                  Yes, reset
                </button>
                <button type="button" className="btn btn-sm btn-soft" onClick={() => setConfirmReset(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button type="button" className="btn btn-sm btn-ghost mt-4" onClick={() => setConfirmReset(true)}>
                <Icon name="refresh" className="h-4 w-4" /> Reset checklist
              </button>
            ))}
          <button type="button" className="btn btn-sm btn-soft mt-2 w-full" onClick={() => window.print()}>
            Print checklist
          </button>
        </div>
      </aside>
    </div>
  );
}
