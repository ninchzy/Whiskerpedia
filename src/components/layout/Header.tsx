"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { PawPrint } from "@/components/illustrations/Doodle";
import { SearchBox } from "@/components/search/SearchBox";
import { useFavorites } from "@/components/favorites/FavoritesProvider";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, ready } = useFavorites();
  const searchPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (searchOpen && searchPanel.current && !searchPanel.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen, searchOpen]);

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`no-print sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-cream-100/90 shadow-[0_6px_20px_-14px_rgb(122_70_48/0.45)] backdrop-blur-md" : "bg-cream-100"
      }`}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-clay-600 px-4 py-2 font-bold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.slice(1).map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 font-display text-[0.95rem] font-medium transition-colors ${
                      active ? "bg-pink-100 text-clay-700" : "text-ink-soft hover:bg-cream-200 hover:text-ink"
                    }`}
                  >
                    {active && <PawPrint className="h-3.5 w-3.5 text-clay-500" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink"
            aria-label="Search"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => {
              setSearchOpen((o) => !o);
              setMenuOpen(false);
            }}
          >
            <Icon name="search" />
          </button>
          <Link
            href="/favorites"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-pink-50 hover:text-pink-600"
            aria-label={`Favorites${ready && count ? `, ${count} saved` : ""}`}
            aria-current={pathname === "/favorites" ? "page" : undefined}
          >
            <Icon name="heart" filled={pathname === "/favorites"} />
            {ready && count > 0 && (
              <span className="absolute top-1 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-600 px-1 text-[0.7rem] font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-200 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setMenuOpen((o) => !o);
              setSearchOpen(false);
            }}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div ref={searchPanel} id="site-search" className="container-page relative pb-4">
          <div className="ml-auto max-w-xl">
            <SearchBox autoFocus onNavigate={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-cream-100 px-4 pt-4 pb-10 sm:top-20 lg:hidden"
        >
          <ul className="mx-auto flex max-w-md flex-col gap-2">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${i * 35}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-3xl px-5 py-4 font-display text-xl font-medium ${
                      active ? "bg-pink-100 text-clay-700" : "bg-cream-50 text-ink"
                    }`}
                  >
                    {item.label}
                    {active ? <PawPrint className="h-5 w-5 text-clay-500" /> : <Icon name="chevron-right" className="h-5 w-5 text-ink-faint" />}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2">
              <Link href="/favorites" className="flex items-center gap-3 rounded-3xl bg-cream-50 px-5 py-4 font-display text-lg">
                <Icon name="heart" className="h-5 w-5 text-pink-600" /> My favorites {ready && count > 0 && `(${count})`}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
