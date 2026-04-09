import { personal } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem 3rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", color: "#fff", marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>{personal.name}</p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#404040", letterSpacing: "0.18em", textTransform: "uppercase" }}>Data Analyst — India</p>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {["#intro", "#education", "#skills", "#projects", "#contact"].map((href) => (
            <a key={href} href={href} className="hover-line"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#404040", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = "#a3a3a3"}
              onMouseLeave={e => e.target.style.color = "#404040"}>
              {href.replace("#", "")}
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#2a2a2a", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
