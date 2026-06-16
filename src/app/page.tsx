"use client";

import { FullSnapProvider, FullSnapWrapper, Section } from "fullsnap";
import HomeHeader from "./components/HomeHeader";
import HomeAbout from "./components/HomeAbout";
import HomeProjects from "./components/HomeProjects";
import GetInTouch from "./components/GetInTouch";

const sections = [
  {
    anchor: "home",
    component: <HomeHeader />,
    maxWidth: "max-w-none",
  },
  {
    anchor: "about",
    component: <HomeAbout />,
    maxWidth: "max-w-5xl",
  },
  {
    anchor: "projects",
    component: <HomeProjects />,
    maxWidth: "max-w-5xl",
  },
  {
    anchor: "contact",
    component: <GetInTouch />,
    maxWidth: "max-w-5xl",
  },
];

export default function Page() {
  return (
    <FullSnapProvider
      anchors={sections.map((s) => s.anchor)}
      scrollingSpeed={850}
    >
      <main className="text-[#F5F5DC]">
        <FullSnapWrapper>
          {sections.map((section) => (
            <Section key={section.anchor}>
              <div className="flex h-dvh items-center justify-center px-6">
                <div className={`w-full ${section.maxWidth}`}>
                  {section.component}
                </div>
              </div>
            </Section>
          ))}
        </FullSnapWrapper>
      </main>
    </FullSnapProvider>
  );
}
