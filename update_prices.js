const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// Define prices mapping based on partial match of parameter 1
const prices = [
  { match: 'Autel MaxiScan MS309', price: '350000' },
  { match: 'Scanner OBD2 V526', price: '450000' },
  { match: 'Belt Silencer', price: '180000' },
  { match: 'Homonth Scratch', price: '180000' },
  { match: 'BOOST UP', price: '230000' },
  { match: 'JB-XPOS', price: '180000' },
  { match: 'Rayhong Crystal', price: '180000' }
];

prices.forEach(p => {
  // We want to replace `openOrderModal('Name', 'Desc')` with `openOrderModal('Name', 'Desc', 'Price')`
  // Regex looks for: openOrderModal('...Name...', '...Desc...')
  const regex = new RegExp(`openOrderModal\\('([^']*${p.match}[^']*)'\\s*,\\s*'([^']+)'\\)`, 'g');
  content = content.replace(regex, `openOrderModal('$1', '$2', '${p.price}')`);
});

// Since the user wanted to replace Homonth Scratch Repair or add OGAS Efficient, we'll replace Homonth Scratch Repair entirely.
// Actually, I can just replace the Homonth block with OGAS. Let's find the Product 4 block in the main grid and modal:

const ogasHTMLMainGrid = `
      <!-- Product 8 - OGAS Efficient -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div class="relative h-44 overflow-hidden bg-gray-100 flex items-center justify-center">
          <img src="assets/logo.jpg" alt="OGAS Efficient" class="w-full h-full object-cover">
          <div class="absolute top-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">
            En Stock
          </div>
          <div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs">
            Moteur
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-[var(--dark-text-color)] mb-1 text-sm">
            OGAS Efficient
          </h3>
          <p class="text-xs text-[var(--gray-text-color)] mb-3 line-clamp-2">
            Additif Premium - Protège le moteur, booste les performances, diminue consommation d'huile
          </p>
          <div class="flex flex-wrap gap-1 mb-3">
            <span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Anti-Usure</span>
            <span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Additif Moteur</span>
          </div>
          <button onclick="openOrderModal('OGAS Efficient – Additif Moteur Haute Performance', 'Additif moteur premium conçu pour réduire l’usure, améliorer les performances et prolonger la durée de vie de votre moteur. Compatible essence & diesel.', '250000')" class="w-full bg-[var(--primary-color)] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[var(--primary-button-hover-bg-color)] transition-colors">
            <i class="fas fa-shopping-bag mr-1"></i> Acheter
          </button>
        </div>
      </div>
`;

// Insert OGAS after Product 7 in the main grid (before "</div>\n\n    <!-- CTA Button")
content = content.replace(/(<!-- Product 7 -->[\s\S]*?<\/div>\s*<\/div>\s*)(<\/div>\s*<!-- CTA Button - Voir tous les produits disponibles -->)/, `$1${ogasHTMLMainGrid}$2`);

const ogasHTMLModal = `
        <!-- OGAS Efficient -->
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div class="flex gap-3">
            <img src="assets/logo.jpg" alt="OGAS Efficient" class="w-24 h-24 object-cover rounded-lg">
            <div class="flex-1">
              <h4 class="font-bold text-[var(--dark-text-color)] mb-1">
                OGAS Efficient
              </h4>
              <p class="text-sm text-[var(--gray-text-color)] mb-2">
                Additif moteur premium. Réduit l'usure prématurée, la consommation d'huile, et booste la performance.
              </p>
              <div class="flex flex-wrap gap-1 mb-2">
                <span class="bg-[var(--primary-color)]/10 text-[var(--primary-color)] px-2 py-0.5 rounded text-xs">Additif</span>
                <span class="bg-[var(--primary-color)]/10 text-[var(--primary-color)] px-2 py-0.5 rounded text-xs">Moteur</span>
              </div>
              <button onclick="openOrderModal('OGAS Efficient – Additif Moteur Haute Performance', 'Additif moteur premium conçu pour réduire l’usure, améliorer les performances et prolonger la durée de vie de votre moteur. Compatible essence & diesel.', '250000'); closeAllProductsModal();" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
                <i class="fab fa-whatsapp mr-1"></i> Commander
              </button>
            </div>
          </div>
        </div>
`;

// Insert OGAS after Product 7 in the modal (before "</div>\n    </div>\n  </div>\n</div>")
content = content.replace(/(<!-- Crystal Coating -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*)(<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div id="orderModal")/, `$1${ogasHTMLModal}$2`);

// Ensure we didn't miss closeAllProductsModal in the original logic:
// we might have matched `openOrderModal(..., ...); closeAllProductsModal();`
// The regex `openOrderModal\('...', '...'\)` matches strictly part of it, leaving the semicolon and rest intact.

// Update contact form at the bottom
const contactFormHTML = `
<!-- CONTACT SECTION -->
<section id="contact" class="code-section bg-[var(--light-background-color)] py-12 lg:py-16">
  <div class="container mx-auto px-4 max-w-4xl">
    <div class="text-center mb-10">
      <h2 class="font-[var(--font-family-heading)] text-2xl sm:text-3xl font-bold text-[var(--dark-text-color)] mb-3">
        Laissez-nous un <span class="text-[var(--primary-color)]">Message</span>
      </h2>
      <p class="text-[var(--gray-text-color)]">
        Vous avez une question sur nos formations, l'immobilier, la logistique ou nos produits auto ? Écrivez-nous.
      </p>
    </div>
    <div class="bg-white rounded-2xl shadow-lg p-6 lg:p-10 border border-gray-100">
      <form action="https://formspree.io/f/xvonzgnz" method="POST" class="space-y-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-[var(--dark-text-color)] mb-2">Votre Nom</label>
            <input type="text" name="name" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 outline-none transition-all">
          </div>
          <div>
            <label class="block text-sm font-semibold text-[var(--dark-text-color)] mb-2">Votre Téléphone / Email</label>
            <input type="text" name="contact" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 outline-none transition-all">
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-[var(--dark-text-color)] mb-2">Sujet détaillé</label>
          <select name="subject" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 outline-none transition-all">
            <option value="Demande d'information - Produits Auto">Produits Automobiles</option>
            <option value="Demande d'information - Formations">Formations (Dev Personnel, Marketing...)</option>
            <option value="Demande d'information - Logistique">Logistique & Transport</option>
            <option value="Demande d'information - Immobilier">Immobilier & Foncier</option>
            <option value="Autre">Autre Demande</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-[var(--dark-text-color)] mb-2">Message</label>
          <textarea name="message" rows="4" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-20 outline-none transition-all"></textarea>
        </div>
        <button type="submit" class="w-full bg-[var(--primary-color)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-colors shadow-md">
          <i class="fas fa-paper-plane mr-2"></i> Envoyer le Message
        </button>
      </form>
    </div>
  </div>
</section>
`;

content = content.replace(/(<section id="sjn5n06" class="code-section"><\/section>)/, `$1\n${contactFormHTML}\n`);

fs.writeFileSync('index.html', content, 'utf-8');
console.log("Prices successfully updated, 8th product injected, and contact section added.");
