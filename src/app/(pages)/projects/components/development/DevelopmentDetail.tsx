import { DevelopmentProject } from "@/types/projects";
import ProjectHero from "./DevelopmentProjectHero";
import HeroPreview from "./DevelopmentHeroPreview";
import DevelopmentProjectGallery from "./DevelopmentProjectGallery";

type Props = {
  project: DevelopmentProject;
};

export default function DevelopmentDetail({ project }: Props) {
  return (
    <main className="relative z-10 overflow-hidden pb-32">
      <section>
        <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-12">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <ProjectHero
              badge="Development Project"
              title={project.title}
              description={project.description}
            >
              <div className="mt-10 flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-full
                      border border-white/10
                      bg-white/[0.04]
                      px-4 py-2
                      text-xs font-medium
                      text-[#F5F5DC]/80
                      backdrop-blur-xl
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ProjectHero>

            <HeroPreview image={project.cover} title={project.title} />
          </div>
        </div>
      </section>

      <DevelopmentProjectGallery
        title={project.title}
        images={project.gallery}
      />
    </main>
  );
}
