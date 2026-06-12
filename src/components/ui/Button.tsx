"use client";

import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "overflow-hidden rounded-full",
    "font-medium whitespace-nowrap",
    "transition-all duration-300",
    "outline-none",
    "select-none",
    "will-change-transform",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:ring-2 focus-visible:ring-yellow-400/40",
  ],

  {
    variants: {
      variant: {
        yellow: [
          "bg-yellow-400 text-black",
          "border border-yellow-400/80",
          "shadow-lg shadow-yellow-500/10",

          "hover:bg-yellow-300",
          "hover:border-yellow-300",
          "hover:shadow-[0_0_35px_rgba(250,204,21,0.35)]",
        ],

        glass: [
          "border border-white/10",
          "bg-white/[0.04]",
          "text-[#F5F5DC]/90",
          "backdrop-blur-xl",

          "hover:border-yellow-400/30",
          "hover:bg-white/[0.07]",
          "hover:text-white",
        ],

        ghost: ["text-[#F5F5DC]/70", "hover:bg-white/5", "hover:text-white"],

        outline: [
          "border border-white/15",
          "bg-transparent",
          "text-white",

          "hover:border-yellow-400/40",
          "hover:text-yellow-300",
        ],

        danger: ["bg-red-500/90", "text-white", "hover:bg-red-500"],
      },

      size: {
        sm: "h-9 px-4 text-xs",

        md: "h-11 px-5 text-sm",

        lg: "h-12 px-6 text-sm md:text-base",

        xl: "h-14 px-7 text-base",

        icon: "h-11 w-11",
      },
    },

    defaultVariants: {
      variant: "yellow",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
