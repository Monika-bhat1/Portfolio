import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SectionHeading({ label, title, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs" style={{ color: "#525252", letterSpacing: "0.15em" }}>{index}</span>
        <motion.span
          initial={{ scaleX: 0 }} style={{ originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="block h-px flex-1" style={{ background: "rgba(255,255,255,0.1)" }}
        />
        {label && (
          <span className="font-mono text-xs uppercase" style={{ color: "#737373", letterSpacing: "0.2em" }}>{label}</span>
        )}
      </div>
      <div style={{ overflow: "hidden" }}>
        <motion.h2
          initial={{ y: "105%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em", fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
