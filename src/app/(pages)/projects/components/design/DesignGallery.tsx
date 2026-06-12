"use client";

import { useState } from "react";

import type { DesignProject } from "@/types/projects";
import DesignPreviewModal from "./DesignPreviewModal";
import Image from "next/image";

type Props = {
  projects: DesignProject[];
};

export default function DesignGallery({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setActiveIndex(index)}
            className="mb-4 block w-full break-inside-avoid cursor-pointer"
          >
            <Image
              src={project.cover}
              alt={project.id}
              width={1000}
              height={1000}
              className="w-full rounded-3xl transition duration-700 hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <DesignPreviewModal
        projects={projects}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() =>
          setActiveIndex((prev) =>
            prev === null ? null : prev === 0 ? projects.length - 1 : prev - 1
          )
        }
        onNext={() =>
          setActiveIndex((prev) =>
            prev === null ? null : prev === projects.length - 1 ? 0 : prev + 1
          )
        }
      />
    </>
  );
}
