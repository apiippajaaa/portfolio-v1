"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useSectionHash } from "@/hooks/useSectionHash";
import { useRef } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
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

export default function HomeHeader() {
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "home");

  return (
    <section
      ref={ref}
      id="home"
      className="
        min-h-dvh
        w-full
        flex
        items-center
        justify-center
        px-6
        overflow-hidden
      "
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.35,
        }}
        className="
          text-center
          max-w-3xl
          w-full
          flex
          flex-col
          items-center
        "
      >
        {/* STATUS */}
        <motion.div
          variants={reveal}
          whileHover={{
            y: -2,
            scale: 1.03,
            transition: {
              duration: 0.2,
              ease: easing,
            },
          }}
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-1.5
            rounded-full
            border
            border-white/10
            bg-white/5
            mb-5
            backdrop-blur-sm
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />

          <span className="text-xs tracking-[0.25em] text-[#F5F5DC]/70">
            AVAILABLE
          </span>
        </motion.div>

        {/* NAME */}
        <motion.h1
          variants={reveal}
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-semibold
            leading-tight
            tracking-[-0.04em]
          "
        >
          NUR AFIF MISBAHUDDIN
        </motion.h1>

        {/* ROLE */}
        <motion.p
          variants={reveal}
          className="
            mt-4
            text-sm
            sm:text-base
            text-[#F5F5DC]/60
          "
        >
          Fullstack Developer · Graphic Designer · Video Editor
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          variants={reveal}
          className="
            mt-7
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <motion.div
            whileHover={{
              y: -2,
              scale: 1.03,
              transition: {
                duration: 0.2,
                ease: easing,
              },
            }}
          >
            <Link
              href="#projects"
              className="
                px-5
                py-2.5
                rounded-xl
                bg-[#F5F5DC]
                text-[#0B3D91]
                text-sm
                font-medium
                shadow-lg
              "
            >
              Portfolio
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              y: -2,
              scale: 1.03,
              transition: {
                duration: 0.2,
                ease: easing,
              },
            }}
          >
            <Link
              href="/resume.pdf"
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-white/10
                bg-white/5
                text-[#F5F5DC]
                text-sm
              "
            >
              Resume
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
