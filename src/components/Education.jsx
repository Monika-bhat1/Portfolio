import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { education } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "6rem 3rem" }}>
      <SectionHeading index="02" label="Academic" title="My Education" />
      <div>
        {education.map((edu, i) => <EduRow key={edu.id} edu={edu} index={i} />)}
      </div>
    </section>
  );
}

function EduRow({ edu, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "2rem 0", display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: "2rem", alignItems: "start", transition: "background 0.3s" }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <div>
        <span style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#525252", letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.1)", padding: "3px 8px", marginBottom: "0.75rem" }}>{edu.tag}</span>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#525252", letterSpacing: "0.1em" }}>{edu.period}</p>
      </div>
      <div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: "clamp(1rem, 2vw, 1.4rem)", lineHeight: 1.3, marginBottom: "0.5rem" }}>{edu.degree}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#a3a3a3", fontSize: "0.875rem" }}>{edu.institution}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        {edu.grade
          ? <><span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.8rem", color: "rgba(255,255,255,0.75)" }}>{edu.grade.split(" ")[1]}</span>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#525252", letterSpacing: "0.15em", marginTop: "4px" }}>{edu.grade.split(" ")[0]}</p></>
          : <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#525252", letterSpacing: "0.15em", textTransform: "uppercase" }}>Ongoing</span>
        }
      </div>
    </motion.div>
  );
}
