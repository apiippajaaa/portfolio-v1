export const EASE = [0.22, 1, 0.36, 1] as const;

export const SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 18,
};

export const SMOOTH_SPRING = {
  type: "spring" as const,
  stiffness: 140,
  damping: 18,
  mass: 0.9,
};

export const CAROUSEL_SPRING = {
    type: "spring" as const,
    stiffness: 180,
    damping: 18,
    mass: 0.8,
  };