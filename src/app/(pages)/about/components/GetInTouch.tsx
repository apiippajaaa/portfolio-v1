"use client";

import Link from "next/link";
import { motion, type Transition } from "framer-motion";

/* ================= CONSTANTS ================= */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FADE_UP_TRANSITION: Transition = {
  duration: 0.7,
  ease: EASE,
};

const VIEWPORT = {
  once: false,
  amount: 0.3,
};

/* ================= ANIMATIONS ================= */

const fadeUp = {
  initial: {
    opacity: 0,
    y: 24,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },
};

const lineReveal = {
  initial: {
    opacity: 0,
    width: 0,
  },

  whileInView: {
    opacity: 1,
    width: 80,
  },
};

/* ================= UI COMPONENTS ================= */

function SectionHeading() {
  return (
    <div className="max-w-2xl">
      {/* LINE */}
      <motion.div
        variants={lineReveal}
        initial="initial"
        whileInView="whileInView"
        transition={{
          duration: 0.7,
          ease: EASE,
        }}
        viewport={VIEWPORT}
        className="h-px bg-[#F3E5AB]/70"
      />

      {/* HEADING */}
      <motion.h2
        variants={fadeUp}
        initial="initial"
        whileInView="whileInView"
        transition={FADE_UP_TRANSITION}
        viewport={VIEWPORT}
        className="
          mt-6

          text-[2.5rem]
          sm:text-5xl
          md:text-6xl

          font-light

          leading-[0.98]
          tracking-[-0.06em]

          text-white
        "
      >
        Let’s build
        <span className="block text-[#F3E5AB]">something better.</span>
      </motion.h2>
    </div>
  );
}

function ContactCard() {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="whileInView"
      transition={{
        ...FADE_UP_TRANSITION,
        delay: 0.08,
      }}
      viewport={VIEWPORT}
      className="
        w-full max-w-md

        rounded-3xl

        border border-white/10

        bg-white/[0.03]

        p-5 sm:p-6

        backdrop-blur-md

        md:border-0
        md:bg-transparent
        md:p-0
      "
    >
      <p
        className="
          text-sm sm:text-[15px] md:text-base

          leading-relaxed

          text-white/65
        "
      >
        Open for freelance work, collaborations, and building modern digital
        experiences.
      </p>

      <Link
        href="/#getInTouch"
        className="
          group

          mt-6

          inline-flex
          w-full sm:w-auto

          items-center justify-center gap-3

          rounded-full

          border border-white/10

          bg-white/[0.05]

          px-6 py-3.5

          text-sm md:text-base
          font-medium

          text-white

          backdrop-blur-md

          transition-all duration-300

          hover:border-[#F3E5AB]/40
          hover:bg-white/[0.08]
          hover:text-[#F3E5AB]

          active:scale-[0.98]
        "
      >
        get in touch
        <span
          className="
            transition-transform duration-300
            group-hover:translate-x-1
          "
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}

/* ================= COMPONENT ================= */

export default function GetInTouch() {
  return (
    <section className="px-5 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div
          className="
            flex flex-col gap-12

            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <SectionHeading />

          <ContactCard />
        </div>
      </div>
    </section>
  );
}
