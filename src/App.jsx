import { useCursor } from "./hooks/useCursor";
import { useScrollProgress } from "./hooks/useScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Introduction from "./components/Introduction";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useCursor();
  useScrollProgress();

  return (
    <div style={{ backgroundColor: "#0B0B0B", minHeight: "100vh", color: "#fff" }}>
      <div className="cursor" />
      <div className="cursor-follower" />
      <div id="scroll-progress" />
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <Education />
        <Skills />
        <Projects />
        <Research />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
