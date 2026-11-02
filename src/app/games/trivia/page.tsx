import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { GamePage } from "@/components/games/GamePage";
import { TriviaGame } from "@/components/games/TriviaGame";

export const metadata: Metadata = pageMeta({
  title: "Cat Trivia Challenge",
  description: "Ten cat trivia questions with explanations. How much do you know about felines?",
  path: "/games/trivia",
});

export default function Page() {
  return (
    <GamePage title="Cat Trivia Challenge" intro="Ten questions, one score, plenty of fun facts along the way." pose="reading" tint="bg-sage-100">
      <TriviaGame />
    </GamePage>
  );
}
