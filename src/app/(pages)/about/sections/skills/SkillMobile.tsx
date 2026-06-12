import type { SkillCategory } from "@/types/skills";

import { SkillCard } from "./SkillCard";

type Props = {
  categories: SkillCategory[];
};

export function SkillsMobile({ categories }: Props) {
  return (
    <div className="lg:hidden">
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 scrollbar-hide">
        {categories.map((category) => (
          <div key={category.title} className="snap-center shrink-0">
            <SkillCard category={category} mobile />
          </div>
        ))}
      </div>
    </div>
  );
}
