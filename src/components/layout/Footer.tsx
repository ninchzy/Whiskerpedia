import Link from "next/link";
import { site } from "@/config/site";
import { WavyDivider } from "@/components/ui/Decor";
import { PawPrint } from "@/components/illustrations/Doodle";
import { MascotArt } from "@/components/mascot/MascotArt";
import { LogoMark } from "./Logo";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/breeds", label: "Cat breeds" },
      { href: "/compare", label: "Compare breeds" },
      { href: "/facts", label: "Cat facts" },
      { href: "/favorites", label: "My favorites" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/care", label: "Care library" },
      { href: "/care/checklist", label: "New cat checklist" },
      { href: "/care/when-to-call-the-vet", label: "When to call the vet" },
      { href: "/care/body-language", label: "Cat body language" },
    ],
  },
  {
    title: "Play",
    links: [
      { href: "/quiz", label: "Find your match" },
      { href: "/games", label: "All games" },
      { href: "/games/dream-cat", label: "Build your dream cat" },
      { href: "/games/trivia", label: "Trivia challenge" },
    ],
  },
  {
    title: site.name,
    links: [
      { href: "/about", label: "About & sources" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="no-print mt-24">
      <WavyDivider color="var(--color-clay-600)" />
      <div className="bg-clay-600 text-cream-50">
        <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <LogoMark className="h-10 w-10" />
              <span className="font-display text-2xl font-semibold text-cream-50">{site.name}</span>
            </div>
            <p className="mt-4 leading-relaxed text-cream-100">
              {site.description} Made with love (and a lot of paw prints) for cat people everywhere.
            </p>
            <p className="mt-5 text-sm text-cream-100">
              Our health content is educational only. Always ask your veterinarian about your own cat.
            </p>
            <div className="mt-6 flex items-end gap-3">
              <MascotArt pose="sleeping" className="h-20 w-20" />
              <p className="hand pb-3 text-cream-50">psst… Mochi is napping</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-display text-lg font-semibold text-cream-50">{col.title}</h2>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-cream-100 underline-offset-4 hover:text-white hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="border-t border-cream-50/15">
          <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-sm text-cream-100 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {site.name}. Illustrations are original; breed photos via{" "}
              <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
                Wikimedia Commons
              </a>
              .
            </p>
            <p className="flex items-center gap-2">
              <PawPrint className="h-4 w-4" /> Social channels coming soon — we&apos;re still teaching Mochi to type.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
