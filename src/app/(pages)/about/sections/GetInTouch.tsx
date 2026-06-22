"use client";

import Link from "next/link";
import { motion, type MotionProps, type Transition } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIEWPORT = {
  once: false,
  amount: 0.3,
};

const FADE_UP_TRANSITION: Transition = {
  duration: 0.7,
  ease: EASE,
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

const lineRevealVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },

  visible: {
    opacity: 1,
    width: 80,
  },
};

const fadeUpMotion: MotionProps = {
  variants: fadeUpVariants,
  initial: "hidden",
  whileInView: "visible",
  viewport: VIEWPORT,
};

const lineRevealMotion: MotionProps = {
  variants: lineRevealVariants,
  initial: "hidden",
  whileInView: "visible",
  viewport: VIEWPORT,
};

function SectionHeading() {
  return (
    <div className="max-w-2xl">
      <motion.div
        {...lineRevealMotion}
        transition={FADE_UP_TRANSITION}
        className="h-px bg-white"
      />

      <motion.h2
        {...fadeUpMotion}
        transition={FADE_UP_TRANSITION}
        className="mt-6 text-[2.5rem] font-light leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl md:text-6xl"
      >
        Let’s build
        <span className="block text-yellow-400">something better.</span>
      </motion.h2>
    </div>
  );
}

function ContactCard() {
  return (
    <motion.div
      {...fadeUpMotion}
      transition={{
        ...FADE_UP_TRANSITION,
        delay: 0.08,
      }}
      className="w-full max-w-md rounded-3xl border border-white/10 p-5 sm:p-6 md:border-0 md:p-0"
    >
      <p className="text-sm leading-relaxed text-white/65 sm:text-[15px] md:text-base">
        Open for freelance work, collaborations, and building modern digital
        experiences.
      </p>

      <Link
        href="/#getInTouch"
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-[#F3E5AB]/40 hover:bg-yellow-400 hover:text-black active:scale-[0.98] sm:w-auto md:text-base"
      >
        <span>get in touch</span>

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </motion.div>
  );
}

export default function GetInTouch() {
  return (
    <section className="pt-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading />
          <ContactCard />
        </div>
      </div>
    </section>
  );
}
