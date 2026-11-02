import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = pageMeta({ title: "Terms of Use", description: `Terms for using ${site.name}.`, path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="October 28, 2026">
      <p>By using {site.name}, you agree to these simple terms.</p>
      <h2>Educational content only</h2>
      <p>
        Our breed, care and health content is general information for education and enjoyment. It is not veterinary advice and does not replace an examination or
        consultation with a qualified veterinarian. Always seek veterinary advice about your own cat&apos;s health.
      </p>
      <h2>Breed information</h2>
      <p>
        Breed descriptions reflect typical tendencies reported by registries and veterinary sources. Individual cats vary, and no breed is guaranteed to have a
        particular personality, health status or care needs.
      </p>
      <h2>Quiz and games</h2>
      <p>The matching quiz and games are for fun. Match percentages are playful scores based on your answers, not scientific assessments.</p>
      <h2>Illustrations and content</h2>
      <p>Illustrations and written content are original to {site.name}. Please don&apos;t reproduce them commercially without permission.</p>
      <h2>Changes</h2>
      <p>We may update these terms as the site grows. The date above shows the latest version.</p>
    </LegalPage>
  );
}
