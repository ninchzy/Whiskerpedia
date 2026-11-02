import manifest from "./photos.json";

/**
 * Breed photos from Wikimedia Commons. Fetched by scripts/fetch-breed-photos.mjs,
 * then optimized (and given width/height/blur placeholders) by scripts/optimize-images.mjs.
 */
export interface BreedPhoto {
  src: string;
  author: string;
  license: string;
  source: string;
  file: string;
  /** CSS object-position for cropping, e.g. "50% 30%". */
  position?: string;
  width?: number;
  height?: number;
  /** Tiny base64 preview shown while the photo loads. */
  blurDataURL?: string;
  optimizedBytes?: number;
}

export const breedPhotos: Record<string, BreedPhoto> = manifest;
