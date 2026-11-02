import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";
import type { MascotPose } from "@/components/mascot/MascotArt";

export const GAME_AREA_ID = "game-area";

/**
 * Layout for game pages: a slim banner, then a play area at least one screen
 * tall so the footer never crowds the game.
 */
export function GamePage({ title, intro, pose, tint, children }: { title: string; intro: string; pose: MascotPose; tint: string; children: ReactNode }) {
  return (
    <div className="min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)]">
      <PageHero compact eyebrow="Fun & games" title={title} pose={pose} tint={tint}>
        <p>{intro}</p>
      </PageHero>
      <section id={GAME_AREA_ID} className="container-page mt-6 scroll-mt-20 pb-8 sm:scroll-mt-24" aria-label={`${title} game`}>
        {children}
      </section>
    </div>
  );
}
