import { useId } from "react";
import { site } from "@/config/site";

export type MascotPose = "happy" | "wave" | "sleeping" | "curious" | "surprised" | "reading" | "sign" | "celebrate";

const FUR = "#fff3df";
const FUR_SHADE = "#f6e2c4";
const LINE = "#4a3b35";
const PINK = "#f3a6b4";
const PINK_DEEP = "#e98b9a";

interface Props {
  pose?: MascotPose;
  className?: string;
  /** Text for the fish-shaped sign (pose "sign"). */
  signText?: string;
  title?: string;
}

const poseLabel: Record<MascotPose, string> = {
  happy: "smiling",
  wave: "waving hello",
  sleeping: "curled up asleep",
  curious: "looking curious with a paw raised",
  surprised: "looking surprised",
  reading: "reading a tiny book",
  sign: "holding a fish-shaped sign",
  celebrate: "celebrating with stars",
};

/** Mochi — the Whiskerpedia mascot: a fluffy cream kitten with a pink bow. */
export function MascotArt({ pose = "happy", className, signText = "Hi!", title }: Props) {
  const uid = useId().replace(/:/g, "");
  const label = title ?? `${site.mascotName} the kitten, ${poseLabel[pose]}`;
  // An empty title marks the art as decorative (e.g. inside a labelled button).
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  if (pose === "sleeping") {
    return (
      <svg viewBox="0 0 160 160" className={className} {...a11y}>
        {label && <title>{label}</title>}
        <ellipse cx="82" cy="146" rx="58" ry="6" fill={LINE} opacity="0.08" />
        <ellipse cx="90" cy="118" rx="54" ry="30" fill={FUR} stroke={LINE} strokeWidth="2.4" />
        <path d="M60 140 Q100 152 138 128" fill="none" stroke={LINE} strokeWidth="16" strokeLinecap="round" opacity="0.9" />
        <path className="mascot-tail" d="M60 140 Q100 152 138 128" fill="none" stroke={FUR} strokeWidth="12" strokeLinecap="round" />
        <g transform="translate(-22 34) scale(0.82)">
          <Head eyes="closed" uid={uid} />
        </g>
        <g fill={PINK_DEEP} fontFamily="var(--font-fredoka), sans-serif" fontWeight="700">
          <text className="mascot-zzz" x="104" y="64" fontSize="18">
            z
          </text>
          <text className="mascot-zzz" x="118" y="48" fontSize="13">
            z
          </text>
        </g>
      </svg>
    );
  }

  const eyes = pose === "celebrate" || pose === "happy" ? "happy" : pose === "surprised" ? "wide" : pose === "reading" ? "down" : "open";

  return (
    <svg viewBox="0 0 160 160" className={className} {...a11y}>
      {label && <title>{label}</title>}
      <ellipse cx="80" cy="154" rx="40" ry="5" fill={LINE} opacity="0.08" />

      {/* Tail */}
      <g className="mascot-tail">
        <path d="M100 142 C128 144 140 120 132 96" fill="none" stroke={LINE} strokeWidth="17" strokeLinecap="round" />
        <path d="M100 142 C128 144 140 120 132 96" fill="none" stroke={FUR} strokeWidth="13" strokeLinecap="round" />
        <path d="M132 100 l-5 -9 M132 100 l6 -8" stroke={FUR} strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Body */}
      <g>
        <ellipse cx="80" cy="128" rx="31" ry="25" fill={FUR} stroke={LINE} strokeWidth="2.4" />
        <ellipse cx="80" cy="133" rx="16" ry="15" fill={FUR_SHADE} opacity="0.7" />
        <ellipse cx="67" cy="151" rx="10" ry="6" fill={FUR} stroke={LINE} strokeWidth="2.2" />
        <ellipse cx="93" cy="151" rx="10" ry="6" fill={FUR} stroke={LINE} strokeWidth="2.2" />
      </g>

      {/* Arms per pose (behind head where needed) */}
      {pose === "celebrate" && (
        <g>
          <Arm d="M56 118 Q40 100 34 82" />
          <Arm d="M104 118 Q120 100 126 82" />
        </g>
      )}

      <g transform={pose === "curious" ? "rotate(-8 80 74)" : undefined}>
        <Head eyes={eyes} uid={uid} mouth={pose === "surprised" ? "o" : pose === "celebrate" ? "open" : "w"} />
      </g>

      {/* Bow — Mochi's signature */}
      <Bow />

      {pose === "happy" && (
        <g>
          <Paw cx={68} cy={134} />
          <Paw cx={92} cy={134} />
        </g>
      )}
      {pose === "wave" && (
        <g>
          <Paw cx={66} cy={134} />
          <g className="mascot-wave">
            <Arm d="M104 120 Q120 108 124 86" />
          </g>
        </g>
      )}
      {pose === "curious" && (
        <g>
          <Paw cx={66} cy={134} />
          <Arm d="M96 126 Q104 118 102 108" />
          <text x="124" y="42" fontSize="26" fontWeight="700" fill={PINK_DEEP} fontFamily="var(--font-fredoka), sans-serif">
            ?
          </text>
        </g>
      )}
      {pose === "surprised" && (
        <g>
          <Paw cx={68} cy={134} />
          <Paw cx={92} cy={134} />
          <text x="126" y="40" fontSize="26" fontWeight="700" fill={PINK_DEEP} fontFamily="var(--font-fredoka), sans-serif">
            !
          </text>
        </g>
      )}
      {pose === "reading" && (
        <g>
          <path d="M50 120 L80 126 L110 120 L110 146 L80 152 L50 146 Z" fill="#c9dfc0" stroke={LINE} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M54 123 L80 129 L80 148 L54 143 Z" fill="#fffdf8" />
          <path d="M106 123 L80 129 L80 148 L106 143 Z" fill="#fffdf8" />
          <path d="M80 128 V150" stroke={LINE} strokeWidth="1.8" />
          <path d="M60 131 h14 M60 136 h12 M86 133 h14 M86 138 h12" stroke={LINE} strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
          <Paw cx={52} cy={132} />
          <Paw cx={108} cy={132} />
        </g>
      )}
      {pose === "sign" && (
        <g>
          <path d="M112 132 V70" stroke="#b9855a" strokeWidth="4" strokeLinecap="round" />
          <g transform="translate(112 52)">
            <path d="M-42 0 C-30 -20 18 -20 30 0 C18 20 -30 20 -42 0 Z" fill="#ffe39b" stroke={LINE} strokeWidth="2.2" />
            <path d="M28 0 L46 -14 L46 14 Z" fill="#ffe39b" stroke={LINE} strokeWidth="2.2" strokeLinejoin="round" />
            <circle cx="-30" cy="-3" r="2.4" fill={LINE} />
            <text
              x="-4"
              y="5"
              textAnchor="middle"
              fontSize={signText.length > 6 ? 10 : 14}
              fontWeight="700"
              fill={LINE}
              fontFamily="var(--font-fredoka), sans-serif"
            >
              {signText}
            </text>
          </g>
          <Paw cx={112} cy={128} />
          <Paw cx={66} cy={134} />
        </g>
      )}
      {pose === "celebrate" && (
        <g fill="#fdd36b" stroke={LINE} strokeWidth="1.4" strokeLinejoin="round">
          <Star x={22} y={60} s={1} />
          <Star x={138} y={58} s={1.1} delay="0.4s" />
          <Star x={30} y={24} s={0.7} delay="0.8s" />
          <Star x={128} y={20} s={0.8} delay="1.2s" />
          <Star x={150} y={100} s={0.6} delay="0.6s" />
          <Star x={10} y={104} s={0.6} delay="1s" />
        </g>
      )}
    </svg>
  );
}

function Head({ eyes, mouth = "w", uid }: { eyes: "open" | "happy" | "closed" | "wide" | "down"; mouth?: "w" | "o" | "open"; uid: string }) {
  return (
    <g className="mascot-head">
      {/* Ears */}
      <g stroke={LINE} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M40 60 L42 18 L74 40 Z" fill={FUR} />
        <path d="M120 60 L118 18 L86 40 Z" fill={FUR} />
        <path d="M46 52 L47 28 L66 41 Z" fill={PINK} stroke="none" />
        <path d="M114 52 L113 28 L94 41 Z" fill={PINK} stroke="none" />
      </g>
      {/* Head with cheek fluff */}
      <path
        d="M80 34 C108 34 126 50 127 72 C134 76 131 84 125 86 C122 104 104 114 80 114 C56 114 38 104 35 86 C29 84 26 76 33 72 C34 50 52 34 80 34 Z"
        fill={FUR}
        stroke={LINE}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M74 36 q4 -9 10 -4 q-6 0 -4 6" fill={FUR} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
      {/* Blush */}
      <ellipse cx="51" cy="90" rx="9" ry="5.5" fill={PINK} opacity="0.75" />
      <ellipse cx="109" cy="90" rx="9" ry="5.5" fill={PINK} opacity="0.75" />
      {/* Eyes */}
      {eyes === "open" && (
        <g className="mascot-eyes">
          <ellipse cx="60" cy="76" rx="7.5" ry="9.5" fill={LINE} />
          <ellipse cx="100" cy="76" rx="7.5" ry="9.5" fill={LINE} />
          <circle cx="62.5" cy="72" r="3" fill="#fff" />
          <circle cx="102.5" cy="72" r="3" fill="#fff" />
          <circle cx="58" cy="80" r="1.4" fill="#fff" />
          <circle cx="98" cy="80" r="1.4" fill="#fff" />
        </g>
      )}
      {eyes === "down" && (
        <g className="mascot-eyes">
          <ellipse cx="60" cy="80" rx="7" ry="7.5" fill={LINE} />
          <ellipse cx="100" cy="80" rx="7" ry="7.5" fill={LINE} />
          <circle cx="62" cy="78" r="2.4" fill="#fff" />
          <circle cx="102" cy="78" r="2.4" fill="#fff" />
        </g>
      )}
      {eyes === "wide" && (
        <g>
          <circle cx="60" cy="75" r="11" fill="#fff" stroke={LINE} strokeWidth="2.2" />
          <circle cx="100" cy="75" r="11" fill="#fff" stroke={LINE} strokeWidth="2.2" />
          <circle cx="60" cy="76" r="5" fill={LINE} />
          <circle cx="100" cy="76" r="5" fill={LINE} />
          <circle cx="61.5" cy="74" r="1.6" fill="#fff" />
          <circle cx="101.5" cy="74" r="1.6" fill="#fff" />
        </g>
      )}
      {eyes === "happy" && (
        <g fill="none" stroke={LINE} strokeWidth="3" strokeLinecap="round">
          <path d="M51 79 q9 -11 18 0" />
          <path d="M91 79 q9 -11 18 0" />
        </g>
      )}
      {eyes === "closed" && (
        <g fill="none" stroke={LINE} strokeWidth="3" strokeLinecap="round">
          <path d="M51 76 q9 8 18 0" />
          <path d="M91 76 q9 8 18 0" />
        </g>
      )}
      {/* Nose + mouth */}
      <path d="M76 88 h8 l-4 4.5 z" fill={PINK_DEEP} stroke={PINK_DEEP} strokeWidth="1.5" strokeLinejoin="round" />
      {mouth === "w" && <path d="M80 93 q-3 5 -8 2 M80 93 q3 5 8 2" fill="none" stroke={LINE} strokeWidth="2" strokeLinecap="round" />}
      {mouth === "o" && <ellipse cx="80" cy="99" rx="4" ry="5" fill={PINK_DEEP} stroke={LINE} strokeWidth="1.8" />}
      {mouth === "open" && (
        <path d="M72 94 q8 12 16 0 z" fill={PINK_DEEP} stroke={LINE} strokeWidth="1.8" strokeLinejoin="round" />
      )}
      {/* Whiskers */}
      <g stroke={LINE} strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round">
        <path d="M38 86 L22 83 M38 91 L23 94" />
        <path d="M122 86 L138 83 M122 91 L137 94" />
      </g>
    </g>
  );
}

function Bow() {
  return (
    <g stroke={LINE} strokeWidth="2" strokeLinejoin="round">
      <path d="M80 112 L62 102 L64 122 Z" fill={PINK} />
      <path d="M80 112 L98 102 L96 122 Z" fill={PINK} />
      <circle cx="80" cy="112" r="5" fill={PINK_DEEP} />
    </g>
  );
}

function Paw({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="8" ry="7" fill={FUR} stroke={LINE} strokeWidth="2.2" />
      <path d={`M${cx - 2.5} ${cy + 2} v3 M${cx + 2.5} ${cy + 2} v3`} stroke={LINE} strokeOpacity="0.4" strokeWidth="1.3" strokeLinecap="round" />
    </g>
  );
}

function Arm({ d }: { d: string }) {
  const end = d.split(" ").slice(-2).map(Number);
  return (
    <g>
      <path d={d} fill="none" stroke={LINE} strokeWidth="15" strokeLinecap="round" />
      <path d={d} fill="none" stroke={FUR} strokeWidth="11" strokeLinecap="round" />
      <ellipse cx={end[0]} cy={end[1]} rx="8" ry="7.5" fill={FUR} stroke={LINE} strokeWidth="2.2" />
      <ellipse cx={end[0]} cy={end[1] + 1} rx="3" ry="2.4" fill={PINK} />
    </g>
  );
}

function Star({ x, y, s, delay }: { x: number; y: number; s: number; delay?: string }) {
  // Position lives on the wrapper: the twinkle animation's CSS transform would override an SVG transform on the same element.
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        className="twinkle"
        style={delay ? { animationDelay: delay } : undefined}
        d="M0 -10 L3 -3 L10 -2 L4.5 3 L6 10 L0 6.5 L-6 10 L-4.5 3 L-10 -2 L-3 -3 Z"
      />
    </g>
  );
}
