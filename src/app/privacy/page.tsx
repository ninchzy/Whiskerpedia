import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = pageMeta({ title: "Privacy", description: `How ${site.name} handles your data.`, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="October 28, 2026">
      <p>
        {site.name} is designed to work without accounts, sign-ups or tracking. We don&apos;t ask for your name, email or any personal information to use the site.
      </p>
      <h2>What is stored on your device</h2>
      <p>Some features remember your choices using your browser&apos;s local storage. This data never leaves your device and isn&apos;t sent to us:</p>
      <ul>
        <li>Favorite breeds, facts and care guides</li>
        <li>New cat checklist progress</li>
        <li>Your saved dream cat</li>
        <li>Whether you&apos;ve hidden the {site.mascotName} mascot</li>
      </ul>
      <p>You can remove this data at any time by clearing favorites on the favorites page, resetting the checklist, or clearing site data in your browser settings.</p>
      <h2>Cookies and analytics</h2>
      <p>We don&apos;t use advertising cookies, analytics or third-party trackers.</p>
      <h2>External links</h2>
      <p>We link to veterinary, scientific and registry websites for further reading. Those sites have their own privacy policies.</p>
      <h2>Sharing</h2>
      <p>When you share a quiz result, your device&apos;s share sheet or clipboard is used. We don&apos;t see what you share or with whom.</p>
    </LegalPage>
  );
}
