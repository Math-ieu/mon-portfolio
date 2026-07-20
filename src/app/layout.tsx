import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import "../index.css";
import "../App.css";

export const metadata: Metadata = {
  title: "Mathieu AKAKPO-DJAKPATA | Ingénieur Cloud & DevSecOps",
  description: "Ingénieur double diplômé en Cloud & Cyberdéfense, spécialisé dans l'automatisation cloud (Infrastructure as Code), les pipelines CI/CD sécurisés (DevSecOps) et la sécurité des infrastructures.",
  metadataBase: new URL("https://mathdev.consulting"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem('theme');
                const theme = saved || 'light';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>
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

          <main id="main-content">{children}</main>

          {/* Professional Footer */}
          <footer className="footer" style={{ borderTop: 'var(--border-thin)', padding: '30px 20px', textAlign: 'center', background: 'var(--bg-secondary)', position: 'relative', zIndex: 10 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              &copy; {new Date().getFullYear()} MATHIEU AKAKPO-DJAKPATA // SYSTEM_REV: 3.5.0 // ALL RIGHTS RESERVED.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '10px' }}>
              <Link href="/privacy-policy" className="footer-link" style={{ color: 'var(--text-muted)', textDecoration: 'underline', transition: 'color var(--transition-smooth)' }}>
                [POLITIQUE_DE_CONFIDENTIALITE]
              </Link>
            </p>
          </footer>

          {/* Vercel Analytics integration */}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
