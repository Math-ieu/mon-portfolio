import { useState, useMemo, useEffect } from 'react';
import { ExternalLink, Award, ShieldCheck, Database, Server, X } from 'lucide-react';
import './Certifications.css';

export default function Certifications() {
  const certifications = [
    {
      title: "Meta Back-End Developer",
      issuer: "Meta (via Coursera / Credly)",
      description: "Développement backend moderne, conception d'APIs RESTful, architecture MVC, bases de données (PostgreSQL/MySQL), Git et workflows Git, conteneurisation et déploiement cloud.",
      badgeUrl: "/badges/meta-back-end-developer-certificate.png",
      verificationUrl: "https://www.credly.com/badges/56e8bb33-defc-4709-a5e9-b7b9adf9e887/public_url",
      icon: <Server className="cert-type-icon backend" />,
      skills: ["Python", "Django", "APIs REST", "PostgreSQL", "Git", "Docker"],
      category: "web-dev"
    },
    {
      title: "Cisco Certified CyberOps Associate",
      issuer: "Cisco (via Credly)",
      description: "Opérations de cybersécurité, surveillance du trafic réseau, détection d'intrusion, protocoles de routage et de sécurité, gestion des menaces et réponse aux incidents.",
      badgeUrl: "/badges/cyberops-associate.png",
      verificationUrl: "https://www.credly.com/badges/824d958f-1cd9-4921-85e7-4bf5d23c8b1b/public_url",
      icon: <ShieldCheck className="cert-type-icon security" />,
      skills: ["CyberOps", "Réseau", "Wireshark", "IDS/IPS", "Incident Handling"],
      category: "cybersecurity"
    },
    {
      title: "IBM Data Science Professional",
      issuer: "IBM (via Coursera / Credly)",
      description: "Science des données appliquée, analyse statistique, machine learning supervisé et non supervisé, visualisation de données avec Python et requêtes SQL complexes.",
      badgeUrl: "/badges/ibm-data-science-professional-certificate.png",
      verificationUrl: "https://www.credly.com/badges/e4eab261-a2f7-47df-9d4f-8efdc0871321/public_url",
      icon: <Database className="cert-type-icon datascience" />,
      skills: ["Data Analysis", "Machine Learning", "Python (Pandas/NumPy)", "SQL"],
      category: "data-science"
    },
    {
      title: "Google Cybersecurity Certificate",
      issuer: "Google (via Coursera)",
      description: "Sécurité des infrastructures, détection et réponse aux menaces, automatisation de la sécurité avec Python, gestion des accès et principes d'IAM.",
      badgeUrl: "/badges/google-cybersecurity.png",
      verificationUrl: "https://coursera.org/share/7672c9b463c17a4db413da738acaaae5",
      icon: <ShieldCheck className="cert-type-icon security-google" />,
      skills: ["IAM", "Linux Security", "IDS (Snort)", "SIEM (Splunk)", "Python Scripting"],
      category: "cybersecurity"
    },
    {
      title: "ISC2 Certified in Cybersecurity",
      issuer: "ISC2 (via Coursera)",
      description: "Principes fondamentaux de la sécurité de l'information : sécurité des réseaux, contrôle d'accès, opérations de sécurité, réponse aux incidents et continuité d'activité.",
      badgeUrl: "/badges/isc2.png",
      verificationUrl: "https://coursera.org/share/0082d53d24a5dc2b910d7cba9a4597db",
      icon: <ShieldCheck className="cert-type-icon security" />,
      skills: ["Information Security", "Access Controls", "Network Security", "Incident Response"],
      category: "cybersecurity"
    },
    {
      title: "IBM Full Stack Software Developer",
      issuer: "IBM (via Coursera)",
      description: "Développement d'applications Web de bout en bout : architectures microservices, APIs REST, frameworks frontend (React) et backends (Node.js/Express, Python/Flask), conteneurisation Docker, orchestration Kubernetes et architectures Cloud.",
      badgeUrl: "/badges/ibm-full-stack-dev.png",
      verificationUrl: "https://coursera.org/share/5a1e9155f6a89a72ec42a3be4cad14b4",
      icon: <Server className="cert-type-icon backend" />,
      skills: ["React", "Node.js", "Express", "Docker", "Kubernetes", "Cloud Deployments"],
      category: "web-dev"
    },
    {
      title: "Agile Project Management",
      issuer: "Google (via Coursera)",
      description: "Gestion de projet agile : méthodologies Scrum, rôles d'équipe (Scrum Master, Product Owner), planification de sprints, rituels Scrum, gestion de backlog et outils d'organisation.",
      badgeUrl: "/badges/agile.png",
      verificationUrl: "https://coursera.org/share/8b4677fec8b1e3acaa13dfce4e8c337e",
      icon: <Award className="cert-type-icon backend" />,
      skills: ["Agile", "Scrum", "Sprint Planning", "Project Management"],
      category: "agile"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  const filteredCerts = useMemo(() => {
    if (selectedCategory === "all") return certifications;
    return certifications.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalImage]);

  const openModal = (badgeUrl: string | null, title: string) => {
    if (badgeUrl) {
      setModalImage(badgeUrl);
      setModalTitle(title);
      document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
    }
  };

  const closeModal = () => {
    setModalImage(null);
    setModalTitle("");
    document.body.style.overflow = 'auto'; // restore scrolling
  };

  return (
    <section id="certifications" className="section">
      <h2 className="section-title">Certifications Professionnelles</h2>

      {/* Category Tabs */}
      <div className="certs-toolbar">
        <div className="category-tabs">
          <button 
            className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Toutes
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'web-dev' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('web-dev')}
          >
            Développement Web
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'cybersecurity' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('cybersecurity')}
          >
            Cybersécurité
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'data-science' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('data-science')}
          >
            Data Science & IA
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'agile' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('agile')}
          >
            Gestion de Projet & Agile
          </button>
        </div>
      </div>

      <div className="certs-grid">
        {filteredCerts.map((cert, idx) => (
          <div 
            key={idx} 
            className="cert-card glow-card"
            style={{ cursor: cert.badgeUrl ? 'pointer' : 'default' }}
            onClick={() => openModal(cert.badgeUrl, cert.title)}
          >
            <div className="cert-visual">
              {cert.badgeUrl ? (
                <div className="cert-badge-wrapper">
                  <img 
                    src={cert.badgeUrl} 
                    alt={`Badge officiel ${cert.title}`} 
                    className="cert-badge-img"
                  />
                </div>
              ) : (
                <div className="cert-placeholder">
                  <Award size={48} className="cert-placeholder-icon" />
                </div>
              )}
            </div>

            <div className="cert-content">
              <div className="cert-header">
                {cert.icon}
                <div>
                  <h3>{cert.title}</h3>
                  <span className="issuer-tag">{cert.issuer}</span>
                </div>
              </div>
              
              <p className="cert-desc">{cert.description}</p>
              
              <div className="cert-skills">
                {cert.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="cert-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="cert-verify-link">
                <a 
                  href={cert.verificationUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="verify-btn"
                  onClick={(e) => e.stopPropagation()} // prevent opening modal when checking verify URL
                >
                  <span>Vérifier la certification</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up Modal for Certificate Zoom */}
      {modalImage && (
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <h3>{modalTitle}</h3>
              <button className="cert-modal-close" onClick={closeModal} aria-label="Fermer le pop-up">
                <X size={20} />
              </button>
            </div>
            <div className="cert-modal-body">
              <img src={modalImage} alt={`Document de certification ${modalTitle}`} className="cert-modal-img" />
            </div>
            <div className="cert-modal-footer">
              <p>Cliquez en dehors de l'image ou sur la croix pour fermer</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
