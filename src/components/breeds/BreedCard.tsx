import Link from "next/link";
import type { Breed } from "@/lib/types";
import { BreedImage } from "./BreedImage";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

const coatLabel = { short: "Short coat", medium: "Medium coat", long: "Long coat", hairless: "Hairless" } as const;
const sizeLabel = { small: "Small", medium: "Medium", large: "Large" } as const;

export function BreedCard({ breed, compact = false, headingLevel = 3 }: { breed: Breed; compact?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative m-3 mb-0">
        <BreedImage
          breed={breed}
          alt={`Photo of a ${breed.name} cat`}
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
          className="aspect-[4/3] rounded-[1.25rem]"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <FavoriteButton kind="breeds" id={breed.slug} name={breed.name} size="sm" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 pt-4">
        <p className="text-xs font-bold tracking-wide text-clay-600 uppercase">{breed.origin.split(" (")[0].split(";")[0]}</p>
        <H className="mt-1 text-xl font-semibold">
          <Link href={`/breeds/${breed.slug}`} className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none">
            {breed.name}
          </Link>
        </H>
        {!compact && <p className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-soft">{breed.description}</p>}
        {compact && <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{breed.tagline}</p>}
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Temperament">
          {breed.temperament.slice(0, 3).map((t) => (
            <li key={t} className="pill bg-pink-100 text-pink-600">
              {t}
            </li>
          ))}
        </ul>
        <dl className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm text-ink-soft">
          <div className="flex gap-1">
            <dt className="sr-only">Size</dt>
            <dd><span aria-hidden="true">📏</span> {sizeLabel[breed.size]}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="sr-only">Coat</dt>
            <dd><span aria-hidden="true">✨</span> {coatLabel[breed.coatLength]}</dd>
          </div>
        </dl>
        {compact && (
          <span className="mt-3 inline-flex items-center gap-1 font-display font-semibold text-clay-700" aria-hidden="true">
            Meet this breed →
          </span>
        )}
      </div>
    </article>
  );
}
