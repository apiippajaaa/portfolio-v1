"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  videoUrl: string | null;
  onClose: () => void;
};

export default function VideoPreviewModal({ videoUrl, onClose }: Props) {
  useEffect(() => {
    if (!videoUrl) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoUrl, onClose]);

  return (
    <AnimatePresence>
      {videoUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="
            fixed inset-0 z-[9999]
            bg-black/80
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex h-full w-full
              items-center justify-center
              p-4 md:p-8
            "
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={onClose}
              className="
                absolute right-4 top-4 z-30
                flex h-11 w-11 items-center justify-center
                rounded-full
                border border-white/10
                bg-white/10
                text-white
                backdrop-blur-md
                transition-all duration-200
                hover:bg-white/20
              "
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full
                max-w-6xl
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-black
                shadow-2xl
              "
            >
              <div className="aspect-video">
                <video
                  autoPlay
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
