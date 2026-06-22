"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { CAROUSEL_SPRING } from "@/lib/motion/transitions";

type Props = {
  children: ReactNode[];
};

export default function HorizontalCarousel({ children }: Props) {
  const [active, setActive] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalSlides = children.length;

  const isFirst = active === 0;
  const isLast = active === totalSlides - 1;

  const scrollToItem = useCallback((index: number) => {
    const target = itemRefs.current[index];

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    setActive(index);
  }, []);

  const next = useCallback(() => {
    if (!isLast) {
      scrollToItem(active + 1);
    }
  }, [active, isLast, scrollToItem]);

  const prev = useCallback(() => {
    if (!isFirst) {
      scrollToItem(active - 1);
    }
  }, [active, isFirst, scrollToItem]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const center = container.scrollLeft + container.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const itemCenter = item.offsetLeft + item.offsetWidth / 2;

        const distance = Math.abs(center - itemCenter);

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

  if (!children.length) return null;

  const navButtonClass = `absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300`;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        {/* Previous */}
        <motion.button
          whileTap={!isFirst ? { scale: 0.92 } : undefined}
          whileHover={!isFirst ? { scale: 1.05 } : undefined}
          onClick={prev}
          disabled={isFirst}
          aria-label="Previous slide"
          className={`
            ${navButtonClass}
            left-2 md:left-4
            ${
              isFirst
                ? `cursor-not-allowed border-white/5 bg-white/3`
                : `border-white/10 bg-black/40 hover:bg-black/60`
            }
          `}
        >
          <ChevronLeft
            size={18}
            className={isFirst ? "text-white/20" : "text-white/80"}
          />
        </motion.button>

        {/* Next */}
        <motion.button
          whileTap={!isLast ? { scale: 0.92 } : undefined}
          whileHover={!isLast ? { scale: 1.05 } : undefined}
          onClick={next}
          disabled={isLast}
          aria-label="Next slide"
          className={`
            ${navButtonClass}
            right-2 md:right-4
            ${
              isLast
                ? `cursor-not-allowed border-white/5 bg-white/[0.03]`
                : `border-white/10 bg-black/40 hover:bg-black/60`
            }
          `}
        >
          <ChevronRight
            size={18}
            className={isLast ? "text-white/20" : "text-white/80"}
          />
        </motion.button>

        {/* Track */}
        <div
          ref={containerRef}
          style={{
            touchAction: "pan-x",
          }}
          className="scrollbar-hidden flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth px-[10%] md:px-[12%]"
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              animate={{
                scale: active === index ? 1 : 0.96,
                opacity: active === index ? 1 : 0.75,
              }}
              transition={CAROUSEL_SPRING}
              className="flex w-full shrink-0 snap-center justify-center py-2"
            >
              {child}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-8 flex justify-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToItem(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="flex items-center"
          >
            <motion.div
              animate={{
                width: active === index ? 22 : 6,
                opacity: active === index ? 1 : 0.3,
              }}
              transition={CAROUSEL_SPRING}
              className="h-1.5 rounded-full bg-white"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
