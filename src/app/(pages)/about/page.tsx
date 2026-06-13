"use client";

import Footer from "@/components/layouts/Footer";
import GetInTouch from "./sections/GetInTouch";
import AboutHeader from "./sections/Header";
import Journey from "./sections/journey/Journey";
import Philosophy from "./sections/Philosophy";
import Skills from "./sections/skills/Skills";

export default function About() {
  return (
    <>
      <section className="w-full max-w-6xl mx-auto ">
        <section
          id="about"
          className="min-h-screen snap-start flex items-center  relative"
        >
          <AboutHeader />
        </section>
        <Skills />
        <Journey />
        <Philosophy />
        <GetInTouch />
        <Footer />
      </section>
    </>
  );
}
