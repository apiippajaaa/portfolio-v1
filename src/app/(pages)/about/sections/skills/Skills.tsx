"use client";

import { skillCategories } from "@/data/skills";
import { SkillsDesktop } from "./SkillDesktop";
import { SkillsHeader } from "./SkillHeader";
import { SkillsMobile } from "./SkillMobile";

export default function Skills() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SkillsHeader />

        <SkillsMobile categories={skillCategories} />

        <SkillsDesktop categories={skillCategories} />
      </div>
    </section>
  );
}
