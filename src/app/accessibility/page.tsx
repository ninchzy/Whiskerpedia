import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = pageMeta({ title: "Accessibility", description: `Accessibility at ${site.name}.`, path: "/accessibility" });

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" updated="October 28, 2026">
      <p>We want every cat lover to enjoy {site.name}. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>
      <h2>What we&apos;ve built in</h2>
      <ul>
        <li>Semantic headings, landmarks and a &ldquo;Skip to content&rdquo; link</li>
        <li>Full keyboard support, including search suggestions, filters, the quiz and games</li>
        <li>Visible focus indicators on every interactive element</li>
        <li>Text alternatives for meaningful illustrations; trait ratings always include a text label</li>
        <li>Color contrast checked for text and controls</li>
        <li>Animations that respect your device&apos;s &ldquo;reduce motion&rdquo; setting</li>
        <li>Layouts that adapt to phones, tablets and desktops, and to zoom up to 200%</li>
        <li>An option to hide the floating {site.mascotName} mascot</li>
      </ul>
      <h2>Known limitations</h2>
      <p>The breed comparison table can scroll sideways on very narrow screens when three breeds are selected.</p>
      <h2>Feedback</h2>
      <p>If something doesn&apos;t work for you, we&apos;d love to know so we can fix it. A contact channel is coming soon.</p>
    </LegalPage>
  );
}
