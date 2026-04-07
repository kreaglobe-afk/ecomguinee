const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Hero Text Regex
// Look for any paragraph after the H1 that contains "OC Business Center" and "solutions automobiles"
const heroRegex = /<p[^>]*class="[^"]*text-base[^"]*"[^>]*>[\s\S]*?OC Business Center[\s\S]*?<\/p>/;
const newHeroText = `<p class="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
          Expertise Automobile, Immobilier, Logistique et Formations... OC Business Center est votre partenaire stratégique en Guinée. Si l'automobile est notre cœur de métier, nous vous accompagnons également dans vos projets fonciers, vos transports et votre développement par la formation.
        </p>`;
html = html.replace(heroRegex, newHeroText);

// 2. Footer Description Regex
const footerDescRegex = /<p[^>]*class="[^"]*text-\[var\(--gray-text-color\)\][^"]*"[^>]*>[\s\S]*?Votre partenaire de confiance[\s\S]*?automobiles[\s\S]*?<\/p>/;
const newFooterText = `<p class="text-[var(--gray-text-color)] mb-6 leading-relaxed">
          Votre partenaire de confiance pour tous vos besoins en Automobile, Immobilier, Logistique et Formations en Guinée. Excellence et intégrité au service de vos ambitions.
        </p>`;
html = html.replace(footerDescRegex, newFooterText);

// 3. Footer Email Regex
const emailRegex = /contact@smartservicesgn\.com/g;
html = html.replace(emailRegex, 'contact@ocbusinesscenter.com');

// 4. Ensure All Numbers
html = html.replace(/\+224 XXX XXX XXX/g, '+224 620 01 88 30');
html = html.replace(/224YOUR_NUMBER/g, '224620018830');

fs.writeFileSync('index.html', html, 'utf-8');
console.log('Final text fixes applied via regex.');
