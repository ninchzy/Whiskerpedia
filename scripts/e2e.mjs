// End-to-end smoke tests against a running server: node scripts/e2e.mjs
import { chromium } from "playwright-core";

const B = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`${page.url()}: ${e.message}`));
let pass = 0;
let fail = 0;
const check = (name, ok, extra = "") => {
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"} ${name} ${extra}`);
};
const hydrate = () => page.waitForTimeout(700);
const breedStatus = () => page.locator("main p[role=status]").first().innerText();

// ── Quiz
await page.goto(`${B}/quiz`);
await hydrate();
await page.getByRole("button", { name: /Let.s Play/ }).click();
check("quiz shows Q1", await page.getByText("Question 1 of 8").isVisible());
const picks = [
  "Curled up with a book or movie",
  "My tiny shadow, please!",
  "A small apartment",
  "I'm happy to brush my cat frequently",
  "Playful in short bursts",
  "Quiet companionship, please",
  "Yes, children",
  "A fluffy cuddle companion",
];
for (let i = 0; i < picks.length; i++) {
  await page.getByText(picks[i], { exact: true }).click();
  await page.waitForTimeout(650);
  if (i === 2) {
    await page.getByRole("button", { name: "Back" }).click();
    await page.waitForTimeout(100);
    check("back returns to Q3", await page.getByText("Question 3 of 8").isVisible());
    check("answer kept after back", (await page.locator('input[name="home"]:checked').count()) === 1);
    await page.getByRole("button", { name: "Next" }).click();
  }
}
await page.waitForTimeout(600);
const matchName = await page.locator("#match-title").textContent().catch(() => null);
check("quiz result shown", !!matchName, matchName ?? "");
const meet = await page.getByRole("link", { name: /Meet Your Match/ }).getAttribute("href");
check("meet link points at breed", !!meet?.startsWith("/breeds/"), meet ?? "");
console.log("   top (cosy/cuddly/apartment/kids):", await page.locator("details ol").nth(1).evaluate((el) => [...el.children].map((li) => li.textContent).join(" | ")));

await page.getByRole("button", { name: /Try Again/ }).click();
await page.getByRole("button", { name: /Let.s Play/ }).click();
const picks2 = [
  "Playing games and staying active",
  "Affectionate, but with some independence",
  "A larger home with plenty of room",
  "As little as reasonably possible",
  "An energetic little adventurer",
  "I love a vocal, expressive cat!",
  "Yes, dogs",
  "A curious, clever companion",
];
for (const p of picks2) {
  await page.getByText(p, { exact: true }).click();
  await page.waitForTimeout(650);
}
await page.waitForTimeout(500);
const match2 = await page.locator("#match-title").textContent();
check("different answers give different match", match2 !== matchName, match2 ?? "");
console.log("   top (active/vocal/low grooming):", await page.locator("details ol").nth(1).evaluate((el) => [...el.children].map((li) => li.textContent).join(" | ")));

await page.getByRole("button", { name: /Try Again/ }).click();
await page.getByRole("button", { name: /Let.s Play/ }).click();
await page.locator('input[name="day"]').first().focus();
await page.keyboard.press("Space");
await page.waitForTimeout(700);
check("keyboard select does not auto-advance", await page.getByText("Question 1 of 8").isVisible());
check("keyboard select checks radio", (await page.locator('input[name="day"]:checked').count()) === 1);

// ── Breed filters
await page.goto(`${B}/breeds`);
await hydrate();
await page.getByText("Hairless", { exact: true }).first().click();
let status = await breedStatus();
check("hairless filter", status.startsWith("1 of"), status);
await page.getByText("Long", { exact: true }).first().click();
status = await breedStatus();
check("OR within a group", /^\d+ of 24/.test(status) && !status.startsWith("1 of"), status);
await page.getByText("Apartment-friendly", { exact: true }).click();
status = await breedStatus();
check("AND across groups", /^\d+ of 24/.test(status), status);
check("url synced", page.url().includes("coat=hairless"), page.url());
await page.getByRole("button", { name: "Clear all filters" }).first().click();
status = await breedStatus();
check("clear filters", status.includes("all 24"), status);
await page.fill("#breed-search", "zzzz");
check("empty state", await page.getByText("No breeds match").isVisible());

// ── Search
await page.goto(`${B}/`);
await hydrate();
await page.getByRole("button", { name: "Search", exact: true }).click();
await page.keyboard.type("purr");
await page.waitForTimeout(600);
const opts = await page.getByRole("option").count();
check("search suggestions", opts > 1, `${opts} options`);
await page.keyboard.press("ArrowDown");
await page.keyboard.press("Enter");
await page.waitForURL(/facts|care|breeds|games/, { timeout: 5000 }).catch(() => {});
check("keyboard opens a result", /facts|care|breeds|games/.test(page.url()), page.url());
await page.goto(`${B}/search?q=litter`);
check("search page results", (await page.locator("main ul li").count()) > 0);
await page.goto(`${B}/search?q=litter&type=guide`);
check("search type filter", (await page.locator("main ul li .pill", { hasText: /^Cat fact$/ }).count()) === 0);
await page.goto(`${B}/search?q=qwertyuiop`);
check("search empty state", await page.getByText(/sniffed everywhere/).isVisible());

// ── Favorites
await page.goto(`${B}/breeds/bengal`);
await hydrate();
await page.getByRole("button", { name: "Save to favorites" }).click();
await page.reload();
await hydrate();
check("favorite persists after reload", await page.getByRole("button", { name: "Saved" }).isVisible());
await page.goto(`${B}/favorites`);
await hydrate();
check("favorites page lists breed", await page.getByRole("link", { name: "Bengal" }).isVisible());
await page.getByRole("button", { name: /Remove Bengal/ }).click();
await page.waitForTimeout(200);
check("empty favorites state", await page.getByText(/still waiting for its first little furball/).isVisible());

// ── Compare
await page.goto(`${B}/compare?breeds=persian,bengal,sphynx`);
await hydrate();
check("compare 3 breeds", (await page.locator("thead th").count()) === 4);
await page.locator("select").nth(2).selectOption("");
await page.waitForTimeout(200);
check("compare removes a breed", (await page.locator("thead th").count()) === 3, page.url());

// ── Games
await page.goto(`${B}/games/trivia`);
await hydrate();
await page.getByRole("button", { name: "Start game" }).click();
for (let i = 0; i < 10; i++) {
  await page.locator("main ul button").first().click();
  await page.getByRole("button", { name: /Next question|See my score/ }).click();
}
check("trivia end screen", await page.getByText(/You scored \d+ out of 10/).isVisible());
await page.goto(`${B}/games/fact-or-fiction`);
await hydrate();
await page.getByRole("button", { name: "Start game" }).click();
await page.getByRole("button", { name: /Fact$/ }).click();
check("fact or fiction feedback", await page.getByText(/You got it|Actually, that/).isVisible());
await page.goto(`${B}/games/guess-the-breed`);
await hydrate();
await page.getByRole("button", { name: "Start game" }).click();
await page.locator("main ul button").first().click();
check("guess the breed feedback", await page.getByText("Clues:").isVisible());
await page.goto(`${B}/games/personality`);
await hydrate();
await page.getByRole("button", { name: /Generate my card/ }).click();
check("personality validation", await page.locator("#pgen-error").isVisible());
for (const q of ["weekend", "snack", "toy", "mood"]) await page.locator(`input[name="${q}"]`).first().check({ force: true });
await page.fill("#pname", "Biscuit");
await page.getByRole("button", { name: /Generate my card/ }).click();
check("personality card", (await page.locator("#pcard-name").textContent()) === "Biscuit");

// ── Checklist
await page.goto(`${B}/care/checklist`);
await hydrate();
await page.locator('input[type="checkbox"]').first().check({ force: true });
await page.reload();
await hydrate();
check("checklist persists", await page.locator('input[type="checkbox"]').first().isChecked());

// ── Dream cat
await page.goto(`${B}/games/dream-cat`);
await hydrate();
await page.fill("#dream-name", "123");
check("dream name validation", await page.getByText(/Please use letters/).isVisible());
await page.fill("#dream-name", "Noodle");
await page.getByText("Hairless", { exact: true }).click();
check("dream description updates", (await page.locator("#dream-title + div + p").innerText()).includes("hairless"));

// ── Mascot details
await page.goto(`${B}/games`);
await hydrate();
const starXs = await page.locator("main svg .twinkle").evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().x)));
check("celebrate stars spread out", new Set(starXs).size >= 4, JSON.stringify(starXs));
const mascot = page.locator("main .mascot").first();
await mascot.hover();
await page.waitForTimeout(100);
const headAnim = await mascot.locator(".mascot-head").first().evaluate((el) => getComputedStyle(el).animationName);
check("head bounces on hover", headAnim === "head-bob", headAnim);

// ── 404
const res = await page.goto(`${B}/breeds/not-a-cat`);
check("404 status", res?.status() === 404, String(res?.status()));

console.log(`\n${pass} passed, ${fail} failed. Page errors: ${JSON.stringify(errors)}`);
await browser.close();
process.exit(fail ? 1 : 0);
