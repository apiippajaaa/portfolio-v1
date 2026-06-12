import { ReactNode } from "react";

import { SectionIcon } from "@/types/projects";

import SectionHeader from "./SectionHeader";

type Props = {
  icon: SectionIcon;

  title: string;
  description: string;

  children: ReactNode;
};

function ProjectSection({ icon, title, description, children }: Props) {
  return (
    <section className="space-y-12">
      <SectionHeader icon={icon} title={title} description={description} />

      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </section>
  );
}

ProjectSection.Header = SectionHeader;

export default ProjectSection;
