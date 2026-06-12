import { ReactNode } from "react";

import BackButton from "@/components/ui/BackButton";

type Props = {
  badge: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function ProjectHero({
  badge,
  title,
  description,
  children,
}: Props) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#F5D76E]/55">
        {badge}
      </p>

      <h1 className="mt-7 text-5xl font-semibold leading-[0.92] tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
        {title}
      </h1>

      {description && (
        <p className="mt-7 max-w-2xl text-sm leading-[2] text-[#F5F5DC]/60 md:text-base">
          {description}
        </p>
      )}

      {children}

      <BackButton
        className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-[#F5D76E] transition-all duration-300 hover:gap-3"
        label="Back to projects"
      />
    </div>
  );
}
