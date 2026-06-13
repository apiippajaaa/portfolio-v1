"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import type { DevelopmentProject } from "@/types/projects";

import { fadeUp } from "@/lib/motion/variants";
import { SOFT_VIEWPORT } from "@/lib/motion/viewport";

type Props = {
  project: DevelopmentProject;
};

export default function DevelopmentCard({ project }: Props) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={SOFT_VIEWPORT}
    >
      <Link
        href={`/projects/development/${project.slug}`}
        className="group block"
      >
        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/3">
          <div className="relative aspect-16/11 overflow-hidden">
            <Image
              fill
              src={project.cover}
              alt={project.title}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="pt-5">
          <h3 className="text-[22px] font-medium tracking-[-0.04em] text-white">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">
            {project.shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
