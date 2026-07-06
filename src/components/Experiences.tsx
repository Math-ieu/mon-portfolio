import { Calendar, MapPin, Briefcase } from 'lucide-react';
import './Experiences.css';

export default function Experiences() {
  const experiences = [
    {
      role: "Ingénieur DevOps (Freelance)",
      company: "Agence Premium Group",
      period: "12/2025 -- Présent",
      location: "Casablanca, Maroc",
      tasks: [
        "Développement d'applications web modernes avec React.js, Next.js et Angular.",
        "Conception et développement d'APIs RESTful avec Django Rest Framework (DRF), adossées à PostgreSQL et MongoDB.",
        "Intégration de moyens de paiement en ligne et d'APIs de messagerie tierces (WhatsApp, notifications email).",
        "Définition et automatisation de pipelines CI/CD pour le build, les tests, la qualité de code et les déploiements.",
        "Automatisation des déploiements applicatifs et d'infrastructure via scripts Bash, Docker et environnements Cloud."
      ],
      techs: ["React", "Next.js", "Angular", "Django DRF", "PostgreSQL", "MongoDB", "CI/CD", "Docker", "DevSecOps"]
    },
    {
      role: "Stagiaire en CyberOps",
      company: "3D Smart Factory",
      period: "02/2026 -- 06/2026",
      location: "Casablanca, Maroc",
      tasks: [
        "Provisionnement d'un CyberRange cloud sur AWS avec Terraform et playbooks Ansible de configuration/orchestration.",
        "Déploiement en inférence sur AWS d'un modèle de Deep Learning pour un NIDS basé sur le comportement, avec ingestion temps réel et traitement asynchrone.",
        "Mise en place de services API et files de messages pour fiabiliser les traitements et l'exploitation sécurité.",
        "Documentation des procédures, supervision des flux et application des bonnes pratiques DevSecOps."
      ],
      techs: ["AWS", "Terraform", "Ansible", "Deep Learning", "NIDS", "SQS", "DynamoDB", "DevSecOps", "CyberRange"]
    },
    {
      role: "Stagiaire en Génie Logiciel",
      company: "YEESU",
      period: "05/2025 -- 07/2025",
      location: "Le Val-d'Hazey, Normandie, France",
      tasks: [
        "Développement Python (PyQt5, NumPy, Matplotlib) et automatisation de workflows complexes pour des outils internes d'ingénierie.",
        "Rédaction de scripts d'automatisation hautement maintenables et modulaires.",
        "Support technique, débogage actif de scripts existants et optimisation continue du code."
      ],
      techs: ["Python", "PyQt5", "NumPy", "Matplotlib", "Automation", "Git"]
    },
    {
      role: "Développeur d'Applications Web",
      company: "2MAG Marketing Agency",
      period: "05/2024 -- 03/2025",
      location: "Casablanca, Maroc",
      tasks: [
        "Conception et maintenance d'applications web : optimisation des performances, qualité de code et automatisation.",
        "Contribution aux pipelines CI/CD, à la gestion Git, aux déploiements automatisés et aux opérations cloud.",
        "Développement backend et API avec bonnes pratiques de structuration de projets et tests."
      ],
      techs: ["React", "Node.js", "TypeScript", "CI/CD", "Docker", "GitHub Actions", "Web Apps"]
    }
  ];

  return (
    <section id="experiences" className="section">
      <h2 className="section-title">Parcours Professionnel</h2>

      <div className="experience-timeline">
        {experiences.map((exp, idx) => (
          <div key={idx} className="experience-item-wrapper">
            {/* Center Timeline Nodes on larger viewports */}
            <div className="timeline-node">
              <Briefcase size={16} />
            </div>

            <div className="experience-card glow-card">
              <div className="experience-header-info">
                <div className="experience-role-group">
                  <h3>{exp.role}</h3>
                  <span className="company-tag">{exp.company}</span>
                </div>
                <div className="experience-meta-info">
                  <span className="exp-meta-item">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </span>
                  <span className="exp-meta-item">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              <ul className="experience-tasks">
                {exp.tasks.map((task, tIdx) => (
                  <li key={tIdx}>{task}</li>
                ))}
              </ul>

              <div className="experience-tech-tags">
                {exp.techs.map((tech, techIdx) => (
                  <span key={techIdx} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
