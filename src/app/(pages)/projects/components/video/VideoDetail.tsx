import Image from "next/image";

import BackButton from "@/components/ui/BackButton";

type Props = {
  project: {
    id: string;
    cover: string;
    videoUrl: string;
  };
};

export default function VideoDetail({ project }: Props) {
  return (
    <main className="relative z-10 overflow-hidden pb-32">
      <section>
        <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-12">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#F5D76E]/55">
                Motion & Video
              </p>

              <h1 className="mt-7 text-5xl font-semibold leading-[0.92] tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl">
                {project.id}
              </h1>

              <BackButton
                className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-[#F5D76E]"
                label="Back to projects"
              />
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#F5D76E]/15 blur-3xl" />

              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[16/11]">
                  <Image
                    src={project.cover}
                    alt={project.id}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#F5D76E]/55">
              Preview
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
              Watch Video
            </h2>
          </div>

          <div
            className="
              overflow-hidden rounded-[32px]
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
            "
          >
            <div className="aspect-video">
              <iframe
                src={project.videoUrl}
                title={project.id}
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
