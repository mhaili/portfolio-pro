"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Prelude from "@/components/Prelude";
import FilmGrain from "@/components/FilmGrain";

const Hero            = dynamic(() => import("@/components/Hero"),              { ssr: false });
// const PinnedStatement = dynamic(() => import("@/components/PinnedStatement"),   { ssr: false });
const MapSection      = dynamic(() => import("@/components/MapSection"),        { ssr: false });
const HorizontalJourney = dynamic(() => import("@/components/HorizontalJourney"), { ssr: false });
const Projects        = dynamic(() => import("@/components/Projects"),          { ssr: false });
const Skills          = dynamic(() => import("@/components/Skills"),            { ssr: false });
const Vision          = dynamic(() => import("@/components/Vision"),            { ssr: false });
const VideoCV         = dynamic(() => import("@/components/VideoCV"),           { ssr: false });
const PersonalProjects = dynamic(() => import("@/components/PersonalProjects"),  { ssr: false });
const Contact         = dynamic(() => import("@/components/Contact"),           { ssr: false });
const Marquee         = dynamic(() => import("@/components/Marquee"),           { ssr: false });
const CustomCursor    = dynamic(() => import("@/components/CustomCursor"),      { ssr: false });
const Navigation      = dynamic(() => import("@/components/Navigation"),        { ssr: false });
const SmoothScroll    = dynamic(() => import("@/components/SmoothScroll"),      { ssr: false });
const ScrollProgress  = dynamic(() => import("@/components/ScrollProgress"),    { ssr: false });

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Prelude onComplete={() => setReady(true)} />}

      <FilmGrain />
      <CustomCursor />
      <ScrollProgress />

      <SmoothScroll>
        <main style={{ opacity: ready ? 1 : 0, transition: "opacity 0.5s ease" }}>
          <Navigation />

          {/* 01 — Hero */}
          <div id="hero">
            <Hero />
          </div>

          {/* Marquee strip */}
          <Marquee />

          {/* 02 — La citation qui s'allume mot par mot */}
          {/* <PinnedStatement /> */}

          {/* 03 — Carte Méditerranée */}
          <div id="carte">
            <MapSection />
          </div>

          {/* 04 — Parcours horizontal (Marrakech → EFREI) */}
          <HorizontalJourney />

          {/* 05 — Projets */}
          <div id="projets">
            <Projects />
          </div>

          {/* 06 — Compétences */}
          <div id="competences">
            <Skills />
          </div>

          {/* Projets perso & scolaires */}
          <div id="perso">
            <PersonalProjects />
          </div>

          {/* Archive — CV vidéo anglais */}
          <VideoCV />

          {/* 07 — Vision */}
          <div id="vision">
            <Vision />
          </div>

          {/* Marquee inversé */}
          <Marquee reverse />

          {/* 08 — Contact */}
          <div id="contact">
            <Contact />
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
