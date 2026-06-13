"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import type { VideoProject } from "@/types/projects";

import { fadeUp } from "@/lib/motion/variants";
import { SOFT_VIEWPORT } from "@/lib/motion/viewport";

type Props = {
  project: VideoProject;
  onOpen: (videoUrl: string) => void;
};

export default function VideoCard({ project, onOpen }: Props) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={SOFT_VIEWPORT}
    >
      <button
        type="button"
        onClick={() => onOpen(project.videoUrl)}
        className="group block w-full text-left"
      >
        <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/3">
          <div className="relative aspect-video overflow-hidden">
            <Image
              fill
              src={project.cover}
              alt={project.id}
              sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/40" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110">
                <Play size={24} fill="currentColor" className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
