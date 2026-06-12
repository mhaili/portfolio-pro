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

const NAV_LINKS = [
  { href: "#hero",      label: "ACCUEIL"  },
  { href: "#formation", label: "PARCOURS" },
  { href: "#projets",   label: "PROJETS"  },
  { href: "#contact",   label: "CONTACT"  },
];

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

  return (
    <>
      {/* Top bar — masqué sur le hero (le hero a sa propre nav) */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: active === "hero" ? "none" : "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2.4vh 6vw",
          background: scrolled
            ? "rgba(10,6,2,0.88)"
            : "rgba(10,6,2,0.65)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(245,240,232,0.07)"
            : "none",
          transition: "background 0.4s ease, border-bottom 0.4s ease",
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "26px",
            color: "#F5F0E8",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          Majda Mhaili
        </a>

        <nav style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "10px",
                letterSpacing: "0.14em",
                color: "#F5F0E8",
                textDecoration: "none",
                padding: "8px 18px",
                border: "1px solid rgba(245,240,232,0.15)",
                borderRadius: "100px",
                background: "rgba(10,6,2,0.28)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                opacity: active === href.slice(1) ? 1 : 0.65,
                transition: "opacity 0.25s, border-color 0.25s, background 0.25s",
                display: "inline-block",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.opacity = "1";
                el.style.borderColor = "rgba(201,170,124,0.5)";
                el.style.background  = "rgba(201,170,124,0.1)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.opacity = active === href.slice(1) ? "1" : "0.65";
                el.style.borderColor = "rgba(245,240,232,0.15)";
                el.style.background  = "rgba(10,6,2,0.28)";
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
            style={{
              display: "block",
              width: active === id ? "22px" : "4px",
              height: "1px",
              background: active === id
                ? "#C9AA7C"
                : "rgba(245,240,232,0.25)",
              transition: "width 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s ease",
              textDecoration: "none",
            }}
          />
        ))}
      </nav>
    </>
  );
}
