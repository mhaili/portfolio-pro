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
  const [active,   setActive]   = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Ferme le menu si on clique un lien
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        .nav-pills { display: flex; gap: 8px; }
        .nav-hamburger { display: none; }

        @media (max-width: 768px) {
          .nav-pills     { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-dots      { display: none !important; }
        }
      `}</style>

      {/* Top bar — masqué sur le hero */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: active === "hero" ? "none" : "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2.4vh 6vw",
          background: scrolled ? "rgba(10,6,2,0.92)" : "rgba(10,6,2,0.70)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(245,240,232,0.07)" : "none",
          transition: "background 0.4s ease",
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(20px, 2.2vw, 26px)",
            color: "#F5F0E8",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          Majda Mhaili
        </a>

        {/* Desktop pills */}
        <nav className="nav-pills">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={handleLinkClick}
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

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            background: "none",
            border: "1px solid rgba(245,240,232,0.2)",
            borderRadius: "8px",
            cursor: "pointer",
            padding: "8px 12px",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Menu"
        >
          <span style={{
            display: "block", width: "20px", height: "1.5px",
            background: "#F5F0E8",
            transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
            transition: "transform 0.3s ease",
          }} />
          <span style={{
            display: "block", width: "20px", height: "1.5px",
            background: "#F5F0E8",
            opacity: menuOpen ? 0 : 1,
            transition: "opacity 0.2s ease",
          }} />
          <span style={{
            display: "block", width: "20px", height: "1.5px",
            background: "#F5F0E8",
            transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
            transition: "transform 0.3s ease",
          }} />
        </button>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && active !== "hero" && (
        <div style={{
          position: "fixed",
          top: "clamp(52px, 8vh, 72px)",
          left: 0, right: 0,
          zIndex: 99,
          background: "rgba(10,6,2,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(245,240,232,0.08)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5vh 8vw 2.5vh",
          gap: "4px",
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={handleLinkClick}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "13px",
                letterSpacing: "0.16em",
                color: active === href.slice(1) ? "#C9AA7C" : "#F5F0E8",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid rgba(245,240,232,0.06)",
                opacity: 0.9,
                transition: "color 0.2s",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Side dot navigation — masqué sur le hero et mobile */}
      <nav
        className="nav-dots"
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
              background: active === id ? "#C9AA7C" : "rgba(245,240,232,0.25)",
              transition: "width 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s ease",
              textDecoration: "none",
            }}
          />
        ))}
      </nav>
    </>
  );
}
