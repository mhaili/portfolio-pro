"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FACTS = [
  "3 000 km · Marrakech → Bordeaux",
  "6 ans à composer du code",
  "2 cultures · 1 trajectoire",
  "CDI · Septembre 2026",
];

const LS = 260; // taille de la loupe (carré, la forme blob vient du border-radius)

const QUESTION = "Qui serai-je dans cinq ans ?";
const SUBTITLE  = "Développeuse Full Stack • Créative • Curieuse\n\nJe transforme des idées en expériences numériques.";

const NAV_LINKS = [
  { href: "#hero",      label: "ACCUEIL"  },
  { href: "#formation", label: "PARCOURS" },
  { href: "#projets",   label: "PROJETS"  },
  { href: "#contact",   label: "CONTACT"  },
];

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const photoRef     = useRef<HTMLDivElement>(null);
  const lensRef      = useRef<HTMLDivElement>(null);
  const lensInnerRef = useRef<HTMLDivElement>(null);
  const reticleRef   = useRef<HTMLDivElement>(null);
  const infoRef      = useRef<HTMLDivElement>(null);

  const [factIdx,     setFactIdx]     = useState(0);
  const [factVisible, setFactVisible] = useState(true);
  const [qText,       setQText]       = useState("");
  const [sText,       setSText]       = useState("");
  const [cursorOnQ,   setCursorOnQ]   = useState(true);
  const [showCursor,  setShowCursor]  = useState(false);

  // Facts ticker
  useEffect(() => {
    const iv = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIdx(i => (i + 1) % FACTS.length);
        setFactVisible(true);
      }, 280);
    }, 3400);
    return () => clearInterval(iv);
  }, []);

  // Typewriter
  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const run = async () => {
      await wait(1050);
      if (cancelled) return;
      setShowCursor(true);

      for (let i = 0; i <= QUESTION.length; i++) {
        if (cancelled) return;
        setQText(QUESTION.slice(0, i));
        await wait(i === 0 ? 0 : 58);
      }

      await wait(380);
      if (cancelled) return;
      setCursorOnQ(false);

      for (let i = 0; i <= SUBTITLE.length; i++) {
        if (cancelled) return;
        setSText(SUBTITLE.slice(0, i));
        await wait(i === 0 ? 0 : 28);
      }

      await wait(1400);
      if (!cancelled) setShowCursor(false);
    };

    run();
    return () => { cancelled = true; };
  }, []);

  // GSAP : entrée photo + scroll fade
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(photoRef.current, { scale: 1.07, opacity: 0, filter: "blur(18px)" });
      gsap.set(infoRef.current,  { opacity: 0 });

      gsap.timeline({ delay: 0.35 })
        .to(photoRef.current, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.2, ease: "power2.out" }, 0)
        .to(infoRef.current,  { opacity: 1, duration: 0.9 }, 1.6);

      gsap.to(wrapRef.current, {
        y: -55, opacity: 0, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "10% top", end: "70% top", scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Loupe — lerp fluide (lerp plus doux pour effet liquide)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let tX = window.innerWidth  / 2;
    let tY = window.innerHeight / 2;
    let cX = tX, cY = tY;
    let tA = 0, cA = 0;
    let raf: number;
    const half = LS / 2;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      tX = e.clientX - r.left;
      tY = e.clientY - r.top;
      tA = 1;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      const r = section.getBoundingClientRect();
      tX = t.clientX - r.left;
      tY = t.clientY - r.top;
      tA = 1;
    };
    const onLeave = () => { tA = 0; };

    const tick = () => {
      // Lerp plus doux (0.07) pour un mouvement "eau" inertiel
      cX += (tX - cX) * 0.07;
      cY += (tY - cY) * 0.07;
      cA += (tA - cA) * 0.055;
      const alpha = Math.max(0, Math.min(1, cA));
      const lx = cX - half, ly = cY - half;

      if (lensRef.current) {
        lensRef.current.style.left    = `${lx}px`;
        lensRef.current.style.top     = `${ly}px`;
        lensRef.current.style.opacity = String(alpha);
      }
      if (lensInnerRef.current) {
        lensInnerRef.current.style.left = `${-lx}px`;
        lensInnerRef.current.style.top  = `${-ly}px`;
      }
      if (reticleRef.current) {
        reticleRef.current.style.left    = `${cX}px`;
        reticleRef.current.style.top     = `${cY}px`;
        reticleRef.current.style.opacity = String(alpha * 0.85);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    section.addEventListener("mousemove",  onMove,  { passive: true });
    section.addEventListener("mouseleave", onLeave);
    section.addEventListener("touchmove",  onTouch, { passive: true });
    section.addEventListener("touchend",   onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove",  onMove);
      section.removeEventListener("mouseleave", onLeave);
      section.removeEventListener("touchmove",  onTouch);
      section.removeEventListener("touchend",   onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: "100vh", background: "#1A0E04", position: "relative", overflow: "hidden" }}
    >
      {/* Filtre SVG eau — caché, utilisé par la loupe */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="waterRipple" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.004"
              numOctaves="3"
              seed="5"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.003 0.004;0.005 0.003;0.003 0.004"
                dur="6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="seed"
                values="5;12;5"
                dur="12s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── NAVIGATION intégrée ── */}
      <nav
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "3.2vh 6vw",
          zIndex: 20,
          background: "linear-gradient(to bottom, rgba(10,6,2,0.72) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <a href="#hero" style={{
          fontFamily: "var(--font-cormorant)", fontStyle: "italic",
          fontSize: "26px", color: "#F5F0E8", fontWeight: 400,
          letterSpacing: "-0.01em", textDecoration: "none",
          pointerEvents: "auto",
        }}>
          Majda Mhaili
        </a>
        <div className="hero-nav-pills" style={{ display: "flex", gap: "8px", pointerEvents: "auto" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "10px", letterSpacing: "0.14em",
                color: "#F5F0E8", textDecoration: "none",
                padding: "8px 18px",
                border: "1px solid rgba(245,240,232,0.15)",
                borderRadius: "100px",
                background: "rgba(10,6,2,0.28)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                opacity: 0.7,
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
                el.style.opacity = "0.7";
                el.style.borderColor = "rgba(245,240,232,0.15)";
                el.style.background  = "rgba(10,6,2,0.28)";
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── CONTENU PRINCIPAL (scroll-fadeable) ── */}
      <div ref={wrapRef} style={{ position: "absolute", inset: 0, zIndex: 3 }}>

        {/* SCÈNE 1 — portrait plein cadre */}
        <div ref={photoRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          <Image src="/scene1.png" alt="Majda Mhaili" fill priority sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center top" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 78% 78% at 50% 48%, transparent 38%, rgba(10,6,2,0.46) 100%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "58%",
            background: "linear-gradient(to top, rgba(10,6,2,0.90) 0%, rgba(10,6,2,0.50) 28%, transparent 100%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* LOUPE — forme flaque d'eau (blob morphing) + distorsion eau */}
        <div
          ref={lensRef}
          style={{
            position: "absolute",
            width: `${LS}px`,
            height: `${LS}px`,
            overflow: "hidden",
            zIndex: 4,
            opacity: 0,
            pointerEvents: "none",
            // Forme blob initiale — animée par puddleShape
            borderRadius: "58% 42% 52% 48% / 55% 48% 52% 45%",
            animation: "puddleShape 7s ease-in-out infinite",
            // Bordure lumineuse façon reflet d'eau
            boxShadow:
              "0 0 0 1.5px rgba(201,170,124,0.45), 0 0 28px rgba(201,170,124,0.12), inset 0 0 20px rgba(10,6,2,0.15)",
          }}
        >
          {/* Contenu avec distorsion eau */}
          <div
            ref={lensInnerRef}
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              filter: "url(#waterRipple)",
            }}
          >
            <Image src="/scene3.png" alt="" fill sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center top" }} />
          </div>
        </div>

        {/* RÉTICULE central — petite croix dorée */}
        <div ref={reticleRef} style={{
          position: "absolute", transform: "translate(-50%, -50%)",
          pointerEvents: "none", zIndex: 6, opacity: 0,
        }}>
          <svg width="22" height="22">
            <line x1="11" y1="0"  x2="11" y2="6"  stroke="rgba(201,170,124,0.9)" strokeWidth="0.8" />
            <line x1="11" y1="16" x2="11" y2="22" stroke="rgba(201,170,124,0.9)" strokeWidth="0.8" />
            <line x1="0"  y1="11" x2="6"  y2="11" stroke="rgba(201,170,124,0.9)" strokeWidth="0.8" />
            <line x1="16" y1="11" x2="22" y2="11" stroke="rgba(201,170,124,0.9)" strokeWidth="0.8" />
            <circle cx="11" cy="11" r="1.5" fill="rgba(201,170,124,1)" />
          </svg>
        </div>

        {/* ── TOUT AU CENTRE ── */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -52%)",
          zIndex: 6, pointerEvents: "none",
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
        }}>
          <h1 style={{
            fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 700,
            fontSize: "clamp(26px, 3.8vw, 62px)", lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: "#F5F0E8",
            textShadow: "0 2px 60px rgba(181,103,60,0.22), 0 0 2px rgba(245,240,232,0.08)",
            margin: 0,
            minHeight: "1.08em",
          }}>
            {qText}
            {cursorOnQ && showCursor && (
              <span style={{
                display: "inline-block", width: "3px",
                height: "0.78em", background: "#B5673C",
                marginLeft: "4px", verticalAlign: "middle",
                animation: "blink 1.05s step-end infinite",
                borderRadius: "1px",
              }} />
            )}
          </h1>

          <p style={{
            fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(16px, 1.55vw, 23px)", lineHeight: 1.65,
            color: "#F5F0E8", opacity: 0.92,
            margin: "3vh 0 0",
            maxWidth: "44ch",
            letterSpacing: "0.005em",
            minHeight: "3.3em",
          }}>
            {sText.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
            {!cursorOnQ && showCursor && (
              <span style={{
                display: "inline-block", width: "2px",
                height: "0.85em", background: "#B5673C",
                marginLeft: "3px", verticalAlign: "middle",
                animation: "blink 1.05s step-end infinite",
                borderRadius: "1px",
              }} />
            )}
          </p>
        </div>

      </div>

      {/* ── BARRE BAS 3 colonnes ── */}
      <div ref={infoRef} className="hero-bottom-bar" style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "1.8vh 7vw 3vh",
        borderTop: "1px solid rgba(245,240,232,0.07)",
        display: "grid", gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center", gap: "16px", zIndex: 10,
        background: "linear-gradient(to top, rgba(10,6,2,0.93) 0%, transparent 100%)",
      }}>
        <span className="hero-bottom-side" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "11px", letterSpacing: "0.22em", color: "#F5F0E8", opacity: 0.65 }}>
          DÉVELOPPEUSE FULL STACK
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "12px", height: "1px", background: "#B5673C", flexShrink: 0 }} />
            <span style={{
              fontFamily: "var(--font-space-grotesk)", fontSize: "11px", letterSpacing: "0.14em",
              color: "#B5673C",
              opacity: factVisible ? 1 : 0, transition: "opacity 0.28s ease",
              whiteSpace: "nowrap",
            }}>{FACTS[factIdx]}</span>
            <div style={{ width: "12px", height: "1px", background: "#B5673C", flexShrink: 0 }} />
          </div>
          <p style={{
            fontFamily: "var(--font-cormorant)", fontStyle: "italic",
            fontSize: "clamp(14px, 1.3vw, 19px)", color: "#F5F0E8", opacity: 0.6,
            margin: 0, whiteSpace: "nowrap",
          }}>Je ne code pas. Je compose.</p>
        </div>
        <span className="hero-bottom-side" style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "11px", letterSpacing: "0.22em", color: "#F5F0E8", opacity: 0.65, textAlign: "right" }}>
          DISPONIBLE · SEPT. 2026
        </span>
      </div>

      {/* Filet accent gauche */}
      <div aria-hidden style={{
        position: "absolute", left: 0, top: "22%", width: "2px", height: "34%", zIndex: 4,
        background: "linear-gradient(to bottom, transparent, #B5673C 40%, #B5673C 60%, transparent)",
        opacity: 0.42,
      }} />

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        @keyframes puddleShape {
          0%   { border-radius: 58% 42% 52% 48% / 55% 48% 52% 45%; }
          16%  { border-radius: 42% 58% 38% 62% / 48% 62% 38% 52%; }
          33%  { border-radius: 62% 38% 58% 42% / 52% 42% 62% 48%; }
          50%  { border-radius: 38% 62% 45% 55% / 62% 38% 55% 45%; }
          66%  { border-radius: 52% 48% 62% 38% / 45% 55% 42% 58%; }
          83%  { border-radius: 45% 55% 48% 52% / 38% 62% 48% 52%; }
          100% { border-radius: 58% 42% 52% 48% / 55% 48% 52% 45%; }
        }

        /* ── RESPONSIVE MOBILE ── */
        @media (max-width: 768px) {
          .hero-nav-pills   { display: none !important; }
          .hero-bottom-side { display: none !important; }
          .hero-bottom-bar  {
            grid-template-columns: 1fr !important;
            justify-items: center;
            padding: 1.4vh 6vw 2.5vh !important;
          }
        }
      `}</style>
    </section>
  );
}
