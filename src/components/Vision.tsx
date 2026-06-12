"use client";

import { useEffect, useRef, useState } from "react";

const columns = [
  {
    title: "POUR LES ORGANISATIONS",
    text: "Transformer des idées complexes en outils concrets.\n\nConcevoir des solutions fiables, utiles et durables.",
  },
  {
    title: "POUR LES UTILISATEURS",
    text: "Créer des expériences simples dans un monde devenu complexe.\n\nChaque écran doit avoir un sens.",
  },
  {
    title: "POUR MOI",
    text: "Construire une carrière où la technique rencontre la créativité.\n\nNe jamais choisir entre l'ingénierie et l'esthétique.",
  },
];

export default function Vision() {
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
      style={{ background: "#E2C9B0", padding: "12vh 8vw" }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(36px, 6vw, 88px)",
            color: "#1C1917",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "8vh",
          }}
        >
          Ce vers<br />quoi je<br />tends.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "0",
          }}
        >
          {columns.map((col, i) => (
            <VisionColumn key={col.title} {...col} delay={0.2 + i * 0.15} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionColumn({
  title, text, delay, visible,
}: {
  title: string; text: string; delay: number; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "4vh 3vw",
        borderRight: "1px solid rgba(28,25,23,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: "none",
      }}
    >
      <p style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: "9px",
        letterSpacing: "0.22em",
        color: "#B5673C",
        marginBottom: "20px",
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: hovered ? "var(--font-cormorant)" : "var(--font-dm-sans)",
        fontStyle: hovered ? "italic" : "normal",
        fontSize: hovered ? "clamp(16px, 1.8vw, 22px)" : "14px",
        color: "#1C1917",
        lineHeight: 1.75,
        whiteSpace: "pre-line",
        transition: "font-size 0.4s ease, font-family 0.1s, font-style 0.3s",
      }}>
        {text}
      </p>
    </div>
  );
}
