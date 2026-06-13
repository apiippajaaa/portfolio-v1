"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SPRING } from "@/lib/motion/transitions";
import { container, fadeUp, scale } from "@/lib/motion/variants";

const CONTENT = {
  badge: "About Me",
  title: "A little more about",
  highlight: "myself.",
  description:
    "A brief introduction to my journey in crafting digital experiences.",
  mobileMeta: ["Indonesia", "Open to work"],
  desktopMeta: ["Based in Indonesia", "Open for opportunities"],
} as const;

type HeaderContentProps = {
  mobile?: boolean;
};

function HeaderContent({ mobile = false }: HeaderContentProps) {
  const meta = mobile ? CONTENT.mobileMeta : CONTENT.desktopMeta;

  return (
    <>
      <motion.p
        variants={fadeUp}
        className="text-[11px] uppercase tracking-[0.3em] text-white/40"
      >
        {CONTENT.badge}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className={`mt-3 font-semibold leading-tight text-white

          ${mobile ? "text-3xl" : "text-3xl md:text-5xl"}
        
          `}
      >
        {CONTENT.title}{" "}
        <span className="text-yellow-300">{CONTENT.highlight}</span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className={`mt-5 leading-relaxed text-white/55

          ${mobile ? "text-sm" : "max-w-lg text-sm md:text-base"}
          
`}
      >
        {CONTENT.description}
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-6 flex items-center gap-4 text-xs text-white/45"
      >
        <span>{meta[0]}</span>

        <div className="h-3 w-px bg-white/15" />

        <span>{meta[1]}</span>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-6 h-px w-24 bg-linear-to-r from-yellow-300 to-transparent"
      />
    </>
  );
}

function AboutImage() {
  return (
    <motion.div
      variants={scale}
      className="relative flex h-110 w-full items-center justify-center"
    >
      <div className="absolute h-[110%] w-[110%] rounded-full bg-yellow-200/5 blur-3xl" />

      <motion.div
        initial={{
          rotate: 6,
        }}
        whileHover={{
          rotate: 0,
          scale: 1.03,
        }}
        transition={SPRING}
        className="group relative h-full w-[90%]"
      >
        <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-white/10" />

        <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-black">
          <Image
            fill
            priority
            src="/images/about.png"
            alt="About"
            className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutHeader() {
  return (
    <>
      {/* MOBILE */}
      <section className="relative left-1/2 flex min-h-screen w-screen -translate-x-1/2 items-center md:hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            fill
            priority
            src="/images/about.png"
            alt="About"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/40 to-black" />
        </div>

        <motion.div
          variants={container()}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.3,
          }}
          className="w-full max-w-md px-6"
        >
          <HeaderContent mobile />
        </motion.div>
      </section>

      {/* DESKTOP */}
      <motion.section
        variants={container(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.25,
        }}
        className="mx-auto hidden w-full max-w-5xl grid-cols-2 items-center gap-10 md:grid"
      >
        <div>
          <HeaderContent />
        </div>

        <AboutImage />
      </motion.section>
    </>
  );
}
