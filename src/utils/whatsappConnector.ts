interface WhatsAppPayload {
    type: 'catalogue' | 'custom';
    niche: string;
    brand?: string;
    model?: string;
    productName?: string;
    spec1?: string;
    spec2?: string;
    budget?: string;
    location?: string;
    imageCount?: number;
}

export const sendToWhatsApp = (data: WhatsAppPayload) => {
    // Ton numéro de téléphone professionnel LS
    const phoneNumber = "221776729740";

    let message = `*✨ NOUVELLE DEMANDE DE SOURCING - LS ✨*\n`;
    message += `_Avec La_Solution, vos commandes restent prioritaires_\n\n`;

    if (data.type === 'catalogue') {
        message += `*📥 Type :* Choix depuis le catalogue\n`;
        message += `*📂 Catégorie :* ${data.niche}\n`;
        message += `*🏷️ Marque :* ${data.brand}\n`;
        message += `*📦 Modèle :* ${data.model}\n`;
    } else {
        message += `*📝 Type :* Demande personnalisée express\n`;
        message += `*📂 Catégorie :* ${data.niche}\n`;
        message += `*📦 Produit :* ${data.productName}\n`;

        if (data.spec1) message += `*⚙️ Spécif. 1 :* ${data.spec1}\n`;
        if (data.spec2) message += `*⚙️ Spécif. 2 :* ${data.spec2}\n`;
    }

    if (data.budget) message += `*💰 Budget estimé :* ${data.budget} FCFA\n`;
    if (data.location) message += `*📍 Zone de livraison :* ${data.location}\n`;

    if (data.imageCount && data.imageCount > 0) {
        message += `\n*📸 [INFO] :* Le client a sélectionné *${data.imageCount} photo(s)* de sa galerie à vous envoyer.\n`;
    }

    message += `\n⏱️ _Objectif de prise en charge : Max 48h_`;

    // Encodage propre du texte pour l'URL
    const encodedText = encodeURIComponent(message);

    // Ouverture instantanée du tunnel WhatsApp client
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
};