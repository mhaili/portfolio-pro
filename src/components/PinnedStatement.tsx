"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUOTE =
  "Je suis née entre deux cultures, j'ai grandi entre deux langages. Le code, c'est ma façon d'écrire ce que les mots ne peuvent pas dire.";

export default function PinnedStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  const words = QUOTE.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

      // Start: all words very dim
      gsap.set(wordEls, { opacity: 0.07 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      // Words illuminate one by one as you scroll
      tl.to(wordEls, {
        opacity: 1,
        color: "#F5F0E8",
        stagger: { each: 0.35, ease: "none" },
        ease: "none",
        duration: 0.3,
      });

      // Scroll-driven counter — count lit words
      if (counterRef.current) {
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: wordEls.length,
            ease: "none",
            duration: wordEls.length * 0.35,
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counter.val));
              }
            },
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [words.length]);

  return (
    <div
      ref={sectionRef}
      id="manifeste"
      style={{
        height: "100vh",
        background: "#1C1917",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 10vw",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* Radial gradient atmosphere */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 60%, rgba(42,52,71,0.6) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Big decorative quote mark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "4vh",
          right: "8vw",
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(120px,18vw,220px)",
          color: "rgba(201,170,124,0.07)",
          lineHeight: 1,
          fontWeight: 300,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* The scrollable quote */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(22px, 3.8vw, 54px)",
            lineHeight: 1.7,
            letterSpacing: "-0.01em",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              style={{
                display: "inline",
                opacity: 0.07,
                color: "#E2C9B0",
                transition: "none",
              }}
            >
              {word}{i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: "6vh",
          left: "10vw",
          right: "10vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(201,170,124,0.15)",
          paddingTop: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            color: "#C9AA7C",
            opacity: 0.5,
          }}
        >
          SCROLL ↓
        </span>
        <span
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#C9AA7C",
            opacity: 0.35,
          }}
        >
          <span ref={counterRef}>0</span> / {words.length} MOTS
        </span>
      </div>
    </div>
  );
}
