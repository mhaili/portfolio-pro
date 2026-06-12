"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const leftLabelRef = useRef<HTMLDivElement>(null);
  const rightLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance: headline + labels fade in
      gsap.from(headRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from([leftLabelRef.current, rightLabelRef.current], {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      // Line draws left to right on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center 40%",
            scrub: 0.8,
          },
        }
      );

      // Avatar travels from left panel to right panel
      gsap.fromTo(
        avatarRef.current,
        { left: "calc(25% - 40px)", top: "50%", scale: 0.7, opacity: 0 },
        {
          left: "calc(75% - 40px)",
          top: "40%",
          scale: 1,
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 60%",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "#1C1917", overflow: "hidden", position: "relative" }}
    >
      {/* Headline */}
      <div style={{ padding: "8vh 8vw 5vh", position: "relative", zIndex: 2 }}>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "9px",
            letterSpacing: "0.32em",
            color: "#B5673C",
            marginBottom: "14px",
          }}
        >
          ORIGINE · DESTINATION
        </p>
        <h2
          ref={headRef}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(28px, 4.5vw, 58px)",
            color: "#F5F0E8",
            lineHeight: 1.2,
            maxWidth: "600px",
          }}
        >
          De Marrakech à Blois,<br />
          j'ai traversé plus qu'une mer.
        </h2>
      </div>

      {/* Two photo panels + avatar */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "60vh",
          minHeight: "380px",
        }}
      >
        {/* LEFT — Marrakech */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/photo-morocco.jpg"
            alt="Marrakech"
            fill
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.7) saturate(1.1)" }}
          />
          {/* Warm overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(181,103,60,0.35) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          {/* Label */}
          <div
            ref={leftLabelRef}
            style={{
              position: "absolute",
              bottom: "6vh",
              left: "6vw",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 3vw, 42px)",
                color: "#F5F0E8",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              Marrakech
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                letterSpacing: "0.28em",
                color: "#B5673C",
              }}
            >
              MAROC · ORIGINES
            </p>
          </div>
          {/* Pulsing dot */}
          <div
            style={{
              position: "absolute",
              top: "46%",
              right: "0",
              transform: "translateY(-50%)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#B5673C",
              boxShadow: "0 0 0 0 rgba(181,103,60,0.6)",
              animation: "pulse-morocco 2.2s ease-out infinite",
            }}
          />
        </div>

        {/* RIGHT — Blois */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/blois.jpg"
            alt="Blois"
            fill
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center", filter: "brightness(0.65) saturate(0.95)" }}
          />
          {/* Cool overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to left, rgba(42,52,71,0.4) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          {/* Label */}
          <div
            ref={rightLabelRef}
            style={{
              position: "absolute",
              bottom: "6vh",
              right: "6vw",
              textAlign: "right",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 3vw, 42px)",
                color: "#F5F0E8",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              Blois
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "9px",
                letterSpacing: "0.28em",
                color: "#C9AA7C",
              }}
            >
              FRANCE · AMBITIONS
            </p>
          </div>
          {/* Pulsing dot */}
          <div
            style={{
              position: "absolute",
              top: "46%",
              left: "0",
              transform: "translateY(-50%)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#C9AA7C",
              boxShadow: "0 0 0 0 rgba(201,170,124,0.6)",
              animation: "pulse-blois 2.2s ease-out infinite 0.5s",
            }}
          />
        </div>

        {/* Connecting line */}
        <div
          style={{
            position: "absolute",
            top: "46%",
            left: 0,
            right: 0,
            height: "1px",
            transformOrigin: "left center",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <div
            ref={lineRef}
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, #B5673C 0%, #C9AA7C 50%, #C9AA7C 100%)",
              opacity: 0.55,
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* Mini avatar — travels with scroll */}
        <div
          ref={avatarRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "calc(25% - 40px)",
            transform: "translateY(-50%)",
            width: "80px",
            height: "80px",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              position: "absolute",
              inset: "-7px",
              borderRadius: "50%",
              border: "1.5px solid rgba(201,170,124,0.6)",
              animation: "avatar-ring 2s ease-in-out infinite",
            }}
          />
          {/* Photo circle */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #C9AA7C",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
              position: "relative",
            }}
          >
            <Image
              src="/photo-portrait.webp"
              alt="Majda"
              fill
              sizes="200px"
              quality={100}
              style={{ objectFit: "cover", objectPosition: "center 15%" }}
            />
          </div>
          {/* Distance label below */}
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "8px",
              letterSpacing: "0.18em",
              color: "#C9AA7C",
              opacity: 0.8,
            }}
          >
            3 000 KM
          </div>
        </div>
      </div>

      {/* Caption */}
      <div style={{ padding: "3vh 8vw 6vh", position: "relative", zIndex: 2 }}>
        <p style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(16px, 1.8vw, 26px)",
          color: "#F5F0E8",
          letterSpacing: "-0.01em",
          marginBottom: "1vh",
        }}>
          J'ai appris à m'adapter · À recommencer · À construire.
        </p>
        <p style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "clamp(13px, 1.3vw, 18px)",
          color: "#E2C9B0",
          opacity: 0.6,
          lineHeight: 1.7,
          letterSpacing: "0.03em",
          maxWidth: "520px",
        }}>
          Aujourd'hui, je mets cette même énergie au service des expériences numériques que je crée.
        </p>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes pulse-morocco {
          0% { box-shadow: 0 0 0 0 rgba(181,103,60,0.7); }
          70% { box-shadow: 0 0 0 12px rgba(181,103,60,0); }
          100% { box-shadow: 0 0 0 0 rgba(181,103,60,0); }
        }
        @keyframes pulse-blois {
          0% { box-shadow: 0 0 0 0 rgba(201,170,124,0.7); }
          70% { box-shadow: 0 0 0 12px rgba(201,170,124,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,170,124,0); }
        }
        @keyframes avatar-ring {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
