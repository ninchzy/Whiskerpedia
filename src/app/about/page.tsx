import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/config/site";
import { SRC } from "@/data/sources";
import { breeds } from "@/data/breeds";
import { facts } from "@/data/facts";
import { careGuides } from "@/data/care";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { MascotArt, type MascotPose } from "@/components/mascot/MascotArt";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: `About ${site.name}: our mission, how we source content, how the matching quiz works, and meet ${site.mascotName} the mascot.`,
  path: "/about",
});

const poses: MascotPose[] = ["wave", "curious", "surprised", "reading", "sign", "celebrate", "sleeping"];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={`About ${site.name}`} title="A Cosy Corner of the Internet for Cats" pose="wave" tint="bg-butter-100">
        <p>
          {site.name} is an illustrated cat encyclopedia made for curious people, future adopters and lifelong cat lovers. We want learning about cats to be delightful —
          and accurate.
        </p>
      </PageHero>

      <section className="container-page mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-semibold">What you&apos;ll find here</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                [`${breeds.length} breed profiles`, "/breeds"],
                [`${facts.length} fact-checked facts`, "/facts"],
                [`${careGuides.length} care guides`, "/care"],
                ["A matching quiz", "/quiz"],
                ["Six games & tools", "/games"],
                ["A new-cat checklist", "/care/checklist"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="card card-hover flex items-center justify-between p-4 font-display font-semibold">
                    {label} <Icon name="chevron-right" className="h-5 w-5 text-clay-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">How we handle facts</h2>
            <div className="prose-cat mt-4">
              <p>
                Breed information is drawn from registry descriptions and veterinary sources. Health notes list conditions with published breed associations, and we
                link to genetics laboratories and veterinary organisations so you can read more. Every fact card carries an evidence label —{" "}
                <em>well established</em>, <em>supported by research</em> or <em>leading theory</em> — and many link to the original study.
              </p>
              <p>
                Our care and health content is educational only and never a diagnosis. If you&apos;re concerned about your cat, please contact your veterinarian. We
                don&apos;t recommend medications or home remedies.
              </p>
              <p>
                Breed traits describe tendencies, not guarantees. Individual cats vary enormously, and many wonderful cats are mixed breeds waiting in shelters.
              </p>
            </div>
          </div>

          <div id="quiz-method">
            <h2 className="text-3xl font-semibold">How the matching quiz works</h2>
            <div className="prose-cat mt-4">
              <p>
                Each answer adds soft, weighted preferences on traits like energy, affection, grooming time, chattiness, space and household members. Every breed&apos;s
                typical traits are scored against those preferences and combined into a weighted average. The percentage is a playful compatibility score — not a
                scientific measure. No single answer can exclude a breed, and we never recommend Scottish Folds because of the welfare issues linked to the ear fold.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Our main references</h2>
            <ul className="mt-4 space-y-2">
              {Object.values(SRC).map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-clay-700 underline underline-offset-2">
                    {s.label} <Icon name="external" className="h-3.5 w-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold">Images</h2>
            <p className="prose-cat mt-4">
              Breed photos come from Wikimedia Commons, and each breed page credits the photographer and license. {site.mascotName}, the Cat of the Day, the
              personality cards, the dream cat builder and each breed&apos;s alternate portrait are original illustrations. Real cats come in many more colors and
              patterns than any single picture can show.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-pink-100 p-6">
            <h2 className="text-2xl font-semibold">Meet {site.mascotName}</h2>
            <p className="mt-2 text-ink-soft">
              A small, fluffy cream kitten with a pink bow and big opinions about naps. {site.mascotName} is your guide around the site — tap the floating kitten in the
              corner for tips.
            </p>
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {poses.map((p) => (
                <li key={p} className="rounded-2xl bg-cream-50 p-2">
                  <MascotArt pose={p} signText="Hi!" className="mascot w-full" />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
