import Link from "next/link";
import type { CareGuide } from "@/lib/types";
import { careCategories } from "@/data/care";
import { Doodle } from "@/components/illustrations/Doodle";

const fill: Record<string, string> = {
  "bg-butter-100": "var(--color-butter-200)",
  "bg-pink-100": "var(--color-pink-200)",
  "bg-sage-100": "var(--color-sage-200)",
  "bg-lavender-100": "var(--color-lavender-200)",
};

export function GuideCard({ guide }: { guide: CareGuide }) {
  const cat = careCategories.find((c) => c.id === guide.category)!;
  return (
    <article className="card card-hover group relative flex h-full flex-col p-6">
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cat.tint} text-ink transition-transform group-hover:rotate-[-6deg]`}>
        <Doodle name={guide.icon} className="h-9 w-9" fill={fill[cat.tint]} />
      </span>
      <p className="mt-4 text-xs font-bold tracking-wide text-sage-600 uppercase">
        {cat.label} · {guide.readMinutes} min read
      </p>
      <h3 className="mt-1 text-xl font-semibold">
        <Link href={`/care/${guide.slug}`} className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none">
          {guide.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{guide.summary}</p>
      <span className="mt-4 font-display font-semibold text-clay-700" aria-hidden="true">
        Read guide →
      </span>
    </article>
  );
}
