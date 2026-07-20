'use client';

import { useState } from 'react';
import { Cloud, Shield, Server, Check, ArrowLeft, Send, Database, Cpu, Brain, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './ServicesPage.css';

interface PricingPack {
  id: string;
  category: 'cloud' | 'web' | 'ai' | 'mobile';
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  technologies: string[];
  deliveryTime: string;
  popular: boolean;
  colorClass: string;
}

interface Category {
  id: 'cloud' | 'web' | 'ai' | 'mobile';
  label: string;
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<'cloud' | 'web' | 'ai' | 'mobile'>('web');
  const router = useRouter();

  const categories: Category[] = [
    { id: 'web', label: 'Développement Web' },
    { id: 'cloud', label: 'Cloud & DevSecOps' },
    { id: 'mobile', label: 'Développement Mobile' },
    { id: 'ai', label: 'Intelligence Artificielle' }
  ];

  const packs: PricingPack[] = [
    // Cloud & DevSecOps Packs
    {
      id: "kickstart",
      category: "cloud",
      name: "IaC & Cloud Kickstart",
      price: "$1,499",
      period: "par projet",
      description: "Automatisation de l'infrastructure et déploiement cloud de base. Idéal pour lancer un projet ou migrer une infrastructure simple vers le Cloud.",
      icon: <Cloud size={28} />,
      features: [
        "Provisionnement IaC avec Terraform (1 environnement)",
        "Configuration automatisée de serveurs via Ansible",
        "Architecture réseau VPC & sous-réseaux sécurisés",
        "Configuration IAM & rôles de sécurité minimum privilège",
        "Documentation de l'architecture et transfert de compétences"
      ],
      technologies: ["Terraform", "Ansible", "AWS / Azure", "Git"],
      deliveryTime: "5 jours",
      popular: false,
      colorClass: "cyan"
    },
    {
      id: "scale",
      category: "cloud",
      name: "DevSecOps & K8s Scale",
      price: "$3,499",
      period: "par projet",
      description: "Conteneurisation, orchestration et pipelines de livraison sécurisés. Pour les équipes cherchant à scaler, fiabiliser et automatiser leurs déploiements.",
      icon: <Server size={28} />,
      features: [
        "Dockerisation complète de vos microservices",
        "Setup d'un cluster Kubernetes (EKS / AKS / K3s)",
        "Pipelines CI/CD (GitHub Actions / Jenkins) automatisés",
        "Scans de sécurité automatisés (Trivy, SonarQube, Checkov)",
        "Gestion automatisée de certificats SSL & Ingress Controllers",
        "Déploiements déclaratifs via Helm & configurations scalables"
      ],
      technologies: ["Kubernetes", "Docker", "GitHub Actions", "Helm", "SonarQube"],
      deliveryTime: "10 jours",
      popular: true,
      colorClass: "purple"
    },
    {
      id: "enterprise",
      category: "cloud",
      name: "Enterprise Ops & Monitoring",
      price: "$6,999",
      period: "par projet",
      description: "Suite d'observabilité complète, sécurité renforcée de niveau entreprise (SecOps), et accompagnement cloud haut de gamme sur-mesure.",
      icon: <Shield size={28} />,
      features: [
        "Centralisation et gestion sécurisée des secrets avec HashiCorp Vault",
        "Monitoring Prometheus & Grafana avec alertes intelligentes",
        "Agrégation de logs et tableaux de bord centralisés (Loki / ELK)",
        "Durcissement de la sécurité réseau & Audit IAM approfondi",
        "Intégration d'ArgoCD pour un déploiement 100% GitOps",
        "Support technique et maintenance post-livraison (1 mois)"
      ],
      technologies: ["Vault", "Prometheus", "Grafana", "Loki", "ArgoCD", "SecOps"],
      deliveryTime: "20 jours",
      popular: false,
      colorClass: "red"
    },
    
    // Web Development Packs
    {
      id: "web-api",
      category: "web",
      name: "API & Backend Integration",
      price: "$1,299",
      period: "par projet",
      description: "Conception et développement de backends robustes, sécurisés et performants pour alimenter vos applications web et mobiles.",
      icon: <Database size={28} />,
      features: [
        "Conception d'APIs REST ou GraphQL performantes et documentées",
        "Modélisation et optimisation de bases de données (PostgreSQL, MongoDB)",
        "Sécurisation des endpoints (Authentification JWT, OAuth2, sessions)",
        "Intégration de services tiers (Stripe, SendGrid, Twilio, CMS headless)",
        "Tests automatisés (Jest / Pytest) pour garantir la stabilité"
      ],
      technologies: ["Node.js / Express", "FastAPI / Python", "PostgreSQL", "MongoDB", "JWT"],
      deliveryTime: "7 jours",
      popular: false,
      colorClass: "cyan"
    },
    {
      id: "web-saas",
      category: "web",
      name: "Full-Stack SaaS MVP",
      price: "$2,899",
      period: "par projet",
      description: "Développement complet de votre produit SaaS minimum viable. Parfait pour valider votre idée sur le marché rapidement avec des bases techniques solides.",
      icon: <Cpu size={28} />,
      features: [
        "Interface utilisateur premium, réactive et dynamique (React / Next.js)",
        "Base de données intégrée avec ORM moderne (Prisma / Mongoose)",
        "Authentification complète (OAuth, email/mot de passe) et rôles",
        "Gestion complète des abonnements et facturation via Stripe",
        "Déploiement en production optimisé (Vercel / Netlify / VPS)"
      ],
      technologies: ["Next.js", "React", "Prisma / Postgres", "Stripe", "Tailwind CSS"],
      deliveryTime: "14 jours",
      popular: true,
      colorClass: "purple"
    },

    // AI & ML Packs
    {
      id: "ai-deploy",
      category: "ai",
      name: "ML Model Deployment (MLOps)",
      price: "$1,999",
      period: "par projet",
      description: "Mise en production et industrialisation de vos modèles de Machine Learning. Optimisez les temps d'inférence et automatisez le cycle de vie ML.",
      icon: <Brain size={28} />,
      features: [
        "Mise en production de modèles ML (Scikit-Learn, PyTorch, TensorFlow)",
        "Création d'APIs d'inférence ultra-rapides via FastAPI et Docker",
        "Mise en place de pipelines de données (ETL) et nettoyage de flux",
        "Optimisation des temps de réponse et gestion du cache avec Redis",
        "Mise en place de monitoring de dérive de modèle et de logs en production"
      ],
      technologies: ["Python", "PyTorch", "FastAPI", "Docker", "Redis"],
      deliveryTime: "8 jours",
      popular: false,
      colorClass: "cyan"
    },
    {
      id: "ai-agent",
      category: "ai",
      name: "AI Agent & LLM Integration",
      price: "$3,499",
      period: "par projet",
      description: "Intégration d'intelligence artificielle générative. RAG avancés et agents autonomes pour automatiser vos processus métiers complexes.",
      icon: <Brain size={28} />,
      features: [
        "Intégration de modèles de langage (OpenAI GPT, Anthropic Claude, Mistral)",
        "Développement d'agents AI autonomes capables d'utiliser des outils (LangChain)",
        "Mise en place de bases de données vectorielles (Pinecone, Chroma, pgvector)",
        "Système RAG (Retrieval-Augmented Generation) pour requêter vos propres documents",
        "Prompt engineering avancé et contrôle strict de la consommation des tokens"
      ],
      technologies: ["LangChain / LlamaIndex", "OpenAI / Claude", "Vector DBs", "Python", "Next.js"],
      deliveryTime: "12 jours",
      popular: true,
      colorClass: "purple"
    },

    // Mobile Development Packs
    {
      id: "mobile-starter",
      category: "mobile",
      name: "Mobile App Starter",
      price: "$1,999",
      period: "par projet",
      description: "Développement d'une application mobile cross-platform (iOS & Android) MVP. Parfait pour tester le marché mobile rapidement.",
      icon: <Smartphone size={28} />,
      features: [
        "Développement cross-platform (iOS & Android) avec React Native / Expo",
        "Conception de maquettes d'écrans simples et d'une UI/UX fluide",
        "Intégration d'APIs existantes et authentification utilisateur",
        "Gestion d'états applicatifs locaux (Redux Toolkit / Context)",
        "Préparation et génération des livrables APK/AAB (Android) et IPA (iOS)"
      ],
      technologies: ["React Native", "Expo", "TypeScript", "Expo Go", "Redux"],
      deliveryTime: "10 jours",
      popular: false,
      colorClass: "cyan"
    },
    {
      id: "mobile-saas",
      category: "mobile",
      name: "Advanced Mobile SaaS",
      price: "$3,999",
      period: "par projet",
      description: "Application mobile riche avec synchronisation hors-ligne, notifications push, abonnements In-App et publication complète sur les stores.",
      icon: <Smartphone size={28} />,
      features: [
        "Synchronisation hors-ligne complète de données locales (SQLite / WatermelonDB)",
        "Notifications Push personnalisées avec Firebase Cloud Messaging (FCM)",
        "Intégration d'achats In-App (iOS App Store & Google Play Billing) ou Stripe",
        "Services de géolocalisation en arrière-plan et cartes interactives (Google Maps)",
        "Publication guidée et déploiement automatisé (Fastlane) sur l'App Store & Google Play"
      ],
      technologies: ["React Native", "Firebase", "RevenueCat / Stripe", "Fastlane", "SQLite"],
      deliveryTime: "20 jours",
      popular: true,
      colorClass: "purple"
    }
  ];

  // Filter packs by active category
  const filteredPacks = packs.filter(pack => pack.category === activeCategory);


  const selectPack = (packName: string) => {
    router.push('/#contact');
    setTimeout(() => {
      const messageTextarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      if (messageTextarea) {
        messageTextarea.value = `Bonjour, je suis intéressé(e) par le service "${packName}". J'aimerais en savoir plus...`;
        const event = new Event('input', { bubbles: true });
        messageTextarea.dispatchEvent(event);
      }
    }, 300);
  };

  return (
    <div className="services-page" style={{ position: 'relative' }}>
      {/* Brutalist Blueprint/Terminal Grid Pattern */}
      <div className="art-deco-bg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-services" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-color)" strokeWidth="0.5" opacity="0.03" />
            </pattern>
            <pattern id="grid-large-services" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#grid-services)" />
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="var(--border-color)" strokeWidth="1.5" opacity="0.07" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-large-services)" />
        </svg>
      </div>

      <div className="services-page-container">
        {/* Back Button */}
        <Link href="/" className="back-btn">
          <ArrowLeft size={16} />
          <span>Retour au Portfolio</span>
        </Link>

        {/* Page Header */}
        <div className="services-page-header">
          <h1 className="services-page-title">Offres de Services Professionnels</h1>
          <p className="services-page-subtitle">
            Du provisionnement d'infrastructures Cloud sécurisées au développement d'applications SaaS et à l'intégration d'intelligence artificielle de pointe.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="category-tabs-container">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid Wrapper */}
        <div className="pricing-grid-wrapper">
          <div 
            className="pricing-grid"
            style={{ 
              gridTemplateColumns: filteredPacks.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)' 
            }}
          >
            {filteredPacks.map((pack) => (
              <div
                key={pack.id}
                className={`pricing-card glow-card ${pack.popular ? 'popular' : ''} ${pack.colorClass}`}
              >
                {pack.popular && (
                  <div className="popular-badge">
                    <span>Recommandé</span>
                  </div>
                )}

                <div className="pack-header">
                  <div className="pack-icon-wrapper">
                    {pack.icon}
                  </div>
                  <h2 className="pack-name">{pack.name}</h2>
                  <div className="pack-price-wrapper">
                    <span className="pack-price">{pack.price}</span>
                    <span className="pack-period">/ {pack.period}</span>
                  </div>
                  <p className="pack-description">{pack.description}</p>
                </div>

                <div className="pack-divider"></div>

                <div className="pack-body">
                  <h3>Inclus dans le pack :</h3>
                  <ul className="pack-features-list">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="pack-feature-item">
                        <span className="check-icon"><Check size={16} /></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pack-footer">
                  <div className="pack-tech-section">
                    <span className="tech-title">Technologies :</span>
                    <div className="pack-tech-tags">
                      {pack.technologies.map((tech, idx) => (
                        <span key={idx} className="pack-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="delivery-time">
                    <span>Délai de livraison : <strong>{pack.deliveryTime}</strong></span>
                  </div>

                  <Link 
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      selectPack(pack.name);
                    }}
                    className={`select-pack-btn ${pack.popular ? 'popular-btn' : ''}`}
                  >
                    <span>Commander ce pack</span>
                    <Send size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Project CTA */}
        <div className="custom-project-cta">
          <div className="cta-content">
            <h2>Besoin d'un projet sur-mesure ou d'une régie technique ?</h2>
            <p>
              Votre infrastructure a des contraintes spécifiques ou vous souhaitez intégrer un ingénieur DevSecOps / Cloud compétent directement dans vos équipes ? Discutons-en !
            </p>
          </div>
          <Link 
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              selectPack('Sur-mesure / Régie');
            }}
            className="cta-btn"
          >
            <span>Me contacter</span>
            <Send size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
