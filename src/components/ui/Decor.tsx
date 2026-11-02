import type { ReactNode } from "react";

/** Wavy section divider. `from`/`to` are CSS colors of the sections above/below. */
export function WavyDivider({ color, flip = false, className = "" }: { color: string; flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`block h-8 w-full sm:h-12 ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <path d="M0 30 C120 0 240 0 360 30 C480 60 600 60 720 30 C840 0 960 0 1080 30 C1200 60 1320 60 1440 30 V60 H0 Z" fill={color} />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <div className={`mb-10 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{children}</p>}
    </div>
  );
}

export function FloatingDecor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`pointer-events-none ${className}`} aria-hidden="true">
      <g fill="none" stroke="#e07a5f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path className="twinkle" d="M30 30 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="#ffe39b" />
        <path
          className="twinkle"
          style={{ animationDelay: "0.7s" }}
          d="M170 150 C162 144 160 138 163 134 C166 130 170 132 170 136 C170 132 174 130 177 134 C180 138 178 144 170 150 Z"
          fill="#f9c9d1"
        />
        <path d="M150 40 q12 -10 22 2" strokeDasharray="1 7" />
      </g>
    </svg>
  );
}
