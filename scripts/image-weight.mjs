// Measures image bytes a visitor downloads per page: node scripts/image-weight.mjs [path...]
// Scrolls each page to the bottom so lazy-loaded images count too. Run against a production server.
import { chromium } from "playwright-core";

const B = process.env.BASE_URL ?? "http://localhost:3000";
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/breeds", "/breeds/maine-coon", "/compare"];
const browser = await chromium.launch({ channel: "msedge" });

for (const width of [375, 1280]) {
  for (const p of paths) {
    // Fresh context per page: empty cache, so every image is a real download.
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 600 ? 2 : 1 });
    const page = await ctx.newPage();
    const images = new Map();
    page.on("response", async (res) => {
      const type = res.headers()["content-type"] ?? "";
      if (!type.startsWith("image/")) return;
      try {
        const body = await res.body();
        images.set(res.url(), { bytes: body.length, type });
      } catch {}
    });
    await page.goto(`${B}${p}`, { waitUntil: "load" });
    for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 600) {
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(1500);
    const total = [...images.values()].reduce((s, i) => s + i.bytes, 0);
    const types = [...new Set([...images.values()].map((i) => i.type.replace("image/", "")))].join(",");
    console.log(`${String(width).padStart(4)}px ${p.padEnd(20)} ${String(images.size).padStart(3)} images  ${(total / 1024).toFixed(0).padStart(6)} KB  (${types})`);
    await ctx.close();
  }
}
await browser.close();
