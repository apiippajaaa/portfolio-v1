import { ReactNode } from "react";

import { SectionIcon } from "@/types/projects";

import SectionHeader from "./SectionHeader";

type ProjectSectionProps = {
  icon: SectionIcon;
  title: string;
  description: string;
  children: ReactNode;
};

export default function ProjectSection({
  icon,
  title,
  description,
  children,
}: ProjectSectionProps) {
  return (
    <section className="space-y-10 md:space-y-12">
      <SectionHeader icon={icon} title={title} description={description} />

      <div className="grid gap-8 md:gap-10 md:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

ProjectSection.Header = SectionHeader;
