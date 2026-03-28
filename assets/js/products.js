// PRODUCTS DATA
const PRODUCTS = [
  {
    id: 1,
    name: 'Autel MaxiScan MS309',
    description: 'Scanner OBD2 - Lit/efface codes défauts, Freeze Frame',
    fullDescription: 'Scanner OBD2 professionnel - Lit/efface codes défauts, Freeze Frame, I/M Readiness',
    image: 'https://assets.ls-assets.com/uploads/1debf7d8-be86-4294-ab10-69b1d84bbf4b/137323eb-92cc-4d24-b26f-6bf9b0517d54.jpg?w=480',
    category: 'Diagnostic',
    tags: ['OBD2', 'Diagnostic'],
    inStock: true
  },
  {
    id: 2,
    name: 'Scanner OBD2 V526',
    description: 'Écran couleur 2.8", Live Data, 35901 codes',
    fullDescription: 'Scanner automobile avec écran couleur 2.8 pouces, Live Data, O2 sensor, 35901 codes',
    image: 'https://assets.ls-assets.com/uploads/1debf7d8-be86-4294-ab10-69b1d84bbf4b/29e667eb-c85e-4ead-8fec-5d2dd6f122ee.jpg?w=480',
    category: 'Diagnostic',
    tags: ['2.8" LCD', '35901 Codes'],
    inStock: true
  },
  {
    id: 3,
    name: 'Belt Silencer Spray',
    description: 'Spray courroie 100ml - Élimine bruits, anti-usure',
    fullDescription: 'Spray silencieux pour courroie 100ml - Élimine bruits, réduit frottements, anti-usure',
    image: 'https://assets.ls-assets.com/uploads/1debf7d8-be86-4294-ab10-69b1d84bbf4b/12693204-a93e-4cdb-bddf-d357a7910b32.jpg?w=480',
    category: 'Entretien',
    tags: ['100ml', 'Anti-Bruit'],
    inStock: true
  },
  {
    id: 4,
    name: 'Homonth Scratch Repair',
    description: '120ml - Efface rayures, protection UV, kit inclus',
    fullDescription: 'Agent réparateur de rayures 120ml - Efface rayures, protection UV, kit éponge + chiffon inclus',
    image: 'https://assets.ls-assets.com/uploads/1debf7d8-be86-4294-ab10-69b1d84bbf4b/a862c66d-b49a-4cca-a020-ee67e38e60da.jpg?w=480',
    category: 'Esthétique',
    tags: ['120ml', 'Anti-UV'],
    inStock: true
  },
  {
    id: 5,
    name: 'BOOST UP Catalytic Cleaner',
    description: '120ml - Nettoie catalyseur, réduit fumée noire',
    fullDescription: 'Nettoyant catalyseur haute performance 120ml - Nettoie catalyseur, réduit fumée noire, économie carburant',
    image: 'https://assets.ls-assets.com/uploads/1debf7d8-be86-4294-ab10-69b1d84bbf4b/a6a2213e-6463-45cf-89c4-3a48393f4cb9.jpg?w=480',
    category: 'Moteur',
    tags: ['120ml', 'Catalyseur'],
    inStock: true
  },
  {
    id: 6,
    name: 'JB-XPOS Engine Cleaner',
    description: 'Spray dégraissant moteur 50ml - Action rapide',
    fullDescription: 'Nettoyant moteur haute performance en spray 50ml - Action rapide, nettoyage profond',
    image: 'https://assets.ls-assets.com/uploads/1debf7d8-be86-4294-ab10-69b1d84bbf4b/d586c2e3-839f-4bd8-8ef1-bfbbd3efe02a.jpg?w=480',
    category: 'Nettoyant',
    tags: ['50ml', 'Dégraissant'],
    inStock: true
  },
  {
    id: 7,
    name: 'Rayhong Crystal Coating',
    description: '30ml - Restaure plastiques, anti-UV, brillance',
    fullDescription: 'Rénovateur de plastiques Crystal Coating 30ml - Restaure plastiques, anti-UV, brillance longue durée, éponge incluse',
    image: 'https://assets.ls-assets.com/uploads/1debf7d8-be86-4294-ab10-69b1d84bbf4b/fb6f008b-27d2-45ae-b03e-631dc4a4b69e.jpg?w=480',
    category: 'Esthétique',
    tags: ['30ml', 'Anti-UV'],
    inStock: true
  }
];

// RENDER PRODUCTS
function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;
  
  container.innerHTML = PRODUCTS.slice(0, 7).map(product => `
    <div class="product-card">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}">
        <span class="product-badge badge-in-stock">En Stock</span>
        <span class="product-badge badge-category">${product.category}</span>
      </div>
      <div class="product-content">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-tags">
          ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
        </div>
        <button onclick="openOrderModal('${product.name}', '${product.fullDescription}')" class="product-btn">
          <i class="fas fa-shopping-bag"></i> Acheter
        </button>
      </div>
    </div>
  `).join('');
}

// RENDER ALL PRODUCTS IN MODAL
function renderAllProducts() {
  const container = document.getElementById('all-products-container');
  if (!container) return;

  container.innerHTML = `
    <div class="grid md:grid-cols-2 gap-4">
      ${PRODUCTS.map(product => `
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div class="flex gap-3">
            <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-cover rounded-lg">
            <div class="flex-1">
              <h4 class="font-bold text-gray-800 mb-1">${product.name}</h4>
              <p class="text-sm text-gray-600 mb-2">${product.fullDescription}</p>
              <div class="flex flex-wrap gap-1 mb-2">
                ${product.tags.map(tag => `<span class="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">${tag}</span>`).join('')}
              </div>
              <button onclick="openOrderModal('${product.name}', '${product.fullDescription}'); closeAllProductsModal();" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
                <i class="fab fa-whatsapp mr-1"></i> Commander
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// INITIALIZE ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderAllProducts();
});
