"use client";

import { useEffect } from "react";
import { SnapPage, Section } from "react-snap-page";

import HomeHeader from "./components/HomeHeader";
import HomeAbout from "./components/HomeAbout";
import HomeProjects from "./components/HomeProjects";
import GetInTouch from "./components/GetInTouch";

export default function Page() {
  useEffect(() => {
    document.body.classList.add("home-scroll-lock");

    return () => {
      document.body.classList.remove("home-scroll-lock");
    };
  }, []);

  return (
    <main className="relative text-[#F5F5DC]">
      <SnapPage duration={950} threshold={70} wheel touch keyboard>
        <Section className="flex min-h-dvh items-center justify-center px-6">
          <HomeHeader />
        </Section>

        <Section className="flex min-h-dvh items-center justify-center px-6">
          <div className="w-full max-w-5xl">
            <HomeAbout />
          </div>
        </Section>

        <Section className="flex min-h-dvh items-center justify-center px-6">
          <div className="w-full max-w-5xl">
            <HomeProjects />
          </div>
        </Section>

        <Section className="flex min-h-dvh items-center justify-center px-6">
          <div className="w-full max-w-5xl">
            <GetInTouch />
          </div>
        </Section>
      </SnapPage>
    </main>
  );
}
