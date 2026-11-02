import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { GamePage } from "@/components/games/GamePage";
import { PersonalityGenerator } from "@/components/games/PersonalityGenerator";

export const metadata: Metadata = pageMeta({
  title: "Cat Personality Generator",
  description: "Answer four playful questions and get a cute, fictional cat personality card.",
  path: "/games/personality",
});

export default function Page() {
  return (
    <GamePage title="Cat Personality Generator" intro="Every cat has a story. Let's write yours, with paw-rated personality traits." pose="happy" tint="bg-butter-100">
      <PersonalityGenerator />
    </GamePage>
  );
}
