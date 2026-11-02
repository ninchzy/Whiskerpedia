function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function parse(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}

/** Mix a color toward white (amount > 0) or black (amount < 0). */
export function shade(hex: string, amount: number) {
  const [r, g, b] = parse(hex);
  const t = amount > 0 ? 255 : 0;
  const a = Math.abs(amount);
  const out = [r, g, b].map((c) => clamp(c + (t - c) * a));
  return `#${out.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

export function luminance(hex: string) {
  const [r, g, b] = parse(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
