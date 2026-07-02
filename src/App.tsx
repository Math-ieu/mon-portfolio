import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ServicesPage from './components/ServicesPage';
import Skills from './components/Skills';
import Experiences from './components/Experiences';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import './App.css';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const hash = location.hash;
      if (hash) {
        const sectionId = hash.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - offset,
              behavior: 'smooth'
            });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0 });
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <div className="app-container">
      {/* Art Deco Fixed Background Pattern */}
      <div className="art-deco-bg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <g id="deco-scale">
              {/* Outer Arch */}
              <path d="M 0,50 A 50,50 0 0,1 100,50" stroke="var(--deco-color)" strokeWidth="1.5" fill="none" />
              {/* Inner Arches */}
              <path d="M 10,50 A 40,40 0 0,1 90,50" stroke="var(--deco-color)" strokeWidth="1" fill="none" />
              <path d="M 20,50 A 30,30 0 0,1 80,50" stroke="var(--deco-color)" strokeWidth="1" fill="none" />
              {/* Rays inside */}
              <path d="M 50,50 L 50,10" stroke="var(--deco-color)" strokeWidth="2" />
              <path d="M 50,50 L 28,19" stroke="var(--deco-color)" strokeWidth="1.5" />
              <path d="M 50,50 L 72,19" stroke="var(--deco-color)" strokeWidth="1.5" />
              <path d="M 50,50 L 15,32" stroke="var(--deco-color)" strokeWidth="1.5" />
              <path d="M 50,50 L 85,32" stroke="var(--deco-color)" strokeWidth="1.5" />
              {/* Rays leaves/droplets */}
              <circle cx="50" cy="8" r="3" fill="var(--deco-color)" />
              <circle cx="28" cy="17" r="2.5" fill="var(--deco-color)" />
              <circle cx="72" cy="17" r="2.5" fill="var(--deco-color)" />
              <circle cx="15" cy="30" r="2" fill="var(--deco-color)" />
              <circle cx="85" cy="30" r="2" fill="var(--deco-color)" />
            </g>
            <pattern id="art-deco-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <use href="#deco-scale" x="0" y="0" />
              <use href="#deco-scale" x="50" y="50" />
              <use href="#deco-scale" x="-50" y="50" />
              <use href="#deco-scale" x="50" y="-50" />
              <use href="#deco-scale" x="-50" y="-50" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#art-deco-pattern)" />
        </svg>
      </div>

      {/* Navigation bar */}
      <Navbar />

      <Routes>
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/" element={
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
        } />
      </Routes>

      {/* Professional Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Mathieu AKAKPO-DJAKPATA. Tous droits réservés.
        </p>
      </footer>

      {/* Vercel Analytics integration */}
      <Analytics />
    </div>
  );
}
