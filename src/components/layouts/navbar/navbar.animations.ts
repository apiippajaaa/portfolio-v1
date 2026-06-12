import type { Variants } from "framer-motion";

export const menuVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const topLineVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: 45,
    y: 7,
  },
};

export const middleLineVariants: Variants = {
  closed: {
    opacity: 1,
    width: "60%",
  },
  open: {
    opacity: 0,
    width: "0%",
  },
};

export const bottomLineVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: {
    rotate: -45,
    y: -7,
  },
};