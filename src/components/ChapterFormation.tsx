"use client";

import { useEffect, useRef, useState } from "react";

const formations = [
  {
    degree: "Mastère Dev Manager Full Stack",
    school: "EFREI",
    city: "Bordeaux",
    period: "2024 — 2026",
    current: true,
  },
  {
    degree: "BUT MMI — Métiers du Multimédia et de l'Internet",
    school: "IUT",
    city: "Blois",
    period: "2022 — 2024",
    current: false,
  },
  {
    degree: "L1/L2 Licence Informatique Mathématiques",
    school: "Université François Rabelais",
    city: "Blois",
    period: "2019 — 2022",
    current: false,
  },
];

export default function ChapterFormation() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section"
      style={{ background: "#F5F0E8", padding: "12vh 8vw", overflow: "hidden" }}
    >
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
          color: "#E2C9B0",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        01
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Chapter title */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(36px, 6vw, 80px)",
            color: "#1C1917",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "6vh",
            maxWidth: "640px",
          }}
        >
          L'École<br />comme terrain<br />de jeu.
        </h2>

        {/* Formations list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {formations.map((f, i) => (
            <FormationRow key={f.period} {...f} delay={0.2 + i * 0.14} visible={visible} />
          ))}
        </div>

        {/* Prose note */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2vw, 24px)",
            color: "#1C1917",
            opacity: visible ? 0.65 : 0,
            transition: "opacity 1s ease 0.9s",
            marginTop: "6vh",
            maxWidth: "560px",
            lineHeight: 1.7,
          }}
        >
          Des années à apprendre que la rigueur et la créativité<br />
          ne s'opposent pas — elles se complètent.
        </p>
      </div>
    </section>
  );
}

function FormationRow({
  degree, school, city, period, current, delay, visible,
}: {
  degree: string; school: string; city: string; period: string;
  current: boolean; delay: number; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        padding: "3vh 0",
        borderBottom: "1px solid rgba(28,25,23,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "none",
      }}
    >
      <div>
        {current && (
          <span style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#B5673C",
            display: "block",
            marginBottom: "4px",
          }}>
            EN COURS
          </span>
        )}
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: hovered ? "italic" : "normal",
          fontSize: "clamp(18px, 2.2vw, 26px)",
          color: "#1C1917",
          fontWeight: 400,
          transition: "font-style 0.3s ease",
          letterSpacing: "-0.01em",
        }}>
          {degree}
        </p>
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "12px",
          color: "#1C1917",
          opacity: 0.55,
          marginTop: "4px",
          letterSpacing: "0.05em",
        }}>
          {school} — {city}
        </p>
      </div>
      <p style={{
        fontFamily: "var(--font-space-grotesk)",
        fontSize: "12px",
        color: "#C9AA7C",
        letterSpacing: "0.1em",
        textAlign: "right",
      }}>
        {period}
      </p>
    </div>
  );
}
