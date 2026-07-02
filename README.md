# Mathieu AKAKPO-DJAKPATA - Portfolio Professionnel

Un portfolio en ligne moderne et hautement performant, conçu en **React + TypeScript** et propulsé par **Vite**. Ce site met en avant des compétences avancées en architecture **Cloud, DevOps, DevSecOps et Cybersécurité**, avec un design esthétique premium (Glassmorphisme, micro-animations, et design responsive).

---

## 🚀 Fonctionnalités Clés

### 🌗 Theme Engine Dynamique (Dark & Light Mode)
- **Prévention du FOUC (Flash of Unstyled Content)** via un script inline bloquant dans le `<head>`.
- Mode clair/sombre synchronisé avec les préférences système de l'OS par défaut et mémorisé dans le `localStorage` de l'utilisateur.
- Transition fluide et micro-animations animées (rotations et mises à l'échelle) lors du changement d'icône.

### 💻 Simulateur de Terminal Interactif (CLI)
- Intégré directement dans la section d'accueil (Hero), permettant de simuler des commandes shell en temps réel (ex: `help`, `about`, `skills`, `contact`, `clear`).
- Forcé en mode sombre pour une esthétique fidèle à l'expérience console authentique d'un ingénieur DevSecOps.

### 📁 Structure Modulaire et Bento Grid
- Grid Bento moderne pour classifier les compétences par catégories technologiques (CI/CD, IaC, Conteneurs, Cloud, Dev, Sécurité, etc.).
- Filtrage dynamique des certifications par catégorie (Sécurité, Cloud, Développement web, Gestion de projet agile).
- Composant popup (modal interactive) pour zoomer sur les certificats officiels.

---

## 🛠️ Stack Technique

* **Framework principal** : React 19 & TypeScript
* **Outil d'assemblage / Serveur de dev** : Vite 8
* **Stylisation** : Vanilla CSS & Custom CSS Variables (pour un contrôle total et des performances optimales sans bibliothèques lourdes)
* **Icônes** : Lucide React
* **Linter** : Oxlint (linter JavaScript/TypeScript ultra-rapide)

---

## 📂 Organisation du Projet

```text
mon-portfolio/
├── CV/                      # Fichiers LaTeX, PDFs sources du CV, et sauvegardes de badges (ignoré par Git)
├── public/                  # Assets publics (badges du site, favicon, photos, CV PDF)
└── src/
    ├── assets/              # Logos et images internes
    ├── components/          # Composants UI isolés
    │   ├── About.tsx        # Section Présentation et formation académique
    │   ├── Certifications.tsx # Section des Certificats pro (avec modal de zoom)
    │   ├── Contact.tsx      # Formulaire de contact sécurisé
    │   ├── Experiences.tsx  # Parcours professionnel (chronologique)
    │   ├── Hero.tsx         # Section d'accueil avec typage dynamique et CLI
    │   ├── Navbar.tsx       # Barre de navigation fixe & Toggle de thème
    │   └── Skills.tsx       # Bento grid des compétences techniques
    ├── data/                # Fichiers de données locales
    │   └── github_projects.json # Données des projets GitHub récupérés
    ├── App.tsx              # Composant racine orchestrant le layout
    ├── index.css            # Design system global et variables de thèmes
    └── main.tsx             # Point d'entrée de l'application React
```

---

## 💻 Installation et Utilisation Locale

### 1. Prérequis
Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 18+ recommandée).

### 2. Cloner le dépôt et installer les dépendances
```bash
git clone https://github.com/Math-ieu/mon-portfolio.git
cd mon-portfolio
npm install
```

### 3. Lancer le serveur de développement local
```bash
npm run dev
```
Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173/`).

### 4. Compiler l'application pour la production
```bash
npm run build
```
Les fichiers statiques optimisés et minifiés seront générés dans le dossier `dist/`.

### 5. Prévisualiser le build de production localement
```bash
npm run preview
```