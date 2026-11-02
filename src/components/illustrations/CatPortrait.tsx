import { useId, type SVGProps } from "react";
import type { CatLook, EarShape, FaceShape } from "@/lib/types";
import { luminance, shade } from "@/lib/color";

/*
 * A procedurally drawn sitting cat. Every breed is described by a small
 * CatLook (coat, pattern, ears, face, fluff…), which keeps the illustration
 * style perfectly consistent across the whole site.
 */

const OUTLINE = "#4a3b35";
const PINK = "#f3a6b4";

type Pt = [number, number];

const EARS: Record<Exclude<EarShape, "folded" | "tufted">, [Pt, Pt, Pt]> = {
  normal: [[60, 68], [62, 22], [92, 48]],
  large: [[55, 74], [50, 10], [94, 48]],
  small: [[63, 60], [68, 34], [90, 47]],
};

const FACE: Record<FaceShape, { eyeY: number; eyeDX: number; ry: number; almond: boolean }> = {
  round: { eyeY: 84, eyeDX: 19, ry: 10, almond: false },
  wedge: { eyeY: 82, eyeDX: 18, ry: 7.5, almond: true },
  flat: { eyeY: 88, eyeDX: 20, ry: 10.5, almond: false },
};

function HeadShape({ face, ...rest }: { face: FaceShape } & SVGProps<SVGPathElement & SVGEllipseElement>) {
  if (face === "wedge")
    return <path d="M100 128 C78 126 55 104 55 80 C55 56 76 42 100 42 C124 42 145 56 145 80 C145 104 122 126 100 128 Z" {...rest} />;
  if (face === "flat") return <ellipse cx={100} cy={86} rx={51} ry={40} {...rest} />;
  return <ellipse cx={100} cy={84} rx={47} ry={40} {...rest} />;
}

function mirror(d: string) {
  return <path d={d} transform="matrix(-1 0 0 1 200 0)" />;
}

function inner(points: [Pt, Pt, Pt]): string {
  const cx = (points[0][0] + points[1][0] + points[2][0]) / 3;
  const cy = (points[0][1] + points[1][1] + points[2][1]) / 3;
  return points.map(([x, y]) => `${x + (cx - x) * 0.42},${y + (cy - y) * 0.42 + 3}`).join(" ");
}

export interface CatPortraitProps {
  look: CatLook;
  title?: string;
  className?: string;
  /** Adds a happy closed-eye expression. */
  happy?: boolean;
}

export function CatPortrait({ look, title, className, happy }: CatPortraitProps) {
  const uid = useId().replace(/:/g, "");
  const W = [0.86, 1, 1.12][look.build ?? 1];
  const f = FACE[look.face];
  const coat = look.coat;
  const accent = look.accent ?? shade(coat, -0.35);
  const accent2 = look.accent2 ?? shade(coat, -0.55);
  const dark = luminance(coat) < 0.12;
  const line = dark ? shade(coat, 0.35) : OUTLINE;
  const pointed = look.pattern === "pointed" || look.pattern === "mitted" || look.pattern === "mink";
  const white = look.pattern === "bicolor" ? accent : "#fbf8f3";
  const earFill = pointed ? accent : look.pattern === "calico" ? accent : coat;
  const earFillR = look.pattern === "calico" ? accent2 : earFill;
  const tailColor = pointed ? accent : look.pattern === "calico" ? accent2 : coat;
  const pawColor = look.pattern === "mitted" || look.pattern === "bicolor" ? white : look.pattern === "pointed" ? accent : coat;
  const tailW = [11, 15, 21][look.fluff];

  const body = `M${100 - 44 * W} 194 C${100 - 50 * W} 150 ${100 - 36 * W} 112 100 110 C${100 + 36 * W} 112 ${100 + 50 * W} 150 ${100 + 44 * W} 194 Z`;
  const tail = `M${100 + 36 * W} 186 C${150 + 6 * W} 196 176 172 169 142 C165 124 152 118 157 106`;
  const noseY = look.face === "flat" ? f.eyeY + 12 : f.eyeY + 15;

  const sx = (x: number) => 100 + (x - 100) * W;
  const earPts = look.ears === "folded" ? null : EARS[look.ears === "tufted" ? "normal" : look.ears];

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <clipPath id={`h${uid}`}>
          <HeadShape face={look.face} />
        </clipPath>
        <clipPath id={`b${uid}`}>
          <path d={body} />
        </clipPath>
        <radialGradient id={`m${uid}`} cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity={look.pattern === "mink" ? 0.75 : 0.95} />
          <stop offset="65%" stopColor={accent} stopOpacity={look.pattern === "mink" ? 0.45 : 0.7} />
          <stop offset="100%" stopColor={accent} stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`s${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={coat} stopOpacity={0} />
          <stop offset="100%" stopColor={pointed ? accent : shade(coat, -0.2)} stopOpacity={pointed ? 0.35 : 0.18} />
        </linearGradient>
        <pattern id={`t${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <path d="M1 3 h3" stroke={accent} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
        </pattern>
      </defs>

      {/* Tail */}
      <path d={tail} fill="none" stroke={line} strokeOpacity={0.55} strokeWidth={tailW + 4} strokeLinecap="round" />
      <path d={tail} fill="none" stroke={tailColor} strokeWidth={tailW} strokeLinecap="round" />
      {(look.pattern === "tabby" || look.pattern === "mackerel") && (
        <path d={tail} fill="none" stroke={accent} strokeWidth={tailW} strokeDasharray="5 9" opacity={0.8} />
      )}

      {/* Body */}
      <path d={body} fill={coat} stroke={line} strokeOpacity={0.55} strokeWidth={2.2} />
      <g clipPath={`url(#b${uid})`}>
        <rect x="0" y="100" width="200" height="100" fill={`url(#s${uid})`} />
        <ellipse cx={100} cy={160} rx={22 * W} ry={30} fill="#fff" opacity={dark ? 0.08 : 0.22} />
        <BodyPattern look={look} W={W} sx={sx} accent={accent} accent2={accent2} white={white} uid={uid} />
      </g>

      {/* Paws */}
      {[-1, 1].map((s) => (
        <g key={s}>
          <ellipse cx={100 + s * 16 * W} cy={191} rx={13} ry={7.5} fill={pawColor} stroke={line} strokeOpacity={0.55} strokeWidth={2} />
          <path
            d={`M${100 + s * 16 * W - 3} 188 v5 M${100 + s * 16 * W + 3} 188 v5`}
            stroke={line}
            strokeOpacity={0.4}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Neck ruff for very fluffy cats */}
      {look.fluff === 2 && (
        <path
          d="M60 104 Q56 122 69 127 Q71 141 86 139 Q92 151 100 147 Q108 151 114 139 Q129 141 131 127 Q144 122 140 104 Z"
          fill={pointed ? coat : shade(coat, 0.18)}
          stroke={line}
          strokeOpacity={0.4}
          strokeWidth={1.8}
        />
      )}

      {/* Ears (behind the head) */}
      {earPts && (
        <g stroke={line} strokeOpacity={0.55} strokeWidth={2.2} strokeLinejoin="round">
          <polygon points={earPts.map((p) => p.join(",")).join(" ")} fill={earFill} />
          <polygon points={earPts.map((p) => p.join(",")).join(" ")} fill={earFillR} transform="matrix(-1 0 0 1 200 0)" />
          <g fill={look.hairless ? shade(PINK, 0.2) : PINK} stroke="none" opacity={0.85}>
            <polygon points={inner(earPts)} />
            <polygon points={inner(earPts)} transform="matrix(-1 0 0 1 200 0)" />
          </g>
          {look.ears === "tufted" && (
            <g stroke={accent} strokeWidth={2.4} strokeLinecap="round" strokeOpacity={0.9}>
              <path d="M62 23 L58 9 M62 23 L65 11" />
              <path d="M138 23 L142 9 M138 23 L135 11" />
            </g>
          )}
        </g>
      )}

      {/* Cheek tufts */}
      {look.fluff >= 1 && !look.hairless && (
        <g fill={look.face === "flat" ? shade(coat, 0.05) : coat} stroke={line} strokeOpacity={0.45} strokeWidth={1.8} strokeLinejoin="round">
          <path d="M60 78 L44 90 L57 93 L46 104 L62 103 L57 114 L74 108 Z" />
          {mirror("M60 78 L44 90 L57 93 L46 104 L62 103 L57 114 L74 108 Z")}
        </g>
      )}

      {/* Head */}
      <HeadShape face={look.face} fill={coat} stroke={line} strokeOpacity={0.55} strokeWidth={2.2} />
      <g clipPath={`url(#h${uid})`}>
        <HeadPattern look={look} f={f} accent={accent} accent2={accent2} white={white} uid={uid} />
      </g>

      {/* Folded ears sit on top of the head */}
      {look.ears === "folded" && (
        <g fill={coat} stroke={line} strokeOpacity={0.55} strokeWidth={2} strokeLinejoin="round">
          <path d="M64 60 Q62 40 86 44 Q93 46 89 55 Q78 62 64 60 Z" />
          {mirror("M64 60 Q62 40 86 44 Q93 46 89 55 Q78 62 64 60 Z")}
        </g>
      )}

      {/* Face */}
      <Eyes look={look} f={f} happy={happy} line={line} />
      <ellipse cx={100 - 31} cy={f.eyeY + 17} rx={7} ry={4} fill={PINK} opacity={dark ? 0.35 : 0.55} />
      <ellipse cx={100 + 31} cy={f.eyeY + 17} rx={7} ry={4} fill={PINK} opacity={dark ? 0.35 : 0.55} />
      <path d={`M${96} ${noseY} h8 l-4 5 z`} fill={look.hairless ? "#d98c95" : "#e98b9a"} stroke="#c56a79" strokeWidth={1} strokeLinejoin="round" />
      <path
        d={`M100 ${noseY + 5} q-3 6 -8 3 M100 ${noseY + 5} q3 6 8 3`}
        fill="none"
        stroke={line}
        strokeOpacity={0.75}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <g stroke={dark ? "#f5efe9" : OUTLINE} strokeOpacity={dark ? 0.6 : 0.35} strokeWidth={1.3} strokeLinecap="round">
        {(look.hairless
          ? ["M80 0 L60 -3", "M80 6 L60 8"]
          : ["M79 2 L47 -3", "M79 7 L45 9", "M80 12 L50 20"]
        ).map((d, i) => (
          <g key={i} transform={`translate(0 ${noseY})`}>
            <path d={d} />
            <path d={d} transform="matrix(-1 0 0 1 200 0)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Eyes({ look, f, happy, line }: { look: CatLook; f: (typeof FACE)[FaceShape]; happy?: boolean; line: string }) {
  if (happy) {
    return (
      <g fill="none" stroke={line} strokeWidth={2.6} strokeLinecap="round">
        <path d={`M${100 - f.eyeDX - 7} ${f.eyeY + 2} q7 -8 14 0`} />
        <path d={`M${100 + f.eyeDX - 7} ${f.eyeY + 2} q7 -8 14 0`} />
      </g>
    );
  }
  return (
    <g className="mascot-eyes">
      {[-1, 1].map((s) => {
        const cx = 100 + s * f.eyeDX;
        const iris = s === 1 && look.eyes2 ? look.eyes2 : look.eyes;
        const rot = f.almond ? -s * 12 : 0;
        return (
          <g key={s} transform={`rotate(${rot} ${cx} ${f.eyeY})`}>
            <ellipse cx={cx} cy={f.eyeY} rx={9.5} ry={f.ry} fill={iris} stroke={line} strokeOpacity={0.7} strokeWidth={1.6} />
            <ellipse cx={cx} cy={f.eyeY} rx={3} ry={f.ry - 2.5} fill="#2b2220" />
            <circle cx={cx + 2.6} cy={f.eyeY - 3} r={2.2} fill="#fff" />
          </g>
        );
      })}
    </g>
  );
}

interface PatternProps {
  look: CatLook;
  accent: string;
  accent2: string;
  white: string;
  uid: string;
}

function HeadPattern({ look, f, accent, accent2, white, uid }: PatternProps & { f: (typeof FACE)[FaceShape] }) {
  const p = look.pattern;
  return (
    <>
      {(p === "pointed" || p === "mitted" || p === "mink") && (
        <ellipse cx={100} cy={f.eyeY + 12} rx={40} ry={36} fill={`url(#m${uid})`} />
      )}
      {(p === "tabby" || p === "mackerel") && (
        <g stroke={accent} strokeWidth={p === "tabby" ? 4.5 : 3.5} strokeLinecap="round" fill="none" opacity={0.85}>
          <path d="M91 50 L93 64 M100 45 L100 62 M109 50 L107 64" />
          <path d="M52 84 Q63 82 71 89 M54 96 Q63 95 71 100" />
          <path d="M148 84 Q137 82 129 89 M146 96 Q137 95 129 100" />
        </g>
      )}
      {p === "spotted" && (
        <g fill={accent} opacity={0.85}>
          {[[90, 56], [100, 51], [110, 56], [94, 65], [106, 65], [64, 92], [136, 92]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.8} />
          ))}
        </g>
      )}
      {p === "ticked" && (
        <>
          <rect x="40" y="30" width="120" height="110" fill={`url(#t${uid})`} />
          <path d="M93 50 L95 62 M100 46 L100 60 M107 50 L105 62" stroke={accent} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
        </>
      )}
      {p === "calico" && (
        <>
          <ellipse cx={70} cy={58} rx={24} ry={20} fill={accent} />
          <ellipse cx={128} cy={66} rx={18} ry={15} fill={accent2} />
        </>
      )}
      {p === "tortie" && (
        <g>
          <ellipse cx={74} cy={68} rx={15} ry={12} fill={accent} opacity={0.9} />
          <ellipse cx={122} cy={56} rx={12} ry={9} fill={accent2} opacity={0.9} />
          <ellipse cx={116} cy={100} rx={10} ry={7} fill={accent} opacity={0.85} />
          <ellipse cx={84} cy={110} rx={7} ry={5} fill={accent2} opacity={0.85} />
        </g>
      )}
      {(p === "bicolor" || p === "mitted" || p === "calico") && (
        <ellipse cx={100} cy={f.eyeY + 26} rx={p === "mitted" ? 14 : 22} ry={p === "mitted" ? 10 : 18} fill={white} opacity={p === "mitted" ? 0.6 : 1} />
      )}
      {p === "bicolor" && <path d={`M96 ${f.eyeY + 12} L100 ${f.eyeY - 22} L104 ${f.eyeY + 12} Z`} fill={white} />}
      {look.hairless && (
        <g fill="none" stroke={shade(look.coat, -0.22)} strokeWidth={1.6} strokeLinecap="round" opacity={0.8}>
          <path d="M84 57 q16 -7 32 0 M87 64 q13 -5 26 0 M91 70 q9 -3 18 0" />
        </g>
      )}
      {look.curly && (
        <path d="M70 52 q5 -5 10 0 t10 0 t10 0 t10 0 t10 0 t10 0" fill="none" stroke={shade(look.coat, -0.2)} strokeWidth={2} opacity={0.7} />
      )}
    </>
  );
}

function BodyPattern({ look, W, sx, accent, accent2, white, uid }: PatternProps & { W: number; sx: (x: number) => number }) {
  const p = look.pattern;
  return (
    <>
      {(p === "tabby" || p === "mackerel") && (
        <g stroke={accent} strokeWidth={p === "tabby" ? 6 : 4} strokeLinecap="round" fill="none" opacity={0.8}>
          {[126, 141, 156, 171, 186].map((y) => (
            <g key={y}>
              <path d={`M${100 - 52 * W} ${y} Q${100 - 34 * W} ${y - 7} ${100 - 20 * W} ${y + 3}`} />
              <path d={`M${100 + 52 * W} ${y} Q${100 + 34 * W} ${y - 7} ${100 + 20 * W} ${y + 3}`} />
            </g>
          ))}
        </g>
      )}
      {p === "spotted" && (
        <g>
          {[[70, 140], [90, 127], [116, 131], [133, 150], [68, 166], [96, 150], [122, 172], [84, 182], [141, 176], [108, 186], [58, 186]].map(
            ([x, y], i) => (
              <g key={i}>
                <ellipse cx={sx(x)} cy={y} rx={6.5} ry={5.2} fill={accent} opacity={0.88} />
                <ellipse cx={sx(x) + 0.5} cy={y} rx={3} ry={2.3} fill={shade(look.coat, -0.12)} />
              </g>
            ),
          )}
        </g>
      )}
      {p === "ticked" && <rect x="0" y="100" width="200" height="100" fill={`url(#t${uid})`} />}
      {p === "calico" && (
        <>
          <ellipse cx={sx(76)} cy={150} rx={24} ry={19} fill={accent} />
          <ellipse cx={sx(128)} cy={172} rx={20} ry={16} fill={accent2} />
          <ellipse cx={sx(122)} cy={130} rx={14} ry={10} fill={accent} />
        </>
      )}
      {p === "tortie" && (
        <g opacity={0.9}>
          {[[72, 140, 14, accent], [118, 132, 12, accent2], [130, 166, 15, accent], [86, 172, 13, accent2], [104, 152, 9, accent], [64, 184, 10, accent]].map(
            ([x, y, r, c], i) => (
              <ellipse key={i} cx={sx(x as number)} cy={y as number} rx={r as number} ry={(r as number) * 0.8} fill={c as string} />
            ),
          )}
        </g>
      )}
      {(p === "bicolor" || p === "mitted") && <ellipse cx={100} cy={150} rx={22 * W} ry={40} fill={white} />}
      {look.curly && (
        <g fill="none" stroke={shade(look.coat, look.pattern === "bicolor" ? 0.25 : -0.18)} strokeWidth={2} opacity={0.6}>
          {[124, 140, 156, 172].map((y) => (
            <path key={y} d={`M${100 - 50 * W} ${y} q6 -6 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0`} />
          ))}
        </g>
      )}
      {look.hairless && (
        <path
          d="M84 118 q16 6 32 0 M88 126 q12 4 24 0"
          fill="none"
          stroke={shade(look.coat, -0.22)}
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.75}
        />
      )}
    </>
  );
}
