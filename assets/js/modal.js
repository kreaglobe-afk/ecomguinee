// MODAL FUNCTIONS

// ORDER MODAL
function openOrderModal(productName, productDesc) {
  document.getElementById('modalProductName').textContent = productName;
  document.getElementById('modalProductDesc').textContent = productDesc;
  document.getElementById('orderModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.add('hidden');
  document.getElementById('orderForm').reset();
  document.getElementById('quantityInput').value = '1';
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
}

function decreaseQty() {
  const input = document.getElementById('quantityInput');
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

// SUBMIT ORDER
function submitOrder(event) {
  event.preventDefault();
  
  const form = document.getElementById('orderForm');
  const name = form.querySelector('input[name="name"]').value;
  const phone = form.querySelector('input[name="phone"]').value;
  const city = form.querySelector('select[name="city"]').value;
  const quantity = form.querySelector('input[name="quantity"]').value;
  const product = document.getElementById('modalProductName').textContent;
  
  const message = `*Nouvelle Commande* 🛒\n\n*Produit:* ${product}\n*Quantité:* ${quantity}\n\n*Client:*\n*Nom:* ${name}\n*Téléphone:* ${phone}\n*Ville:* ${city}`;
  
  const whatsappURL = `https://wa.me/224622000000?text=${encodeURIComponent(message)}`;
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
