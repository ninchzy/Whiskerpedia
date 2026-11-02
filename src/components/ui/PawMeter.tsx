import { PawPrint } from "@/components/illustrations/Doodle";
import { levelWord } from "@/lib/levels";

/**
 * Five-paw indicator, as on the stationery card reference. The level word is
 * always rendered as text so the meaning never depends on the paws alone.
 */
export function PawMeter({
  value,
  label,
  variant = "pill",
  showWord = true,
}: {
  value: number;
  label: string;
  variant?: "pill" | "plain";
  showWord?: boolean;
}) {
  const word = levelWord(value);
  return (
    <div className="flex items-center gap-3" role="img" aria-label={`${label}: ${word} (${value} of 5 paws)`}>
      <span
        className={
          variant === "pill"
            ? "inline-flex items-center gap-1 rounded-full bg-clay-500 px-3 py-1.5 shadow-[inset_0_-2px_0_rgb(0_0_0/0.12)]"
            : "inline-flex items-center gap-0.5"
        }
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <PawPrint
            key={i}
            className={`h-4 w-4 ${
              variant === "pill" ? (i <= value ? "text-cream-50" : "text-clay-700/70") : i <= value ? "text-clay-500" : "text-cream-300"
            }`}
          />
        ))}
      </span>
      {showWord && <span className="text-sm font-semibold text-ink-soft capitalize">{word}</span>}
    </div>
  );
}
