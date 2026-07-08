import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experiences from './components/Experiences';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import './App.css';

const ServicesPage = lazy(() => import('./components/ServicesPage'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));

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
      {/* Skip to content link for a11y */}
      <a href="#main-content" className="skip-to-content">
        [SYS_SKIP_TO_CONTENT]
      </a>

      {/* Noise and Scanline overlays for mechanical/CRT feel */}
      <div className="noise-overlay" />
      <div className="crt-scanlines" />

      {/* Brutalist Blueprint/Terminal Grid Pattern */}
      <div className="art-deco-bg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.03" />
            </pattern>
            <pattern id="grid-large" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#grid)" />
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="var(--border-color)" strokeWidth="1.5" opacity="0.07" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-large)" />
        </svg>
      </div>

      {/* Navigation bar */}
      <Navbar />

      <main id="main-content">
        <Routes>
          <Route path="/privacy-policy" element={
            <Suspense fallback={
              <div className="loading-fallback-container" style={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-secondary)'
              }}>
                [SYS_LOADING_PRIVACY_ROUTING...]
              </div>
            }>
              <PrivacyPolicy />
            </Suspense>
          } />
          <Route path="/services" element={
            <Suspense fallback={
              <div className="loading-fallback-container" style={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-secondary)'
              }}>
                [SYS_LOADING_SERVICES_ROUTING...]
              </div>
            }>
              <ServicesPage />
            </Suspense>
          } />
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
      </main>

      {/* Professional Footer */}
      <footer className="footer" style={{ borderTop: 'var(--border-thin)', padding: '30px 20px', textAlign: 'center', background: 'var(--bg-secondary)', position: 'relative', zIndex: 10 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} MATHIEU AKAKPO-DJAKPATA // SYSTEM_REV: 3.5.0 // ALL RIGHTS RESERVED.
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '10px' }}>
          <Link to="/privacy-policy" className="footer-link" style={{ color: 'var(--text-muted)', textDecoration: 'underline', transition: 'color var(--transition-smooth)' }}>
            [POLITIQUE_DE_CONFIDENTIALITE]
          </Link>
        </p>
      </footer>

      {/* Vercel Analytics integration */}
      <Analytics />
    </div>
  );
}
