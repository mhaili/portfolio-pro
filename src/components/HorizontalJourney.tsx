"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// assetType "photo" → grand visuel plein cadre (uniquement le Bac)
// assetType "logo"  → badge fond chalk, objectFit contain
// assetType null    → rien
const CARDS = [
  {
    year: "2018 — 2019",
    title: "Le Bac.",
    sub: "Sciences Physiques · Mention Bien · Marrakech",
    desc: "Les équations avant le code.\n\nMention Bien en Sciences Physiques.\n\nMon premier langage fut celui de la logique.",
    tech: "Marrakech · Lycée · Sciences Physiques",
    bg: "#B5673C", accent: "#F5F0E8", textLight: true, num: "01",
    asset: "photo-morocco.jpg", assetType: "photo" as const,
  },
  {
    year: "2019 — 2022",
    title: "La Traversée.",
    sub: "Marrakech → Blois • 3 000 km",
    desc: "Avant les frameworks, il y avait les fondations.\n\nLicence Informatique-Mathématiques (L1 & L2), Université de Tours — site de Blois.\n\nEntre logique, algorithmes et découverte d'un nouveau pays, je construis les bases sur lesquelles tout le reste viendra s'appuyer.",
    tech: "Université de Tours · Blois",
    bg: "#2A3447", accent: "#C9AA7C", textLight: true, num: "02",
    asset: "blois.jpg", assetType: "photo" as const,
  },
  {
    year: "2022 — 2024",
    title: "L'Exploration.",
    sub: "BUT MMI · Parcours Dev Web · IUT Blois",
    desc: "Les algorithmes m'ont appris à réfléchir.\n\nLe web m'a appris à créer.\n\nAu sein du BUT MMI de l'IUT de Blois, je découvre un nouvel équilibre entre technique et créativité. Celui qui façonnera la suite de mon parcours.",
    tech: "Créativité · Interfaces · Multimédia · Logique",
    bg: "#1C1917", accent: "#C9AA7C", textLight: true, num: "03",
    asset: "blois.jpg", assetType: "photo" as const,
  },
  {
    year: "Avr → Jul 2023",
    title: "INRAE.",
    sub: "Stage • Nouzilly • Avril → Juillet 2023",
    desc: "Le premier projet réel.\n\nAu sein de l'INRAE Val de Loire, je participe à la refonte bilingue de sites scientifiques sous eZPlatform.\n\nEntre développement web, identité visuelle et expérience utilisateur, je découvre les exigences d'un projet utilisé par de vrais utilisateurs.\n\nPour la première fois, le code dépasse le cadre de l'école.",
    tech: "eZPlatform • HTML/CSS • UX • Bilingue • Identité visuelle",
    bg: "#2A3447", accent: "#B5673C", textLight: true, num: "04",
    asset: "Logo-INRAE_Transparent.svg.png", assetType: "logo" as const,
  },
  {
    year: "Sep 2023 → Août 2024",
    title: "Citerneo.",
    sub: "Alternance • Amboise • Septembre 2023 → Août 2024",
    desc: "L'autonomie prend une autre dimension.\n\nPendant un an, je participe à la refonte du site vitrine de l'entreprise et au développement de plusieurs sites e-commerce.\n\nDu design à l'intégration, du frontend au backend, je découvre le rythme, les responsabilités et les exigences du monde professionnel.\n\nUne année où la théorie devient pratique.",
    tech: "C# • Vue.js • Orchard CMS • E-commerce",
    bg: "#B5673C", accent: "#F5F0E8", textLight: true, num: "05",
    asset: "Logo_CITERNEO.png", assetType: "logo" as const,
  },
  {
    year: "2024 — 2026",
    title: "EFREI.",
    sub: "Mastère Expert Dev Manager Full Stack · Campus Bordeaux",
    desc: "Pendant deux ans, l'EFREI a été le terrain où la technique a rencontré la stratégie.\n\nDu développement à l'architecture logicielle, du management de projet au leadership, cette formation a enrichi ma manière de concevoir les systèmes et de collaborer avec les équipes.\n\nUne nouvelle perspective sur la technologie : plus large, plus ambitieuse, plus durable.",
    tech: "Dev Manager · Architecture · Leadership · Bordeaux",
    bg: "#2A3447", accent: "#C9AA7C", textLight: true, num: "06",
    asset: "bordeaux.webp", assetType: "photo" as const,
  },
  {
    year: "Sep 2024 → Août 2026",
    title: "Gendarmerie.",
    sub: "Alternance · Groupement de Gendarmerie de la Gironde",
    desc: "Construire pour ceux qui protègent.\n\nAu sein des services numériques de la Gendarmerie Nationale, je contribue au développement d'applications et de plateformes destinées à accompagner des missions de prévention et de service public.\n\nUne expérience où rigueur, responsabilité et impact prennent tout leur sens.",
    tech: "Développement · Prévention · Sécurité · Service public",
    bg: "#1C1917", accent: "#C9AA7C", textLight: true, num: "07",
    asset: "logo_gendarmerie.png", assetType: "logo" as const,
  },
  {
    year: "En parallèle",
    title: "Les coulisses.",
    sub: "Restauration · Freelance · Artisanat",
    desc: "Derrière la développeuse, il y a aussi l'étudiante, la salariée et l'entrepreneuse.\n\nEntre mes études, mon alternance à la Gendarmerie et mes activités le week-end, j'ai appris à gérer plusieurs responsabilités en parallèle.\n\nCette organisation m'a appris la discipline, l'autonomie et l'adaptation.\n\nDes qualités qui me suivent autant dans mes projets que dans ma vie quotidienne.",
    tech: "Organisation · Autonomie · Discipline · Adaptabilité",
    bg: "#E2C9B0", accent: "#1C1917", textLight: false, num: "↕",
    asset: null, assetType: "logos" as const,
    assets: [
      { src: "mamie_bigoude.jpg",  label: "Serveuse",      sub: "Mamie Bigoude · Blois",   keepColor: true },
      { src: "tim_laure.png",      label: "Vendeuse",      sub: "Tim & Laure · Week-end",  keepColor: false },
      { src: "tafukt_rugs.png",    label: "Entrepreneuse", sub: "Tafukt Rugs · Bientôt",   keepColor: false, large: true },
    ],
  },
  {
    year: "Toujours",
    title: "Ce qui me construit.",
    sub: "Musculation · Photographie · Voyages",
    desc: "La musculation m'a appris que les résultats se construisent dans la durée.\n\nLe travail de terrain m'a appris le contact humain et le sens du service.\n\nLa photographie et la création de contenu m'ont appris à raconter une histoire en une image.\n\nFinalement, chacune de ces expériences nourrit la même chose : ma manière de concevoir le monde et les projets que je développe.",
    tech: "Musculation · Photographie · Création de contenu · Équilibre",
    bg: "#F5F0E8", accent: "#B5673C", textLight: false, num: "♡",
    asset: null, assetType: null,
  },
];

function LogoBadge({ src, label, sub, keepColor, large }: { src: string; label: string; sub: string; keepColor?: boolean; large?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "default",
      }}
    >
      <div style={{
        width: "clamp(56px,6.5vw,82px)",
        height: "clamp(40px,4.8vw,60px)",
        background: hovered ? "#1C1917" : "rgba(245,240,232,0.96)",
        borderRadius: "6px",
        border: hovered ? "1px solid rgba(201,170,124,0.3)" : "1px solid rgba(28,25,23,0.1)",
        overflow: "hidden",
        position: "relative",
        boxShadow: hovered ? "0 4px 18px rgba(0,0,0,0.22)" : "0 2px 10px rgba(0,0,0,0.1)",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        flexShrink: 0,
      }}>
        <Image
          src={`/${src}`}
          alt={label}
          fill
          sizes="96px"
          style={{
            objectFit: "contain",
            padding: "6px",
            filter: hovered && !keepColor ? "brightness(0) invert(1)" : "none",
            transition: "filter 0.3s ease",
          }}
        />
      </div>
      <div style={{
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(-6px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "10px",
          letterSpacing: "0.14em",
          color: "#1C1917",
          fontWeight: 500,
          marginBottom: "2px",
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "9px",
          letterSpacing: "0.1em",
          color: "#1C1917",
          opacity: 0.55,
        }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

export default function HorizontalJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      const totalX = () => track.scrollWidth - wrap.offsetWidth;

      gsap.to(track, {
        x: () => -totalX(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${totalX()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      ScrollTrigger.refresh();
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      id="formation"
      style={{ overflow: "hidden", height: "100vh", willChange: "transform" }}
    >
      <div
        ref={trackRef}
        style={{ display: "flex", height: "100%", width: "max-content" }}
      >
        {/* Intro panel */}
        <div
          style={{
            width: "55vw",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 8vw",
            background: "#E2C9B0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-3vh",
              right: "3vw",
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "28vw",
              fontWeight: 300,
              color: "rgba(28,25,23,0.04)",
              lineHeight: 1,
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            09
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                letterSpacing: "0.32em",
                color: "#B5673C",
                marginBottom: "20px",
              }}
            >
              MON HISTOIRE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(40px, 7vw, 96px)",
                color: "#1C1917",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                marginBottom: "24px",
              }}
            >
              De Marrakech<br />à Bordeaux,<br />en neuf chapitres.
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                letterSpacing: "0.22em",
                color: "#1C1917",
                opacity: 0.5,
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "#1C1917",
                  opacity: 0.4,
                }}
              />
              SCROLL →
            </div>
          </div>
        </div>

        {/* Journey cards */}
        {CARDS.map((card) => (
          <div
            key={card.num}
            style={{
              width: "58vw",
              flexShrink: 0,
              background: card.bg,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 7vw",
              position: "relative",
              overflow: "hidden",
              borderLeft: `1px solid ${
                card.textLight
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(28,25,23,0.1)"
              }`,
            }}
          >
            {/* Photo plein cadre (uniquement carte 01 - Le Bac) */}
            {card.assetType === "photo" && card.asset && (
              <div style={{
                position: "absolute",
                top: "6vh", right: "5vw",
                width: "clamp(90px,11vw,155px)",
                height: "clamp(115px,14.5vw,205px)",
                overflow: "hidden",
                border: `1px solid ${card.accent}30`,
              }}>
                <Image
                  src={`/${card.asset}`}
                  alt=""
                  fill
                  sizes="155px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(to bottom, transparent 55%, ${card.bg}aa 100%)`,
                  pointerEvents: "none",
                }} />
              </div>
            )}

            {/* Badges multiples avec survol */}
            {card.assetType === "logos" && "assets" in card && (
              <div style={{
                position: "absolute",
                top: "7vh", right: "5vw",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}>
                {(card as typeof card & { assets: { src: string; label: string; sub: string; keepColor?: boolean; large?: boolean }[] }).assets.map((item) => (
                  <LogoBadge key={item.src} {...item} />
                ))}
              </div>
            )}

            {/* Badge logo (entreprises + écoles) */}
            {card.assetType === "logo" && card.asset && (
              <div style={{
                position: "absolute",
                top: "7vh", right: "5vw",
                width: "clamp(72px,9vw,120px)",
                height: "clamp(52px,6.5vw,86px)",
                background: "rgba(245,240,232,0.96)",
                borderRadius: "6px",
                border: `1px solid rgba(245,240,232,0.2)`,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
              }}>
                <Image
                  src={`/${card.asset}`}
                  alt={card.title}
                  fill
                  sizes="120px"
                  style={{ objectFit: "contain", padding: "8px" }}
                />
              </div>
            )}

            {/* Big decorative number */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: "-3vh",
                right: "3vw",
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 300,
                fontSize: "clamp(100px, 18vw, 260px)",
                color: card.textLight
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(28,25,23,0.06)",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {card.num}
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: "440px" }}>
              <p
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "8px",
                  letterSpacing: "0.3em",
                  color: card.accent,
                  opacity: 0.7,
                  marginBottom: "18px",
                }}
              >
                {card.year}
              </p>

              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(38px, 6vw, 88px)",
                  color: card.textLight ? "#F5F0E8" : "#1C1917",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  marginBottom: "10px",
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "8px",
                  letterSpacing: "0.24em",
                  color: card.accent,
                  opacity: 0.65,
                  marginBottom: "24px",
                  textTransform: "uppercase",
                }}
              >
                {card.sub}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 1.7vw, 21px)",
                  color: card.textLight ? "#F5F0E8" : "#1C1917",
                  opacity: 0.8,
                  lineHeight: 1.7,
                  marginBottom: "22px",
                  whiteSpace: "pre-line",
                }}
              >
                {card.desc}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: card.accent,
                  opacity: 0.6,
                }}
              >
                {card.tech}
              </p>
            </div>
          </div>
        ))}

        {/* End panel */}
        <div
          style={{
            width: "38vw",
            flexShrink: 0,
            background: "#F5F0E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 5vw",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 3vw, 42px)",
                color: "#1C1917",
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                marginBottom: "24px",
              }}
            >
              La suite<br />s'écrit<br />avec vous.
            </p>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#C9AA7C",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
