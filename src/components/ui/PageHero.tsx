import type { ReactNode } from "react";
import { MascotArt, type MascotPose } from "@/components/mascot/MascotArt";
import { PawPrint } from "@/components/illustrations/Doodle";

export function PageHero({
  eyebrow,
  title,
  children,
  pose = "happy",
  tint = "bg-pink-100",
  note,
  signText,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  pose?: MascotPose;
  tint?: string;
  note?: string;
  signText?: string;
  /** Slim banner for pages where the main content (e.g. a game) should sit high on screen. */
  compact?: boolean;
}) {
  if (compact) {
    return (
      <section className="container-page pt-4 sm:pt-6">
        <div className={`relative flex items-center gap-5 overflow-hidden rounded-[1.75rem] ${tint} px-6 py-5 sm:px-8`}>
          <MascotArt pose={pose} signText={signText} className="mascot hidden h-20 w-20 shrink-0 sm:block" />
          <div className="min-w-0">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-1 text-3xl leading-tight font-semibold sm:text-4xl">{title}</h1>
            {children && <div className="mt-1 text-ink-soft">{children}</div>}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="container-page pt-6 sm:pt-10">
      <div className={`relative overflow-hidden rounded-[2.25rem] ${tint} px-6 py-10 sm:px-12 sm:py-14`}>
        <PawPrint className="absolute top-6 right-[38%] hidden h-6 w-6 rotate-12 text-clay-400/30 sm:block" />
        <PawPrint className="absolute bottom-8 left-[46%] hidden h-5 w-5 -rotate-12 text-clay-400/30 sm:block" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h1 className="text-4xl leading-[1.08] font-semibold sm:text-5xl">{title}</h1>
            {children && <div className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{children}</div>}
          </div>
          <div className="relative mx-auto hidden w-48 md:block lg:w-56">
            <MascotArt pose={pose} signText={signText} className="mascot w-full drop-shadow-sm" />
            {note && <p className="hand absolute -top-2 -left-16 max-w-[9rem] -rotate-6 text-clay-700">{note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
