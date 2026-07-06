import { Calendar, MapPin, GraduationCap, Award } from 'lucide-react';
import './About.css';

export default function About() {
  const education = [
    {
      degree: "Master en Réseaux & Télécoms option Cyberdéfense et sécurité de l'information",
      school: "Université Polytechnique Hauts-de-France",
      period: "11/2024 -- 07/2026",
      location: "Hauts-de-France, France",
      highlights: [
        "Sécurité cloud : principes IAM, gestion des secrets, opérations et infrastructure sécurisées.",
        "DevSecOps : automatisation de la sécurité dans les pipelines, supervision, logs et alerting."
      ]
    },
    {
      degree: "Diplôme d'Ingénieur d'Etat Marocain en Génie Informatique & Intelligence Artificielle",
      school: "HESTIM - Etablissement privé d'enseignement supérieur",
      period: "10/2021 -- 07/2026",
      location: "Casablanca, Maroc",
      highlights: [
        "Administration système, virtualisation (VMware), administration Linux et Windows Server.",
        "Concepts fondamentaux de DevOps : CI/CD (Jenkins, GitHub Actions), IaC (Terraform, Ansible), Conteneurs (Docker, Kubernetes)."
      ]
    }
  ];

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <h2 className="section-title">À Propos de Moi</h2>

      <div className="about-grid">
        {/* Profile Bio */}
        <div className="about-bio glow-card">
          <h3>Qui suis-je ?</h3>
          <p>
            Ingénieur diplômé en double diplôme Cloud & Cyberdéfense, je me spécialise dans <strong>l'automatisation cloud (Infrastructure as Code)</strong>, <strong>les pipelines CI/CD sécurisés</strong>, et la <strong>sécurité des infrastructures d'information</strong>.
          </p>
          <p>
            Mon parcours académique allie le génie informatique classique et l'intelligence artificielle à une spécialisation pointue en <strong>Cyberdéfense</strong>. Cela me permet d'aborder les architectures Cloud non seulement sous l'angle de la performance et de la fluidité opérationnelle (DevOps), mais aussi et surtout sous l'angle de la sécurité proactive (DevSecOps / Sécurité Cloud).
          </p>
          <p>
            J'ai acquis une expérience pratique significative dans le déploiement d'architectures sur <strong>AWS</strong> et <strong>Microsoft Azure</strong>, l'automatisation avec <strong>Terraform</strong> et <strong>Ansible</strong>, ainsi que le monitoring applicatif avec <strong>Prometheus</strong> et <strong>Grafana</strong>.
          </p>

          <div className="about-stats-grid">
            <div className="about-stat">
              <Award className="stat-icon" />
              <div>
                <h4>3+</h4>
                <span>Certifications Pro</span>
              </div>
            </div>
            <div className="about-stat">
              <GraduationCap className="stat-icon" />
              <div>
                <h4>Double</h4>
                <span>Diplôme Ingénieur / M2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="about-education">
          <h3>Formation Académique</h3>
          <div className="education-timeline">
            {education.map((item, index) => (
              <div key={index} className="education-item">
                <div className="education-marker" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {index + 1}
                </div>
                <div className="education-header">
                  <h4>{item.degree}</h4>
                  <h5>{item.school}</h5>
                </div>
                <div className="education-meta">
                  <span className="edu-meta-item">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </span>
                  <span className="edu-meta-item">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </span>
                </div>
                <ul className="education-details">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
