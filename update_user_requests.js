const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Enlarge header logo
// The header logo is currently <img src="..." class="h-16 py-1 transition-transform ...">
// and in the <style> block: #global-header a.flex-shrink-0 img { height: 72px !important; ... }
// We want to make it larger, let's say h-24 (96px) or remove the custom style restriction.
html = html.replace(/#global-header a\.flex-shrink-0 img\s*\{\s*height:\s*72px\s*!important;\s*width:\s*auto\s*!important;\s*max-width:\s*250px\s*!important;/g, '#global-header a.flex-shrink-0 img { height: 110px !important; width: auto !important; max-width: 350px !important;');
// Also update the header img tag source to the transparent one
html = html.replace(/<img src="[^"]+" alt="[^"]+" class="h-16/g, '<img src="assets/logo_transparent.png" alt="OC Business Center" class="h-28');

// 2. Shrink footer logo & update source
html = html.replace(/<img src="[^"]+" alt="[^"]+" class="h-28 py-2"/g, '<img src="assets/logo_transparent.png" alt="OC Business Center" class="h-16 py-2"');

// 3. Remove "Support" section in footer
// The support section starts at `<!-- Support -->` and goes up to `<!-- Contact Info -->`
html = html.replace(/<!-- Support -->[\s\S]*?(?=<!-- Contact Info -->)/g, '');

// 4. Update Footer phone number & remove "arriere plan"
// Update link
html = html.replace(/\+224 XXX XXX XXX/g, '+224 620 01 88 30');
html = html.replace(/tel:\+224YOUR_NUMBER/g, 'tel:+224620018830');

// 5. Update WhatsApp links
html = html.replace(/https:\/\/wa\.me\/224YOUR_NUMBER/g, 'https://wa.me/224620018830');
html = html.replace(/https:\/\/wa\.me\/224622000000/g, 'https://wa.me/224620018830');

// 6. Update OGAS Efficient product image
html = html.replace(/src="assets\/logo\.jpg" alt="OGAS Efficient"/g, 'src="assets/ogas.jpg" alt="OGAS Efficient"');

// 7. Update Copywriting on Accueil
const oldCopy = 'Entretien, diagnostic, performance, esthétique… Smart Services GN vous propose des solutions automobiles innovantes et abordables.';
const newCopy = 'Automobile, Immobilier, Logistique et Formations... OC Business Center vous accompagne dans tous vos projets avec des produits et services d\'excellence. Découvrez dès maintenant notre gamme de produits automobiles, le cœur de notre expertise.';
html = html.replace(oldCopy, newCopy);

// To ensure name is fully updated in hero:
html = html.replace(/Smart Services GN vous\s*propose/g, 'OC Business Center vous propose');

// Save the resulting html
fs.writeFileSync('index.html', html, 'utf-8');
console.log('Update script completely executed.');
