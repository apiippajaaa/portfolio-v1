"use client";

import skillsData from "@/data/skills.json";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Skill = {
  name: string;
};

type SkillCategory = {
  title: string;
  description: string;
  skills: Skill[];
};

export default function Skills() {
  const categories = skillsData as SkillCategory[];

  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [padding, setPadding] = useState(0);
  const [cardHeight, setCardHeight] = useState<number>(0);

  // ================= HEIGHT SYNC =================
  useEffect(() => {
    const calculateHeight = () => {
      const cards = document.querySelectorAll(
        "[data-card]"
      ) as NodeListOf<HTMLElement>;

      let maxHeight = 0;

      cards.forEach((card) => {
        card.style.minHeight = "0px";

        const height = card.scrollHeight;

        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      setCardHeight(maxHeight);
    };

    calculateHeight();

    const resizeObserver = new ResizeObserver(() => {
      calculateHeight();
    });

    const cards = document.querySelectorAll("[data-card]");

    cards.forEach((card) => resizeObserver.observe(card));

    window.addEventListener("resize", calculateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateHeight);
    };
  }, [categories]);

  // ================= PADDING =================
  useEffect(() => {
    const calcPadding = () => {
      if (!mobileRef.current) return;

      const container = mobileRef.current;
      const card = container.querySelector("[data-card]") as HTMLElement;

      if (!card) return;

      const value = (container.clientWidth - card.clientWidth) / 2;
      setPadding(Math.max(16, value));
    };

    calcPadding();

    window.addEventListener("resize", calcPadding);

    return () => window.removeEventListener("resize", calcPadding);
  }, []);

  // ================= ACTIVE DETECTION =================
  useEffect(() => {
    const container = mobileRef.current;

    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const cards = Array.from(
          container.querySelectorAll("[data-wrapper]")
        ) as HTMLElement[];

        const center = container.scrollLeft + container.clientWidth / 2;

        let closest = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const distance = Math.abs(center - cardCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closest = index;
          }
        });

        setActive(closest);
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

  // ================= SCROLL =================
  const scrollToIndex = (index: number) => {
    if (!mobileRef.current) return;

    const container = mobileRef.current;

    const cards = container.querySelectorAll(
      "[data-wrapper]"
    ) as NodeListOf<HTMLElement>;

    const el = cards[index];

    if (!el) return;

    const offset =
      el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;

    container.scrollTo({
      left: offset,
      behavior: "smooth",
    });
  };

  const next = () => {
    if (active >= categories.length - 1) return;
    scrollToIndex(active + 1);
  };

  const prev = () => {
    if (active <= 0) return;
    scrollToIndex(active - 1);
  };

  // ================= CARD =================
  const Card = ({ cat }: { cat: SkillCategory }) => (
    <div
      data-card
      style={{
        minHeight: cardHeight || "auto",
      }}
      className="
        relative
        flex flex-col
        h-full

        w-[82vw]
        max-w-[320px]

        overflow-hidden
        rounded-[30px]

        border border-white/10

        bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.05)_100%)]

        backdrop-blur-2xl
        p-5 md:p-6
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -top-24
          right-[-20%]

          h-52
          w-52

          rounded-full
          bg-[#F5F5DC]/10
          blur-3xl
        "
      />

      {/* TOP LIGHT */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-[#F5F5DC]/70
          to-transparent
        "
      />

      {/* HEADER */}
      <div className="relative z-10">
        <h3
          className="
            text-xl
            font-semibold
            tracking-[-0.03em]
            text-[#F5F5DC]
          "
        >
          {cat.title}
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-[#F5F5DC]/58
          "
        >
          {cat.description}
        </p>
      </div>

      {/* DIVIDER */}
      <div className="relative z-10 my-5 h-px bg-white/10" />

      {/* SKILLS */}
      <div className="relative z-10 flex flex-wrap content-start gap-2">
        {cat.skills.map((skill, i) => (
          <span
            key={i}
            className="
              rounded-full
              border border-white/10
              bg-white/[0.06]

              px-3 py-1.5

              text-[11px]
              text-[#F5F5DC]/75

              transition-colors duration-200
              hover:bg-white/[0.12]
            "
          >
            {skill.name}
          </span>
        ))}
      </div>

      {/* AUTO SPACE */}
      <div className="flex-1" />
    </div>
  );

  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-12 text-center md:mb-16">
          <p
            className="
              text-[10px] md:text-xs
              uppercase
              tracking-[0.32em]
              text-[#F5F5DC]/45
            "
          >
            Skills
          </p>

          <h2
            className="
              mt-3
              text-3xl md:text-5xl
              font-semibold
              tracking-[-0.04em]
              text-[#F5F5DC]
            "
          >
            My Tech Stack
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md

              text-sm md:text-base
              leading-relaxed
              text-[#F5F5DC]/55
            "
          >
            Technologies I use to build scalable and modern digital products.
          </p>
        </div>

        {/* MOBILE */}
        <div className="relative lg:hidden">
          <button
            onClick={prev}
            disabled={active === 0}
            className={`
              absolute left-0 top-1/2 z-20
              flex h-11 w-11 -translate-y-1/2 items-center justify-center
              rounded-full border backdrop-blur-xl
              transition-all duration-300

              ${
                active === 0
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
            `}
          >
            ←
          </button>

          <button
            onClick={next}
            disabled={active === categories.length - 1}
            className={`
              absolute right-0 top-1/2 z-20
              flex h-11 w-11 -translate-y-1/2 items-center justify-center
              rounded-full border backdrop-blur-xl
              transition-all duration-300

              ${
                active === categories.length - 1
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
            `}
          >
            →
          </button>

          {/* CAROUSEL */}
          <div
            ref={mobileRef}
            style={{
              paddingLeft: padding,
              paddingRight: padding,
            }}
            className="
              flex gap-5
              overflow-x-auto overflow-y-hidden

              snap-x snap-mandatory
              scroll-smooth

              scrollbar-hide
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [-webkit-overflow-scrolling:touch]
            "
          >
            {categories.map((cat, i) => (
              <div
                key={i}
                data-wrapper
                className="
                  shrink-0
                  snap-center
                  pb-2
                "
              >
                <motion.div
                  animate={{
                    scale: i === active ? 1 : 0.965,
                    opacity: i === active ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.18,
                    ease: "easeOut",
                  }}
                >
                  <Card cat={cat} />
                </motion.div>
              </div>
            ))}
          </div>

          {/* INDICATOR */}
          <div className="mt-6 flex justify-center gap-1.5">
            {categories.map((_, i) => (
              <div
                key={i}
                className={`
                  h-1.5 rounded-full transition-all duration-300
                  ${i === active ? "w-6 bg-[#F5F5DC]" : "w-1.5 bg-white/20"}
                `}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div ref={desktopRef} className="hidden grid-cols-3 gap-6 lg:grid">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <Card cat={cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
