import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experiences from "../components/Experiences";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Experiences Section */}
      <Experiences />

      {/* Projects Section */}
      <Projects />

      {/* Certifications Section */}
      <Certifications />

      {/* Contact Section */}
      <Contact />
    </>
  );
}
