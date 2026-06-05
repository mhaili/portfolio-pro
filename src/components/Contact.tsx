"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section"
      style={{
        background: "#1C1917",
        padding: "12vh 8vw",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Big headline */}
      <h2
        style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(44px, 9vw, 140px)",
          color: "#F5F0E8",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          marginBottom: "6vh",
        }}
      >
        Travaillons<br />ensemble.
      </h2>

      {/* Email */}
      <a
        href="mailto:mhailimajda@gmail.com"
        data-cursor
        onMouseEnter={() => setEmailHovered(true)}
        onMouseLeave={() => setEmailHovered(false)}
        style={{
          display: "inline-block",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(14px, 2vw, 20px)",
          color: "#E2C9B0",
          textDecoration: "none",
          letterSpacing: "0.04em",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.3s, color 0.3s ease",
          position: "relative",
          paddingBottom: "6px",
        }}
      >
        mhailimajda@gmail.com
        {/* Animated underline */}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: emailHovered ? "0%" : "50%",
            right: emailHovered ? "0%" : "50%",
            height: "1px",
            background: "#C9AA7C",
            transition: "left 0.5s cubic-bezier(0.16,1,0.3,1), right 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </a>

      {/* Availability badge */}
      <div
        style={{
          marginTop: "4vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          opacity: visible ? 0.7 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#B5673C",
            display: "inline-block",
            animation: "pulse-dot 2s ease infinite",
          }}
        />
        <span style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "11px",
          color: "#E2C9B0",
          letterSpacing: "0.15em",
        }}>
          DISPONIBLE EN CDI À PARTIR DE SEPTEMBRE 2026
        </span>
      </div>

      {/* Phone */}
      <p
        style={{
          marginTop: "2vh",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "13px",
          color: "#E2C9B0",
          opacity: visible ? 0.4 : 0,
          transition: "opacity 0.8s ease 0.7s",
          letterSpacing: "0.08em",
        }}
      >
        +33 6 62 60 04 73
      </p>

      {/* Footer */}
      <p
        style={{
          position: "absolute",
          bottom: "4vh",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "10px",
          color: "#E2C9B0",
          opacity: 0.3,
          letterSpacing: "0.12em",
          whiteSpace: "nowrap",
        }}
      >
        © 2026 MAJDA MHAILI · Conçu & développé avec intention.
      </p>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
