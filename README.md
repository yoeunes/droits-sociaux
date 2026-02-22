# Simulateurs Sociaux Maroc

Site Jekyll avec TailwindCSS pour GitHub Pages.

## Installation

### Prérequis
- Ruby 2.7+
- Node.js 16+

### Setup

```bash
# Installer les dépendances Ruby
bundle install

# Installer les dépendances Node.js
npm install

# Compiler le CSS Tailwind
npm run css:build

# Lancer le serveur Jekyll
npm run jekyll:serve
```

### Développement

```bash
# Mode développement (watch CSS + serveur Jekyll)
npm run dev
```

Le site sera disponible sur `http://localhost:4000`

## Structure

```
├── _config.yml          # Configuration Jekyll
├── _layouts/            # Templates de page
│   ├── default.html     # Layout principal
│   ├── simulateur.html  # Layout simulateurs
│   └── article.html     # Layout articles
├── _includes/           # Composants réutilisables
│   ├── header.html      # Navigation
│   └── footer.html      # Pied de page
├── _data/               # Données YAML
│   ├── navigation.yml   # Menu navigation
│   └── translations.yml # Traductions FR/AR
├── assets/
│   ├── css/
│   │   ├── input.css    # Source Tailwind
│   │   └── style.css    # CSS compilé
│   ├── js/
│   │   └── main.js      # JavaScript principal
│   └── img/             # Images
├── fr/                  # Pages françaises
└── ar/                  # Pages arabes
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run css:build` | Compile Tailwind une fois |
| `npm run css:watch` | Watch et recompile Tailwind |
| `npm run jekyll:serve` | Lance Jekyll |
| `npm run dev` | Mode développement complet |
| `npm run build` | Build production |

## Déploiement GitHub Pages

1. Pousser sur la branche `main`
2. Dans Settings > Pages, sélectionner la source `main`
3. Le site sera disponible sur `https://username.github.io/repo-name`

### Avant de déployer

```bash
# Build final
npm run build
```

## Personnalisation

### Modifier les couleurs

Éditer `tailwind.config.js` :

```javascript
colors: {
  'cnss': {
    DEFAULT: '#005a9e',
    light: '#e6f7ff',
    dark: '#004080'
  },
  // ...
}
```

### Modifier les traductions

Éditer `_data/translations.yml`

### Ajouter une page

1. Créer le fichier dans `fr/` ou `ar/`
2. Ajouter le front matter :

```yaml
---
layout: default
lang: fr
direction: ltr
title: "Titre de la page"
---
```

## Licence

MIT
