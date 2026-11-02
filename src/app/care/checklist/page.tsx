import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { CareChecklist } from "@/components/care/CareChecklist";

export const metadata: Metadata = pageMeta({
  title: "New Cat Checklist",
  description: "An interactive checklist for new cat owners: home preparation, supplies, vet visits and first-week essentials.",
  path: "/care/checklist",
});

export default function ChecklistPage() {
  return (
    <>
      <PageHero eyebrow="Cat care checklist" title="Ready for Your New Cat?" pose="sign" signText="Ready?" tint="bg-sage-100">
        <p>Tick things off as you go. Your progress is saved on this device, so you can come back any time.</p>
      </PageHero>
      <section className="container-page mt-10">
        <CareChecklist />
      </section>
    </>
  );
}
