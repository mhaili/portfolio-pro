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

      {/* Social links */}
      <div
        style={{
          marginTop: "4vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.45s",
        }}
      >
        <SocialLink
          href="https://www.linkedin.com/in/majda-mhaili/"
          label="LinkedIn"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          }
        />
        <span style={{ width: "1px", height: "18px", background: "rgba(245,240,232,0.12)" }} />
        <SocialLink
          href="https://github.com/mhaili"
          label="GitHub"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          }
        />
      </div>

      {/* Availability badge */}
      <div
        style={{
          marginTop: "3vh",
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



      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "10px",
        letterSpacing: "0.14em",
        color: hovered ? "#C9AA7C" : "#E2C9B0",
        textDecoration: "none",
        opacity: hovered ? 1 : 0.6,
        transition: "color 0.25s ease, opacity 0.25s ease",
      }}
    >
      {icon}
      {label}
    </a>
  );
}
