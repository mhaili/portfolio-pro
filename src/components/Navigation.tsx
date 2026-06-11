"use client";

import { useEffect, useState } from "react";

const DOTS = [
  { id: "hero" },
  { id: "manifeste" },
  { id: "carte" },
  { id: "formation" },
  { id: "projets" },
  { id: "competences" },
  { id: "vision" },
  { id: "contact" },
];

const DARK_SECTIONS = ["manifeste", "contact"];

export default function Navigation() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    DOTS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isDark = DARK_SECTIONS.includes(active);
  const textColor = isDark ? "#F5F0E8" : "#1C1917";
  const bgColor = isDark
    ? scrolled ? "rgba(28,25,23,0.92)" : "rgba(28,25,23,0.6)"
    : scrolled ? "rgba(245,240,232,0.92)" : "rgba(245,240,232,0.72)";

  return (
    <>
      {/* Top bar — masqué sur le hero (le hero a sa propre nav intégrée) */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: active === "hero" ? "none" : "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2.2vh 6vw",
          background: bgColor,
          backdropFilter: "blur(14px)",
          transition: "background 0.5s ease, backdrop-filter 0.5s ease",
          borderBottom: scrolled
            ? isDark
              ? "1px solid rgba(201,170,124,0.12)"
              : "1px solid rgba(28,25,23,0.08)"
            : "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "20px",
            color: textColor,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            transition: "color 0.4s ease",
          }}
        >
          Majda Mhaili
        </span>

        <nav style={{ display: "flex", gap: "3vw", alignItems: "center" }}>
          {[
            { href: "#formation", label: "Parcours" },
            { href: "#projets", label: "Projets" },
            { href: "#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              data-cursor
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: textColor,
                textDecoration: "none",
                opacity: 0.6,
                transition: "color 0.4s ease, opacity 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.6";
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* Side dot navigation — masqué sur le hero */}
      <nav
        aria-label="Navigation sections"
        style={{
          position: "fixed",
          right: "2.5vw",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: active === "hero" ? "none" : "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {DOTS.map(({ id }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={id}
            data-cursor
            style={{
              display: "block",
              width: active === id ? "22px" : "4px",
              height: "1px",
              background: isDark
                ? active === id
                  ? "#C9AA7C"
                  : "rgba(245,240,232,0.25)"
                : active === id
                ? "#1C1917"
                : "rgba(28,25,23,0.2)",
              transition:
                "width 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s ease",
              textDecoration: "none",
            }}
          />
        ))}
      </nav>
    </>
  );
}
