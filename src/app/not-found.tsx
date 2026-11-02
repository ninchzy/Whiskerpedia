import Link from "next/link";
import { MascotArt } from "@/components/mascot/MascotArt";

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-20 text-center">
      <MascotArt pose="surprised" className="h-48 w-48" />
      <p className="eyebrow mt-6">404 · Page not found</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">This page wandered off</h1>
      <p className="mt-3 max-w-md text-lg text-ink-soft">Like a cat at bath time, this page is nowhere to be found. Let&apos;s get you somewhere cosy.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Go home
        </Link>
        <Link href="/breeds" className="btn btn-secondary">
          Explore breeds
        </Link>
        <Link href="/search" className="btn btn-soft">
          Search
        </Link>
      </div>
    </section>
  );
}
