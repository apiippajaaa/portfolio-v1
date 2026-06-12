"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionButton from "@/components/ui/SectionButton";
import { useSectionHash } from "@/hooks/useSectionHash";
import { CAROUSEL_SPRING } from "@/lib/motion/transitions";
import { container, fadeUp, slide } from "@/lib/motion/variants";
import { carouselCardVariants } from "@/lib/motion/carousel";
import { DEFAULT_VIEWPORT } from "@/lib/motion/viewport";

const images = ["/1.webp", "/2.webp", "/3.webp"];

export default function HomeProjects() {
  const ref = useRef<HTMLElement>(null);

  const [index, setIndex] = useState(0);

  useSectionHash(ref, "projects");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getPosition = (i: number) => {
    const relative = (i - index + images.length) % images.length;

    if (relative === 0) return "center";
    if (relative === 1) return "right";
    if (relative === 2) return "left";

    return "back";
  };

  return (
    <section ref={ref} id="projects" className="w-full">
      <motion.div
        variants={container(0.14, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="grid w-full items-center gap-12 md:grid-cols-2"
      >
        <motion.div
          variants={slide(40)}
          className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.28em] text-[#F5F5DC]/50"
          >
            Selected Work
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl"
          >
            <span className="text-yellow-400">Explore</span> some of my recent
            work.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-sm text-[#F5F5DC]/60 md:text-base"
          >
            A collection of creative work in graphic design, video editing, and
            development.
          </motion.p>

          <SectionButton
            href="/projects"
            variant="glass"
            size="lg"
            className="mt-7"
          >
            Check it out
          </SectionButton>
        </motion.div>

        <motion.div
          variants={slide(-40)}
          className="relative order-1 mx-auto h-75 w-full max-w-md md:order-2 md:h-85"
        >
          <div className="relative flex h-full w-full items-center justify-center">
            {images.map((src, i) => {
              const position = getPosition(i);

              return (
                <motion.img
                  key={src}
                  src={`/images/projects/homepage/${src}`}
                  alt={`Project ${i}`}
                  animate={position}
                  variants={carouselCardVariants}
                  transition={CAROUSEL_SPRING}
                  whileHover={
                    position === "center" ? { scale: 1.02 } : undefined
                  }
                  drag={position === "center" ? "x" : false}
                  dragConstraints={{
                    left: 0,
                    right: 0,
                  }}
                  dragElastic={0.12}
                  onClick={() => setIndex((prev) => (prev + 1) % images.length)}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) {
                      setIndex((prev) => (prev + 1) % images.length);
                    }

                    if (info.offset.x > 60) {
                      setIndex(
                        (prev) => (prev - 1 + images.length) % images.length
                      );
                    }
                  }}
                  className="absolute h-60 w-[85%] cursor-pointer rounded-2xl border border-white/10 object-cover shadow-2xl will-change-transform md:h-72"
                />
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
