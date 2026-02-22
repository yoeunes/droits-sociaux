document.addEventListener("DOMContentLoaded", () => {
    
    const lang = document.documentElement.lang || 'fr';
    
    // ... (votre code existant de chargement header/footer) ...

    // AJOUTEZ CETTE LIGNE :
    autoFormatArticles(); 
});

// Attend que le contenu de la page soit chargé
document.addEventListener("DOMContentLoaded", () => {
    
    const lang = document.documentElement.lang || 'fr';
    
    // Chemins des templates
    const headerPath = lang === 'ar' ? '/templates/header-ar.html' : '/templates/header-fr.html';
    const footerPath = lang === 'ar' ? '/templates/footer-ar.html' : '/templates/footer-fr.html';
    const sidebarLeftPath = lang === 'ar' ? '/templates/sidebar-left-ar.html' : '/templates/sidebar-left-fr.html';
    const sidebarRightPath = lang === 'ar' ? '/templates/sidebar-right-ar.html' : '/templates/sidebar-right-fr.html';

    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const sidebarLeftPlaceholder = document.getElementById('sidebar-left-placeholder');
    const sidebarRightPlaceholder = document.getElementById('sidebar-right-placeholder');

    // Fonction de chargement avec anti-cache
    const loadHTML = (path, element) => {
        if (element) {
            fetch(path + '?t=' + new Date().getTime()) // FORCER LE RECHARGEMENT
                .then(response => response.ok ? response.text() : Promise.reject(`Fichier non trouvé: ${path}`))
                .then(data => {
                    element.innerHTML = data;
                    if (element.id === 'header-placeholder') {
                        setActiveLink();
                        setupHamburgerMenu(); // Active le menu mobile
                        setupDesktopDropdowns(); // Active le menu Desktop au CLIC
                        setupLangSwitcher(); // <-- APPEL DE LA NOUVELLE FONCTION
                    }
                })
                .catch(error => console.warn(`Erreur chargement template:`, error));
        }
    };

    loadHTML(headerPath, headerPlaceholder);
    loadHTML(footerPath, footerPlaceholder);
    loadHTML(sidebarLeftPath, sidebarLeftPlaceholder);
    loadHTML(sidebarRightPath, sidebarRightPlaceholder);
    setupCookieBanner();
});

/**
 * Logique pour le menu hamburger (Mobile)
 */
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('nav-mobile-menu');

    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileMenu.classList.toggle('is-open');
    });

    const dropdownToggles = mobileMenu.querySelectorAll('.nav-dropdown > .dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const submenu = toggle.nextElementSibling;
            if (submenu && submenu.classList.contains('dropdown-menu')) {
                submenu.classList.toggle('is-open');
            }
        });
    });
}

/**
 * Logique pour le menu Desktop (Ouverture au CLIC)
 */
function setupDesktopDropdowns() {
    const desktopToggles = document.querySelectorAll('nav.main-nav .nav-dropdown > .dropdown-toggle');

    desktopToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const currentDropdown = toggle.closest('.nav-dropdown');
            
            document.querySelectorAll('nav.main-nav .nav-dropdown').forEach(dropdown => {
                if (dropdown !== currentDropdown) {
                    dropdown.classList.remove('is-open');
                }
            });
            currentDropdown.classList.toggle('is-open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav.main-nav .nav-dropdown')) {
            document.querySelectorAll('nav.main-nav .nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('is-open');
            });
        }
    });
}

/**
 * NOUVELLE FONCTION : Logique du bouton de langue
 */
function setupLangSwitcher() {
    const currentLang = document.documentElement.lang; // 'fr' ou 'ar'
    const currentPath = window.location.pathname; // ex: /fr/simulateur_cnss.html

    // 1. Déterminer le chemin de la nouvelle page
    let targetPath;
    if (currentLang === 'fr') {
        // Remplace /fr/ par /ar/
        targetPath = currentPath.replace('/fr/', '/ar/');
    } else {
        // Remplace /ar/ par /fr/
        targetPath = currentPath.replace('/ar/', '/fr/');
    }

    // 2. Trouver TOUS les boutons de langue (desktop et mobile)
    const switchButtons = document.querySelectorAll('.lang-switcher-btn');

    // 3. Appliquer le nouveau lien à chaque bouton
    switchButtons.forEach(button => {
        // Définit le lien correct
        button.href = targetPath;

        // (Optionnel) Ajoute un écouteur au cas où on voudrait empêcher le href
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le clic par défaut
            window.location.href = targetPath; // Change la page
        });
    });
}

/**
 * Active le lien de la page actuelle dans la nav
 */
function setActiveLink() {
    let currentPagePath = window.location.pathname;
    if (currentPagePath === '/' || currentPagePath === '/index.html') {
        currentPagePath = document.documentElement.lang === 'ar' ? '/ar/home.html' : '/fr/home.html';
    }
    
    const navLinks = document.querySelectorAll('nav.main-nav a, #nav-mobile-menu a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPagePath) {
            link.classList.add('active');
            const parentDropdown = link.closest('.nav-dropdown');
            if (parentDropdown) {
                const toggle = parentDropdown.querySelector('.dropdown-toggle');
                if (toggle) toggle.classList.add('active');
            }
        }
    });
}

/**
 * GESTION DU BANDEAU COOKIES
 * Affiche le bandeau si l'utilisateur n'a pas encore accepté
 */
function setupCookieBanner() {
    // 1. Vérifier si déjà accepté (stocké dans le navigateur)
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        return; // On ne fait rien si déjà accepté
    }

    // 2. Détecter la langue
    const lang = document.documentElement.lang || 'fr';

    // 3. Textes selon la langue
    const textFR = `Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre <a href="/fr/conditions.html">politique de confidentialité</a>.`;
    const btnFR = "J'accepte";

    const textAR = `نستخدم ملفات تعريف الارتباط لضمان أفضل تجربة. بمواصلة التصفح، أنت توافق على <a href="/ar/conditions.html">سياسة الخصوصية</a>.`;
    const btnAR = "موافق";

    const content = lang === 'ar' ? textAR : textFR;
    const btnText = lang === 'ar' ? btnAR : btnFR;

    // 4. Créer le HTML du bandeau
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p class="cookie-text">${content}</p>
            <button class="btn-cookie" onclick="acceptCookies()">${btnText}</button>
        </div>
    `;

    // 5. Ajouter au corps de la page
    document.body.appendChild(banner);
    
    // 6. Afficher le bandeau
    setTimeout(() => {
        banner.style.display = 'block';
    }, 1000); // Petit délai d'une seconde pour ne pas agresser
}

// Fonction appelée au clic sur le bouton
window.acceptCookies = function() {
    localStorage.setItem('cookiesAccepted', 'true'); // Sauvegarde le choix
    const banner = document.getElementById('cookieBanner');
    if(banner) banner.style.display = 'none'; // Cache le bandeau
};

/**
 * FONCTION D'AUTOMATISATION DU DESIGN ARTICLE
 * Transforme une page simple en page "Design Pro"
 */
function autoFormatArticles() {
    // 1. On vérifie si on doit appliquer le design
    // On ne l'applique que si le body a la classe "auto-article"
    // ET si la bannière n'existe pas déjà (pour éviter les doublons)
    if (!document.body.classList.contains('auto-article') || document.querySelector('.hero-section')) {
        return;
    }

    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    // 2. On récupère le titre (H1) et le premier paragraphe (P) pour la bannière
    const title = mainContent.querySelector('h1');
    const intro = mainContent.querySelector('p.lead') || mainContent.querySelector('p'); // Cherche un paragraphe introductif

    if (!title) return; // Pas de titre, on arrête

    // 3. On construit la Bannière (Hero Section)
    const heroContainer = document.createElement('div');
    heroContainer.className = 'site-container';
    heroContainer.style.marginBottom = '0';
    
    // On détermine l'image de fond (optionnel : on pourrait la rendre dynamique)
    // Par défaut, on utilise celle qu'on a définie
    
    heroContainer.innerHTML = `
        <div class="hero-section">
            <div class="hero-content">
                <h1>${title.innerText}</h1>
                ${intro ? `<p>${intro.innerText}</p>` : ''}
            </div>
        </div>
    `;

    // 4. On insère la bannière AVANT le contenu principal
    // On remonte au niveau du site-container parent
    const parentContainer = mainContent.closest('.site-container') || mainContent.parentElement;
    parentContainer.parentNode.insertBefore(heroContainer, parentContainer);

    // 5. On crée la Boîte Blanche (Article Box)
    const articleBox = document.createElement('div');
    articleBox.className = 'article-box';

    // 6. On déplace tout le contenu dans la boîte blanche
    // On supprime le titre et l'intro du contenu original car ils sont maintenant dans la bannière
    title.remove();
    if(intro) intro.remove();

    // On déplace le reste
    while (mainContent.firstChild) {
        articleBox.appendChild(mainContent.firstChild);
    }
    
    mainContent.appendChild(articleBox);
}