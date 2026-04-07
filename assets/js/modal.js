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

// SUBMIT ORDER
function submitOrder(event) {
  event.preventDefault();
  
  const form = document.getElementById('orderForm');
  const name = form.querySelector('input[name="name"]').value;
  const phone = form.querySelector('input[name="phone"]').value;
  const city = form.querySelector('select[name="city"]').value;
  const quartier = form.querySelector('input[name="quartier"]').value || "Non spécifié";
  const quantity = parseInt(form.querySelector('input[name="quantity"]').value) || 1;
  const product = document.getElementById('modalProductName').textContent;
  
  let discountPercent = 0;
  if (quantity === 2) discountPercent = 15;
  else if (quantity === 3) discountPercent = 20;
  else if (quantity >= 4) discountPercent = 25;
  
  const subtotal = currentProductPrice * quantity;
  const discountAmount = Math.floor(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;
  
  let priceText = `*Prix Unitaire:* ${formatPrice(currentProductPrice)} GNF\n`;
  if (discountPercent > 0) {
    priceText += `*Sous-total:* ~${formatPrice(subtotal)} GNF~\n`;
    priceText += `*Réduction (-${discountPercent}%):* -${formatPrice(discountAmount)} GNF\n`;
  }
  priceText += `*Total Fixé:* ${formatPrice(finalTotal)} GNF`;

  const message = `*Nouvelle Commande OC Business Center* 🛒\n\n*Produit:* ${product}\n*Quantité:* ${quantity}\n${priceText}\n\n*Informations Client:*\n*Nom:* ${name}\n*Téléphone:* ${phone}\n*Ville:* ${city}\n*Quartier:* ${quartier}`;
  
  // Format WhatsApp number
  const whatsappNumber = "224620018830"; // Using the previous manager number
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
  
  closeOrderModal();
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
