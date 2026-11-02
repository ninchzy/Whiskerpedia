// Optimizes breed photos in public/images/breeds and records their dimensions and blur placeholders in src/data/photos.json.
// Usage: node scripts/optimize-images.mjs [--force]
//
// Next.js re-encodes these for each visitor (AVIF/WebP at the right width), so the files here are the
// *masters*: sized to the largest width we ever display, high quality, with metadata stripped.
// Each file is only processed once — re-encoding a JPEG repeatedly would slowly degrade it — unless --force is given.
import { readFile, stat, writeFile } from "node:fs/promises";
import sharp from "sharp";

const MANIFEST = "src/data/photos.json";
const MAX_WIDTH = 1200; // widest the site ever shows a photo, at 2x density
const MAX_HEIGHT = 1500; // portrait photos: no need for more than this
const QUALITY = 82; // master quality; Next.js re-compresses for delivery

const force = process.argv.includes("--force");
const photos = JSON.parse(await readFile(MANIFEST, "utf8"));
let before = 0;
let after = 0;

for (const [slug, photo] of Object.entries(photos)) {
  const file = `public${photo.src}`;
  const { size } = await stat(file);
  if (!force && photo.optimizedBytes === size && photo.blurDataURL) {
    before += size;
    after += size;
    continue;
  }

  const input = await readFile(file);
  const output = await sharp(input)
    .rotate() // apply EXIF orientation before metadata is stripped
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toBuffer();
  // Never replace a file with a bigger one.
  const best = output.length < input.length ? output : input;
  await writeFile(file, best);

  const meta = await sharp(best).metadata();
  const blur = await sharp(best).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();

  photos[slug] = {
    ...photo,
    width: meta.width,
    height: meta.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    optimizedBytes: best.length,
  };
  before += input.length;
  after += best.length;
  console.log(`${slug.padEnd(22)} ${(input.length / 1024).toFixed(0).padStart(5)} KB → ${(best.length / 1024).toFixed(0).padStart(4)} KB  ${meta.width}×${meta.height}`);
}

await writeFile(MANIFEST, JSON.stringify(photos, null, 2) + "\n");
console.log(`\nTotal: ${(before / 1048576).toFixed(2)} MB → ${(after / 1048576).toFixed(2)} MB`);
