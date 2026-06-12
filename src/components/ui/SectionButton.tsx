"use client";

import Link from "next/link";

import { memo, type ReactNode } from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "./Button";

import { cn } from "@/lib/utils";
import { SPRING } from "@/lib/motion/transitions";

type SectionButtonProps = {
  children: ReactNode;

  href?: string;
  external?: boolean;

  onClick?: () => void;

  disabled?: boolean;

  type?: "button" | "submit" | "reset";

  variant?: "yellow" | "glass" | "ghost" | "outline" | "danger";

  size?: "sm" | "md" | "lg" | "xl" | "icon";

  className?: string;

  showArrow?: boolean;
};

const motionProps = {
  whileHover: {
    scale: 1.03,
    y: -2,
  },
  whileTap: {
    scale: 0.98,
  },
  transition: SPRING,
} as const;

const MotionButton = motion.button;
const MotionDiv = motion.div;

const AnimatedArrow = memo(function AnimatedArrow() {
  return (
    <motion.span
      className="relative z-10"
      animate={{
        x: [0, 4, 0],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <ArrowRight className="size-4" />
    </motion.span>
  );
});

function GlowOverlay() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-inherit">
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-r from-white/10 via-transparent to-white/10" />
    </span>
  );
}

function ButtonContent({
  children,
  showArrow,
}: {
  children: ReactNode;
  showArrow: boolean;
}) {
  return (
    <>
      <span className="relative z-10">{children}</span>

      {showArrow && <AnimatedArrow />}

      <GlowOverlay />
    </>
  );
}

export default function SectionButton({
  children,
  href,
  external = false,

  onClick,
  disabled = false,
  type = "button",

  variant = "yellow",
  size = "md",

  className,
  showArrow = true,
}: SectionButtonProps) {
  const classes = cn(
    "group relative overflow-hidden",
    buttonVariants({
      variant,
      size,
    }),
    className
  );

  const content = (
    <ButtonContent showArrow={showArrow}>{children}</ButtonContent>
  );

  if (href) {
    return (
      <MotionDiv {...motionProps} className="inline-flex">
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={classes}
        >
          {content}
        </Link>
      </MotionDiv>
    );
  }

  return (
    <MotionButton
      {...motionProps}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {content}
    </MotionButton>
  );
}
