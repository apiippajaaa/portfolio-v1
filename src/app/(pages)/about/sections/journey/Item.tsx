"use client";

import { useReveal } from "@/hooks/useReveal";

import type { Experience } from "@/types/experiences";
import { JourneyCard } from "./JourneyCard";

type JourneyItemProps = {
  item: Experience;
  index: number;
};

export function JourneyItem({ item, index }: JourneyItemProps) {
  const { ref, visible } = useReveal();

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`
        relative flex transition-all duration-700
        ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        ${isLeft ? "md:justify-start" : "md:justify-end"}
      `}
    >
      <div
        className={`w-full pl-6 md:w-[45%] md:pl-0 ${
          isLeft ? "md:pr-12" : "md:pl-12"
        }`}
      >
        <JourneyCard item={item} />
      </div>

      <div className="absolute left-2 top-6 -translate-x-1/2 md:left-1/2">
        <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
      </div>
    </div>
  );
}
