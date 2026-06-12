import type { Variants } from "framer-motion";

export const carouselCardVariants: Variants = {
  center: {
    x: 0,
    scale: 1,
    rotate: 0,
    zIndex: 3,
    opacity: 1,
    filter: "brightness(1)",
  },

  left: {
    x: -80,
    scale: 0.92,
    rotate: -6,
    zIndex: 2,
    opacity: 0.7,
    filter: "brightness(0.3)",
  },

  right: {
    x: 80,
    scale: 0.92,
    rotate: 6,
    zIndex: 2,
    opacity: 0.7,
    filter: "brightness(0.3)",
  },

  back: {
    x: 0,
    scale: 0.85,
    rotate: 0,
    zIndex: 1,
    opacity: 0,
    filter: "brightness(0.4)",
  },
};