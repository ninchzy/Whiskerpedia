import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#fff8ee", padding: 70, gap: 60 }}>
        <svg width="380" height="380" viewBox="0 0 48 48">
          <rect width="48" height="48" rx="12" fill="#fbe3da" />
          <path d="M8 22 L9 5 L21 13 Q24 12.4 27 13 L39 5 L40 22 Q44 38 24 42 Q4 38 8 22 Z" fill="#fff3df" stroke="#4a3b35" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 16 L12.5 9.5 L18 13 Z M36 16 L35.5 9.5 L30 13 Z" fill="#f3a6b4" />
          <path d="M15 25 q3 -3 6 0 M27 25 q3 -3 6 0" fill="none" stroke="#4a3b35" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M22 29 h4 l-2 2.4 z" fill="#e98b9a" />
          <ellipse cx="13.5" cy="31" rx="3" ry="1.8" fill="#f3a6b4" />
          <ellipse cx="34.5" cy="31" rx="3" ry="1.8" fill="#f3a6b4" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#b9503a", letterSpacing: 6, textTransform: "uppercase" }}>{site.tagline}</div>
          <div style={{ fontSize: 96, fontWeight: 700, color: "#4a3b35", marginTop: 12 }}>{site.name}</div>
          <div style={{ fontSize: 38, color: "#6e5a52", marginTop: 16, maxWidth: 620 }}>Breeds, fact-checked secrets, care guides and a purrfect-match quiz.</div>
        </div>
      </div>
    ),
    size,
  );
}
