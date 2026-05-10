"use client";

import BackgroundEffects from "@/app/components/layouts/background/Background";
import AboutHeader from "./components/Header";
import Journey from "./components/Journey";
import Philosophy from "./components/Philosophy";
import Skills from "./components/Skills";
import Background from "@/app/components/layouts/background/Background";
import GetInTouch from "./components/GetInTouch";
import Footer from "@/app/components/layouts/Footer";

export default function About() {
  return (
    <>
      <Background />
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
