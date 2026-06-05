"use client";

const ITEMS = [
  "React", "TypeScript", "VueJs", "Node.js", "NestJS",
  "PostgreSQL", "Angular", "PHP", "Design", "Maroc", "France",
  "Orchard CMS", "eZplatform", "Laravel", "Full Stack",
];

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        overflow: "hidden",
        background: "#1C1917",
        padding: "14px 0",
        borderTop: "1px solid rgba(201,170,124,0.15)",
        borderBottom: "1px solid rgba(201,170,124,0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee${reverse ? "-r" : ""} 28s linear infinite`,
          willChange: "transform",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: i % 5 === 3 ? "#B5673C" : "#C9AA7C",
              whiteSpace: "nowrap",
              paddingRight: "3.5vw",
              opacity: 0.85,
            }}
          >
            {item.toUpperCase()}
            <span style={{ color: "rgba(201,170,124,0.3)", marginLeft: "3.5vw" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
