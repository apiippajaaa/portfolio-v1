"use client";

import { SnapPage, Section } from "react-snap-page";

// import "react-snap-page/dist/index.css";

import HomeHeader from "./components/HomeHeader";
import HomeAbout from "./components/HomeAbout";
import HomeProjects from "./components/HomeProjects";
import GetInTouch from "./components/GetInTouch";
import Background from "./components/layouts/background/Background";

export default function Page() {
  return (
    <main className="relative overflow-hidden text-[#F5F5DC]">
      <Background />

      <SnapPage
        duration={950}
        threshold={70}
        wheel={true}
        touch={true}
        keyboard={true}
      >
        {/* HERO */}
        <Section className="min-h-dvh flex items-center justify-center px-6">
          <HomeHeader />
        </Section>

        {/* ABOUT */}
        <Section className="min-h-dvh flex items-center justify-center px-6">
          <div className="w-full max-w-5xl">
            <HomeAbout />
          </div>
        </Section>

        {/* PROJECTS */}
        <Section className="min-h-dvh flex items-center justify-center px-6">
          <div className="w-full max-w-5xl">
            <HomeProjects />
          </div>
        </Section>
        <Section className="min-h-dvh flex items-center justify-center px-6">
          <div className="w-full max-w-5xl">
            <GetInTouch />
          </div>
        </Section>
      </SnapPage>
    </main>
  );
}
