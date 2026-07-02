import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Shield, Server, ArrowRight } from 'lucide-react';
import './Hero.css';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error';
}

export default function Hero() {
  // Typing animation
  const roles = [
    "Ingénieur DevSecOps",
    "Développeur d'Applications Web & Mobile"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const currentFullRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText(prev => currentFullRole.slice(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && currentText === currentFullRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // Terminal Simulator Logic
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: "Mathieu AKAKPO-DJAKPATA - Portfolio CLI v1.0.0", type: "output" },
    { text: "Tapez 'help' pour lister les commandes disponibles.", type: "output" }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    const newHistory = [...terminalHistory, { text: `mathieu@devops-cloud:~$ ${terminalInput}`, type: 'input' as const }];
    setTerminalInput("");

    switch (command) {
      case 'help':
        newHistory.push(
          { text: "Commandes disponibles :", type: "output" },
          { text: "  about    - Présentation de mon profil", type: "output" },
          { text: "  skills   - Mes compétences phares", type: "output" },
          { text: "  contact  - Coordonnées de contact", type: "output" },
          { text: "  clear    - Vider l'écran de la console", type: "output" }
        );
        break;
      case 'about':
        newHistory.push(
          { text: "Étudiant ingénieur en dernière année, double diplôme :", type: "output" },
          { text: "  - Master 2 Cyberdéfense et Sécurité (UPHF, France)", type: "output" },
          { text: "  - Génie Informatique & Intelligence Artificielle (HESTIM, Maroc)", type: "output" },
          { text: "Passionné d'automatisation cloud (Terraform/Ansible) et de pipelines CI/CD sécurisés.", type: "output" }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: "Compétences clés :", type: "output" },
          { text: "  - IaC : Terraform, Terragrunt, Ansible", type: "output" },
          { text: "  - Cloud : Azure (Fondamentaux), AWS (EC2, S3, RDS, ECS)", type: "output" },
          { text: "  - DevSecOps : GitHub Actions, Jenkins, ArgoCD, Docker, Kubernetes", type: "output" },
          { text: "  - Scripting : Python, Bash, PowerShell", type: "output" }
        );
        break;
      case 'contact':
        newHistory.push(
          { text: "Coordonnées de contact :", type: "output" },
          { text: "  - Email: mathieuakakpodjakpata@gmail.com", type: "output" },
          { text: "  - GitHub: github.com/Math-ieu", type: "output" },
          { text: "  - LinkedIn: linkedin.com/in/mathieu-akakpo-djakpata", type: "output" }
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        return;
      default:
        newHistory.push({ text: `Commande non reconnue : '${command}'. Tapez 'help' pour de l'aide.`, type: "error" });
    }

    setTerminalHistory(newHistory);
  };

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background glow effects */}
      <div className="hero-glow pink-glow"></div>
      <div className="hero-glow cyan-glow"></div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Side: Copy */}
          <div className="hero-content">
            <div className="hero-badge glass">
              <Shield size={14} className="badge-icon green" />
              <span>Spécialisé Cloud & SecOps</span>
            </div>

            <h1 className="hero-title">
              Mathieu <br />
              <span className="gradient-text">AKAKPO-DJAKPATA</span>
            </h1>

            <div className="typing-container">
              <Server size={20} className="typing-icon" />
              <span className="typing-text">{currentText}</span>
              <span className="typing-cursor">|</span>
            </div>

            <p className="hero-description">
              Conception et provisionnement d'infrastructures hautement automatisées (IaC), sécurisation de pipelines CI/CD (DevSecOps), administration de systèmes Linux/Windows et déploiement dans des environnements AWS et Microsoft Azure.
            </p>

            <div className="hero-cta-group">
              <a href="#projects" className="cta-primary">
                <span>Voir mes projets</span>
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="cta-secondary glass">
                Contactez-moi
              </a>
            </div>
          </div>

          {/* Right Side: Photo and Terminal */}
          <div className="hero-visual">
            {/* Profile Photo Frame */}
            <div className="photo-card-wrapper">
              <div className="photo-card glass">
                <div className="photo-glow-border"></div>
                <img
                  src="/mathieu.png"
                  alt="Mathieu AKAKPO-DJAKPATA"
                  className="profile-photo"
                />
              </div>
              <div className="photo-subtext glass">
                <span className="status-indicator"></span>
                <span>Disponible immédiatement</span>
              </div>
            </div>

            {/* Interactive Terminal Simulator */}
            <div className="terminal-card glass" onClick={focusTerminal}>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="terminal-title">
                  <TerminalIcon size={14} />
                  <span>shell.sh - mathieu@devops-cloud</span>
                </div>
              </div>
              <div className="terminal-body">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className={`terminal-row ${line.type}`}>
                    {line.text}
                  </div>
                ))}
                <form onSubmit={handleTerminalSubmit} className="terminal-input-form">
                  <span className="terminal-prompt">mathieu@devops-cloud:~$ </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="terminal-input"
                    aria-label="Terminal CLI command input"
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                  <span className="terminal-input-cursor"></span>
                </form>
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
