import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/portfolioData";

export default function Projects() {
  return (
    <section id="projects" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "6rem 3rem" }}>
      <SectionHeading index="04" label="Work" title="Projects" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.07)" }}>
        {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: "#0B0B0B", padding: "2.5rem", minHeight: "380px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", transition: "background 0.4s" }}>

      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.025)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s", pointerEvents: "none" }} />

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 900, color: "rgba(255,255,255,0.07)", lineHeight: 1, userSelect: "none" }}>{project.number}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#525252", letterSpacing: "0.15em", opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(8px)", transition: "all 0.3s" }}>View Project ↗</span>
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", lineHeight: 1.3, marginBottom: "1rem" }}>{project.title}</h3>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#a3a3a3", lineHeight: 1.7, marginBottom: "1.5rem" }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {project.tech.map((t) => (
            <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#737373", border: "1px solid rgba(255,255,255,0.07)", padding: "3px 10px", letterSpacing: "0.08em" }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {project.metrics.map((m) => (
          <div key={m.label}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2rem", color: "#fff", lineHeight: 1, margin: 0 }}>{m.value}</p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#525252", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "4px" }}>{m.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
