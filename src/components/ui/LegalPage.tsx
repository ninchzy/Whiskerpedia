import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="container-page pt-10 sm:pt-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-ink-faint">Last updated {updated}</p>
        <div className="mt-8 space-y-6 text-[1.0625rem] leading-relaxed text-ink-soft [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </article>
  );
}
