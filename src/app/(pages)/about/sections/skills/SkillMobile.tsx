"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { SkillCategory } from "@/types/skills";

import { SkillCard } from "./SkillCard";

type Props = {
  categories: SkillCategory[];
};

export function SkillsMobile({ categories }: Props) {
  const [active, setActive] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToCard = (index: number) => {
    const target = cardRefs.current[index];

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    setActive(index);
  };

  const next = () => {
    if (active < categories.length - 1) {
      scrollToCard(active + 1);
    }
  };

  const prev = () => {
    if (active > 0) {
      scrollToCard(active - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const center = container.scrollLeft + container.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const cardCenter = card.offsetLeft + card.offsetWidth / 2;

        const distance = Math.abs(center - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActive(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="lg:hidden">
      <div className="relative">
        <button
          onClick={prev}
          disabled={active === 0}
          className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-white/10 disabled:opacity-0"
        >
          <ChevronLeft size={18} className="text-white/80" />
        </button>

        <button
          onClick={next}
          disabled={active === categories.length - 1}
          className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-white/10 disabled:opacity-0"
        >
          <ChevronRight size={18} className="text-white/80" />
        </button>

        <div
          ref={containerRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-8 scrollbar-hide"
        >
          {categories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`flex w-full shrink-0 snap-center justify-center transition-all duration-500 ${
                active === index
                  ? "scale-100 opacity-100"
                  : "scale-[0.96] opacity-60"
              }`}
            >
              <SkillCard category={category} mobile />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`rounded-full transition-all duration-300 ${
                active === index
                  ? "h-1.5 w-6 bg-white"
                  : "h-1.5 w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
