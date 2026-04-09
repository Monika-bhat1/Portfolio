import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skills } from "../data/portfolioData";

export default function Skills() {
  return (
    <section id="skills" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "6rem 3rem" }}>
      <SectionHeading index="03" label="Expertise" title="My Skills" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "3rem 4rem" }}>
        {skills.map((group, i) => <SkillGroup key={group.category} group={group} index={i} />)}
      </div>
    </section>
  );
}

function SkillGroup({ group, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#404040", letterSpacing: "0.1em" }}>{String(index + 1).padStart(2, "0")}</span>
        <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#a3a3a3", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>{group.category}</h3>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {group.items.map((item) => (
          <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}
            onMouseEnter={e => { e.currentTarget.querySelector("span:first-child").style.background = "#fff"; e.currentTarget.querySelector("span:last-child").style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.querySelector("span:first-child").style.background = "#404040"; e.currentTarget.querySelector("span:last-child").style.color = "#d4d4d4"; }}>
            <span style={{ marginTop: "7px", display: "block", width: "4px", height: "4px", borderRadius: "50%", background: "#404040", flexShrink: 0, transition: "background 0.3s" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#d4d4d4", lineHeight: 1.6, transition: "color 0.3s" }}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
