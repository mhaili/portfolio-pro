"use client";

import { useEffect, useState } from "react";

interface PreludeProps {
  onComplete: () => void;
}

const letters = ["A", "I", "L", "I", "M", "A"];

export default function Prelude({ onComplete }: PreludeProps) {
  const [phase, setPhase] = useState<"h" | "name" | "pulse" | "exit">("h");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 500);
    const t2 = setTimeout(() => setPhase("pulse"), 1200);
    const t3 = setTimeout(() => setPhase("exit"), 2000);
    const t4 = setTimeout(() => onComplete(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "#F5F0E8",
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.6s ease" : "none",
        pointerEvents: phase === "exit" ? "none" : "all",
      }}
    >
      <div
        className="flex items-baseline select-none"
        style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
      >
        {/* H — first letter */}
        <span
          style={{
            fontSize: "clamp(80px, 16vw, 180px)",
            fontWeight: 300,
            color: "#1C1917",
            opacity: phase === "h" || phase === "name" || phase === "pulse" ? 1 : 0,
            transform:
              phase === "pulse"
                ? "scale(1.03)"
                : "scale(1)",
            transition: "transform 0.6s ease, opacity 0.4s ease",
            letterSpacing: "-0.02em",
          }}
        >
          H
        </span>

        {/* A I L I M A — stagger reveal */}
        {letters.map((letter, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(80px, 16vw, 180px)",
              fontWeight: 300,
              color: "#1C1917",
              opacity: phase === "name" || phase === "pulse" ? 1 : 0,
              transform:
                phase === "name" || phase === "pulse"
                  ? "translateY(0)"
                  : "translateY(20px)",
              transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              letterSpacing: "-0.02em",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Thin gold line underneath */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(50% - 100px)",
          left: "50%",
          transform: "translateX(-50%)",
          height: "1px",
          background: "#C9AA7C",
          width: phase === "name" || phase === "pulse" ? "120px" : "0px",
          transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s",
        }}
      />
    </div>
  );
}
