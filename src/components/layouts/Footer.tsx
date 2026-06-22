"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-6 md:mt-6 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-5 md:px-0 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-0 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500"
        >
          <p>
            © {new Date().getFullYear()} Afif Misbahuddin. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-white flex gap-1 items-center">
              Crafted with <Heart size={14} fill="#fff" />
            </span>
            <span className="opacity-60">—</span>
            <span className="text-white">Indonesia</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
