// ============================================================
//  OC BUSINESS CENTER - Google Apps Script
//  À coller dans : script.google.com
//  Ce script reçoit les commandes du site et les enregistre
//  automatiquement dans Google Sheets
// ============================================================

function doPost(e) {
  try {
    // Récupérer les données envoyées par le site
    var data = JSON.parse(e.postData.contents);

    // Ouvrir le Google Sheet actif
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ajouter les en-têtes si c'est la première fois (ligne 1 vide)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "📅 Date & Heure",
        "👤 Nom Client",
        "📞 Téléphone",
        "🏙️ Ville",
        "🏠 Quartier",
        "📦 Produit",
        "🔢 Quantité",
        "💰 Prix Unitaire (GNF)",
        "💳 Prix Total (GNF)",
        "📋 Statut"
      ]);

      // Mettre les en-têtes en gras + couleur
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setBackground("#d84315");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
    }

    // Formater la date et l'heure
    var now = new Date();
    var dateFormatted = Utilities.formatDate(now, "Africa/Conakry", "dd/MM/yyyy HH:mm:ss");

    // Calculer le prix total
    var quantity = parseInt(data.quantity) || 1;
    var unitPrice = parseInt(data.price) || 0;
    var totalPrice = quantity * unitPrice;

    // Ajouter la nouvelle ligne de commande
    var newRow = [
      dateFormatted,
      data.name || "",
      data.phone || "",
      data.city || "",
      data.quartier || "",
      data.product || "",
      quantity,
      unitPrice.toLocaleString("fr-FR") + " GNF",
      totalPrice.toLocaleString("fr-FR") + " GNF",
      "🟡 Nouveau"
    ];

    sheet.appendRow(newRow);

    // Mettre en couleur la nouvelle ligne
    var lastRow = sheet.getLastRow();
    var rowRange = sheet.getRange(lastRow, 1, 1, 10);

    // Alternance de couleurs pour lisibilité
    if (lastRow % 2 === 0) {
      rowRange.setBackground("#ffeee8");
    } else {
      rowRange.setBackground("#ffffff");
    }

    // Mettre le statut "Nouveau" en orange
    sheet.getRange(lastRow, 10).setFontColor("#e65100").setFontWeight("bold");

    // Auto-ajuster la largeur des colonnes
    sheet.autoResizeColumns(1, 10);

    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Commande enregistrée avec succès !" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // En cas d'erreur, retourner le détail
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction de test (pour vérifier que le script fonctionne)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "✅ Script OC Business Center actif et prêt !" }))
    .setMimeType(ContentService.MimeType.JSON);
}
