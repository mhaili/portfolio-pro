"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS = [
  "Certaines personnes écrivent avec des mots.",
  "D'autres avec des images.",
  "Moi, j'écris avec du code.",
  "Chaque projet est une nouvelle page.",
  "Chaque défi, une nouvelle histoire à raconter.",
];

// Flatten to a list of { word, paragraphIdx } for GSAP stagger
const WORDS: { word: string; pIdx: number }[] = PARAGRAPHS.flatMap((p, pIdx) =>
  p.split(" ").map((word) => ({ word, pIdx }))
);

export default function PinnedStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef   = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

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

      tl.to(wordEls, {
        opacity: 1,
        color: "#F5F0E8",
        stagger: { each: 0.35, ease: "none" },
        ease: "none",
        duration: 0.3,
      });

      if (counterRef.current) {
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: wordEls.length,
            ease: "none",
            duration: wordEls.length * 0.35,
            onUpdate: () => {
              if (counterRef.current)
                counterRef.current.textContent = String(Math.round(counter.val));
            },
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

      {/* Paragraphs — each on its own line, words lit individually */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        {(() => {
          let globalIdx = 0;
          return PARAGRAPHS.map((para, pIdx) => {
            const paraWords = para.split(" ");
            const startIdx  = globalIdx;
            globalIdx += paraWords.length;

            return (
              <p
                key={pIdx}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(22px, 3.8vw, 54px)",
                  lineHeight: 1.55,
                  letterSpacing: "-0.01em",
                  marginBottom: pIdx < PARAGRAPHS.length - 1 ? "0.55em" : 0,
                }}
              >
                {paraWords.map((word, wIdx) => {
                  const absIdx = startIdx + wIdx;
                  return (
                    <span
                      key={absIdx}
                      ref={(el) => { wordsRef.current[absIdx] = el; }}
                      style={{
                        display: "inline",
                        opacity: 0.07,
                        color: "#E2C9B0",
                        transition: "none",
                      }}
                    >
                      {word}{wIdx < paraWords.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </p>
            );
          });
        })()}
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
          <span ref={counterRef}>0</span> / {WORDS.length} MOTS
        </span>
      </div>
    </div>
  );
}
