import { SectionIcon } from "@/types/projects";
import { Clapperboard, Code2, Palette, type LucideIcon } from "lucide-react";

type SectionHeaderProps = {
  icon: SectionIcon;
  title: string;
  description: string;
};

const ICONS: Record<SectionIcon, LucideIcon> = {
  code: Code2,
  design: Palette,
  video: Clapperboard,
};

export default function SectionHeader({
  icon,
  title,
  description,
}: SectionHeaderProps) {
  const Icon = ICONS[icon];

  return (
    <header className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
      <div
        className="
          mb-4
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-white/10
          bg-white/5
          px-3
          py-1.5
          backdrop-blur-xl
          md:mb-5
          md:gap-2
          md:px-4
          md:py-2
        "
      >
        <Icon size={14} className="text-yellow-400 md:h-4 md:w-4" />

        <span
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-white/70
            md:text-[11px]
            md:tracking-[0.22em]
          "
        >
          Selected Works
        </span>
      </div>

      <h2
        className="
          text-4xl
          font-semibold
          tracking-tight
          text-white
          sm:text-5xl
          md:text-5xl
          md:tracking-tighter
        "
      >
        {title}
      </h2>

      <p
        className="
          mx-auto
          mt-4
          max-w-2xl
          text-sm
          leading-relaxed
          text-white/60
          sm:text-[15px]
          md:mx-0
          md:mt-5
          md:text-base
        "
      >
        {description}
      </p>
    </header>
  );
}
