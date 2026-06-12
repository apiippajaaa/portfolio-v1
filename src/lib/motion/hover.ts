    import { EASE } from "./transitions";

    export const hoverFloat = {
    y: -4,
    transition: {
        duration: 0.25,
        ease: EASE,
    },
    };

    export const hoverSlide = {
    x: 3,
    transition: {
        duration: 0.2,
        ease: EASE,
    },
    };

    export const hoverScale = {
    scale: 1.04,
    y: -3,
    };

    export const tapScale = {
    scale: 0.97,
    };