"use client";

import { ComponentType, useRef } from "react";
import { motion } from "framer-motion";

import SectionButton from "@/components/ui/SectionButton";
import { useSectionHash } from "@/hooks/useSectionHash";

import { hoverSlide } from "@/lib/motion/hover";
import { SPRING } from "@/lib/motion/transitions";
import { container, fadeUp, slide } from "@/lib/motion/variants";

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "./icons/SocialIcons";

type SocialItem = {
  name: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const SOCIALS: SocialItem[] = [
  {
    name: "Email",
    value: "afifmisbahuddin7@gmail.com",
    href: "mailto:afifmisbahuddin7@gmail.com",
    icon: MailIcon,
  },
  {
    name: "GitHub",
    value: "github.com/apiippajaaa",
    href: "https://github.com/apiippajaaa",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/afifmisbahuddin",
    href: "https://linkedin.com/in/afifmisbahuddin",
    icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    value: "@apiippajaaa",
    href: "https://wa.me/6285601569136",
    icon: InstagramIcon,
  },
];

const VIEWPORT = {
  once: false,
  amount: 0.2,
};

const ICON_HOVER = {
  rotate: -35,
  scale: 1.12,
  x: 3,
};

const ICON_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 15,
};

type SocialCardProps = SocialItem & {
  delay: number;
};

function SocialCard({ name, value, href, icon: Icon, delay }: SocialCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      transition={{
        ...SPRING,
        delay,
      }}
      whileHover={{
        scale: 1.025,
        y: -5,
        borderColor: "rgba(255,255,255,0.18)",
        backgroundColor: "rgba(255,255,255,0.06)",
      }}
      className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-white/3 px-4 py-4 backdrop-blur-md will-change-transform md:rounded-2xl md:px-5 md:py-5"
    >
      <div className="absolute inset-0 bg-linear-to-r from-white/5 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5F5DC]/35 md:text-xs">
          {name}
        </p>

        <motion.h3
          whileHover={hoverSlide}
          className="mt-1.5 truncate text-xs font-medium text-white sm:text-sm md:text-lg"
        >
          {value}
        </motion.h3>
      </div>

      <motion.div
        whileHover={ICON_HOVER}
        transition={ICON_TRANSITION}
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors group-hover:border-white/20 md:h-11 md:w-11"
      >
        <Icon className="h-4 w-4 fill-current md:h-5 md:w-5" />
      </motion.div>
    </motion.a>
  );
}

function ContactIntro() {
  return (
    <motion.div
      variants={slide(-40)}
      className="flex flex-col items-center text-center md:items-start md:text-left"
    >
      <motion.p
        variants={fadeUp}
        className="text-[10px] uppercase tracking-[0.3em] text-[#F5F5DC]/40 md:text-xs"
      >
        Get In Touch
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="mt-4 max-w-lg text-3xl font-semibold leading-[0.92] tracking-tighter sm:text-4xl md:text-6xl"
      >
        Let&apos;s create something
        <span className="text-yellow-400"> Great!</span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-5 max-w-[18rem] text-xs leading-relaxed text-[#F5F5DC]/55 sm:max-w-sm sm:text-sm md:text-base"
      >
        Available for freelance work, startup ideas, creative collaboration, and
        modern web experiences.
      </motion.p>

      <SectionButton
        href="mailto:afifmisbahuddin7@gmail.com"
        variant="yellow"
        size="lg"
        className="mt-6"
      >
        Let&apos;s Talk
      </SectionButton>
    </motion.div>
  );
}

function ContactLinks() {
  return (
    <motion.div variants={slide(40)} className="space-y-3">
      {SOCIALS.map((social, index) => (
        <SocialCard key={social.name} {...social} delay={index * 0.05} />
      ))}

      <motion.p
        variants={fadeUp}
        className="pt-2 text-center text-[10px] text-[#F5F5DC]/25 md:text-left md:text-xs"
      >
        © {new Date().getFullYear()} Nur Afif Misbahuddin
      </motion.p>
    </motion.div>
  );
}

export default function GetInTouch() {
  const ref = useRef<HTMLElement>(null);

  useSectionHash(ref, "getInTouch");

  return (
    <section
      ref={ref}
      id="getInTouch"
      className="relative flex w-full items-center"
    >
      <motion.div
        variants={container()}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid w-full items-center gap-8 md:grid-cols-2 md:gap-14"
      >
        <ContactIntro />
        <ContactLinks />
      </motion.div>
    </section>
  );
}
