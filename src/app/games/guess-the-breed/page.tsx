import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { GamePage } from "@/components/games/GamePage";
import { GuessTheBreed } from "@/components/games/GuessTheBreed";

export const metadata: Metadata = pageMeta({
  title: "Guess the Breed",
  description: "A cat-spotting game: study the photo and pick the right breed from four options.",
  path: "/games/guess-the-breed",
});

export default function Page() {
  return (
    <GamePage title="Guess the Breed" intro="Ears, coat, eyes, face shape — every detail is a clue." pose="curious" tint="bg-pink-100">
      <GuessTheBreed />
    </GamePage>
  );
}
