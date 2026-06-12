"use client";

import { motion } from "framer-motion";

const HERO_ANIMATION = {
  initial: {
    opacity: 0,
    y: 35,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.7,
  },
};

export default function ProjectsHero() {
  return (
    <section className="mb-28 md:mb-36">
      <motion.div {...HERO_ANIMATION} className="max-w-5xl">
        <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/80 backdrop-blur-2xl">
          <span className="mr-2 size-2 rounded-full bg-yellow-400" />
          Portfolio Collection
        </div>

        <h1 className="mt-8 text-5xl font-semibold leading-[0.9] tracking-[-0.07em] text-white md:text-7xl xl:text-[96px]">
          Building modern
          <br />
          digital experiences
          <br />
          with clarity.
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
          Selected works across development, interface design, and motion
          storytelling with a clean, modern, and futuristic approach.
        </p>
      </motion.div>
    </section>
  );
}
