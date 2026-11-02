"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

/** Horizontally scrolling, snap-aligned list with previous/next buttons. Native scroll still works by touch and keyboard. */
export function Carousel({ children, label }: { children: ReactNode[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={ref}
        onScroll={update}
        tabIndex={0}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pt-2 pb-6 focus-visible:outline-offset-[-3px]"
      >
        {children.map((child, i) => (
          <li key={i} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]">
            {child}
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} disabled={atStart} className="btn btn-soft btn-sm h-11 w-11 !px-0" aria-label="Previous breeds">
          <Icon name="chevron-left" />
        </button>
        <button type="button" onClick={() => scroll(1)} disabled={atEnd} className="btn btn-soft btn-sm h-11 w-11 !px-0" aria-label="Next breeds">
          <Icon name="chevron-right" />
        </button>
      </div>
    </div>
  );
}
