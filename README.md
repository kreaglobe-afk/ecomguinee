# Smart Services GN - Boutique Automobile

> Boutique automobile professionnelle en Guinée | Produits, Accessoires, Solutions Innovantes

## 📋 Structure du Projet

```
site_complet/
├── index.html                 # Page principale (HTML pur & sémantique)
├── assets/
│   ├── css/
│   │   ├── main.css          # Styles principaux
│   │   └── variables.css     # Variables CSS
│   └── js/
│       ├── main.js           # JavaScript principal (menu mobile, smooth scroll)
│       ├── modal.js          # Gestion des modales (commande, produits)
│       └── products.js       # Données & rendu des produits
└── README.md                 # Cette documentation
```

## 🎯 Améliorations Apportées

### ✅ Optimisations de Performance
- **Séparation HTML/CSS/JS** : Chaque fichier a une responsabilité unique
- **CSS optimisé** : Utilisation de variables CSS pour thème cohérent
- **JavaScript modulé** : Séparation logique (main.js, modal.js, products.js)
- **Images optimisées** : Lazy loading automatique des images

### ✅ Structure Professionnelle
- **HTML Sémantique** : Balises appropriées (header, main, section, footer)
- **Mobile-First Design** : Responsive et performant sur tous les appareils
- **Accessibilité** : Balises ARIA et structure hiérarchique

### ✅ Maintenabilité
- **Code Lisible** : Noms de classes explicites, commentaires clairs
- **DRY Principle** : Pas de répétition (composants réutilisables)
- **Variables Centralisées** : Couleurs et polices dans `variables.css`

### ✅ Fonctionnalités
- 📱 Menu responsive automatique
- 🛒 Modales de commande fluides
- 🎨 Animations smooth et transitions
- ⚡ Chargement rapide et performant
- 🔒 Formules sécurisées avec WhatsApp

## 🚀 Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec variables
- **JavaScript Vanilla** : Sans dépendances (pur JS)
- **Tailwind CSS** : Framework utilitaire (déjà inclus)
- **FontAwesome 6.5** : Icônes
- **Google Fonts** : Montserrat + Open Sans

## 💡 Fonctionnalités Principales

### Navigation
- Menu desktop avec liens rapides
- Menu mobile hamburger responsive
- Navigation fluide avec scroll smooth

### Produits
- Grille affichant les 7 premiers produits
- Modales "Voir tous les produits" avec 7 produits
- Tags de catégorie et statut stock
- Données centralisées dans `products.js`

### Commandes
- Formulaire modal complet (nom, téléphone, ville, quantité)
- Intégration directe WhatsApp
- Message pré-formaté pour commandes
- Validation formulaire

### Sections
- Hero Section avec CTA
- À Propos avec statistiques
- Catégories de produits
- Guide 3 étapes pour commander
- Infos livraison (24-48h Conakry, 3-5j intérieur)
- Footer complet avec liens

## 📝 Installation / Déploiement

### En Local
```bash
# 1. Cloner ou télécharger le repo
git clone https://github.com/kreaglobe-afk/ecomguinee.git

# 2. Ouvrir dans un navigateur
open index.html

# 3. Ou utiliser un serveur local
python -m http.server 8000
# Puis visiter http://localhost:8000
```

### Sur Netlify
```bash
# 1. Pousser sur GitHub
git add .
git commit -m "Refactor: Structure optimisée"
git push origin main

# 2. Connecter Netlify à GitHub
# - Go to netlify.com
# - New site from Git
# - Select kreaglobe-afk/ecomguinee
# - Deploy!
```

## 🔧 Configuration WhatsApp

Mettre à jour le numéro WhatsApp dans les liens :
```html
<!-- Dans index.html -->
<a href="https://wa.me/224622000000">
```

## 📦 Fichiers Clés

### `index.html`
- Structure HTML propre et sémantique
- Pas de styles inline ✅
- Pas de JavaScript inline ✅
- Métadonnées SEO complètes

### `assets/css/main.css`
- **Sections** : Classes réutilisables (section-white, section-light, section-gradient)
- **Buttons** : btn-primary, btn-whatsapp, btn-dark, btn-social-*
- **Components** : product-card, category-card, modal-*, form-*, stat-card
- **Responsive** : Media queries optimisées

### `assets/js/products.js`
- Array `PRODUCTS` avec tous les 7 produits
- Fonction `renderProducts()` pour grille
- Fonction `renderAllProducts()` pour modales
- Rendu automatique au chargement

### `assets/js/modal.js`
- `openOrderModal()` / `closeOrderModal()`
- `openAllProductsModal()` / `closeAllProductsModal()`
- Gestion quantité : `increaseQty()` / `decreaseQty()`
- `submitOrder()` : Envoi WhatsApp
- Fermeture modales (click outside, ESC key)

### `assets/js/main.js`
- Menu mobile toggle
- Smooth scroll sur ancres
- Image optimization
- Logs de démarrage

## 🎨 Couleurs & Thème

```css
--primary: #d84315 (Orange-Red)
--accent: #ff5722 (Deep Orange)
--accent2: #795548 (Brown)
--dark-bg: #121212 (Charcoal)
--light-bg: #fbeee6 (Cream)
```

## ✨ À Faire (Optionnel)

- [ ] Système de panier côté client
- [ ] Page détail produit
- [ ] Filtres/recherche produits
- [ ] Avis clients
- [ ] Blog/Actualités
- [ ] Analytics (Google Analytics)
- [ ] CMS d'administration

## 📞 Contact

- **Téléphone** : +224 622 000 000
- **Email** : contact@smartservicesgn.com
- **Facebook** : @smartservicesgn
- **Instagram** : @smartservicesgn
- **WhatsApp** : Smart Services GN

## 📄 License

© 2026 Smart Services GN. Tous droits réservés.

---

**Créé avec ❤️ pour Smart Services GN**
