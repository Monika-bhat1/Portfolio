import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { certifications } from "../data/portfolioData";

export default function Certifications() {
  return (
    <section id="certifications" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "6rem 3rem" }}>
      <SectionHeading index="06" label="Credentials" title="Certifications" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {certifications.map((cert, i) => <CertCard key={cert.title} cert={cert} index={i} />)}
      </div>
    </section>
  );
}

function CertCard({ cert, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "1.75rem",
        minHeight: "150px",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top-right arrow icon */}
      <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", color: "rgba(255,255,255,0.2)", fontSize: "0.85rem", transition: "color 0.3s" }}>
        ↗
      </div>

      {/* Content */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.9rem",
        color: "#e5e5e5",
        lineHeight: 1.55,
        marginBottom: "1.5rem",
        paddingRight: "1.5rem",
      }}>
        {cert.title}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.65rem",
          color: "#525252",
          letterSpacing: "0.15em",
        }}>
          {cert.year}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          View Certificate
        </span>
      </div>
    </motion.a>
  );
}