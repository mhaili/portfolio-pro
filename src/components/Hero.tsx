"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ZELLIGE_PATH = "M24,0 L48,24 L24,48 L0,24 Z M24,8 L40,24 L24,40 L8,24 Z";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const FIRST = ["M", "A", "J", "D", "A"];
const LAST = [
  { char: "M", color: "#C9AA7C" },
  { char: "H", color: "#C9AA7C" },
  { char: "A", color: "#F5F0E8" },
  { char: "I", color: "#F5F0E8" },
  { char: "L", color: "#F5F0E8" },
  { char: "I", color: "#F5F0E8" },
];

const FACTS = ["3 000 km · Marrakech → Bordeaux", "6 ans à composer du code", "2 cultures · 1 trajectoire", "CDI · Septembre 2026"];

export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const tiltRef       = useRef<HTMLDivElement>(null);
  const firstRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const lastRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef       = useRef<HTMLDivElement>(null);
  const subRef        = useRef<HTMLDivElement>(null);
  const patternRef    = useRef<SVGSVGElement>(null);
  const portraitRef   = useRef<HTMLDivElement>(null);
  const glowRef       = useRef<HTMLDivElement>(null);
  const [factIdx, setFactIdx] = useState(0);
  const [factVisible, setFactVisible] = useState(true);

  // Scramble entrance: letters fly in from Y offset AND scramble their char simultaneously
  useEffect(() => {
    const firstLetters = firstRefs.current.filter(Boolean) as HTMLSpanElement[];
    const lastLetters  = lastRefs.current.filter(Boolean)  as HTMLSpanElement[];
    const allLetters   = [...firstLetters, ...lastLetters];
    const allTargets   = [...FIRST, ...LAST.map(l => l.char)];

    // Hide all initially
    allLetters.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(-80px) rotate(-4deg)";
      el.style.transition = "none";
    });

    const STEPS = 9;
    const STEP_MS = 36;

    allLetters.forEach((ref, idx) => {
      const target = allTargets[idx];
      const enterDelay = 180 + idx * 75; // staggered

      setTimeout(() => {
        // Animate in with CSS transition
        ref.style.transition = `transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease`;
        ref.style.opacity = "1";
        ref.style.transform = "translateY(0px) rotate(0deg)";

        // Scramble text content while it's entering
        let step = 0;
        const iv = setInterval(() => {
          if (step < STEPS) {
            ref.textContent = SCRAMBLE_CHARS[(step * 7 + idx * 3 + 11) % 26];
            step++;
          } else {
            ref.textContent = target;
            clearInterval(iv);
          }
        }, STEP_MS);
      }, enterDelay);
    });
  }, []);

  // GSAP: portrait entrance + other elements + scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([lineRef.current, subRef.current], { opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(portraitRef.current, { opacity: 0, x: 50, scale: 0.95 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({ delay: 0.6 });
      tl
        .to(glowRef.current, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0)
        .to(portraitRef.current, { opacity: 1, x: 0, scale: 1, duration: 1.4, ease: "power3.out" }, 0.1)
        .to(lineRef.current, { scaleX: 1, opacity: 1, duration: 1, ease: "power2.inOut" }, 0.9)
        .to(subRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" }, 1.1);

      // Scroll: block lifts and fades
      gsap.to(scrollWrapRef.current, {
        y: -40, opacity: 0.08, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top top", end: "80% top", scrub: 1,
        },
      });
      // Portrait rises faster on scroll (parallax depth)
      gsap.to(portraitRef.current, {
        y: -70, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.4,
        },
      });
      gsap.to(subRef.current, {
        y: -50, opacity: 0, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "15% top", end: "70% top", scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Rotating facts ticker with fade transition
  useEffect(() => {
    const iv = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIdx(i => (i + 1) % FACTS.length);
        setFactVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  // Mouse: 3D tilt on name + independent portrait parallax + glow follow
  useEffect(() => {
    const section = sectionRef.current;
    const tilt    = tiltRef.current;
    if (!section || !tilt) return;

    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    let tPX = 0, tPY = 0, cPX = 0, cPY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      const r  = section.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width  - 0.5;
      const my = (e.clientY - r.top)  / r.height - 0.5;
      tRY = mx * 10; tRX = -my * 5;
      tPX = mx * 36; tPY = my * 22;
      if (patternRef.current) patternRef.current.style.transform = `translate(${mx * 14}px, ${my * 14}px)`;
      if (glowRef.current)    glowRef.current.style.transform    = `translate(${mx * 22}px, ${my * 28}px)`;
    };
    const onLeave = () => { tRX = 0; tRY = 0; tPX = 0; tPY = 0; };

    const tick = () => {
      cRX += (tRX - cRX) * 0.06; cRY += (tRY - cRY) * 0.06;
      cPX += (tPX - cPX) * 0.09; cPY += (tPY - cPY) * 0.09;
      tilt.style.transform = `perspective(1400px) rotateX(${cRX}deg) rotateY(${cRY}deg)`;
      if (portraitRef.current)
        portraitRef.current.style.transform = `translate(${cPX}px,${cPY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(rafId); section.removeEventListener("mousemove", onMove); section.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        background: "#1C1917",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 7vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Zellige bg — subtle on dark */}
      <svg ref={patternRef} aria-hidden style={{
        position: "absolute", inset: "-12%", width: "124%", height: "124%",
        opacity: 0.03, transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)", pointerEvents: "none",
      }}>
        <defs>
          <pattern id="z2" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d={ZELLIGE_PATH} stroke="#C9AA7C" strokeWidth="0.7" fill="none" />
            <circle cx="24" cy="24" r="2.2" fill="#B5673C" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#z2)" />
      </svg>

      {/* Terracotta atmospheric glow behind portrait */}
      <div ref={glowRef} aria-hidden style={{
        position: "absolute",
        right: "4vw", top: "8%",
        width: "clamp(220px, 30vw, 440px)",
        height: "clamp(290px, 40vw, 580px)",
        background: "radial-gradient(ellipse at 45% 35%, rgba(181,103,60,0.22) 0%, rgba(181,103,60,0.08) 45%, transparent 72%)",
        pointerEvents: "none",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        filter: "blur(2px)",
      }} />

      {/* Gold accent arc — decorative */}
      <svg aria-hidden style={{
        position: "absolute", left: "-2vw", top: "20%",
        width: "clamp(80px, 10vw, 140px)", height: "clamp(200px, 28vw, 400px)",
        opacity: 0.12, pointerEvents: "none",
      }}>
        <path
          d="M100,10 Q10,50 10,100 Q10,150 100,190"
          stroke="#C9AA7C" strokeWidth="1" fill="none"
        />
      </svg>

      {/* Left accent bar */}
      <div aria-hidden style={{
        position: "absolute", left: 0, top: "25%", width: "2px", height: "35%",
        background: "linear-gradient(to bottom, transparent, #B5673C 40%, #B5673C 60%, transparent)",
        opacity: 0.7,
      }} />

      {/* Side label */}
      <div aria-hidden style={{
        position: "absolute", left: "2.5vw", top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        fontFamily: "var(--font-space-grotesk)", fontSize: "8px", letterSpacing: "0.32em",
        color: "#F5F0E8", opacity: 0.18, whiteSpace: "nowrap", userSelect: "none",
      }}>
        PORTFOLIO · 2026
      </div>

      {/* Top-right section label */}
      <div aria-hidden style={{
        position: "absolute", top: "6vh", right: "7vw",
        fontFamily: "var(--font-space-grotesk)", fontSize: "8px", letterSpacing: "0.28em",
        color: "#C9AA7C", opacity: 0.55,
      }}>
        01 / IDENTITÉ
      </div>

      {/* ── Main composition ── */}
      <div ref={scrollWrapRef}>
        <div ref={tiltRef} style={{ position: "relative", willChange: "transform" }}>

          {/* MAJDA — z:1, behind portrait */}
          <div style={{
            display: "flex", lineHeight: 0.86, marginBottom: "-0.04em",
            position: "relative", zIndex: 1,
          }}>
            {FIRST.map((letter, i) => (
              <span key={i} ref={(el) => { firstRefs.current[i] = el; }}
                style={{
                  fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(68px, 14.5vw, 210px)", color: "#F5F0E8",
                  letterSpacing: "-0.035em", display: "inline-block", willChange: "transform",
                  opacity: 0,
                }}
              >{letter}</span>
            ))}
          </div>

          {/* Portrait — z:2, sandwichée, glows on dark bg */}
          <div ref={portraitRef} className="hero-portrait" style={{
            position: "absolute",
            right: "2%", top: "-20%",
            width: "clamp(160px, 24vw, 340px)",
            height: "clamp(215px, 32vw, 454px)",
            zIndex: 2,
            pointerEvents: "none",
            willChange: "transform",
          }}>
            <Image
              src="/photo-portrait-removebg.png"
              alt="Majda Mhaili"
              fill priority
              sizes="(max-width: 640px) 0px, (max-width: 1200px) 24vw, 340px"
              style={{ objectFit: "contain", objectPosition: "top center" }}
            />
            {/* Ground fade */}
            <div style={{
              position: "absolute", bottom: "-1%", left: "10%", right: "10%", height: "40px",
              background: "radial-gradient(ellipse, rgba(28,25,23,0.5) 0%, transparent 70%)",
              filter: "blur(12px)",
            }} />
          </div>

          {/* MHAILI — z:3, devant la photo, MH en or */}
          <div style={{
            display: "flex", lineHeight: 0.86, paddingLeft: "2.5vw",
            position: "relative", zIndex: 3,
          }}>
            {LAST.map((item, i) => (
              <span key={i} ref={(el) => { lastRefs.current[i] = el; }}
                style={{
                  fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(68px, 14.5vw, 210px)", color: item.color,
                  letterSpacing: "-0.035em", display: "inline-block", willChange: "transform",
                  opacity: 0,
                }}
              >{item.char}</span>
            ))}
          </div>
        </div>

        {/* Rotating fact */}
        <div style={{
          display: "flex", alignItems: "center", gap: "14px",
          marginTop: "3vh", marginBottom: "2.5vh",
          opacity: factVisible ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}>
          <div style={{ width: "24px", height: "1px", background: "#B5673C", flexShrink: 0 }} />
          <span style={{
            fontFamily: "var(--font-space-grotesk)", fontSize: "9px", letterSpacing: "0.22em",
            color: "#B5673C", opacity: 0.75, whiteSpace: "nowrap",
          }}>
            {FACTS[factIdx]}
          </span>
        </div>

        {/* Gold line */}
        <div ref={lineRef} style={{
          height: "1px",
          background: "linear-gradient(90deg, #C9AA7C 0%, rgba(201,170,124,0.15) 100%)",
          marginBottom: "3.5vh", width: "100%",
        }} />

        {/* Subtitle */}
        <div ref={subRef} style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          flexWrap: "wrap", gap: "12px", opacity: 0,
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-dm-sans)", fontSize: "clamp(9px,1vw,11px)",
              letterSpacing: "0.28em", color: "#F5F0E8", opacity: 0.4, marginBottom: "8px",
            }}>DÉVELOPPEUSE FULL STACK</p>
            <p style={{
              fontFamily: "var(--font-cormorant)", fontStyle: "italic",
              fontSize: "clamp(18px, 2.4vw, 32px)", color: "#F5F0E8", letterSpacing: "-0.01em",
              opacity: 0.92,
            }}>Je ne code pas. Je compose.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{
              fontFamily: "var(--font-space-grotesk)", fontSize: "9px",
              letterSpacing: "0.22em", color: "#B5673C", opacity: 0.85, marginBottom: "5px",
            }}>BORDEAUX · FRANCE</p>
            <p style={{
              fontFamily: "var(--font-space-grotesk)", fontSize: "9px",
              letterSpacing: "0.22em", color: "#F5F0E8", opacity: 0.25,
            }}>CDI · SEPT 2026</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "5vh", right: "7vw",
        display: "flex", alignItems: "center", gap: "14px", opacity: 0.3,
      }}>
        <div style={{ width: "40px", height: "1px", background: "#F5F0E8" }} />
        <span style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "9px",
          letterSpacing: "0.22em", color: "#F5F0E8",
        }}>SCROLL</span>
      </div>

      <style>{`
        @media (max-width: 600px) { .hero-portrait { display: none !important; } }
      `}</style>
    </section>
  );
}
