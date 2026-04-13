// MODAL FUNCTIONS

let currentProductPrice = 0;

function formatPrice(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updatePriceDisplay() {
  const qtyInput = document.getElementById('quantityInput');
  if(!qtyInput) return;
  
  let quantity = parseInt(qtyInput.value) || 1;
  let discountPercent = 0;
  
  if (quantity === 2) discountPercent = 15;
  else if (quantity === 3) discountPercent = 20;
  else if (quantity >= 4) discountPercent = 25;
  
  const subtotal = currentProductPrice * quantity;
  const discountAmount = Math.floor(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;
  
  const priceDisplay = document.getElementById('priceDisplayContainer');
  if (priceDisplay) {
    if (discountPercent > 0) {
      priceDisplay.innerHTML = `
        <div class="flex justify-between items-center text-sm text-[var(--gray-text-color)] mb-1">
          <span>Sous-total (${quantity} pcs) :</span>
          <span class="line-through">${formatPrice(subtotal)} GNF</span>
        </div>
        <div class="flex justify-between items-center text-sm text-green-600 font-bold mb-2">
          <span>Réduction (-${discountPercent}%) :</span>
          <span>-${formatPrice(discountAmount)} GNF</span>
        </div>
        <div class="flex justify-between items-center font-bold text-lg text-[var(--primary-color)] mt-2 pt-2 border-t border-gray-200">
          <span>Total à payer :</span>
          <span>${formatPrice(finalTotal)} GNF</span>
        </div>
      `;
    } else {
      priceDisplay.innerHTML = `
        <div class="flex justify-between items-center font-bold text-lg text-[var(--primary-color)] mt-2 pt-2 border-t border-gray-200">
          <span>Total à payer :</span>
          <span>${formatPrice(finalTotal)} GNF</span>
        </div>
      `;
    }
  }
}

// ORDER MODAL
function openOrderModal(productName, productDesc, price) {
  document.getElementById('modalProductName').textContent = productName;
  document.getElementById('modalProductDesc').textContent = productDesc;
  
  currentProductPrice = parseInt(price) || 0;
  
  document.getElementById('orderModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  document.getElementById('orderForm').reset();
  document.getElementById('quantityInput').value = '1';
  updatePriceDisplay();
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// ALL PRODUCTS MODAL
function openAllProductsModal() {
  document.getElementById('allProductsModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAllProductsModal() {
  document.getElementById('allProductsModal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// QUANTITY CONTROLS
function increaseQty() {
  const input = document.getElementById('quantityInput');
  input.value = parseInt(input.value) + 1;
  updatePriceDisplay();
}

function decreaseQty() {
  const input = document.getElementById('quantityInput');
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
    updatePriceDisplay();
  }
}

document.getElementById('quantityInput')?.addEventListener('change', updatePriceDisplay);
document.getElementById('quantityInput')?.addEventListener('keyup', updatePriceDisplay);

// ============================================================
//  URL DU GOOGLE APPS SCRIPT — NE PAS MODIFIER
// ============================================================
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz5u8YnerZ0gfW6T6S3FWLNCi8W5Mqc8paPRCCSOmQEWofENtNEzxJJiUthFH-i1ody/exec";

// Afficher une notification toast
function showToast(message, type = "success") {
  // Supprimer un toast existant
  const existing = document.getElementById('oc-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'oc-toast';
  const bg = type === "success" ? "#2e7d32" : (type === "error" ? "#c62828" : "#e65100");
  const icon = type === "success" ? "✅" : (type === "error" ? "❌" : "⏳");

  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${bg};
    color: white;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 90vw;
    text-align: center;
    animation: slideUp 0.4s ease;
  `;

  // Ajouter l'animation CSS si pas encore présente
  if (!document.getElementById('toast-style')) {
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
      @keyframes slideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  document.body.appendChild(toast);

  // Disparaît après 4 secondes
  setTimeout(() => {
    toast.style.transition = 'opacity 0.5s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// SUBMIT ORDER — Enregistre dans Google Sheets + ouvre WhatsApp
function submitOrder(event) {
  event.preventDefault();

  const form = document.getElementById('orderForm');
  const submitBtn = form.querySelector('button[type="submit"]');

  const name     = form.querySelector('input[name="name"]').value.trim();
  const phone    = form.querySelector('input[name="phone"]').value.trim();
  const city     = form.querySelector('select[name="city"]').value;
  const quartier = form.querySelector('input[name="quartier"]').value.trim() || "Non spécifié";
  const quantity = parseInt(form.querySelector('input[name="quantity"]').value) || 1;
  const product  = document.getElementById('modalProductName').textContent;

  let discountPercent = 0;
  if (quantity === 2)      discountPercent = 15;
  else if (quantity === 3) discountPercent = 20;
  else if (quantity >= 4)  discountPercent = 25;

  const subtotal       = currentProductPrice * quantity;
  const discountAmount = Math.floor(subtotal * (discountPercent / 100));
  const finalTotal     = subtotal - discountAmount;

  // ── 1. Enregistrer dans Google Sheets (silencieusement) ──
  const orderData = {
    name:     name,
    phone:    phone,
    city:     city,
    quartier: quartier,
    product:  product,
    quantity: quantity,
    price:    currentProductPrice,
    total:    finalTotal
  };

  // On envoie les données sans bloquer l'utilisateur (no-cors => pas de réponse lisible, mais ça marche)
  fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode:   "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  }).catch(() => {
    // Erreur réseau silencieuse — pas bloquant
  });

  // ── 2. Notification de confirmation ──
  showToast("Commande enregistrée ! Redirection vers WhatsApp...", "success");

  // ── 3. Construire le message WhatsApp ──
  let priceText = `*Prix Unitaire:* ${formatPrice(currentProductPrice)} GNF\n`;
  if (discountPercent > 0) {
    priceText += `*Sous-total:* ~${formatPrice(subtotal)} GNF~\n`;
    priceText += `*Réduction (-${discountPercent}%):* -${formatPrice(discountAmount)} GNF\n`;
  }
  priceText += `*Total Fixé:* ${formatPrice(finalTotal)} GNF`;

  const message = `*Nouvelle Commande OC Business Center* 🛒\n\n*Produit:* ${product}\n*Quantité:* ${quantity}\n${priceText}\n\n*Informations Client:*\n*Nom:* ${name}\n*Téléphone:* ${phone}\n*Ville:* ${city}\n*Quartier:* ${quartier}`;

  const whatsappNumber = "224620018830";
  const whatsappURL    = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // ── 4. Ouvrir WhatsApp après un court délai ──
  setTimeout(() => {
    window.open(whatsappURL, '_blank');
    closeOrderModal();
  }, 800);
}

// SUBMIT CONTACT VIA WHATSAPP
function submitContactWhatsApp(event) {
  event.preventDefault();
  
  const form = event.target;
  const name = form.querySelector('input[name="name"]').value;
  const contact = form.querySelector('input[name="contact"]').value;
  const subject = form.querySelector('select[name="subject"]').value;
  const messageBody = form.querySelector('textarea[name="message"]').value;
  
  const whatsappNumber = "224620018830";
  
  const text = `*Nouveau Message - OC Business Center* ✉️\n\n*Expéditeur:* ${name}\n*Contact:* ${contact}\n*Sujet:* ${subject}\n\n*Message:* \n${messageBody}`;
  
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(whatsappURL, '_blank');
  
  form.reset();
  alert("Merci ! Votre message a été préparé pour WhatsApp.");
}

// CLOSE MODAL ON OUTSIDE CLICK
document.addEventListener('click', (e) => {
  const orderModal = document.getElementById('orderModal');
  const allProductsModal = document.getElementById('allProductsModal');
  
  if (e.target === orderModal) {
    closeOrderModal();
  }
  if (e.target === allProductsModal) {
    closeAllProductsModal();
  }
});

// CLOSE MODAL ON ESC KEY
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOrderModal();
    closeAllProductsModal();
  }
});
