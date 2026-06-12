"use client";

import { useEffect, useRef, useState } from "react";

type RevealOptions = {
  threshold?: number;
  once?: boolean;
};

export function useReveal({
  threshold = 0.15,
  once = true,
}: RevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  return {
    ref,
    visible,
  };
}