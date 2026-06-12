"use client";

import { useEffect, useRef, useState } from "react";
import { bp } from "@/lib/basePath";

export default function VideoCV() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: "#0F0D0B", padding: "12vh 8vw", position: "relative", overflow: "hidden" }}
    >
      {/* Decorative bg word */}
      <div aria-hidden style={{
        position: "absolute",
        top: "3vh", right: "-1vw",
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "clamp(80px, 15vw, 200px)",
        color: "rgba(245,240,232,0.025)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        Archive.
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          color: "#B5673C",
          marginBottom: "16px",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}>
          ARCHIVE · BUT MMI · ANGLAIS
        </p>

        <h2 style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(32px, 5.5vw, 76px)",
          color: "#F5F0E8",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "2vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}>
          Une trace.
        </h2>

        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "13px",
          color: "#E2C9B0",
          opacity: visible ? 0.55 : 0,
          lineHeight: 1.7,
          marginBottom: "6vh",
          maxWidth: "480px",
          transition: "opacity 0.8s ease 0.2s",
        }}>
          CV vidéo réalisé en anglais durant mon BUT MMI. Un instantané de qui j'étais avant de traverser.
        </p>

        {/* Video container */}
        <div style={{
          position: "relative",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid rgba(201,170,124,0.15)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s ease 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        }}>
          {/* Gold accent top bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #C9AA7C 0%, transparent 60%)",
            zIndex: 1,
          }} />

          <video
            controls
            preload="none"
            style={{
              width: "100%",
              display: "block",
              background: "#000",
              maxHeight: "70vh",
            }}
          >
            <source src={`${bp}/English_CV_video.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
