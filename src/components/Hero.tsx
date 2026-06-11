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

const LS = 260;

const QUESTION = "Qui serai-je dans cinq ans ?";
const SUBTITLE  = "Développeuse Full Stack, créatrice et éternelle apprenante.\nChaque projet est une étape vers cette réponse.";

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
  const lensRingRef  = useRef<SVGSVGElement>(null);
  const reticleRef   = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [factIdx,     setFactIdx]     = useState(0);
  const [factVisible, setFactVisible] = useState(true);
  const [qText,       setQText]       = useState("");
  const [sText,       setSText]       = useState("");
  const [cursorOnQ,   setCursorOnQ]   = useState(true);
  const [showCursor,  setShowCursor]  = useState(false);

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

  // Typewriter effect
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
    const onLeave = () => { tA = 0; };

    const tick = () => {
      cX += (tX - cX) * 0.09;
      cY += (tY - cY) * 0.09;
      cA += (tA - cA) * 0.065;
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
      if (lensRingRef.current) {
        lensRingRef.current.style.left    = `${lx - 12}px`;
        lensRingRef.current.style.top     = `${ly - 12}px`;
        lensRingRef.current.style.opacity = String(alpha * 0.75);
      }
      if (reticleRef.current) {
        reticleRef.current.style.left    = `${cX}px`;
        reticleRef.current.style.top     = `${cY}px`;
        reticleRef.current.style.opacity = String(alpha * 0.8);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    section.addEventListener("mousemove",  onMove,  { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove",  onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const R = LS / 2 + 12;
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return [R + Math.cos(a) * R, R + Math.sin(a) * R];
  });
  const hexStr   = hexPoints.map(([x, y]) => `${x},${y}`).join(" ");
  const hexSmall = hexPoints.map(([x, y]) => {
    const cx = R, cy = R, f = 0.88;
    return `${cx + (x - cx) * f},${cy + (y - cy) * f}`;
  }).join(" ");

  return (
    <section
      ref={sectionRef}
      style={{ height: "100vh", background: "#1A0E04", position: "relative", overflow: "hidden" }}
    >
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
        <span style={{
          fontFamily: "var(--font-cormorant)", fontStyle: "italic",
          fontSize: "20px", color: "#F5F0E8", fontWeight: 400,
          letterSpacing: "-0.01em",
        }}>
          Majda Mhaili
        </span>
        <div style={{ display: "flex", gap: "8px", pointerEvents: "auto" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "9px", letterSpacing: "0.14em",
                color: "#F5F0E8", textDecoration: "none",
                padding: "7px 16px",
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

        {/* LOUPE HEXAGONALE */}
        <div
          ref={lensRef}
          style={{
            position: "absolute",
            width: `${LS}px`, height: `${LS}px`,
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            overflow: "hidden", zIndex: 4, opacity: 0, pointerEvents: "none",
          }}
        >
          <div ref={lensInnerRef} style={{ position: "absolute", width: "100vw", height: "100vh" }}>
            <Image src="/scene2.png" alt="" fill sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center top" }} />
          </div>
        </div>

        {/* ANNEAU SVG */}
        <svg ref={lensRingRef} width={R * 2} height={R * 2}
          style={{ position: "absolute", zIndex: 5, opacity: 0, pointerEvents: "none" }}>
          <polygon points={hexStr}   fill="none" stroke="rgba(201,170,124,0.65)" strokeWidth="1" />
          <polygon points={hexSmall} fill="none" stroke="rgba(201,170,124,0.18)" strokeWidth="0.5" />
          {hexPoints.map(([x, y], i) => (
            <rect key={i} x={x - 3} y={y - 3} width={6} height={6} fill="rgba(181,103,60,0.8)" />
          ))}
        </svg>

        {/* RÉTICULE */}
        <div ref={reticleRef} style={{
          position: "absolute", transform: "translate(-50%, -50%)",
          pointerEvents: "none", zIndex: 6, opacity: 0,
        }}>
          <svg width="26" height="26">
            <line x1="13" y1="0"  x2="13" y2="7"  stroke="rgba(201,170,124,0.9)" strokeWidth="0.8" />
            <line x1="13" y1="19" x2="13" y2="26" stroke="rgba(201,170,124,0.9)" strokeWidth="0.8" />
            <line x1="0"  y1="13" x2="7"  y2="13" stroke="rgba(201,170,124,0.9)" strokeWidth="0.8" />
            <line x1="19" y1="13" x2="26" y2="13" stroke="rgba(201,170,124,0.9)" strokeWidth="0.8" />
            <circle cx="13" cy="13" r="1.8" fill="rgba(201,170,124,1)" />
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
          {/* Question — Cormorant Display italic */}
          <h1 style={{
            fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(40px, 6.8vw, 108px)", lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "#F5F0E8",
            textShadow: "0 2px 60px rgba(181,103,60,0.22), 0 0 2px rgba(245,240,232,0.08)",
            margin: 0,
            minHeight: "1.02em",
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

          {/* Sous-titre — DM Sans */}
          <p style={{
            fontFamily: "var(--font-dm-sans)", fontWeight: 300,
            fontSize: "clamp(15px, 1.55vw, 21px)", lineHeight: 1.7,
            color: "#E2C9B0", opacity: 0.95,
            margin: "3vh 0 0",
            maxWidth: "46ch",
            letterSpacing: "0.015em",
            minHeight: "3.4em",
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
      <div ref={infoRef} style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "1.8vh 7vw 3vh",
        borderTop: "1px solid rgba(245,240,232,0.07)",
        display: "grid", gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center", gap: "16px", zIndex: 10,
        background: "linear-gradient(to top, rgba(10,6,2,0.93) 0%, transparent 100%)",
      }}>
        <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "8px", letterSpacing: "0.3em", color: "#F5F0E8", opacity: 0.28 }}>
          DÉVELOPPEUSE FULL STACK
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "12px", height: "1px", background: "#B5673C", flexShrink: 0 }} />
            <span style={{
              fontFamily: "var(--font-space-grotesk)", fontSize: "7.5px", letterSpacing: "0.18em",
              color: "#B5673C",
              opacity: factVisible ? 1 : 0, transition: "opacity 0.28s ease",
              whiteSpace: "nowrap",
            }}>{FACTS[factIdx]}</span>
            <div style={{ width: "12px", height: "1px", background: "#B5673C", flexShrink: 0 }} />
          </div>
          <p style={{
            fontFamily: "var(--font-cormorant)", fontStyle: "italic",
            fontSize: "clamp(11px, 1.1vw, 16px)", color: "#F5F0E8", opacity: 0.38,
            margin: 0, whiteSpace: "nowrap",
          }}>Je ne code pas. Je compose.</p>
        </div>
        <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "8px", letterSpacing: "0.3em", color: "#F5F0E8", opacity: 0.28, textAlign: "right" }}>
          BORDEAUX · MAROC · 2026
        </span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      {/* Filet accent gauche */}
      <div aria-hidden style={{
        position: "absolute", left: 0, top: "22%", width: "2px", height: "34%", zIndex: 4,
        background: "linear-gradient(to bottom, transparent, #B5673C 40%, #B5673C 60%, transparent)",
        opacity: 0.42,
      }} />

    </section>
  );
}
