"use client";

import { motion } from "framer-motion";

import type { SkillCategory } from "@/types/skills";

import { fadeUp } from "@/lib/motion/variants";
import { SOFT_VIEWPORT } from "@/lib/motion/viewport";

import { SkillCard } from "./SkillCard";
import { hoverFloat, tapScale } from "@/lib/motion/hover";

type Props = {
  categories: SkillCategory[];
};

type SkillItemProps = {
  category: SkillCategory;
  index: number;
};

function SkillItem({ category, index }: SkillItemProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={SOFT_VIEWPORT}
      transition={{
        delay: index * 0.08,
      }}
      whileHover={hoverFloat}
      whileTap={tapScale}
      className="will-change-transform"
    >
      <SkillCard category={category} />
    </motion.div>
  );
}

export function SkillsDesktop({ categories }: Props) {
  return (
    <div className="hidden gap-6 lg:grid lg:grid-cols-3">
      {categories.map((category, index) => (
        <SkillItem key={category.title} category={category} index={index} />
      ))}
    </div>
  );
}
