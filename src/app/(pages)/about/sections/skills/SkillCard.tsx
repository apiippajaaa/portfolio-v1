import { memo } from "react";

import type { SkillCategory } from "@/types/skills";

type Props = {
  category: SkillCategory;
  mobile?: boolean;
};

type BadgeSectionProps = {
  title: string;
  items: string[];
  variant?: "skills" | "tools";
};

function BadgeSection({ title, items, variant = "skills" }: BadgeSectionProps) {
  const badgeClass =
    variant === "skills"
      ? "border-yellow-200/15 bg-yellow-200/5 text-yellow-100 hover:border-yellow-200/30 hover:bg-yellow-200/10"
      : "border-white/10 bg-white/3 text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white";

  return (
    <section className="w-full">
      <h4 className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {title}
      </h4>

      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors duration-200 ${badgeClass}`}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function SkillCardComponent({ category, mobile = false }: Props) {
  const hasSkills = (category.skills?.length ?? 0) > 0;
  const hasTools = (category.tools?.length ?? 0) > 0;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-white/2 p-5 transition-colors duration-300 hover:border-yellow-200/20 hover:bg-white/3 md:p-6 ${
        mobile ? "w-[82vw] max-w-[320px]" : ""
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-yellow-200 to-transparent" />

      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-yellow-200/5 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <header className="w-full text-center">
        <h3 className="text-xl font-semibold text-white">{category.title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {category.description}
        </p>
      </header>

      <div className="my-5 h-px w-full bg-white/10" />

      <div className="flex flex-1 w-full flex-col gap-6">
        {hasSkills && <BadgeSection title="Skills" items={category.skills!} />}

        {hasSkills && hasTools && <div className="h-px w-full bg-white/10" />}

        {hasTools && (
          <BadgeSection title="Tools" items={category.tools!} variant="tools" />
        )}
      </div>
    </article>
  );
}

export const SkillCard = memo(SkillCardComponent);
