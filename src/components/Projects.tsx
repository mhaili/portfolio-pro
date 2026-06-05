"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PROJECTS = [
  {
    number: "01",
    title: "Gendarmerie Nationale",
    subtitle: "Outils de gestion interne · 2024 — 2026",
    tags: ["Full Stack", "Sécurisé", "NestJS", "PostgreSQL"],
    desc: "Développement d'outils internes critiques pour la CPTM (Commandement pour les Territoires et leurs Missions numériques). Projet de prévention et diagnostic d'autoévaluation. Architecture sécurisée, gestion de données sensibles, enjeux institutionnels au plus haut niveau.",
    note: "Certains projets ne se montrent pas. Ce qui ne se voit pas est souvent le plus important.",
    bg: "#1C1917",
    textColor: "#F5F0E8",
    accent: "#C9AA7C",
    photo: "/binome-alternants-gendarmerie-1.jpg",
    logo: "/logo_gendarmerie.png",
    confidential: true,
    flip: false,
  },
  {
    number: "02",
    title: "Citerneo — Plateformes E-commerce",
    subtitle: "Amboise · Alternance 2023 → 2024",
    tags: ["C#", "VueJs", "Orchard CMS", "E-commerce"],
    desc: "Refonte complète du site corporate de l'entreprise et développement de 6 plateformes e-commerce distinctes. Chaque site, une identité propre. C# côté backend, VueJs côté interface, Orchard CMS comme socle. De la maquette initiale au déploiement final — autonomie totale.",
    note: null,
    bg: "#F5F0E8",
    textColor: "#1C1917",
    accent: "#B5673C",
    photo: "/citerneo.jpg",
    logo: "/Logo_CITERNEO.png",
    confidential: false,
    flip: true,
  },
  {
    number: "03",
    title: "INRAE — Identité & Refonte Digitale",
    subtitle: "Nouzilly · Stage Avr → Jul 2023",
    tags: ["eZplatform", "FR/EN Bilingue", "Identité visuelle", "HTML/CSS"],
    desc: "Refonte bilingue (FR/EN) des sites de l'UMR infectiologie et santé publique, suite à la migration sous eZplatform. Création du logotype de l'unité de recherche UMR ISP du centre INRAE Val de Loire. Conception du trombinoscope de l'unité. Du web à l'identité graphique institutionnelle.",
    note: null,
    bg: "#E2C9B0",
    textColor: "#1C1917",
    accent: "#2A3447",
    photo: "/inrae.png",
    logo: "/Logo-INRAE_Transparent.svg.png",
    confidential: false,
    flip: false,
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
        gridTemplateColumns: p.flip ? "1fr 1fr" : "1fr 1fr",
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
}: {
  photo: string;
  logo: string;
  confidential: boolean;
  accent: string;
  index: number;
}) {
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
