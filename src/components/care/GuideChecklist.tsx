"use client";

import { useEffect, useState } from "react";
import { readStore, writeStore } from "@/lib/storage";
import { Icon } from "@/components/ui/Icon";

/** A small per-guide checklist whose ticks are remembered in this browser. */
export function GuideChecklist({ id, items }: { id: string; items: string[] }) {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => setDone(readStore<string[]>(`guide-check:${id}`, [])), [id]);

  const toggle = (item: string) => {
    const next = done.includes(item) ? done.filter((d) => d !== item) : [...done, item];
    setDone(next);
    writeStore(`guide-check:${id}`, next);
  };

  return (
    <div className="rounded-[1.5rem] bg-butter-50 p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Quick checklist</h2>
        <span className="text-sm font-semibold text-butter-700">
          {done.filter((d) => items.includes(d)).length} / {items.length} done
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const on = done.includes(item);
          return (
            <li key={item}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-butter-100">
                <input type="checkbox" checked={on} onChange={() => toggle(item)} className="peer sr-only" />
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay-600 ${
                    on ? "border-sage-600 bg-sage-600 text-white" : "border-butter-300 bg-cream-50"
                  }`}
                  aria-hidden="true"
                >
                  {on && <Icon name="check" className="h-4 w-4" />}
                </span>
                <span className={on ? "text-ink-faint line-through" : "text-ink"}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
