"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useSectionHash } from "@/hooks/useSectionHash";

const easing = [0.22, 1, 0.36, 1] as const;

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
      ease: easing,
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
      ease: easing,
    },
  },
};

export default function HomeAbout() {
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "about");

  return (
    <section ref={ref} id="about" className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.35,
        }}
        className="
          w-full
          grid
          md:grid-cols-2
          gap-12
          items-center
        "
      >
        {/* IMAGE */}
        <motion.div variants={slideRight}>
          <motion.div
            whileHover={{
              y: -4,
              transition: {
                duration: 0.25,
                ease: easing,
              },
            }}
            className="
              relative
              group
              overflow-hidden
              rounded-2xl
              border
              border-white/10
            "
          >
            <Image
              src="/images/profile.png"
              alt="About me"
              width={500}
              height={500}
              className="
                w-full
                h-[300px]
                sm:h-[360px]
                md:h-[320px]
                object-cover
                object-center
                grayscale
                transition-all
                duration-700
                group-hover:grayscale-0
                group-hover:scale-[1.04]
              "
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          variants={slideLeft}
          className="
            text-center
            md:text-left
            flex
            flex-col
            items-center
            md:items-start
          "
        >
          <motion.p
            variants={fadeUp}
            className="
              text-xs
              tracking-[0.28em]
              uppercase
              text-[#F5F5DC]/50
            "
          >
            About Me
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="
              mt-4
              text-3xl
              md:text-4xl
              font-semibold
              leading-tight
              tracking-[-0.03em]
              max-w-lg
            "
          >
            Crafting digital experiences with clarity, performance, and purpose.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="
              mt-4
              text-sm
              md:text-base
              text-[#F5F5DC]/60
              max-w-md
            "
          >
            I build modern web experiences with strong attention to detail,
            clean UI systems, and performance-first development.
          </motion.p>

          <motion.div
            variants={fadeUp}
            whileHover={{
              x: 3,
              transition: {
                duration: 0.2,
                ease: easing,
              },
            }}
          >
            <Link
              href="/about"
              className="
                mt-7
                inline-block
                text-sm
                text-[#F5F5DC]/70
                hover:text-white
                transition-colors
                duration-300
              "
            >
              Learn More →
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
