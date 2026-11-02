import { MascotArt } from "@/components/mascot/MascotArt";

/** Loading state: a tiny sleeping kitten. */
export function SleepingLoader({ label = "Loading…", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 py-8 text-ink-soft ${className}`} role="status">
      <MascotArt pose="sleeping" className="h-24 w-24" title="" />
      <span className="font-display text-sm">{label}</span>
    </div>
  );
}
