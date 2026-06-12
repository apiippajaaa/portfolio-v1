"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useSectionHash } from "@/hooks/useSectionHash";
import { hoverFloat } from "@/lib/motion/hover";
import { container, fadeUp, slide } from "@/lib/motion/variants";
import { DEFAULT_VIEWPORT } from "@/lib/motion/viewport";
import SectionButton from "@/components/ui/SectionButton";

export default function HomeAbout() {
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "about");

  return (
    <section ref={ref} id="about" className="w-full">
      <motion.div
        variants={container(0.14, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_VIEWPORT}
        className="grid w-full items-center gap-12 md:grid-cols-2"
      >
        <motion.div variants={slide(-40)}>
          <motion.div
            whileHover={hoverFloat}
            className="group relative overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src="/images/profile.png"
              alt="About me"
              width={500}
              height={500}
              className="h-75 w-full object-cover object-center grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 sm:h-90 md:h-80"
            />

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={slide(40)}
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.28em] text-[#F5F5DC]/50"
          >
            About Me
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl"
          >
            A little more about <span className="text-yellow-400">myself.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-sm text-[#F5F5DC]/60 md:text-base"
          >
            A brief introduction to my journey in crafting digital experiences.
          </motion.p>

          <SectionButton
            href="/about"
            variant="glass"
            size="lg"
            className="mt-7"
          >
            Learn More
          </SectionButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
