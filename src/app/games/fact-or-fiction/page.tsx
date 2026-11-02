import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { GamePage } from "@/components/games/GamePage";
import { FactOrFictionGame } from "@/components/games/FactOrFictionGame";

export const metadata: Metadata = pageMeta({
  title: "Cat Fact or Fiction",
  description: "Do cats always land on their feet? Test your cat knowledge in this true-or-false game.",
  path: "/games/fact-or-fiction",
});

export default function Page() {
  return (
    <GamePage title="Cat Fact or Fiction" intro="Cat myths are everywhere. Can you tell them apart from the real science?" pose="surprised" tint="bg-lavender-100">
      <FactOrFictionGame />
    </GamePage>
  );
}
