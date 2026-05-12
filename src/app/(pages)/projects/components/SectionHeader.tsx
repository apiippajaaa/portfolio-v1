"use client";

import { Code2, Palette, Clapperboard } from "lucide-react";

const icons = {
  code: <Code2 size={16} />,
  design: <Palette size={16} />,
  video: <Clapperboard size={16} />,
};

type Props = {
  icon: keyof typeof icons;
  title: string;
  description: string;
};

export default function SectionHeader({ icon, title, description }: Props) {
  return (
    <div className="max-w-3xl">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 shadow-[0_0_30px_rgba(255,255,255,0.04)] backdrop-blur-2xl">
        <div className="text-yellow-400">{icons[icon]}</div>
        <span className="text-[11px] uppercase tracking-[0.22em] text-white/80">
          Selected Works
        </span>
      </div>

      <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-[15px]">
        {description}
      </p>
    </div>
  );
}
