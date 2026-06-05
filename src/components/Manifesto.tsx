"use client";

import { useEffect, useRef, useState } from "react";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const quote = [
    "Je suis née entre deux cultures,",
    "j'ai grandi entre deux langages.",
    "Le code, c'est ma façon d'écrire",
    "ce que les mots ne peuvent pas dire.",
  ];

  const keywords = ["Marocaine.", "Française.", "Architecte du web."];

  return (
    <section
      ref={ref}
      className="section"
      style={{ background: "#E2C9B0", padding: "10vh 8vw" }}
    >
      {/* Quote */}
      <blockquote
        style={{ maxWidth: "900px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {quote.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(28px, 5vw, 68px)",
              lineHeight: 1.2,
              color: "#1C1917",
              letterSpacing: "-0.01em",
              opacity: visible ? 1 : 0,
              transform: visible
                ? hovered ? `translateX(${i % 2 === 0 ? "8px" : "4px"})` : "translateX(0)"
                : "translateY(20px)",
              transition: `opacity 0.8s ease ${i * 0.12}s,
                           transform 0.6s cubic-bezier(0.16,1,0.3,1) ${visible ? 0 : i * 0.12}s`,
            }}
          >
            {line}
          </p>
        ))}
      </blockquote>

      {/* Gold divider */}
      <div
        style={{
          width: visible ? "120px" : "0px",
          height: "1px",
          background: "#C9AA7C",
          marginTop: "4vh",
          marginBottom: "4vh",
          transition: "width 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s",
        }}
      />

      {/* Keywords */}
      <div style={{ display: "flex", gap: "clamp(16px, 3vw, 48px)", flexWrap: "wrap" }}>
        {keywords.map((kw, i) => (
          <span
            key={kw}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(12px, 1.4vw, 16px)",
              letterSpacing: "0.15em",
              color: "#1C1917",
              opacity: visible ? 0.8 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.7s ease ${0.7 + i * 0.12}s, transform 0.7s ease ${0.7 + i * 0.12}s`,
            }}
          >
            {kw}
            {i < keywords.length - 1 && (
              <span style={{ color: "#B5673C", margin: "0 clamp(8px,1.5vw,24px)" }}>·</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
