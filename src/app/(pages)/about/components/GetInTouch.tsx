"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <section className="py-20 md:py-32 px-5 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div
          className="
            flex flex-col gap-12
            md:flex-row md:items-end md:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-2xl">
            {/* line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false }}
              className="h-px bg-[#F3E5AB]/70"
            />

            {/* heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: false }}
              className="
                mt-6
                text-[2.5rem]
                leading-[0.98]
                tracking-[-0.06em]
                font-light
                text-white

                sm:text-5xl
                md:text-6xl
              "
            >
              Let’s build
              <span className="block text-[#F3E5AB]">something better.</span>
            </motion.h2>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: false }}
            className="
              w-full
              max-w-md

              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-md

              p-5
              sm:p-6
              md:bg-transparent
              md:border-0
              md:p-0
            "
          >
            <p
              className="
                text-sm
                leading-relaxed
                text-white/65

                sm:text-[15px]
                md:text-base
              "
            >
              Open for freelance work, collaborations, and building modern
              digital experiences.
            </p>

            <Link
              href="/#getInTouch"
              className="
                group
                mt-6
                inline-flex
                w-full sm:w-auto
                items-center
                justify-center
                gap-3

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
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
