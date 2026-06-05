"use client";

import { useEffect, useRef } from "react";
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
    desc: "Les équations avant le code. Mention Bien en Sciences Physiques au Maroc. La rigueur scientifique comme premier langage — avant le HTML, il y avait les formules.",
    tech: "Marrakech · Lycée · Sciences Physiques",
    bg: "#B5673C", accent: "#F5F0E8", textLight: true, num: "01",
    asset: "photo-morocco.jpg", assetType: "photo" as const,
  },
  {
    year: "2019 — 2022",
    title: "La Traversée.",
    sub: "Marrakech → Blois · 3 000 km",
    desc: "Une mer, une nouvelle culture, une nouvelle langue. Décision : quitter Marrakech pour l'Université de Tours — site de Blois. L1/L2 Licence Informatique-Mathématiques. L'aventure commence.",
    tech: "Université de Tours · Blois",
    bg: "#2A3447", accent: "#C9AA7C", textLight: true, num: "02",
    asset: "Universite_de_Tours_logo.png", assetType: "logo" as const,
  },
  {
    year: "2022 — 2024",
    title: "L'Exploration.",
    sub: "BUT MMI · Parcours Dev Web · IUT Blois",
    desc: "2ème année BUT Métiers du Multimédia et de l'Internet, spécialisation développement web, à l'IUT de Blois. Là où le code a vraiment rencontré le design. React, JavaScript, PHP, UX — la technique devient un art de composer.",
    tech: "React · JavaScript · PHP · UX · HTML/CSS",
    bg: "#1C1917", accent: "#C9AA7C", textLight: true, num: "03",
    asset: "logo_iut.png", assetType: "logo" as const,
  },
  {
    year: "Avr → Jul 2023",
    title: "INRAE.",
    sub: "Stage · Nouzilly",
    desc: "Refonte bilingue FR/EN des sites de l'UMR infectiologie et santé publique sur eZplatform. Création du logotype de l'unité UMR ISP du centre INRAE Val de Loire. Conception du trombinoscope de l'équipe. Premier projet d'identité visuelle institutionnelle.",
    tech: "eZplatform · HTML/CSS · Identité visuelle · Bilingue",
    bg: "#2A3447", accent: "#B5673C", textLight: true, num: "04",
    asset: "Logo-INRAE_Transparent.svg.png", assetType: "logo" as const,
  },
  {
    year: "Sep 2023 → Août 2024",
    title: "Citerneo.",
    sub: "Alternance · Amboise",
    desc: "Refonte complète du site de l'entreprise. Développement de 6 sites e-commerce distincts via Orchard CMS. C# côté backend, VueJs côté interface. Chaque site, une identité propre — autonomie totale, de la maquette au déploiement.",
    tech: "C# · VueJs · Orchard CMS · E-commerce",
    bg: "#B5673C", accent: "#F5F0E8", textLight: true, num: "05",
    asset: "Logo_CITERNEO.png", assetType: "logo" as const,
  },
  {
    year: "2024 — 2026",
    title: "EFREI.",
    sub: "Mastère Expert Dev Manager Full Stack · Campus Bordeaux",
    desc: "M1 et M2 — Expert Dev Manager Full Stack, campus de Bordeaux. La maîtrise technique rencontre la vision stratégique. Architecture logicielle, management de projet, leadership. En cours — et ce n'est que le début.",
    tech: "Dev Manager · Architecture · Leadership · Bordeaux",
    bg: "#2A3447", accent: "#C9AA7C", textLight: true, num: "06",
    asset: "Logo_Efrei_2022.svg.png", assetType: "logo" as const,
  },
  {
    year: "Sep 2024 → Août 2026",
    title: "Gendarmerie.",
    sub: "Alternance · Nationale · France",
    desc: "Développeuse Full Stack au sein des services numériques. Projet de prévention et diagnostic d'autoévaluation pour la CPTM. Outils internes sécurisés, architecture robuste, données sensibles. Rigueur, engagement, service — les valeurs d'une institution au cœur du travail.",
    tech: "Full Stack · Sécurité · Outils internes · Confidentiel",
    bg: "#1C1917", accent: "#C9AA7C", textLight: true, num: "07",
    asset: "logo_gendarmerie.png", assetType: "logo" as const,
  },
  {
    year: "Jun 2022 → Jul 2023",
    title: "Mamie Bigoude.",
    sub: "Job Étudiant · Restauration · Blois",
    desc: "En parallèle des études : 1 an en restauration à Blois. Prise de commande, service en salle, encaissement. Une autre forme de rigueur — celle du contact humain, de la gestion du stress, de la polyvalence dans l'urgence.",
    tech: "Service · Relation client · Gestion du stress · Polyvalence",
    bg: "#E2C9B0", accent: "#1C1917", textLight: false, num: "↕",
    asset: "mamie_bigoude.jpg", assetType: "logo" as const,
  },
  {
    year: "Toujours",
    title: "Ce qui me construit.",
    sub: "Musculation · Photographie · Voyages",
    desc: "La musculation comme discipline du quotidien — la régularité, l'effort, le dépassement de soi. La photographie comme autre regard sur le monde. Les voyages comme école permanente, entre Maroc et France, entre cultures et horizons. Ce qu'on fait en dehors du code dit autant que ce qu'on fait dedans.",
    tech: "Musculation · Photographie · Voyages · Équilibre",
    bg: "#F5F0E8", accent: "#B5673C", textLight: false, num: "♡",
    asset: null, assetType: null,
  },
];

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
                }}
              >
                {card.desc}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "8px",
                  letterSpacing: "0.18em",
                  color: card.accent,
                  opacity: 0.55,
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
