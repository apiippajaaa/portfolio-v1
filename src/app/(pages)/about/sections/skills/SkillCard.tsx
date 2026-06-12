import { memo } from "react";

import type { SkillCategory } from "@/types/skills";

type Props = {
  category: SkillCategory;
  mobile?: boolean;
};

function SkillCardComponent({ category, mobile = false }: Props) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-white/2 p-5 md:p-6 transition-colors duration-300 hover:border-yellow-200/20 hover:bg-white/3 ${
        mobile ? "w-[82vw] max-w-[320px]" : ""
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-yellow-200 to-transparent" />

      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-yellow-200/5 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        <h3 className="text-xl font-semibold text-white">{category.title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {category.description}
        </p>
      </div>

      <div className="my-5 h-px bg-white/10" />

      <div className="flex flex-1 flex-wrap content-start gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[11px] text-white/70 transition-colors duration-200 hover:border-yellow-200/20 hover:bg-white/5 hover:text-white"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export const SkillCard = memo(SkillCardComponent);
