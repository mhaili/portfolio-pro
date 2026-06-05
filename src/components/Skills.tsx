"use client";

import { useEffect, useRef, useState } from "react";

const STACK = {
  "Front-end": ["React", "TypeScript", "Angular", "VueJs", "HTML/CSS", "JavaScript"],
  "Back-end": ["Node.js", "NestJS", "Express.js", "PHP", "Laravel", "Symfony"],
  "Base de données": ["PostgreSQL", "Sequelize ORM"],
  "CMS & autres": ["Orchard CMS", "eZplatform", "C#"],
};

export default function Skills() {
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
      style={{ background: "#F5F0E8", padding: "12vh 8vw", position: "relative", overflow: "hidden" }}
    >
      {/* Decorative background word */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "4vh",
          right: "-2vw",
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(80px, 16vw, 220px)",
          color: "rgba(226,201,176,0.5)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease",
          letterSpacing: "-0.02em",
          whiteSpace: "nowrap",
        }}
      >
        Stack.
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            color: "#B5673C",
            marginBottom: "16px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          COMPÉTENCES TECHNIQUES
        </p>

        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(36px, 6vw, 80px)",
            color: "#1C1917",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "8vh",
          }}
        >
          Ce que je<br />maîtrise.
        </h2>

        {/* Stack grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "4vh 5vw",
            marginBottom: "6vh",
          }}
        >
          {Object.entries(STACK).map(([category, items], ci) => (
            <div
              key={category}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.7s ease ${0.15 + ci * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + ci * 0.1}s`,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "8px",
                  letterSpacing: "0.24em",
                  color: "#B5673C",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {items.map((item, ii) => (
                  <SkillTag
                    key={item}
                    label={item}
                    delay={0.2 + ci * 0.1 + ii * 0.045}
                    visible={visible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft skills */}
        <div
          style={{
            paddingTop: "4vh",
            borderTop: "1px solid rgba(28,25,23,0.1)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "8px",
              letterSpacing: "0.24em",
              color: "#B5673C",
              marginBottom: "16px",
            }}
          >
            SAVOIR-ÊTRE
          </p>
          <div style={{ display: "flex", gap: "3vw", flexWrap: "wrap" }}>
            {[
              "Curieuse & apprenante",
              "Esprit d'équipe",
              "Rigoureuse & précise",
              "Autonome",
            ].map((trait) => (
              <span
                key={trait}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 1.8vw, 22px)",
                  color: "#1C1917",
                  opacity: 0.7,
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div
          style={{
            display: "flex",
            gap: "3vw",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: "3vh",
            paddingTop: "3vh",
            borderTop: "1px solid rgba(28,25,23,0.1)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.85s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "8px",
              letterSpacing: "0.24em",
              color: "#B5673C",
            }}
          >
            LANGUES
          </span>
          {[
            { lang: "Français", level: "Natif" },
            { lang: "Anglais", level: "B2" },
            { lang: "Arabe", level: "Langue d'origine" },
          ].map(({ lang, level }, i) => (
            <span key={lang}>
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 1.8vw, 22px)",
                  color: "#1C1917",
                }}
              >
                {lang}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "9px",
                  color: "#1C1917",
                  opacity: 0.45,
                  marginLeft: "6px",
                }}
              >
                — {level}
              </span>
              {i < 2 && (
                <span style={{ color: "#C9AA7C", margin: "0 1.5vw" }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillTag({
  label,
  delay,
  visible,
}: {
  label: string;
  delay: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: "11px",
        color: hovered ? "#F5F0E8" : "#1C1917",
        background: hovered ? "#1C1917" : "transparent",
        border: "1px solid rgba(28,25,23,0.18)",
        padding: "5px 13px",
        letterSpacing: "0.04em",
        cursor: "none",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.6s ease ${delay}s, color 0.22s ease, background 0.22s ease`,
      }}
    >
      {label}
    </span>
  );
}
