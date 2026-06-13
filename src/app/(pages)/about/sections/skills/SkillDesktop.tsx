"use client";

import { useReveal } from "@/hooks/useReveal";
import type { SkillCategory } from "@/types/skills";

import { SkillCard } from "./SkillCard";

type Props = {
  categories: SkillCategory[];
};

type SkillItemProps = {
  category: SkillCategory;
  index: number;
};

function SkillItem({ category, index }: SkillItemProps) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } hover:-translate-y-1.5`}
    >
      <SkillCard category={category} />
    </div>
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
