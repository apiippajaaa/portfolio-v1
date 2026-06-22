"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { CAROUSEL_SPRING } from "@/lib/motion/transitions";
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

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="lg:hidden">
      <div className="relative">
        <div className="mx-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={prev}
            disabled={active === 0}
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft size={18} className="text-white/80" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={next}
            disabled={active === categories.length - 1}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight size={18} className="text-white/80" />
          </motion.button>
        </div>

        <div
          ref={containerRef}
          className="scrollbar-hidden flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              animate={{
                scale: active === index ? 1 : 0.96,
                opacity: active === index ? 1 : 0.6,
              }}
              transition={CAROUSEL_SPRING}
              className="flex w-full shrink-0 snap-center justify-center"
            >
              <SkillCard category={category} mobile />
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className="relative h-2"
            >
              <motion.div
                animate={{
                  width: active === index ? 24 : 6,
                  opacity: active === index ? 1 : 0.35,
                }}
                transition={CAROUSEL_SPRING}
                className="h-1.5 rounded-full bg-white"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
