"use client";

import { useEffect, useRef, useState } from "react";

export default function ChapterGendarmerie() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [charsFrozen, setCharsFrozen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setCharsFrozen(true), 2500);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section"
      style={{ background: "#1C1917", padding: "12vh 8vw", overflow: "hidden" }}
    >
      {/* Matrix bg characters */}
      <MatrixBg frozen={charsFrozen} />

      {/* Decorative number */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "6vh",
          left: "5vw",
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 300,
          fontSize: "clamp(120px, 20vw, 240px)",
          color: "rgba(42,52,71,0.4)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        02
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* The dramatic word */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "4vh",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(64px, 14vw, 180px)",
              color: "#C9AA7C",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            Ordre.
          </h2>
        </div>

        {/* Split layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8vw",
          marginTop: "4vh",
        }}>
          {/* Left: Gendarmerie */}
          <ExperienceBlock
            delay={0.3}
            visible={visible}
            tag="ALTERNANCE · SEP 2024 → AOÛ 2026"
            tagColor="#B5673C"
            title="Gendarmerie Nationale"
            desc="Développeuse Full Stack au sein des services numériques de la Gendarmerie. Développement d'outils internes sécurisés, confidentiels, critiques. Parce que certains codes demandent une responsabilité absolue."
            note="CONFIDENTIEL · RIGUEUR · ENGAGEMENT"
          />

          {/* Right: Citerneo */}
          <ExperienceBlock
            delay={0.5}
            visible={visible}
            tag="ALTERNANCE · SEP 2023 → AOÛ 2024"
            tagColor="#C9AA7C"
            title="Citerneo — Amboise"
            desc="Refonte complète du site de l'entreprise. Création de six sites e-commerce distincts avec C# et VueJs via la plateforme Orchard CMS. Autonomie totale, de la maquette au déploiement."
            note="C# · VUEJS · ORCHARD · AUTONOMIE"
          />
        </div>

        {/* INRAE row */}
        <div style={{
          marginTop: "6vh",
          paddingTop: "4vh",
          borderTop: "1px solid rgba(201,170,124,0.2)",
        }}>
          <ExperienceBlock
            delay={0.7}
            visible={visible}
            tag="STAGE · AVR 2023 → JUL 2023"
            tagColor="#C9AA7C"
            title="INRAE — Nouzilly"
            desc="Refonte bilingue (FR/EN) du site de l'UMR infectiologie et santé publique sur eZplatform. Création du logo pour l'unité UMR ISP et du trombinoscope de l'unité."
            note="EZPLATFORM · DESIGN · IDENTITÉ VISUELLE"
            horizontal
          />
        </div>
      </div>
    </section>
  );
}

function ExperienceBlock({
  tag, tagColor, title, desc, note, delay, visible, horizontal,
}: {
  tag: string; tagColor: string; title: string; desc: string;
  note: string; delay: number; visible: boolean; horizontal?: boolean;
}) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...(horizontal ? { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4vw", alignItems: "start" } : {}),
      }}
    >
      <div>
        <span style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "9px",
          letterSpacing: "0.2em",
          color: tagColor,
          display: "block",
          marginBottom: "10px",
        }}>
          {tag}
        </span>
        <h3 style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(22px, 3vw, 38px)",
          color: "#F5F0E8",
          lineHeight: 1.15,
          marginBottom: "16px",
        }}>
          {title}
        </h3>
      </div>
      <div>
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "14px",
          color: "#E2C9B0",
          opacity: 0.75,
          lineHeight: 1.75,
          marginBottom: "16px",
        }}>
          {desc}
        </p>
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "9px",
          letterSpacing: "0.18em",
          color: tagColor,
          opacity: 0.7,
        }}>
          {note}
        </p>
      </div>
    </div>
  );
}

function MatrixBg({ frozen }: { frozen: boolean }) {
  const chars = "アイウエオ01カキクケコ∞∑∆∏∫λ#$%&@";
  // Deterministic values derived from index to avoid SSR/client hydration mismatch
  const items = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    char: chars[i % chars.length],
    left: (i * 3.37) % 100,
    delay: (i * 0.23) % 6,
    dur: 6 + (i * 0.31) % 6,
    opacity: 0.03 + (i % 3) * 0.01,
  }));

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        transition: "opacity 1.5s ease",
        opacity: frozen ? 0 : 1,
      }}
    >
      {items.map((item) => (
        <span
          key={item.id}
          style={{
            position: "absolute",
            left: `${item.left}%`,
            top: "-20px",
            fontFamily: "monospace",
            fontSize: "14px",
            color: "#C9AA7C",
            opacity: item.opacity,
            animation: frozen ? "none" : `matrix-fall ${item.dur}s linear ${item.delay}s infinite`,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
