"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import type { DesignProject } from "@/types/projects";

import { fadeUp } from "@/lib/motion/variants";
import { X } from "lucide-react";

type Props = {
  projects: DesignProject[];
};

export default function DesignCard({ projects }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="mb-4 break-inside-avoid"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(project.cover)}
              className="group block w-full cursor-zoom-in"
            >
              <article className="overflow-hidden rounded-3xl">
                <Image
                  src={project.cover}
                  alt={`Design ${project.id}`}
                  width={1200}
                  height={1800}
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="h-auto w-full rounded-3xl object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </article>
            </button>
          </motion.div>
        ))}
      </div>

      {selectedImage &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative"
              >
                <Image
                  src={selectedImage}
                  alt="Preview"
                  width={2000}
                  height={3000}
                  priority
                  className="max-h-[95vh] max-w-[95vw] w-auto rounded-2xl object-contain
                  "
                />

                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur cursor-pointer"
                >
                  <X />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
