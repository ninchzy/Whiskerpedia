import Link from "next/link";
import { site } from "@/config/site";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M8 22 L9 5 L21 13 Q24 12.4 27 13 L39 5 L40 22 Q44 38 24 42 Q4 38 8 22 Z" fill="#fff3df" stroke="#4a3b35" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M12 16 L12.5 9.5 L18 13 Z M36 16 L35.5 9.5 L30 13 Z" fill="#f3a6b4" />
      <path d="M15 25 q3 -3 6 0 M27 25 q3 -3 6 0" fill="none" stroke="#4a3b35" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M22 29 h4 l-2 2.4 z" fill="#e98b9a" />
      <ellipse cx="13.5" cy="31" rx="3" ry="1.8" fill="#f3a6b4" />
      <ellipse cx="34.5" cy="31" rx="3" ry="1.8" fill="#f3a6b4" />
      <path d="M24 38 L17 34 L18 42 Z M24 38 L31 34 L30 42 Z" fill="#f3a6b4" stroke="#4a3b35" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2 rounded-full pr-2" aria-label={`${site.name} home`}>
      <span className="transition-transform group-hover:rotate-[-8deg]">
        <LogoMark />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {site.name.slice(0, 7)}
        <span className="text-clay-500">{site.name.slice(7)}</span>
      </span>
    </Link>
  );
}
