import { memo } from "react";

import type { Experience } from "@/types/experiences";

type JourneyCardProps = {
  item: Experience;
};

function JourneyCardComponent({ item }: JourneyCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 md:p-7">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-yellow-200 to-transparent" />

      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-yellow-200/5 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <span className="text-[11px] uppercase tracking-[0.15em] text-white/45">
        {item.period}
      </span>

      <h3 className="mt-3 text-xl font-semibold text-white">{item.role}</h3>

      <p className="mt-1 text-sm text-white/70">{item.company}</p>

      <div className="my-4 h-px bg-white/10" />

      <p className="text-sm leading-7 text-white/55">{item.description}</p>
    </article>
  );
}

export const JourneyCard = memo(JourneyCardComponent);
