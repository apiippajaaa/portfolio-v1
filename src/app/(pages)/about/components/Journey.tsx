"use client";

import experiences from "@/data/experiences.json";
import { cubicBezier, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/* ================= TYPES ================= */

type Experience = {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
};

/* ================= CONSTANTS ================= */

const INITIAL_VISIBLE = 4;

const EASING = cubicBezier(0.16, 1, 0.3, 1);

const CARD_VARIANTS = {
  hidden: ({ isLeft, isMobile }: { isLeft: boolean; isMobile: boolean }) => ({
    opacity: 0,
    y: 56,
    x: isMobile ? 0 : isLeft ? -36 : 36,
    scale: 0.97,
  }),

  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      ease: EASING,
    },
  },
};

/* ================= HOOKS ================= */

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width:${breakpoint - 1}px)`);

    const update = () => setIsMobile(media.matches);

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return isMobile;
}

function useInViewTimeline(length: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const [visibleMap, setVisibleMap] = useState<boolean[]>(
    Array(length).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleMap((prev) => {
          const next = [...prev];

          entries.forEach((entry) => {
            const index = refs.current.findIndex(
              (element) => element === entry.target
            );

            if (index === -1) return;

            const ratio = entry.intersectionRatio;

            if (ratio > 0.45) {
              next[index] = true;
            }

            if (ratio < 0.15) {
              next[index] = false;
            }
          });

          return next;
        });
      },
      {
        threshold: [0, 0.15, 0.45, 1],
      }
    );

    refs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [length]);

  return {
    refs,
    visibleMap,
  };
}

/* ================= UI COMPONENTS ================= */

type TimelineCardProps = {
  item: Experience;
};

function TimelineCard({ item }: TimelineCardProps) {
  return (
    <article
      className="
        group relative overflow-hidden

        rounded-[28px]

        border border-[#F5F5DC]/12

        bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.06)_100%)]

        p-5 md:p-7

        backdrop-blur-xl

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

          absolute -top-24 right-[-10%]

          h-52 w-52

          rounded-full

          bg-[#F5F5DC]/10

          blur-3xl
        "
      />

      {/* OVERLAY */}
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

        <p className="mt-1 text-sm text-[#F5F5DC]/72">{item.company}</p>

        {/* DIVIDER */}
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
  );
}

type TimelineItemProps = {
  item: Experience;
  index: number;
  isMobile: boolean;
  inView: boolean;
  setRef: (element: HTMLDivElement | null) => void;
};

function TimelineItem({
  item,
  index,
  isMobile,
  inView,
  setRef,
}: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={setRef}
      custom={{ isLeft, isMobile }}
      variants={CARD_VARIANTS}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        delay: index * 0.06,
      }}
      style={{
        willChange: "transform, opacity",
      }}
      className={`
        relative flex flex-col
        items-start md:flex-row md:items-center

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
          ease: EASING,
        }}
        className={`
          w-full md:w-[45%]

          pl-10 md:pl-0

          will-change-transform

          ${isLeft ? "md:pr-12" : "md:pl-12"}
        `}
      >
        <TimelineCard item={item} />
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
}

/* ================= MAIN COMPONENT ================= */

export default function Journey() {
  const [expanded, setExpanded] = useState(false);

  const isMobile = useIsMobile();

  const data = useMemo(() => experiences as Experience[], []);

  const visibleData = useMemo(
    () => (expanded ? data : data.slice(0, INITIAL_VISIBLE)),
    [expanded, data]
  );

  const { refs, visibleMap } = useInViewTimeline(visibleData.length);

  return (
    <section className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="mb-16 text-center md:mb-20">
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
          <div
            className="
              absolute bottom-0 top-0

              left-4 md:left-1/2

              w-px

              -translate-x-1/2

              bg-gradient-to-b
              from-transparent
              via-[#F5F5DC]/35
              to-transparent
            "
          />

          <div className="space-y-12 md:space-y-20">
            {visibleData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isMobile={isMobile}
                inView={visibleMap[index]}
                setRef={(element) => {
                  refs.current[index] = element;
                }}
              />
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-12 flex justify-center md:mt-16">
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

            <span
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
