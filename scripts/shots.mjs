// Usage: node scripts/shots.mjs <outdir> <width> <path> [path...]
import { chromium } from "playwright-core";
const [, , outDir, width, ...paths] = process.argv;
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(`${page.url()}: ${e.message}`));
page.on("console", (m) => m.type() === "error" && !m.text().includes("404") && errors.push(`${page.url()}: ${m.text()}`));
for (const p of paths) {
  await page.goto(`http://localhost:3000${p}`, { waitUntil: "load" });
  await page.waitForTimeout(900);
  for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 500) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const name = p.replace(/[\/?=&,]/g, "_") || "_";
  await page.screenshot({ path: `${outDir}/${width}${name}.png`, fullPage: true });
  console.log(p, "overflow:", overflow);
}
console.log("errors:", JSON.stringify(errors));
await browser.close();
