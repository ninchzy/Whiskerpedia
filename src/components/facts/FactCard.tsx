import type { Fact } from "@/lib/types";
import { factCategories, evidenceLabels } from "@/data/facts";
import { Doodle } from "@/components/illustrations/Doodle";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { Icon } from "@/components/ui/Icon";

const evidenceTint = {
  established: "bg-sage-100 text-sage-600",
  studied: "bg-lavender-100 text-lavender-600",
  theory: "bg-butter-100 text-butter-700",
} as const;

const doodleFill: Record<string, string> = {
  "bg-pink-100": "var(--color-pink-200)",
  "bg-lavender-100": "var(--color-lavender-200)",
  "bg-butter-100": "var(--color-butter-200)",
  "bg-sage-100": "var(--color-sage-200)",
  "bg-clay-100": "var(--color-clay-300)",
};

export function FactCard({ fact }: { fact: Fact }) {
  const cat = factCategories.find((c) => c.id === fact.category)!;
  const bg = cat.color.split(" ")[0];
  return (
    <article id={fact.id} className="card card-hover flex h-full scroll-mt-28 flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bg} text-ink`}>
          <Doodle name={fact.icon} className="h-9 w-9" fill={doodleFill[bg]} />
        </span>
        <FavoriteButton kind="facts" id={fact.id} name={fact.title} size="sm" />
      </div>
      <p className={`pill mt-4 self-start ${cat.color}`}>{cat.label}</p>
      <h3 className="mt-2 text-xl font-semibold">{fact.title}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{fact.body}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-dashed border-cream-300 pt-3 text-sm">
        <span className={`pill ${evidenceTint[fact.evidence]}`} title={evidenceLabels[fact.evidence].hint}>
          {evidenceLabels[fact.evidence].label}
        </span>
        {fact.source && (
          <a
            href={fact.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-clay-700 underline-offset-2 hover:underline"
          >
            Source <Icon name="external" className="h-3.5 w-3.5" />
            <span className="sr-only">: {fact.source.label} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
