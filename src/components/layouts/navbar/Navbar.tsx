"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import NavbarMenu from "./NavbarMenu";
import NavbarToggle from "./NavbarToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <NavbarToggle open={open} onToggle={() => setOpen((prev) => !prev)} />

      <AnimatePresence mode="wait">
        {open && <NavbarMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
