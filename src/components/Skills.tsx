import { Cloud, Cpu, Settings, Terminal, Activity, ShieldCheck } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const skillCategories = [
    {
      id: "cloud",
      title: "Cloud Computing",
      icon: <Cloud className="skill-icon cloud" />,
      desc: "Provisionnement et gestion de ressources cloud sécurisées.",
      skills: [
        { name: "AWS (EC2, S3, RDS, ECS, Lambda, IAM)", level: 85 },
        { name: "Microsoft Azure (Réseau, IAM, Hybride)", level: 75 }
      ],
      tags: ["AWS CloudWatch", "VPC", "Security Groups", "Azure AD"],
      gridClass: "col-span-8"
    },
    {
      id: "containers",
      title: "Conteneurs & Orchestration",
      icon: <Cpu className="skill-icon cpu" />,
      desc: "Architectures microservices conteneurisées et passage à l'échelle.",
      skills: [
        { name: "Docker & Docker Compose", level: 90 },
        { name: "Kubernetes (K8s)", level: 80 }
      ],
      tags: ["Ingress", "Helm", "StatefulSets", "ConfigMaps"],
      gridClass: "col-span-4"
    },
    {
      id: "iac",
      title: "Infrastructure as Code (IaC)",
      icon: <Settings className="skill-icon iac" />,
      desc: "Automatisation complète d'environnements reproductibles et immuables.",
      skills: [
        { name: "Terraform", level: 90 },
        { name: "Ansible", level: 85 },
        { name: "Terragrunt", level: 75 }
      ],
      tags: ["Modules", "State S3/Blob", "Playbooks", "Inventory"],
      gridClass: "col-span-4"
    },
    {
      id: "devops",
      title: "CI/CD & DevOps",
      icon: <Activity className="skill-icon devops" />,
      desc: "Intégration et livraison continues de bout en bout.",
      skills: [
        { name: "GitHub Actions", level: 90 },
        { name: "Jenkins & GitLab CI", level: 80 }
      ],
      tags: ["Runners", "Pipelines-as-Code", "Webhooks", "Artifacts"],
      gridClass: "col-span-8"
    },
    {
      id: "gitops",
      title: "GitOps & Observabilité",
      icon: <ShieldCheck className="skill-icon gitops" />,
      desc: "Déploiements déclaratifs et monitoring proactif des services.",
      skills: [
        { name: "Argo CD & Flux", level: 80 },
        { name: "Prometheus & Grafana", level: 85 }
      ],
      tags: ["Helm Controller", "Metrics", "Alertmanager", "Dashboards"],
      gridClass: "col-span-5"
    },
    {
      id: "scripting",
      title: "Scripting, Linux & DB",
      icon: <Terminal className="skill-icon scripting" />,
      desc: "Administration système avancée, scripting et gestion de données.",
      skills: [
        { name: "Python, Bash, PowerShell", level: 85 },
        { name: "Linux Administration (Ubuntu, CentOS)", level: 90 },
        { name: "PostgreSQL, MongoDB, MySQL", level: 80 }
      ],
      tags: ["Scripting", "Crontab", "IAM Secrets", "SQL/NoSQL"],
      gridClass: "col-span-7"
    }
  ];

  return (
    <section id="skills" className="section">
      <div>
        <h2 className="section-title">Compétences Techniques</h2>
        <p className="skills-subtitle">
          Une stack technique moderne orientée vers l'automatisation, la robustesse opérationnelle et la sécurité des infrastructures cloud.
        </p>
      </div>

      <div className="bento-grid skills-bento">
        {skillCategories.map((cat) => (
          <div 
            key={cat.id} 
            className={`bento-item glow-card ${cat.gridClass}`}
          >
            <div className="bento-header">
              {cat.icon}
              <div>
                <h3>{cat.title}</h3>
                <p className="bento-desc">{cat.desc}</p>
              </div>
            </div>

            <div className="bento-body">
              {/* Skill Bars */}
              <div className="skill-bars">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-bar-wrapper">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="bento-tags">
                {cat.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="bento-tag glass">
                    {tag}
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

