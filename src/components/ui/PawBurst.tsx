import { PawPrint } from "@/components/illustrations/Doodle";

const paws = [
  { left: "8%", delay: "0s", r: "-20deg", color: "text-pink-300" },
  { left: "22%", delay: "0.25s", r: "15deg", color: "text-butter-300" },
  { left: "40%", delay: "0.1s", r: "-8deg", color: "text-clay-300" },
  { left: "58%", delay: "0.35s", r: "22deg", color: "text-lavender-200" },
  { left: "74%", delay: "0.15s", r: "-14deg", color: "text-pink-300" },
  { left: "88%", delay: "0.4s", r: "10deg", color: "text-sage-200" },
];

/** Little paw prints that float up when something is completed. */
export function PawBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {paws.map((p, i) => (
        <span
          key={i}
          className={`absolute bottom-4 ${p.color}`}
          style={{ left: p.left, animation: `paw-trail 2.2s ease-out ${p.delay} 2 both`, ["--r" as string]: p.r }}
        >
          <PawPrint className="h-6 w-6" />
        </span>
      ))}
    </div>
  );
}
