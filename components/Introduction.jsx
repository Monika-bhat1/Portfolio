import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { personal } from "../data/portfolioData";

// ─── DROP YOUR IMAGE IN THE public/ FOLDER AND UPDATE THIS PATH ───
const PROFILE_IMAGE = "/profile.jpg"; // e.g. /profile.jpg, /photo.png, /me.webp

const S = { borderTop: "1px solid rgba(255,255,255,0.1)", padding: "6rem 3rem" };

export default function Introduction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="intro" style={S}>
      <SectionHeading index="01" label="About" title="Introduction" />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>

        {/* ── Image Block ── */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.9 }}>
          <div style={{ aspectRatio: "3/4", background: "#171717", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>

            {/* Profile photo */}
            <img
              src={PROFILE_IMAGE}
              alt="Monika Bhat"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
              onError={(e) => {
                // If image fails to load, hide it and show the fallback monogram
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />

            {/* Fallback monogram (hidden when image loads successfully) */}
            <div style={{ display: "none", position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "rgba(255,255,255,0.04)", fontSize: "clamp(5rem, 18vw, 12rem)", userSelect: "none", lineHeight: 1 }}>MB</span>
            </div>

            {/* Subtle overlay gradient for text readability */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)", pointerEvents: "none" }} />

            {/* Corner labels */}
            <span style={{ position: "absolute", top: "1rem", left: "1rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>India</span>
            <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>2025</span>
          </div>
        </motion.div>

        {/* ── Text Content ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center" }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }}
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#d4d4d4", fontSize: "1.1rem", lineHeight: 1.8 }}>
            {personal.bio}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.7 }}
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[["Role", personal.title], ["Based In", personal.location], ["Focus", "Data Analytics & ML"], ["Status", "MTech @ IIT Patna"]].map(([k, v]) => (
              <div key={k}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#525252", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{k}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#e5e5e5" }}>{v}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45, duration: 0.7 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a href={"mailto:" + personal.contact.email}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "all 0.3s" }}
              onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.color = "#000"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#fff"; }}>
              Get In Touch
            </a>
            <a href={personal.contact.github}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a3a3a3", border: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "all 0.3s" }}
              onMouseEnter={e => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
              onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}>
              GitHub ↗
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}