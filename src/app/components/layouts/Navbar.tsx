"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Contact",
    href: "/#getInTouch",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{
          scale: 1.03,
          y: -1,
        }}
        whileTap={{
          scale: 0.96,
        }}
        onClick={() => setOpen(!open)}
        className="fixed top-5 right-5 z-[100] w-[60px] h-[60px] rounded-[20px] overflow-hidden group"
      >
        {/* Main Surface */}
        <div className="absolute inset-0 rounded-[20px] bg-[#0F52BA] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),inset_0_-6px_12px_rgba(0,0,0,0.22),0_10px_30px_rgba(15,82,186,0.35),0_2px_10px_rgba(0,0,0,0.25)]" />

        {/* Top Highlight */}
        <div className="absolute top-0 left-0 w-full h-[45%] rounded-t-[20px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        {/* Edge Glow */}
        <div className="absolute inset-0 rounded-[20px] ring-1 ring-white/10 group-hover:ring-white/20 transition duration-500" />

        {/* Inner Glow */}
        <div className="absolute inset-[1px] rounded-[19px] bg-gradient-to-br from-white/[0.06] via-transparent to-black/10" />

        {/* Hamburger */}
        <motion.div
          animate={open ? "open" : "closed"}
          className="relative w-6 h-6 z-10 mx-auto"
        >
          {/* Top */}
          <motion.span
            variants={{
              closed: {
                rotate: 0,
                y: -7,
              },
              open: {
                rotate: 45,
                y: 0,
              },
            }}
            transition={{
              duration: 0.35,
            }}
            className="absolute left-0 top-1/2 w-6 h-[2px] rounded-full bg-[#F5F5DC] shadow-[0_0_10px_rgba(245,245,220,0.35)]"
          />

          {/* Middle */}
          <motion.span
            variants={{
              closed: {
                opacity: 1,
              },
              open: {
                opacity: 0,
              },
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute left-0 top-1/2 w-6 h-0.5 rounded-full bg-[#F5F5DC]"
          />

          {/* Bottom */}
          <motion.span
            variants={{
              closed: {
                rotate: 0,
                y: 7,
              },
              open: {
                rotate: -45,
                y: 0,
              },
            }}
            transition={{
              duration: 0.35,
            }}
            className="absolute left-0 top-1/2 w-6 h-[2px] rounded-full bg-[#F5F5DC] shadow-[0_0_10px_rgba(245,245,220,0.35)]"
          />
        </motion.div>
      </motion.button>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="fixed inset-0 z-50 bg-[#0F52BA]/95 backdrop-blur-3xl"
          >
            {/* Blur Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />

            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F5F5DC]/10 blur-3xl" />

            {/* Links */}
            <div className="relative h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-8">
                {links.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-[#F5F5DC] text-5xl md:text-7xl font-semibold tracking-tight hover:text-yellow-400 transition"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
