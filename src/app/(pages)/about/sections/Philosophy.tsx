"use client";

import { motion, type Variants } from "framer-motion";

const PHILOSOPHY_TEXT =
  "Everything that seems impossible is simply a limit yet to be broken, and every possibility belongs to those who are willing to try and keep moving forward.";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.018,
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

function getWords(text: string) {
  return text.split(" ");
}

export default function Philosophy() {
  const words = getWords(PHILOSOPHY_TEXT);

  return (
    <section className="flex min-h-screen items-center justify-center px-4 md:min-h-auto md:px-2 md:py-80">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            amount: 0.35,
            once: false,
          }}
          className="text-lg font-light leading-relaxed tracking-tight text-zinc-300 md:text-xl lg:text-2xl [text-shadow:0_0_12px_rgba(255,255,255,0.08)]"
        >
          {words.map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className="inline-block whitespace-nowrap"
            >
              {Array.from(word).map((character, characterIndex) => (
                <motion.span
                  key={`${wordIndex}-${characterIndex}`}
                  variants={letterVariants}
                  className="inline-block will-change-transform"
                >
                  {character}
                </motion.span>
              ))}

              <span aria-hidden="true">&nbsp;</span>
            </span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
