"use client";

import skillsData from "@/data/skills.json";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/* ================= TYPES ================= */

type Skill = {
  name: string;
};

type SkillCategory = {
  title: string;
  description: string;
  skills: Skill[];
};

/* ================= CONSTANTS ================= */

const WRAPPER_SELECTOR = "[data-wrapper]";
const CARD_SELECTOR = "[data-card]";
const MIN_PADDING = 16;

/* ================= HELPERS ================= */

const getElements = <T extends Element>(
  selector: string,
  parent: ParentNode = document
) => Array.from(parent.querySelectorAll(selector)) as T[];

/* ================= COMPONENT ================= */

export default function Skills() {
  const categories = useMemo(() => skillsData as SkillCategory[], []);

  const mobileRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselPadding, setCarouselPadding] = useState(MIN_PADDING);

  /* ================= MOBILE PADDING ================= */

  useEffect(() => {
    const updatePadding = () => {
      const container = mobileRef.current;
      if (!container) return;

      const firstCard = container.querySelector<HTMLElement>(CARD_SELECTOR);

      if (!firstCard) return;

      const centeredPadding =
        (container.clientWidth - firstCard.clientWidth) / 2;

      setCarouselPadding(Math.max(MIN_PADDING, centeredPadding));
    };

    updatePadding();

    window.addEventListener("resize", updatePadding);

    return () => {
      window.removeEventListener("resize", updatePadding);
    };
  }, []);

  /* ================= ACTIVE DETECTION ================= */

  useEffect(() => {
    const container = mobileRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const cards = getElements<HTMLElement>(WRAPPER_SELECTOR, container);

        const viewportCenter = container.scrollLeft + container.clientWidth / 2;

        let nearestIndex = 0;
        let nearestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;

          const distance = Math.abs(viewportCenter - cardCenter);

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setActiveIndex(nearestIndex);

        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================= NAVIGATION ================= */

  const scrollToIndex = (index: number) => {
    const container = mobileRef.current;

    if (!container) return;

    const cards = getElements<HTMLElement>(WRAPPER_SELECTOR, container);

    const target = cards[index];

    if (!target) return;

    const left =
      target.offsetLeft - container.clientWidth / 2 + target.clientWidth / 2;

    container.scrollTo({
      left,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (activeIndex <= 0) return;

    scrollToIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex >= categories.length - 1) return;

    scrollToIndex(activeIndex + 1);
  };

  /* ================= UI ================= */

  const getNavButtonClass = (disabled: boolean) => `
    absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2
    items-center justify-center rounded-full border
    backdrop-blur-xl transition-all duration-300
    ${
      disabled
        ? `
          cursor-not-allowed
          border-white/5
          bg-white/[0.03]
          text-white/20
        `
        : `
          border-white/10
          bg-white/[0.08]
          text-[#F5F5DC]/75
          active:scale-95
        `
    }
  `;

  const Card = ({
    category,
    mobile = false,
  }: {
    category: SkillCategory;
    mobile?: boolean;
  }) => (
    <div
      data-card
      className={`
        relative flex h-full flex-col overflow-hidden
        rounded-[30px] border border-white/10
        bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.05)_100%)]
        backdrop-blur-2xl p-5 md:p-6
        ${mobile ? "w-[82vw] max-w-[320px]" : "w-full"}
      `}
    >
      {/* GLOW */}
      <div className="absolute -top-24 right-[-20%] h-52 w-52 rounded-full bg-[#F5F5DC]/10 blur-3xl" />

      {/* TOP BORDER */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F5DC]/70 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#F5F5DC]">
          {category.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#F5F5DC]/58">
          {category.description}
        </p>
      </div>

      {/* DIVIDER */}
      <div className="relative z-10 my-5 h-px bg-white/10" />

      {/* CAPSULE AREA */}
      <div className="relative z-10 flex flex-1 flex-wrap content-start gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="
              rounded-full border border-white/10
              bg-white/[0.06]
              px-3 py-1.5
              text-[11px] text-[#F5F5DC]/75
              transition-colors duration-200
              hover:bg-white/[0.12]
            "
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="mb-12 text-center md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#F5F5DC]/45 md:text-xs">
            Skills
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#F5F5DC] md:text-5xl">
            My Tech Stack
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#F5F5DC]/55 md:text-base">
            Technologies I use to build scalable and modern digital products.
          </p>
        </header>

        {/* MOBILE */}
        <div className="relative lg:hidden">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`${getNavButtonClass(activeIndex === 0)} left-3`}
          >
            ←
          </button>

          <button
            onClick={handleNext}
            disabled={activeIndex === categories.length - 1}
            className={`${getNavButtonClass(
              activeIndex === categories.length - 1
            )} right-3`}
          >
            →
          </button>

          <div
            ref={mobileRef}
            style={{
              paddingLeft: carouselPadding,
              paddingRight: carouselPadding,
            }}
            className="
              flex gap-5 overflow-x-auto overflow-y-hidden
              snap-x snap-mandatory scroll-smooth
              scrollbar-hide
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [-webkit-overflow-scrolling:touch]
            "
          >
            {categories.map((category, index) => (
              <div
                key={category.title}
                data-wrapper
                className="flex shrink-0 snap-center pb-2"
              >
                <motion.div
                  className="h-full"
                  animate={{
                    scale: index === activeIndex ? 1 : 0.965,
                    opacity: index === activeIndex ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.18,
                    ease: "easeOut",
                  }}
                >
                  <Card category={category} mobile />
                </motion.div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-1.5">
            {categories.map((category, index) => (
              <div
                key={category.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-6 bg-[#F5F5DC]"
                    : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden items-stretch gap-6 lg:grid lg:grid-cols-3">
          {categories.map((category) => (
            <motion.div
              key={category.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex h-full"
            >
              <Card category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
