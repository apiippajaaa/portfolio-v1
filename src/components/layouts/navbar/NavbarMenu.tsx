"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { menuVariants } from "./navbar.animations";
import { MENU_CORNERS, MENU_TRANSITION, NAV_LINKS } from "./navbar.constants";

type NavbarMenuProps = {
  onClose: () => void;
};

export default function NavbarMenu({ onClose }: NavbarMenuProps) {
  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={MENU_TRANSITION}
      className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-3xl"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-yellow-400/30 to-transparent" />

      {MENU_CORNERS.map((corner) => (
        <div
          key={corner}
          className={`absolute h-20 w-20 border-white/10 ${corner}`}
        />
      ))}

      <div className="absolute top-1/2 left-0 h-px w-24 bg-linear-to-r from-white/20 to-transparent" />
      <div className="absolute top-1/2 right-0 h-px w-24 bg-linear-to-l from-white/20 to-transparent" />

      <nav className="relative flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="group relative block text-5xl font-semibold tracking-tight text-[#F5F5DC] transition-colors duration-300 hover:text-yellow-400 md:text-7xl"
              >
                {link.label}

                <span className="absolute -bottom-3 left-0 h-px w-0 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>
      </nav>
    </motion.div>
  );
}
