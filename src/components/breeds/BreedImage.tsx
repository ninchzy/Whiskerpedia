import Image from "next/image";
import type { Breed } from "@/lib/types";
import { breedPhotos } from "@/data/photos";
import { CatPortrait } from "@/components/illustrations/CatPortrait";

/**
 * A breed's photo (responsive, lazy-loaded via next/image), falling back to
 * the illustrated portrait when no photo is available. The wrapper decides
 * the size and aspect ratio; the image always covers it.
 */
export function BreedImage({
  breed,
  sizes,
  className = "",
  imgClassName = "",
  preload = false,
  thumbnail = false,
  alt,
}: {
  breed: Breed;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Load immediately with high priority — only for the main image visible on first paint (the LCP). */
  preload?: boolean;
  /** Small avatar-sized images: lower quality is invisible at this size, and they skip the blur placeholder. */
  thumbnail?: boolean;
  /** Override the alt text (e.g. to avoid giving away the answer in a game). Use "" for decorative images. */
  alt?: string;
}) {
  const photo = breedPhotos[breed.slug];
  const label = alt ?? `${breed.name} cat`;

  if (!photo) {
    return (
      <span className={`bg-plaid relative block overflow-hidden ${className}`}>
        <CatPortrait look={breed.look} title={label || undefined} className={`h-full w-full ${imgClassName}`} />
      </span>
    );
  }

  return (
    <span className={`relative block overflow-hidden bg-cream-200 ${className}`}>
      <Image
        src={photo.src}
        alt={label}
        fill
        sizes={sizes}
        preload={preload}
        quality={thumbnail ? 60 : 70}
        placeholder={!thumbnail && photo.blurDataURL ? "blur" : "empty"}
        blurDataURL={thumbnail ? undefined : photo.blurDataURL}
        className={`object-cover ${imgClassName}`}
        style={{ objectPosition: photo.position ?? "50% 50%" }}
      />
    </span>
  );
}

export function PhotoCredit({ slug, className = "" }: { slug: string; className?: string }) {
  const photo = breedPhotos[slug];
  if (!photo) return null;
  return (
    <p className={`text-xs text-ink-faint ${className}`}>
      Photo:{" "}
      <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-soft">
        {photo.author}
        <span className="sr-only"> (opens Wikimedia Commons in a new tab)</span>
      </a>{" "}
      · {photo.license} · via Wikimedia Commons
    </p>
  );
}
