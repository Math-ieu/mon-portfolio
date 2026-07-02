import { useState, useMemo } from 'react';
import { ExternalLink, Star, GitFork, Search, FolderGit2, Calendar } from 'lucide-react';
import rawProjects from '../data/github_projects.json';
import './Projects.css';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface GitHubProject {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  homepage: string | null;
}

// Highlighted projects to show at the top of the portfolio
const HIGHLIGHTED_PROJECT_NAMES = [
  "PFE-NIDS-AI",
  "app-agencemenage",
  "ZenSpend-v2",
  "LAB-PRA-1",
  "mini-soc",
  "adk-python",
  "aws-siem",
  "chatbot-rag",
  "mlops-sec"
];

export default function Projects() {
  const projects = rawProjects as GitHubProject[];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [showOnlyHighlighted, setShowOnlyHighlighted] = useState(false);

  // Group languages for the filter dropdown
  const languages = useMemo(() => {
    const langs = new Set<string>();
    projects.forEach(p => {
      if (p.language) langs.add(p.language);
    });
    return Array.from(langs).sort();
  }, [projects]);

  // Categorize a project based on its topics, name, or description
  const getProjectCategory = (project: GitHubProject): string => {
    const name = project.name.toLowerCase();
    const desc = (project.description || "").toLowerCase();
    const topics = project.topics.map(t => t.toLowerCase());

    const isCloudIaC = 
      name.includes("terraform") || name.includes("aws") || name.includes("siem") || 
      name.includes("hcl") || name.includes("lab-pra") || name.includes("soc") ||
      project.language === "HCL" || topics.includes("terraform") || topics.includes("aws") || topics.includes("cloud");
      
    const isDevSecOpsAI = 
      name.includes("ids") || name.includes("nids") || name.includes("sec") || 
      name.includes("mlops") || name.includes("rag") || name.includes("ai") || 
      name.includes("agent") || name.includes("python") || desc.includes("machine learning") ||
      desc.includes("detection") || desc.includes("intrusion");

    const isWebApp = 
      name.includes("agence") || name.includes("spend") || name.includes("sipa") || 
      name.includes("frontend") || name.includes("backend") || name.includes("clone") || 
      name.includes("folio") || name.includes("web") || topics.includes("web") || 
      topics.includes("website") || topics.includes("app");

    if (isCloudIaC) return "cloud-iac";
    if (isDevSecOpsAI) return "devsecops-ai";
    if (isWebApp) return "web-app";
    return "other";
  };

  // Filtered and Sorted list of projects
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Filter by highlight toggle
    if (showOnlyHighlighted) {
      result = result.filter(p => HIGHLIGHTED_PROJECT_NAMES.includes(p.name));
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(p => getProjectCategory(p) === selectedCategory);
    }

    // Filter by language
    if (selectedLanguage !== "all") {
      result = result.filter(p => p.language === selectedLanguage);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q)) ||
        p.topics.some(t => t.toLowerCase().includes(q)) ||
        (p.language && p.language.toLowerCase().includes(q))
      );
    }

    // If showing all, sort highlights first, then by date. Otherwise just sort by date.
    return result.sort((a, b) => {
      if (!showOnlyHighlighted) {
        const aHigh = HIGHLIGHTED_PROJECT_NAMES.includes(a.name);
        const bHigh = HIGHLIGHTED_PROJECT_NAMES.includes(b.name);
        if (aHigh && !bHigh) return -1;
        if (!aHigh && bHigh) return 1;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [projects, searchQuery, selectedCategory, selectedLanguage, showOnlyHighlighted]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(6); // reset pagination
  };

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Mes Projets GitHub</h2>
      
      {/* Filters Toolbar */}
      <div className="projects-toolbar glass">
        {/* Search */}
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un projet, une techno..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          <button 
            className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            Tous
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'cloud-iac' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('cloud-iac')}
          >
            Cloud & IaC
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'devsecops-ai' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('devsecops-ai')}
          >
            DevSecOps & IA
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'web-app' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('web-app')}
          >
            Applications Web
          </button>
        </div>

        {/* Language select & Highlight toggle */}
        <div className="extra-filters">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="language-select glass"
            aria-label="Filter by primary language"
          >
            <option value="all">Langages (Tous)</option>
            {languages.map((lang, idx) => (
              <option key={idx} value={lang}>{lang}</option>
            ))}
          </select>

          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showOnlyHighlighted}
              onChange={(e) => {
                setShowOnlyHighlighted(e.target.checked);
                setVisibleCount(6);
              }}
              className="toggle-checkbox"
            />
            <span className="toggle-custom"></span>
            <span className="toggle-text">Projets Phares</span>
          </label>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.slice(0, visibleCount).map((project) => {
          const isHighlighted = HIGHLIGHTED_PROJECT_NAMES.includes(project.name);
          return (
            <div 
              key={project.name} 
              className={`project-card glow-card ${isHighlighted ? 'project-highlighted' : ''}`}
            >
              <div className="project-card-header">
                <FolderGit2 className="project-folder-icon" />
                <div className="project-links">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`GitHub repo for ${project.name}`}
                    className="project-link-icon"
                  >
                    <GithubIcon size={18} />
                  </a>
                  {project.homepage && (
                    <a 
                      href={project.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`Demo webpage for ${project.name}`}
                      className="project-link-icon"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <div className="project-card-body">
                <h3 className="project-name">
                  {project.name}
                  {isHighlighted && <span className="highlight-tag">Phare</span>}
                </h3>
                <p className="project-desc">
                  {project.description || "Pas de description disponible sur le dépôt. Consultez le code source pour plus d'informations."}
                </p>
              </div>

              <div className="project-card-footer">
                {/* Stats */}
                <div className="project-stats">
                  {project.language && (
                    <span className="project-lang">
                      <span className={`lang-dot ${project.language.toLowerCase()}`}></span>
                      {project.language}
                    </span>
                  )}
                  <span className="project-stat-item">
                    <Star size={12} />
                    <span>{project.stars}</span>
                  </span>
                  <span className="project-stat-item">
                    <GitFork size={12} />
                    <span>{project.forks}</span>
                  </span>
                </div>
                
                {/* Date */}
                <div className="project-date">
                  <Calendar size={12} />
                  <span>{new Date(project.updated_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Topics tags */}
              {project.topics.length > 0 && (
                <div className="project-topics">
                  {project.topics.slice(0, 3).map((topic, tIdx) => (
                    <span key={tIdx} className="topic-tag glass">
                      #{topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="projects-empty glass">
          <FolderGit2 size={48} className="empty-icon" />
          <h3>Aucun projet trouvé</h3>
          <p>Essayez de modifier votre recherche ou vos critères de filtrage.</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredProjects.length > visibleCount && (
        <div className="load-more-container">
          <button onClick={loadMore} className="cta-secondary glass">
            Charger d'autres projets
          </button>
        </div>
      )}
    </section>
  );
}
