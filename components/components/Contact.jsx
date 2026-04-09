import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { personal } from "../data/portfolioData";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    padding: "0.85rem 1rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s",
  };

  const labelStyle = {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.65rem",
    color: "#525252",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.5rem",
  };

  const contactLinks = [
    { label: "Email", value: personal.contact.email, href: "mailto:" + personal.contact.email },
    { label: "Phone", value: personal.contact.phone, href: "tel:" + personal.contact.phone },
    { label: "LinkedIn", value: "linkedin.com/in/monikabhat", href: personal.contact.linkedin },
    { label: "GitHub", value: "github.com/monikabhat", href: personal.contact.github },
  ];

  return (
    <section id="contact" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "6rem 3rem" }}>
      <SectionHeading index="07" label="Say Hello" title="Contact" />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem" }}>

        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#d4d4d4", fontSize: "1.1rem", lineHeight: 1.8 }}>
            Open to data analytics roles, research collaborations, and AI-driven projects. Let's build something meaningful.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7 }}
            style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {contactLinks.map(({ label, value, href }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "1rem 0" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#525252", letterSpacing: "0.18em", textTransform: "uppercase" }}>{label}</span>
                <a href={href} className="hover-line"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#d4d4d4", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#d4d4d4"}>
                  {value}
                </a>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }}
          onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[{ id: "name", label: "Name", type: "text", ph: "Your name" }, { id: "email", label: "Email", type: "email", ph: "your@email.com" }].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} style={labelStyle}>{f.label}</label>
              <input id={f.id} type={f.type} placeholder={f.ph} value={form[f.id]}
                onChange={(e) => setForm({ ...form, [f.id]: e.target.value })} required
                style={{ ...inputStyle, "::placeholder": { color: "#404040" } }}
                onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.35)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
          ))}
          <div>
            <label htmlFor="message" style={labelStyle}>Message</label>
            <textarea id="message" rows={5} placeholder="Tell me about your project..."
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required
              style={{ ...inputStyle, resize: "none" }}
              onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.35)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
          <button type="submit"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: sent ? "#0B0B0B" : "#fff", background: sent ? "#fff" : "transparent", border: "1px solid rgba(255,255,255,0.2)", padding: "1rem 2rem", cursor: "none", alignSelf: "flex-start", transition: "all 0.3s" }}
            onMouseEnter={e => { if (!sent) { e.target.style.background = "#fff"; e.target.style.color = "#000"; } }}
            onMouseLeave={e => { if (!sent) { e.target.style.background = "transparent"; e.target.style.color = "#fff"; } }}>
            {sent ? "Message Sent ✓" : "Send Message →"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
