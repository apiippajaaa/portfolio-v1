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
    <header className="max-w-3xl">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-2xl">
        <Icon size={16} className="text-yellow-400" />

        <span className="text-[11px] uppercase tracking-[0.22em] text-white/80">
          Selected Works
        </span>
      </div>

      <h2 className="text-3xl font-semibold tracking-tighter text-white md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-[15px]">
        {description}
      </p>
    </header>
  );
}
