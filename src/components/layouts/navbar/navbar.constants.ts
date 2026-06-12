export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/#getInTouch" },
  ] as const;
  
  export const MENU_TRANSITION = {
    duration: 0.3,
  };
  
  export const MENU_CORNERS = [
    "top-10 left-10 border-t border-l",
    "top-10 right-10 border-t border-r",
    "bottom-10 left-10 border-b border-l",
    "bottom-10 right-10 border-b border-r",
  ] as const;