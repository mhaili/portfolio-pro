"use client";

import { useState } from "react";

type Category = "Tout" | "Applications Web" | "Expérimentations";

const PROJECTS: {
  title: string;
  desc: string;
  tech: string[];
  category: Exclude<Category, "Tout">;
  github?: string;
  live?: string;
  bg: string;
  screenshots?: string[];
}[] = [
  {
    title: "Autodiag Particuliers",
    desc: "Outil de diagnostic en ligne développé pour la cellule de prévention technique de la Gendarmerie Nationale. Permet aux particuliers d'évaluer les risques d'intrusion de leur domicile et d'obtenir des recommandations personnalisées ainsi qu'un rapport PDF.",
    tech: ["Vue.js", "JavaScript", "PDF", "Gendarmerie"],
    category: "Applications Web",
    github: "https://github.com/mhaili/autodiag-particuliers",
    live: "https://gendarmerienationale.github.io/autodiag-particuliers/",
    bg: "#1C1917",
  },
  {
    title: "Learn@Home",
    desc: "Plateforme de mise en relation entre élèves en difficulté scolaire et bénévoles pour du soutien à distance. Application mobile Flutter et interface web Angular connectées à Firebase.",
    tech: ["Angular", "Flutter", "Firebase", "Mobile", "Web"],
    category: "Applications Web",
    github: "https://gitlab.com/mhaili/learn-home",
    bg: "#2A3447",
    screenshots: ["/learnahome1.png", "/learnahome2.png", "/learnahome3.png", "/learnahome4.png", "/learnahome5.png", "/learnahome6.png", "/learnahome7.png", "/learnahome8.png", "/learnahome9.png"],
  },
  {
    title: "Shader Shippou",
    desc: "Expérimentation visuelle en temps réel avec des shaders GLSL. Rendu géométrique inspiré des motifs japonais shippou, entièrement généré par le GPU.",
    tech: ["GLSL", "WebGL", "Shader", "Temps réel"],
    category: "Expérimentations",
    github: "https://github.com/mhaili/shader-shippou",
    live: "https://mhaili.github.io/shader-shippou/",
    bg: "#2A3447",
  },
];

const CATEGORIES: Category[] = ["Tout", "Applications Web", "Expérimentations"];

export default function PersonalProjects() {
  const [active, setActive] = useState<Category>("Tout");

  const filtered = active === "Tout"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  return (
    <section
      id="perso"
      style={{ background: "#1C1917", padding: "12vh 8vw", position: "relative", overflow: "hidden" }}
    >
      {/* Decorative bg word */}
      <div aria-hidden style={{
        position: "absolute",
        top: "3vh", right: "-1vw",
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "clamp(80px,15vw,200px)",
        color: "rgba(245,240,232,0.03)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        Perso.
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          color: "#B5673C",
          marginBottom: "16px",
        }}>
          PROJETS PERSONNELS & SCOLAIRES
        </p>

        <h2 style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(32px, 5.5vw, 76px)",
          color: "#F5F0E8",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "6vh",
        }}>
          Ce que je construis<br />quand personne ne regarde.
        </h2>

        {/* Category filter */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "6vh", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "10px",
                letterSpacing: "0.14em",
                color: active === cat ? "#1C1917" : "#F5F0E8",
                background: active === cat ? "#C9AA7C" : "transparent",
                border: `1px solid ${active === cat ? "#C9AA7C" : "rgba(245,240,232,0.2)"}`,
                borderRadius: "100px",
                padding: "8px 20px",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {filtered.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, desc, tech, github, live, bg, screenshots }: typeof PROJECTS[0]) {
  const [hovered,    setHovered]    = useState(false);
  const [slideOpen,  setSlideOpen]  = useState(false);
  const [current,    setCurrent]    = useState(0);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => (i - 1 + (screenshots?.length ?? 1)) % (screenshots?.length ?? 1)); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => (i + 1) % (screenshots?.length ?? 1)); };

  return (
    <>
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(245,240,232,0.04)" : "rgba(245,240,232,0.02)",
        border: `1px solid ${hovered ? "rgba(201,170,124,0.3)" : "rgba(245,240,232,0.08)"}`,
        borderRadius: "8px",
        padding: "28px",
        transition: "border-color 0.3s ease, background 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Color accent bar */}
      <div style={{
        width: "32px",
        height: "3px",
        background: bg,
        borderRadius: "2px",
        transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
        ...(hovered ? { width: "56px" } : {}),
      }} />

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "clamp(20px, 2.2vw, 30px)",
        color: "#F5F0E8",
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: "13px",
        color: "#E2C9B0",
        opacity: 0.7,
        lineHeight: 1.7,
        flex: 1,
      }}>
        {desc}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tech.map((t) => (
          <span key={t} style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            letterSpacing: "0.12em",
            color: "#C9AA7C",
            border: "1px solid rgba(201,170,124,0.25)",
            borderRadius: "3px",
            padding: "3px 9px",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
        {github && <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            color: "#F5F0E8",
            textDecoration: "none",
            border: "1px solid rgba(245,240,232,0.2)",
            borderRadius: "100px",
            padding: "7px 16px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            transition: "border-color 0.25s, background 0.25s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,240,232,0.5)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,240,232,0.06)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,240,232,0.2)";
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>}
        {screenshots && screenshots.length > 0 && (
          <button
            onClick={() => { setSlideOpen(true); setCurrent(0); }}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "#F5F0E8",
              background: "transparent",
              border: "1px solid rgba(245,240,232,0.2)",
              borderRadius: "100px",
              padding: "7px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              transition: "border-color 0.25s, background 0.25s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(181,103,60,0.6)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(181,103,60,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,232,0.2)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B5673C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            Aperçu
          </button>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              color: "#1C1917",
              textDecoration: "none",
              background: "#C9AA7C",
              borderRadius: "100px",
              padding: "7px 16px",
              transition: "opacity 0.25s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            Voir le projet →
          </a>
        )}
      </div>
    </div>

    {/* Slideshow modal */}
    {slideOpen && screenshots && (
      <div style={{ position: "fixed", inset: 0, zIndex: 999 }}>

        {/* Backdrop cliquable */}
        <div
          onClick={() => setSlideOpen(false)}
          style={{
            position: "absolute", inset: 0,
            background: "rgba(10,6,2,0.94)",
            backdropFilter: "blur(16px)",
            cursor: "zoom-out",
          }}
        />

        {/* Contenu centré — z-index supérieur, aucun stopPropagation nécessaire */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "24px",
          pointerEvents: "none",
        }}>
          {/* Tous les enfants re-activent les events */}
          <button onClick={() => setSlideOpen(false)} style={{
            pointerEvents: "auto",
            position: "absolute", top: "4vh", right: "4vw",
            background: "none", border: "1px solid rgba(201,170,124,0.4)",
            borderRadius: "50%", width: "38px", height: "38px",
            cursor: "pointer", color: "#C9AA7C", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>

          <p style={{
            pointerEvents: "none",
            fontFamily: "var(--font-dm-sans)", fontSize: "9px",
            letterSpacing: "0.24em", color: "#C9AA7C", opacity: 0.5,
          }}>
            {current + 1} / {screenshots.length}
          </p>

          <img src={screenshots[current]} alt="" style={{
            pointerEvents: "none",
            maxWidth: "88vw", maxHeight: "72vh",
            objectFit: "contain", borderRadius: "8px",
            boxShadow: "0 20px 80px rgba(0,0,0,0.6)", display: "block",
          }} />

          <div style={{ pointerEvents: "auto", display: "flex", gap: "16px", alignItems: "center" }}>
            <button onClick={prev} style={{
              background: "none", border: "1px solid rgba(201,170,124,0.4)",
              borderRadius: "50%", width: "44px", height: "44px",
              cursor: "pointer", color: "#C9AA7C", fontSize: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>←</button>

            <div style={{ display: "flex", gap: "8px" }}>
              {screenshots.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: i === current ? "20px" : "6px", height: "6px",
                  borderRadius: "3px",
                  background: i === current ? "#C9AA7C" : "rgba(201,170,124,0.3)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.3s ease, background 0.3s ease",
                }} />
              ))}
            </div>

            <button onClick={next} style={{
              background: "none", border: "1px solid rgba(201,170,124,0.4)",
              borderRadius: "50%", width: "44px", height: "44px",
              cursor: "pointer", color: "#C9AA7C", fontSize: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>→</button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
