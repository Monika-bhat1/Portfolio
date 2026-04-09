import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personal } from "../data/portfolioData";

export default function Hero() {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const ctx = canvas.getContext("2d");

    let W, H, particles = [], animId;
    let formTime = 0;
    const mouse = { x: -999, y: -999 };

    function resize() {
      const r = stage.getBoundingClientRect();
      W = canvas.width = r.width;
      H = canvas.height = r.height;
    }

    function getFontSize() {
      if (W < 480) return Math.min(W * 0.11, 44);
      if (W < 768) return Math.min(W * 0.12, 72);
      return Math.min(W * 0.13, 110);
    }

    function getParticleSampling() {
      if (W < 480) return { count: 900, step: 3 };
      if (W < 768) return { count: 1400, step: 4 };
      return { count: 2200, step: 4 };
    }

    function getTextPixels(text, fontSize) {
      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
      off.width = W;
      off.height = H;
      octx.fillStyle = "#fff";
      octx.font = `900 ${fontSize}px Arial, sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      if (W < 480) {
        const parts = text.split(" ");
        const lineH = fontSize * 1.15;
        octx.fillText(parts[0] || text, W / 2, H / 2 - lineH / 2);
        if (parts[1]) octx.fillText(parts[1], W / 2, H / 2 + lineH / 2);
      } else {
        octx.fillText(text, W / 2, H / 2);
      }

      const data = octx.getImageData(0, 0, W, H).data;
      const pts = [];
      const { step } = getParticleSampling();
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 128) pts.push({ x, y });
        }
      }
      return pts;
    }

    function Particle(tx, ty) {
      this.tx = tx;
      this.ty = ty;
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 6;
      this.vy = (Math.random() - 0.5) * 6;
      this.size = W < 480
        ? Math.random() * 1.0 + 0.3
        : Math.random() * 1.4 + 0.4;
      const brightness = 180 + Math.floor(Math.random() * 76);
      this.color = `rgb(${brightness},${brightness},${brightness})`;
      this.alpha = 0;
    }

    Particle.prototype.update = function (forming) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repel = W < 480 ? 60 : 90;

      if (forming) {
        const ex = this.tx - this.x;
        const ey = this.ty - this.y;
        this.vx += ex * 0.08;
        this.vy += ey * 0.08;
        this.vx *= 0.72;
        this.vy *= 0.72;
      } else {
        this.vx *= 0.98;
        this.vy *= 0.98;
      }

      if (dist < repel && dist > 0) {
        const force = ((repel - dist) / repel) * 4;
        this.vx -= (dx / dist) * force;
        this.vy -= (dy / dist) * force;
      }

      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -0.6;
      if (this.y < 0 || this.y > H) this.vy *= -0.6;
      this.alpha = Math.min(1, this.alpha + 0.02);
    };

    Particle.prototype.draw = function () {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };

    function init() {
      resize();
      const fontSize = getFontSize();
      const pts = getTextPixels(personal.name, fontSize);
      const { count } = getParticleSampling();
      const cap = Math.min(pts.length, count);
      const step = Math.max(1, Math.floor(pts.length / cap));
      particles = [];
      for (let i = 0; i < pts.length; i += step) {
        if (particles.length >= cap) break;
        particles.push(new Particle(pts[i].x, pts[i].y));
      }
      formTime = Date.now() + 1400;
    }

    function loop() {
      animId = requestAnimationFrame(loop);
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      const forming = Date.now() > formTime;
      for (const p of particles) {
        p.update(forming);
        p.draw();
      }
    }

    const onMouseMove = (e) => {
      const r = stage.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onMouseLeave = () => { mouse.x = -999; mouse.y = -999; };
    const onTouchMove = (e) => {
      e.preventDefault();
      const r = stage.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - r.left;
      mouse.y = e.touches[0].clientY - r.top;
    };
    const onTouchEnd = () => { mouse.x = -999; mouse.y = -999; };

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animId);
        init();
        loop();
      }, 150);
    };

    stage.addEventListener("mousemove", onMouseMove);
    stage.addEventListener("mouseleave", onMouseLeave);
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    init();
    loop();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      stage.removeEventListener("mousemove", onMouseMove);
      stage.removeEventListener("mouseleave", onMouseLeave);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 3rem) clamp(1.5rem, 4vw, 3rem)",
        position: "relative",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* Top row: contact */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: "right" }}
        >
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)", color: "#525252", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>
            Contact
          </p>
          <a
            href={"mailto:" + personal.contact.email}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)", color: "#d4d4d4", display: "block", textDecoration: "none" }}
          >
            {personal.contact.email}
          </a>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.6rem, 1.3vw, 0.7rem)", color: "#737373", margin: 0 }}>
            {personal.contact.phone}
          </p>
        </motion.div>
      </div>

      {/* Particle canvas — fills entire section */}
      <div
        ref={stageRef}
        style={{ position: "absolute", inset: 0, zIndex: 1, cursor: "none" }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      </div>

      {/* Eyebrow label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.2, duration: 0.7 }}
        style={{
          position: "relative", zIndex: 2,
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(0.5rem, 1.3vw, 0.65rem)",
          color: "#525252", letterSpacing: "0.2em",
          textTransform: "uppercase", textAlign: "center",
          marginTop: "auto", padding: "0 1rem",
        }}
      >
        Data Analyst — AI &amp; Data Science Enthusiast
      </motion.p>

      {/* Divider */}
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 4.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "relative", zIndex: 2,
          border: "none", borderTop: "1px solid rgba(255,255,255,0.1)",
          width: "100%", margin: "clamp(1rem, 2vw, 1.5rem) 0",
          transformOrigin: "center",
        }}
      />

      {/* Location */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.8, duration: 0.6 }}
        style={{
          position: "relative", zIndex: 2,
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(0.5rem, 1.2vw, 0.65rem)",
          color: "#404040", letterSpacing: "0.2em",
          textTransform: "uppercase", textAlign: "center",
          margin: 0,
        }}
      >
        {personal.location}
      </motion.p>

      {/* Bottom: scroll indicator */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "0.5rem", position: "relative", zIndex: 2, marginTop: "clamp(1rem, 2vw, 1.5rem)" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.5rem, 1.2vw, 0.65rem)", color: "#404040", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          Scroll
        </motion.span>
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 5.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ width: "1px", height: "clamp(32px, 5vw, 56px)", background: "linear-gradient(to bottom, #404040, transparent)" }}
        />
      </div>
    </section>
  );
}