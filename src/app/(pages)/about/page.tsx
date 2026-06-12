"use client";

import Philosophy from "./components/Philosophy";
import GetInTouch from "./components/GetInTouch";
import Footer from "@/components/layouts/Footer";
import Skills from "./components/skills/Skills";
import Journey from "./components/journey/Journey";
import AboutHeader from "./components/Header";

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
