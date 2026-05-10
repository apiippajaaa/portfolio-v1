"use client";

import { useState, useRef, useEffect } from "react";
import { motion, cubicBezier } from "framer-motion";
import experiences from "@/data/experiences.json";

type Experience = {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
};

const INITIAL_VISIBLE = 4;

const easing = cubicBezier(0.16, 1, 0.3, 1);

const cardVariants = {
  hidden: ({ isLeft, isMobile }: { isLeft: boolean; isMobile: boolean }) => ({
    opacity: 0,
    y: 60,
    x: isMobile ? 0 : isLeft ? -40 : 40,
    scale: 0.96,
  }),

  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      ease: easing,
    },
  },
};

export default function Journey() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const data = experiences as Experience[];
  const visibleData = expanded ? data : data.slice(0, INITIAL_VISIBLE);

  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [inView, setInView] = useState<boolean[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setInView((prev) => {
          const updated = [...prev];

          entries.forEach((entry) => {
            const index = refs.current.findIndex((el) => el === entry.target);

            if (index === -1) return;

            const ratio = entry.intersectionRatio;

            if (ratio > 0.45) {
              updated[index] = true;
            } else if (ratio < 0.15) {
              updated[index] = false;
            }
          });

          return updated;
        });
      },
      {
        threshold: [0, 0.15, 0.45, 1],
      }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleData]);

  return (
    <section className="py-20 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="mb-16 md:mb-20 text-center">
          <p
            className="
              text-[10px] md:text-xs
              uppercase tracking-[0.35em]
              text-[#F5F5DC]/45
            "
          >
            Journey
          </p>

          <h2
            className="
              mt-4
              text-3xl md:text-5xl
              font-semibold
              tracking-[-0.04em]
              text-[#F5F5DC]
            "
          >
            Work Experience
          </h2>

          <p
            className="
              mx-auto mt-4
              max-w-lg
              text-sm md:text-base
              leading-relaxed
              text-[#F5F5DC]/55
            "
          >
            A curated journey of my work, growth, and the experiences that
            shaped how I approach building thoughtful digital products.
          </p>
        </header>

        {/* TIMELINE */}
        <div className="relative">
          {/* LINE */}
          <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F5F5DC]/35 to-transparent left-4 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-20">
            {visibleData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                  custom={{ isLeft, isMobile }}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView[index] ? "visible" : "hidden"}
                  transition={{ delay: index * 0.06 }}
                  style={{ willChange: "transform, opacity" }}
                  className={`
                    relative flex flex-col
                    items-start md:items-center md:flex-row
                    ${isLeft ? "md:justify-start" : "md:justify-end"}
                  `}
                >
                  {/* CARD */}
                  <motion.div
                    whileHover={
                      isMobile
                        ? {}
                        : {
                            y: -6,
                            scale: 1.02,
                          }
                    }
                    transition={{
                      duration: 0.35,
                      ease: easing,
                    }}
                    className={`
                      w-full md:w-[45%]
                      pl-10 md:pl-0
                      will-change-transform
                      ${isLeft ? "md:pr-12" : "md:pl-12"}
                    `}
                  >
                    <article
                      className="
    group
    relative
    overflow-hidden

    rounded-[28px]

    border border-[#F5F5DC]/12

    bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.06)_100%)]

    backdrop-blur-xl

    p-5 md:p-7

    shadow-[0_12px_40px_rgba(0,0,0,0.14)]

    transition-all duration-300

    hover:-translate-y-1.5
    hover:border-[#F5F5DC]/20

    hover:shadow-[0_18px_60px_rgba(245,245,220,0.10)]
  "
                    >
                      {/* TOP LIGHT */}
                      <div
                        className="
      pointer-events-none
      absolute inset-x-0 top-0 h-px

      bg-gradient-to-r
      from-transparent
      via-[#F5F5DC]/70
      to-transparent
    "
                      />

                      {/* SOFT GLOW */}
                      <div
                        className="
      pointer-events-none
      absolute
      -top-24
      right-[-10%]

      h-52
      w-52

      rounded-full

      bg-[#F5F5DC]/10

      blur-3xl
    "
                      />

                      {/* INNER OVERLAY */}
                      <div
                        className="
      pointer-events-none
      absolute inset-0

      bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_100%)]

      opacity-80
    "
                      />

                      {/* CONTENT */}
                      <div className="relative z-10">
                        <span
                          className="
        text-[11px]
        uppercase
        tracking-[0.14em]

        text-[#F5F5DC]/55
      "
                        >
                          {item.period}
                        </span>

                        <h3
                          className="
        mt-3

        text-lg md:text-[22px]
        font-semibold

        tracking-[-0.03em]

        text-[#F5F5DC]
      "
                        >
                          {item.role}
                        </h3>

                        <p
                          className="
        mt-1

        text-sm

        text-[#F5F5DC]/72
      "
                        >
                          {item.company}
                        </p>

                        {/* divider */}
                        <div
                          className="
        my-4 h-px w-full

        bg-gradient-to-r
        from-transparent
        via-white/12
        to-transparent
      "
                        />

                        <p
                          className="
        text-sm
        leading-[1.75]

        text-[#F5F5DC]/58
      "
                        >
                          {item.description}
                        </p>
                      </div>
                    </article>
                  </motion.div>

                  {/* DOT */}
                  <div
                    className="
                      absolute top-6
                      left-4 md:left-1/2
                      -translate-x-1/2
                    "
                  >
                    <div
                      className="
                        h-3 w-3 rounded-full
                        bg-[#F5F5DC]

                        shadow-[0_0_18px_rgba(245,245,220,0.9)]
                      "
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="
              group inline-flex items-center gap-2

              rounded-full

              border border-[#F5F5DC]/10
              bg-[#0B3D91]/20

              px-6 py-2.5

              text-sm text-[#F5F5DC]/70

              backdrop-blur-md

              transition-all duration-300

              hover:border-[#F5F5DC]/20
              hover:bg-[#0B3D91]/35
              hover:text-[#F5F5DC]
            "
          >
            {expanded ? "See less" : "See more"}

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
