"use client";

import { ReactNode, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { CAROUSEL_SPRING } from "@/lib/motion/transitions";

type Props = {
  children: ReactNode[];
};

export default function HorizontalCarousel({ children }: Props) {
  const [active, setActive] = useState(0);

  const totalSlides = children.length;

  const isFirst = active === 0;
  const isLast = active === totalSlides - 1;

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides) return;
      setActive(index);
    },
    [totalSlides]
  );

  const prev = useCallback(() => {
    setActive((current) => Math.max(0, current - 1));
  }, []);

  const next = useCallback(() => {
    setActive((current) => Math.min(totalSlides - 1, current + 1));
  }, [totalSlides]);

  if (!totalSlides) return null;

  const navButtonClass =
    "absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300";

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
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
                ? "cursor-not-allowed border-white/5 bg-white/3"
                : "border-white/10 bg-black/40 hover:bg-black/60"
            }
          `}
        >
          <ChevronLeft
            size={18}
            className={isFirst ? "text-white/20" : "text-white/80"}
          />
        </motion.button>

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
                ? "cursor-not-allowed border-white/5 bg-white/3"
                : "border-white/10 bg-black/40 hover:bg-black/60"
            }
          `}
        >
          <ChevronRight
            size={18}
            className={isLast ? "text-white/20" : "text-white/80"}
          />
        </motion.button>

        <motion.div
          animate={{
            x: `-${active * 100}%`,
          }}
          transition={CAROUSEL_SPRING}
          className="flex"
        >
          {children.map((child, index) => (
            <div key={index} className="w-full shrink-0 px-2 py-2">
              <motion.div
                animate={{
                  scale: active === index ? 1 : 0.96,
                  opacity: active === index ? 1 : 0.75,
                }}
                transition={CAROUSEL_SPRING}
                className="flex justify-center"
              >
                {child}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
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
