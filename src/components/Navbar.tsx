import { useState, useEffect } from 'react';
import { Menu, X, FileText, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Navbar.css';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" ry="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const navigate = useNavigate();
  const location = useLocation();

  // Synchronise state on initial mount
  useEffect(() => {
    const activeTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'dark';
    setTheme(activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute('content', nextTheme);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Compétences' },
    { id: 'experiences', label: 'Parcours' },
    { id: 'projects', label: 'Projets' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    if (location.pathname === '/services') {
      setActiveSection('services');
    } else {
      const hash = location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      } else {
        setActiveSection('hero');
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname === '/services') {
        return;
      }

      // Scroll Spy logic
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const scrollTo = (id: string) => {
    setIsOpen(false);

    if (id === 'services') {
      navigate('/services');
      return;
    }

    if (location.pathname === '/services') {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      navigate(`/#${id}`, { replace: true });
    }
  };

  return (
    <nav className={`navbar glass ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link 
          to="/" 
          className="navbar-logo" 
          onClick={(e) => { 
            if (location.pathname === '/') {
              e.preventDefault(); 
              scrollTo('hero'); 
            }
          }}
        >
          <span>math</span>dev.<span>consulting</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id === 'services' ? '/services' : (item.id === 'hero' ? '/' : `/#${item.id}`)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                if (item.id !== 'services' && location.pathname === '/') {
                  e.preventDefault();
                  scrollTo(item.id);
                } else if (item.id === 'services' && location.pathname === '/services') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsOpen(false);
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <a
            href="https://github.com/Math-ieu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="social-icon"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/mathieu-akakpo-djakpata"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="social-icon"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="/cv-mathieu.pdf"
            download="cv-Mathieu_AKAKPO-DJAKPATA.pdf"
            className="cv-button"
          >
            <FileText size={16} />
            <span>Mon CV</span>
          </a>

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={theme === 'dark' ? "Passer au mode clair" : "Passer au mode sombre"}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            className="menu-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id === 'services' ? '/services' : (item.id === 'hero' ? '/' : `/#${item.id}`)}
            className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => {
              if (item.id !== 'services' && location.pathname === '/') {
                e.preventDefault();
                scrollTo(item.id);
              } else if (item.id === 'services' && location.pathname === '/services') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              } else {
                setIsOpen(false);
              }
            }}
          >
            {item.label}
          </Link>
        ))}
        <div className="mobile-menu-socials">
          <a href="https://github.com/Math-ieu" target="_blank" rel="noopener noreferrer">
            <GithubIcon size={24} />
          </a>
          <a href="https://www.linkedin.com/in/mathieu-akakpo-djakpata" target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
}
