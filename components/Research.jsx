import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { research } from "../data/portfolioData";

export default function Research() {
  return (
    <section id="research" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "6rem 3rem" }}>
      <SectionHeading index="05" label="Academic Work" title="Research" />
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: "1.75rem", top: 0, bottom: 0, width: "1px", background: "rgba(255,255,255,0.07)" }} />
        <div>
          {research.map((item, i) => <ResearchItem key={item.id} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ResearchItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{ position: "relative", paddingLeft: "4.5rem", paddingBottom: "3rem", display: "block", textDecoration: "none", cursor: "pointer" }}
      onMouseEnter={e => {
        e.currentTarget.querySelector(".dot").style.background = "#fff";
        e.currentTarget.querySelector(".title").style.color = "rgba(255,255,255,0.7)";
      }}
      onMouseLeave={e => {
        e.currentTarget.querySelector(".dot").style.background = "#404040";
        e.currentTarget.querySelector(".title").style.color = "#fff";
      }}
    >
      <div className="dot" style={{ position: "absolute", left: "calc(1.75rem - 5px)", top: "6px", width: "10px", height: "10px", borderRadius: "50%", background: "#404040", border: "1px solid #525252", transition: "background 0.3s" }} />

      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#404040", letterSpacing: "0.15em", display: "block", marginBottom: "0.75rem" }}>{String(index + 1).padStart(2, "0")}</span>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <h3 className="title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#fff", fontSize: "clamp(1rem, 2.5vw, 1.5rem)", lineHeight: 1.3, transition: "color 0.3s" }}>{item.title}</h3>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.85rem" }}>↗</span>
      </div>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#a3a3a3", lineHeight: 1.7, maxWidth: "560px" }}>{item.description}</p>
      <div style={{ marginTop: "2rem", height: "1px", background: "rgba(255,255,255,0.05)" }} />
    </motion.a>
  );
}