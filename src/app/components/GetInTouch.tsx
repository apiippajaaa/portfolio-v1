"use client";

import { useRef } from "react";
import { motion, Variants } from "framer-motion";

import { useSectionHash } from "@/hooks/useSectionHash";

const socials = [
  {
    name: "Email",
    value: "afifmisbahuddin7@gmail.com",
    href: "mailto:afifmisbahuddin7@gmail.com",
  },
  {
    name: "GitHub",
    value: "github.com/apiippajaaa",
    href: "https://github.com/apiippajaaa",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/afifmisbahuddin",
    href: "https://linkedin.com/in/afifmisbahuddin",
  },
  {
    name: "WhatsApp",
    value: "+62 856 0156 9136",
    href: "https://wa.me/6285601569136",
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
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
      ease: [0.22, 1, 0.36, 1],
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function GetInTouch() {
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "getInTouch");

  return (
    <section
      ref={ref}
      id="getInTouch"
      className="relative w-full flex items-center"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.2,
        }}
        className="
          w-full
          grid
          md:grid-cols-2
          gap-8
          md:gap-14
          items-center
        "
      >
        {/* LEFT */}
        <motion.div
          variants={slideRight}
          className="
            flex
            flex-col
            items-center
            md:items-start
            text-center
            md:text-left
          "
        >
          <motion.p
            variants={fadeUp}
            className="
              text-[10px]
              md:text-xs
              uppercase
              tracking-[0.3em]
              text-[#F5F5DC]/40
            "
          >
            Get In Touch
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="
              mt-4
              text-3xl
              sm:text-4xl
              md:text-6xl
              font-semibold
              leading-[0.92]
              tracking-[-0.05em]
              max-w-lg
            "
          >
            Let’s create something
            <span className="text-yellow-400"> Great!</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="
              mt-5
              text-xs
              sm:text-sm
              md:text-base
              leading-relaxed
              text-[#F5F5DC]/55
              max-w-[290px]
              sm:max-w-sm
            "
          >
            Available for freelance work, startup ideas, creative collaboration,
            and modern web experiences.
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="mailto:afifmisbahuddin7@gmail.com"
            whileHover={{
              scale: 1.04,
              y: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
            className="
    hidden
    md:inline-flex
    mt-6
    items-center
    gap-2
    rounded-full
    border
    border-white/10
    bg-white
    text-black
    px-4
    sm:px-6
    py-2.5
    sm:py-3
    text-[11px]
    sm:text-sm
    font-medium
    shadow-lg
    shadow-white/10
  "
          >
            Let’s Talk
            <motion.span
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={slideLeft} className="w-full space-y-3">
          {socials.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{
                scale: 1.025,
                y: -5,
                borderColor: "rgba(255,255,255,0.18)",
                backgroundColor: "rgba(255,255,255,0.06)",
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: index * 0.02,
              }}
              className="
                group
                relative
                overflow-hidden
                flex
                items-center
                justify-between
                rounded-xl
                md:rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-4
                md:px-5
                py-4
                md:py-5
                backdrop-blur-md
                will-change-transform
              "
            >
              {/* glow hover */}
              <motion.div
                className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                  bg-gradient-to-r
                  from-white/[0.06]
                  via-transparent
                  to-white/[0.04]
                "
              />

              <div className="relative min-w-0 z-10">
                <p
                  className="
                    text-[10px]
                    md:text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#F5F5DC]/35
                  "
                >
                  {item.name}
                </p>

                <motion.h3
                  whileHover={{
                    x: 3,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    mt-1.5
                    text-xs
                    sm:text-sm
                    md:text-lg
                    font-medium
                    text-white
                    truncate
                  "
                >
                  {item.value}
                </motion.h3>
              </div>

              <motion.div
                whileHover={{
                  rotate: -35,
                  scale: 1.12,
                  x: 3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-center
                  min-w-10
                  md:min-w-11
                  h-10
                  md:h-11
                  rounded-full
                  border
                  border-white/10
                  text-[#F5F5DC]/50
                  group-hover:text-white
                  group-hover:border-white/20
                  text-sm
                  md:text-base
                "
              >
                ↗
              </motion.div>
            </motion.a>
          ))}

          <motion.p
            variants={fadeUp}
            className="
              pt-2
              text-[10px]
              md:text-xs
              text-[#F5F5DC]/25
              text-center
              md:text-left
            "
          >
            © {new Date().getFullYear()} Nur Afif Misbahuddin
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
