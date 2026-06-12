"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import SectionButton from "@/components/ui/SectionButton";
import { useSectionHash } from "@/hooks/useSectionHash";
import { hoverFloat } from "@/lib/motion/hover";
import { container, fadeUp } from "@/lib/motion/variants";
import { DEFAULT_VIEWPORT } from "@/lib/motion/viewport";

export default function HomeHeader() {
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "home");

  return (
    <section
      ref={ref}
      id="home"
      className="flex min-h-dvh w-full items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        variants={container(0.1, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.div
          variants={fadeUp}
          whileHover={hoverFloat}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />

          <span className="text-xs tracking-[0.25em] text-white/70">
            AVAILABLE
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl md:text-6xl"
        >
          NUR AFIF MISBAHUDDIN
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-4 text-sm text-white/60 sm:text-base"
        >
          Fullstack Developer · Graphic Designer · Video Editor
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-7 flex items-center justify-center gap-3"
        >
          <SectionButton href="#projects" variant="yellow" size="lg">
            Portfolio
          </SectionButton>

          <SectionButton href="/resume.pdf" variant="glass" size="lg">
            Resume
          </SectionButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
