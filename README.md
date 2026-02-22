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
│   ├── footer.html      # Pied de page
│   └── components/      # Composants (info-box, etc.)
├── _i18n/               # Traductions multilingues
│   ├── fr.yml           # Traductions françaises
│   ├── ar.yml           # Traductions arabes
│   ├── fr/              # Contenu markdown français
│   └── ar/              # Contenu markdown arabe
├── _pages/              # Pages du site
│   ├── home.html        # Page d'accueil
│   ├── contact.html     # Page contact
│   ├── about.html       # Page à propos
│   ├── articles/        # Pages articles
│   └── simulateurs/     # Pages simulateurs
├── assets/
│   ├── css/
│   │   ├── input.css    # Source Tailwind
│   │   └── style.css    # CSS compilé
│   ├── js/
│   │   └── main.js      # JavaScript principal
│   └── img/             # Images
├── tailwind.config.js   # Configuration Tailwind
└── Gemfile              # Dépendances Ruby
```

## Commandes

| Commande               | Description                 |
|------------------------|-----------------------------|
| `npm run css:build`    | Compile Tailwind une fois   |
| `npm run css:watch`    | Watch et recompile Tailwind |
| `npm run jekyll:serve` | Lance Jekyll                |
| `npm run dev`          | Mode développement complet  |
| `npm run build`        | Build production            |

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
  'cmr': {
    DEFAULT: '#008080',
    light: '#f0f9f9',
    dark: '#006060'
  },
  'cnops': {
    DEFAULT: '#006400',
    light: '#f0f7f0',
    dark: '#004d00'
  }
}
```

### Modifier les traductions

Les traductions sont dans `_i18n/` :

- `_i18n/fr.yml` - Traductions françaises
- `_i18n/ar.yml` - Traductions arabes

Utiliser les tags dans les templates :
- `{% t key.subkey %}` - Afficher une traduction
- `{% tf folder/file.md %}` - Inclure un fichier markdown traduit

### Ajouter une page

1. Créer le fichier dans `_pages/` (ex: `_pages/ma-page.html`)
2. Ajouter le front matter avec la clé de traduction :

```yaml
---
layout: default
title: ma_page.meta_title
namespace: ma-page
permalink: /ma-page/
---
```

3. Ajouter les traductions dans `_i18n/fr.yml` et `_i18n/ar.yml` :

```yaml
ma_page:
  meta_title: "Titre de ma page - Simulateurs Sociaux"
  hero_title: "Mon titre"
  hero_description: "Ma description"
```

### Ajouter un article

1. Créer le fichier dans `_pages/articles/` (ex: `_pages/articles/mon-article.html`)
2. Utiliser le layout `article` et inclure le contenu traduit :

```yaml
---
layout: article
title: articles.mon_article.title
namespace: articles/mon-article
permalink: /articles/mon-article/
logo: /assets/img/cnss_logo.png
featured_image: /assets/img/mon-image.jpg
cta_link: simulateurs/cnss
cta_text_key: common.access_simulator
---
{% tf articles/mon-article.md %}
```

3. Créer le contenu markdown dans `_i18n/fr/articles/mon-article.md` et `_i18n/ar/articles/mon-article.md`

4. Ajouter les métadonnées dans les fichiers YAML de traduction

## Licence

MIT
