// Captures the README screenshots into docs/screenshots: node scripts/readme-screenshots.mjs
// Run against a production server (npm run build && npm start).
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";
import sharp from "sharp";

const B = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1.5 });

const save = async (name) => {
  const png = await page.screenshot();
  const out = await sharp(png).resize({ width: 1600 }).png({ compressionLevel: 9, palette: true, quality: 92, effort: 10 }).toBuffer();
  await sharp(out).toFile(`${OUT}/${name}.png`);
  console.log(`${OUT}/${name}.png  ${(out.length / 1024).toFixed(0)} KB`);
};

const closeBubble = async () => {
  const close = page.getByRole("button", { name: "Close message" });
  if (await close.isVisible().catch(() => false)) await close.click();
};

// 1. Homepage hero.
await page.goto(`${B}/`, { waitUntil: "load" });
await page.waitForTimeout(2200);
await closeBubble();
await page.waitForTimeout(400);
await save("home");

// 2. Guess the Breed, mid-game, right after a correct answer.
await page.setViewportSize({ width: 1280, height: 1000 });
await page.goto(`${B}/games/guess-the-breed`, { waitUntil: "load" });
await page.waitForTimeout(1000);
await page.getByRole("button", { name: "Start game" }).click();
// Play one round first so the score and progress bar show a game in progress.
for (let round = 0; round < 2; round++) {
  await page.waitForTimeout(1200);
  const src = decodeURIComponent((await page.locator("main img").first().getAttribute("src")) ?? "");
  const slug = src.match(/breeds\/([a-z-]+)\.jpg/)?.[1] ?? "";
  const options = page.locator("main ul button");
  const texts = await options.allInnerTexts();
  const answer = texts.findIndex((t) => t.trim().toLowerCase() === slug.replace(/-/g, " "));
  await options.nth(answer >= 0 ? answer : 0).click();
  if (round === 0) await page.getByRole("button", { name: /Next cat/ }).click();
}
await page.waitForTimeout(900);
await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
await page.evaluate(() => window.scrollTo(0, document.getElementById("game-area").getBoundingClientRect().top + window.scrollY - 88));
await page.waitForTimeout(600);
await save("guess-the-breed");

await browser.close();
