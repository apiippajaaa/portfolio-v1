"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { DesignProject } from "@/types/projects";
import { fadeUp } from "@/lib/motion/variants";

type Props = {
  projects: DesignProject[];
};

export default function DesignCard({ projects }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closePreview = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, closePreview]);

  return (
    <>
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 [column-fill:balance]">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="mb-4 break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(project.cover)}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl"
            >
              <Image
                src={project.cover}
                alt={`Design ${project.id}`}
                width={1200}
                height={1600}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                placeholder="blur"
                blurDataURL={project.cover}
              />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedImage &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePreview}
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
                  className="max-h-[95vh] max-w-[95vw] w-auto rounded-2xl object-contain"
                />

                <button
                  type="button"
                  onClick={closePreview}
                  aria-label="Close preview"
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
                >
                  <X size={18} />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
