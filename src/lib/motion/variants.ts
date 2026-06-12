import type { Variants } from "framer-motion";

import { EASE, SMOOTH_SPRING } from "./transitions";

/* ================= CONTAINER ================= */

export const container = (
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/* ================= FADE ================= */

export const fade: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

/* ================= FADE UP ================= */

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SMOOTH_SPRING,
  },
};

/* ================= SLIDE ================= */

export const slide = (
  x: number,
  duration = 0.7,
): Variants => ({
  hidden: {
    opacity: 0,
    x,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      ease: EASE,
    },
  },
});

/* ================= SCALE ================= */

export const scale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SMOOTH_SPRING,
  },
};

/* ================= BLUR FADE ================= */

export const blurFade: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};