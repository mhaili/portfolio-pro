"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { bp } from "@/lib/basePath";

const PROJECTS = [
  {
    number: "01",
    title: "Gendarmerie Nationale",
    subtitle: "Portail de Prévention · 2024 — 2026",
    tags: ["Vue.js", "Node.js", "PostgreSQL", "FranceConnect", "DSFR"],
    desc: "Développement d'un portail numérique destiné aux citoyens, collectivités et entreprises pour faciliter l'accès aux actions de prévention de la Gendarmerie Nationale.\n\nConception et développement Full Stack des fonctionnalités de prise de rendez-vous, gestion des offres de prévention, authentification FranceConnect et suivi des demandes.\n\nUn projet où accessibilité, sécurité et service public se rencontrent pour créer des outils utiles au quotidien.",
    note: "Service public · Full Stack · Accessibilité · Sécurité",
    bg: "#1C1917",
    textColor: "#F5F0E8",
    accent: "#C9AA7C",
    photo: `${bp}/binome-alternants-gendarmerie-1.webp`,
    logo: `${bp}/logo_gendarmerie.png`,
    confidential: true,
    flip: false,
    screenshots: [1,2,3,4,5].map(n => `${bp}/portail${n}.png`),
  },
  {
    number: "02",
    title: "Citerneo — Transformation Digitale",
    subtitle: "Amboise · Alternance 2023 — 2024",
    tags: ["Vue.js", "Bootstrap", "Figma", "Photoshop", "Orchard CMS"],
    desc: "Participation à la refonte complète de l'écosystème web du groupe Citerneo afin de moderniser son image de marque et renforcer sa présence en ligne.\n\nConception de maquettes, développement d'interfaces responsive, amélioration de l'expérience utilisateur et modernisation de plusieurs sites vitrines et e-commerce du groupe.\n\nCollaboration étroite avec les équipes communication, design et informatique autour d'un objectif commun : rendre les produits plus visibles, plus accessibles et plus performants commercialement.",
    note: null,
    bg: "#F5F0E8",
    textColor: "#1C1917",
    accent: "#B5673C",
    photo: `${bp}/citerneo.jpg`,
    logo: `${bp}/Logo_CITERNEO.png`,
    confidential: false,
    flip: true,
    screenshots: [`${bp}/citerneo1.png`, `${bp}/citerneo2.png`, `${bp}/citerneo4.webp`, `${bp}/citerneo5.webp`],
  },
  {
    number: "03",
    title: "INRAE — Recherche, Identité & Transmission",
    subtitle: "Nouzilly · Stage Avril — Juin 2023",
    tags: ["eZ Platform", "HTML/CSS", "Photoshop", "Illustrator", "Communication"],
    desc: "Au sein de l'Unité Mixte de Recherche Infectiologie et Santé Publique (UMR ISP), j'ai participé à la modernisation de sa présence numérique à travers plusieurs projets stratégiques.\n\nJ'ai assuré la reprise complète des sites web français et anglais après leur migration vers eZ Platform : audit des contenus, nettoyage du back-office, correction des liens, réorganisation de la médiathèque, adaptation des mises en page et optimisation de l'expérience utilisateur sur desktop et mobile.\n\nEn parallèle, j'ai conçu plusieurs propositions de logo pour renforcer l'identité visuelle de l'unité de recherche, en respectant les contraintes scientifiques et institutionnelles de l'INRAE.\n\nJ'ai également réalisé un nouveau trombinoscope regroupant plus de 170 collaborateurs : prises de vue, retouches, collecte des informations et conception du document final.",
    note: null,
    bg: "#E2C9B0",
    textColor: "#1C1917",
    accent: "#2A3447",
    photo: `${bp}/inrae.png`,
    logo: `${bp}/Logo-INRAE_Transparent.svg.png`,
    confidential: false,
    flip: false,
    screenshots: [`${bp}/inrae1.png`, `${bp}/inrae2.jpg`, `${bp}/inrae3.jpg`, `${bp}/inrae4.png`, `${bp}/inrae5.png`],
  },
];

export default function Projects() {
  return (
    <section id="projets" style={{ background: "#F5F0E8" }}>
      {/* Section header */}
      <div
        style={{
          padding: "12vh 8vw 6vh",
          borderBottom: "1px solid rgba(28,25,23,0.08)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            color: "#B5673C",
            marginBottom: "16px",
          }}
        >
          RÉALISATIONS
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(40px, 7vw, 100px)",
            color: "#1C1917",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            maxWidth: "700px",
          }}
        >
          Ce que j'ai<br />construit.
        </h2>
      </div>

      {/* Projects */}
      {PROJECTS.map((p, i) => (
        <ProjectRow key={p.number} project={p} index={i} />
      ))}

      {/* CTA for future projects */}
      <FutureProjects />
    </section>
  );
}

function ProjectRow({
  project: p,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "85vh",
        background: p.bg,
        borderBottom: "1px solid rgba(28,25,23,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Image side */}
      {!p.flip && (
        <ImagePanel
          photo={p.photo}
          logo={p.logo}
          confidential={p.confidential}
          accent={p.accent}
          index={index}
          screenshots={p.screenshots}
        />
      )}

      {/* Text side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "8vh 6vw",
          order: p.flip ? -1 : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "28px" }}>
          <span
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: p.accent,
              opacity: 0.6,
              marginTop: "6px",
            }}
          >
            {p.number}
          </span>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 60px)",
                color: p.textColor,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: p.accent,
                opacity: 0.65,
              }}
            >
              {p.subtitle.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "28px",
          }}
        >
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: p.textColor,
                border: `1px solid ${p.accent}`,
                padding: "4px 12px",
                opacity: 0.6,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.8vw, 22px)",
            color: p.textColor,
            lineHeight: 1.75,
            opacity: 0.85,
            maxWidth: "520px",
            marginBottom: p.note ? "24px" : "0",
            whiteSpace: "pre-line",
          }}
        >
          {p.desc}
        </p>

        {/* Note */}
        {p.note && (
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "11px",
              letterSpacing: "0.04em",
              color: p.accent,
              opacity: 0.55,
              fontStyle: "italic",
              borderLeft: `2px solid ${p.accent}`,
              paddingLeft: "16px",
              maxWidth: "400px",
            }}
          >
            {p.note}
          </p>
        )}
      </div>

      {/* Image side (right) */}
      {p.flip && (
        <ImagePanel
          photo={p.photo}
          logo={p.logo}
          confidential={p.confidential}
          accent={p.accent}
          index={index}
          screenshots={p.screenshots}
        />
      )}
    </div>
  );
}

function ImagePanel({
  photo,
  logo,
  confidential,
  accent,
  index,
  screenshots,
}: {
  photo: string;
  logo: string;
  confidential: boolean;
  accent: string;
  index: number;
  screenshots?: string[];
}) {
  const [slideOpen, setSlideOpen] = useState(false);
  const [current,   setCurrent]   = useState(0);

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => (i - 1 + (screenshots?.length ?? 1)) % (screenshots?.length ?? 1)); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(i => (i + 1) % (screenshots?.length ?? 1)); };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderLeft: index % 2 !== 0 ? `1px solid ${accent}15` : "none",
        borderRight: index % 2 === 0 ? `1px solid ${accent}15` : "none",
      }}
    >
      {/* Photo background */}
      <Image
        src={photo}
        alt=""
        fill
        sizes="50vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          filter: confidential ? "grayscale(30%) brightness(0.6)" : "brightness(0.88)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: confidential
            ? "linear-gradient(135deg, rgba(28,25,23,0.7) 0%, rgba(28,25,23,0.3) 100%)"
            : "linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo badge — outer positionne, inner donne le contexte relatif pour fill */}
      <div style={{
        position: "absolute",
        bottom: "5vh",
        left: "5vw",
        width: "clamp(48px, 6vw, 80px)",
        height: "clamp(48px, 6vw, 80px)",
      }}>
        <div style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "rgba(245,240,232,0.95)",
          borderRadius: "50%",
          overflow: "hidden",
          border: `1px solid ${accent}40`,
        }}>
          <Image
            src={logo}
            alt=""
            fill
            sizes="80px"
            style={{ objectFit: "contain", padding: "10px" }}
          />
        </div>
      </div>

      {/* Confidential stamp */}
      {confidential && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: `1px solid ${accent}`,
            padding: "10px 20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "9px",
              letterSpacing: "0.35em",
              color: accent,
              opacity: 0.85,
            }}
          >
            CONFIDENTIEL
          </p>
        </div>
      )}

      {/* Eye button — visible only if screenshots exist */}
      {screenshots && screenshots.length > 0 && (
        <button
          onClick={() => { setSlideOpen(true); setCurrent(0); }}
          style={{
            position: "absolute",
            top: "5vh",
            right: "5vw",
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: `rgba(10,6,2,0.85)`,
            backdropFilter: "blur(10px)",
            border: "1.5px solid #B5673C",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "box-shadow 0.3s",
            zIndex: 5,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(181,103,60,0.7)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
          aria-label="Voir les captures"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B5673C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      )}

      {/* Slideshow modal */}
      {slideOpen && screenshots && (
        <div
          onClick={() => setSlideOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(10,6,2,0.94)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {/* Close */}
          <button
            onClick={() => setSlideOpen(false)}
            style={{
              position: "absolute",
              top: "4vh",
              right: "4vw",
              background: "none",
              border: `1px solid ${accent}40`,
              borderRadius: "50%",
              width: "38px",
              height: "38px",
              cursor: "pointer",
              color: accent,
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >✕</button>

          {/* Counter */}
          <p style={{
            position: "absolute",
            top: "5vh",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            letterSpacing: "0.24em",
            color: accent,
            opacity: 0.5,
          }}>
            {current + 1} / {screenshots.length}
          </p>

          {/* Image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: "relative", maxWidth: "88vw", maxHeight: "76vh" }}
          >
            <img
              src={screenshots[current]}
              alt=""
              style={{
                maxWidth: "88vw",
                maxHeight: "76vh",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
                display: "block",
              }}
            />
          </div>

          {/* Prev / Next */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ display: "flex", gap: "16px", alignItems: "center" }}
          >
            <button onClick={prev} style={{
              background: "none",
              border: `1px solid ${accent}40`,
              borderRadius: "50%",
              width: "44px", height: "44px",
              cursor: "pointer",
              color: accent,
              fontSize: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>←</button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "8px" }}>
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setCurrent(i); }}
                  style={{
                    width: i === current ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: i === current ? accent : `${accent}40`,
                    border: "none",
                    cursor: "pointer",
                    transition: "width 0.3s ease, background 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button onClick={next} style={{
              background: "none",
              border: `1px solid ${accent}40`,
              borderRadius: "50%",
              width: "44px", height: "44px",
              cursor: "pointer",
              color: accent,
              fontSize: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FutureProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        padding: "8vh 8vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
        background: "#F5F0E8",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            color: "#B5673C",
            marginBottom: "12px",
          }}
        >
          EN COURS · SEP 2026
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(20px, 3vw, 38px)",
            color: "#1C1917",
            letterSpacing: "-0.01em",
          }}
        >
          Les prochains projets s'écrivent avec vous.
        </p>
      </div>
      <a
        href="#contact"
        data-cursor
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: "#1C1917",
          textDecoration: "none",
          border: "1px solid rgba(28,25,23,0.25)",
          padding: "14px 28px",
          transition: "background 0.3s ease, color 0.3s ease",
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#1C1917";
          (e.currentTarget as HTMLElement).style.color = "#F5F0E8";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#1C1917";
        }}
      >
        ME CONTACTER →
      </a>
    </div>
  );
}
