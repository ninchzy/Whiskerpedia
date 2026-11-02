// Downloads one photo per breed from Wikimedia Commons into public/images/breeds and records credits in src/data/photos.json.
// Usage: node scripts/fetch-breed-photos.mjs [slug=File:Name.jpg ...]   (overrides pick a specific Commons file)
import { mkdir, readFile, writeFile } from "node:fs/promises";

const UA = "WhiskerpediaBuild/1.0 (local development script)";
const OUT_DIR = "public/images/breeds";

const articles = {
  "maine-coon": "Maine Coon",
  ragdoll: "Ragdoll",
  "british-shorthair": "British Shorthair",
  siamese: "Siamese cat",
  persian: "Persian cat",
  bengal: "Bengal cat",
  sphynx: "Sphynx cat",
  abyssinian: "Abyssinian cat",
  "scottish-fold": "Scottish Fold",
  "russian-blue": "Russian Blue",
  "norwegian-forest-cat": "Norwegian Forest cat",
  birman: "Birman",
  "devon-rex": "Devon Rex",
  "cornish-rex": "Cornish Rex",
  "american-shorthair": "American Shorthair",
  "exotic-shorthair": "Exotic Shorthair",
  burmese: "Burmese cat",
  "oriental-shorthair": "Oriental Shorthair",
  siberian: "Siberian cat",
  tonkinese: "Tonkinese cat",
  "turkish-angora": "Turkish Angora",
  chartreux: "Chartreux",
  ragamuffin: "Ragamuffin cat",
  "domestic-shorthair": "Domestic short-haired cat",
};

const overrides = Object.fromEntries(process.argv.slice(2).map((a) => a.split("=")));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Wikimedia rate-limits bursts; back off and retry on 429.
async function get(url) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status !== 429) return res;
    await sleep(5000 * (attempt + 1));
  }
  throw new Error(`still rate-limited: ${url}`);
}

const api = async (params) => {
  const url = `https://en.wikipedia.org/w/api.php?format=json&formatversion=2&origin=*&${new URLSearchParams(params)}`;
  const res = await get(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

const strip = (html = "") => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function fileInfo(fileTitle) {
  const data = await api({ action: "query", titles: fileTitle, prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "1200" });
  const info = data.query.pages[0].imageinfo?.[0];
  if (!info) throw new Error(`No imageinfo for ${fileTitle}`);
  const meta = info.extmetadata ?? {};
  return {
    thumb: info.thumburl ?? info.url,
    page: info.descriptionurl,
    author: strip(meta.Artist?.value) || "Unknown author",
    license: strip(meta.LicenseShortName?.value) || "See source",
  };
}

await mkdir(OUT_DIR, { recursive: true });
const MANIFEST = "src/data/photos.json";
const photos = JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}"));
for (const [slug, title] of Object.entries(articles)) {
  if (photos[slug] && !overrides[slug]) continue;
  try {
    let fileTitle = overrides[slug];
    if (!fileTitle) {
      const data = await api({ action: "query", titles: title, prop: "pageimages", piprop: "name", redirects: "1" });
      const name = data.query.pages[0].pageimage;
      if (!name) throw new Error("article has no lead image");
      fileTitle = `File:${name}`;
    }
    const info = await fileInfo(fileTitle);
    const img = await get(info.thumb);
    if (!img.ok) throw new Error(`download ${img.status}`);
    const ext = info.thumb.toLowerCase().includes(".png") ? "png" : "jpg";
    await writeFile(`${OUT_DIR}/${slug}.${ext}`, Buffer.from(await img.arrayBuffer()));
    photos[slug] = { ...(photos[slug]?.position ? { position: photos[slug].position } : {}), src: `/images/breeds/${slug}.${ext}`, author: info.author, license: info.license, source: info.page, file: fileTitle };
    console.log(`ok   ${slug}  ${fileTitle}  (${info.license})`);
  } catch (e) {
    console.log(`FAIL ${slug}: ${e.message}`);
  }
  await sleep(1500);
}

await writeFile(MANIFEST, JSON.stringify(photos, null, 2) + "\n");
console.log(`\nWrote ${Object.keys(photos).length} photos.`);
