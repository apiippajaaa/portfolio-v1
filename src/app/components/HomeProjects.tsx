"use client";

import { useSectionHash } from "@/hooks/useSectionHash";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const images = ["/1.webp", "/2.webp", "/3.webp"];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 18,
      mass: 0.9,
    },
  },
};

const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  center: {
    x: 0,
    scale: 1,
    rotate: 0,
    zIndex: 3,
    opacity: 1,
    filter: "brightness(1)",
  },

  left: {
    x: -80,
    scale: 0.92,
    rotate: -6,
    zIndex: 2,
    opacity: 0.7,
    filter: "brightness(0.3)",
  },

  right: {
    x: 80,
    scale: 0.92,
    rotate: 6,
    zIndex: 2,
    opacity: 0.7,
    filter: "brightness(0.3)",
  },

  back: {
    x: 0,
    scale: 0.85,
    rotate: 0,
    zIndex: 1,
    opacity: 0,
    filter: "brightness(0.4)",
  },
};

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
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        className="w-full grid md:grid-cols-2 gap-12 items-center"
      >
        {/* TEXT */}
        <motion.div
          variants={slideLeft}
          className="text-center md:text-left flex flex-col items-center md:items-start order-2 md:order-1"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.28em] uppercase text-[#F5F5DC]/50"
          >
            Selected Work
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-[-0.03em] max-w-lg"
          >
            Crafting digital products with smooth interaction and modern visual
            storytelling.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm md:text-base text-[#F5F5DC]/60 max-w-md"
          >
            Building immersive web experiences focused on clean interface,
            performance, and engaging motion design.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href="/projects"
              className="mt-7 inline-block text-sm text-[#F5F5DC]/70 hover:text-white transition-colors duration-300"
            >
              View Projects →
            </Link>
          </motion.div>
        </motion.div>

        {/* CAROUSEL */}
        <motion.div
          variants={slideRight}
          className="relative w-full max-w-md h-[300px] md:h-[340px] mx-auto order-1 md:order-2"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {images.map((src, i) => {
              const position = getPosition(i);

              return (
                <motion.img
                  key={src}
                  src={`/images/projects/homepage/${src}`}
                  alt={`Project ${i}`}
                  className="absolute w-[85%] h-60 md:h-72 object-cover rounded-2xl border border-white/10 shadow-2xl cursor-pointer will-change-transform"
                  animate={position}
                  variants={cardVariants}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                    mass: 0.8,
                  }}
                  whileHover={
                    position === "center"
                      ? {
                          scale: 1.02,
                        }
                      : undefined
                  }
                  drag={position === "center" ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
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
                  onClick={() => setIndex((prev) => (prev + 1) % images.length)}
                />
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
