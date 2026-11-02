import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { GamePage } from "@/components/games/GamePage";
import { DreamCatBuilder } from "@/components/games/DreamCatBuilder";

export const metadata: Metadata = pageMeta({
  title: "Build Your Dream Cat",
  description: "Design a fictional cat: pick coat color, pattern, eye color, fluffiness and personality traits.",
  path: "/games/dream-cat",
});

export default function Page() {
  return (
    <GamePage title="Build Your Dream Cat" intro="Mix and match coats, eyes and personality to design your one-of-a-kind cat." pose="celebrate" tint="bg-clay-100">
      <DreamCatBuilder />
    </GamePage>
  );
}
