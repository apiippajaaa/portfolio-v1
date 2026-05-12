"use client";

import { motion, type Variants } from "framer-motion";
import { useMemo } from "react";

/* ================= CONSTANTS ================= */

const SENTENCE =
  "Everything that seems impossible is simply a limit yet to be broken, and every possibility belongs to those who are willing to try and keep moving forward.";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ================= ANIMATION ================= */

const containerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.018,
      delayChildren: 0.12,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 1.04,
    filter: "blur(6px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

/* ================= HELPERS ================= */

function splitSentence(sentence: string) {
  return sentence.split("").map((char, index) => ({
    id: `${char}-${index}`,
    value: char === " " ? "\u00A0" : char,
  }));
}

/* ================= COMPONENT ================= */

export default function Philosophy() {
  const characters = useMemo(() => splitSentence(SENTENCE), []);

  return (
    <section className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.35,
          }}
          className="
            text-lg md:text-xl lg:text-2xl

            font-light

            leading-relaxed
            tracking-tight

            text-zinc-300

            [text-shadow:0_0_12px_rgba(255,255,255,0.08)]
          "
        >
          {characters.map((char) => (
            <motion.span
              key={char.id}
              variants={letterVariants}
              className="inline-block will-change-transform"
            >
              {char.value}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
