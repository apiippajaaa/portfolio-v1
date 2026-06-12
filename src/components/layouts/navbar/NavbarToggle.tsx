"use client";

import { motion } from "framer-motion";
import {
  bottomLineVariants,
  middleLineVariants,
  topLineVariants,
} from "./navbar.animations";

type NavbarToggleProps = {
  open: boolean;
  onToggle: () => void;
};

export default function NavbarToggle({ open, onToggle }: NavbarToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className="group fixed top-5 right-5 z-100 flex h-16 w-16 items-center justify-center cursor-pointer"
    >
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border border-white/10" />

      <div className="absolute inset-1.5 rounded-full border border-[#F5F5DC]/15" />

      <div className="absolute h-full w-full animate-[spin_8s_linear_infinite]">
        <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-yellow-300" />
      </div>

      <div className="absolute inset-3.5 rounded-full border border-white/5 bg-black/80" />

      <motion.div
        animate={open ? "open" : "closed"}
        className="relative z-10 flex h-5 w-5 flex-col justify-center gap-1.25"
      >
        <motion.span
          variants={topLineVariants}
          className="block h-0.5 rounded-full bg-[#F5F5DC]"
        />

        <motion.span
          variants={middleLineVariants}
          className="ml-auto block h-0.5 rounded-full bg-[#F5F5DC]"
        />

        <motion.span
          variants={bottomLineVariants}
          className="block h-0.5 rounded-full bg-[#F5F5DC]"
        />
      </motion.div>
    </motion.button>
  );
}
