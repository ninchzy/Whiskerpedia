import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { QuizGame } from "@/components/quiz/QuizGame";

export const metadata: Metadata = pageMeta({
  title: "Find Your Purrfect Match",
  description: "A playful 8-question quiz that matches your lifestyle with cat breed tendencies — and explains grooming, activity and other commitments.",
  path: "/quiz",
});

export default function QuizPage() {
  return (
    <section className="container-page min-h-[calc(100svh-4rem)] pt-6 sm:min-h-[calc(100svh-5rem)] sm:pt-10">
      <QuizGame />
    </section>
  );
}
