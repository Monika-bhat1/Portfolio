import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { education } from "../data/portfolioData";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function Education() {
  const isMobile = useIsMobile();
  return (
    <section
      id="education"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: isMobile ? "4rem 1.25rem" : "6rem 3rem",
      }}
    >
      <SectionHeading index="02" label="Academic" title="My Education" />
      <div>
        {education.map((edu, i) => (
          <EduRow key={edu.id} edu={edu} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

function EduRow({ edu, index, isMobile }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: isMobile ? "1.5rem 0" : "2rem 0",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr 1fr",
        gap: isMobile ? "0.75rem" : "2rem",
        alignItems: "start",
        transition: "background 0.3s",
      }}
    >
      {/* Tag + Period */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: isMobile ? "center" : "flex-start",
          gap: isMobile ? "0.75rem" : "0",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            color: "#525252",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "3px 8px",
            marginBottom: isMobile ? 0 : "0.75rem",
            whiteSpace: "nowrap",
          }}
        >
          {edu.tag}
        </span>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            color: "#525252",
            letterSpacing: "0.1em",
            margin: 0,
          }}
        >
          {edu.period}
        </p>
      </div>

      {/* Degree + Institution */}
      <div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "#fff",
            fontSize: isMobile ? "1.1rem" : "clamp(1rem, 2vw, 1.4rem)",
            lineHeight: 1.3,
            marginBottom: "0.5rem",
            marginTop: 0,
          }}
        >
          {edu.degree}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "#a3a3a3",
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          {edu.institution}
        </p>
      </div>

      {/* Grade */}
      <div style={{ textAlign: isMobile ? "left" : "right" }}>
        {edu.grade ? (
          <>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: isMobile ? "1.4rem" : "1.8rem",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {edu.grade.split(" ")[1]}
            </span>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                color: "#525252",
                letterSpacing: "0.15em",
                marginTop: "4px",
              }}
            >
              {edu.grade.split(" ")[0]}
            </p>
          </>
        ) : (
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              color: "#525252",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Ongoing
          </span>
        )}
      </div>
    </motion.div>
  );
}