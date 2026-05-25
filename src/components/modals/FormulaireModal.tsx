import { useState } from 'react';

type Categorie = 'vehicules' | 'telephones' | 'bureautique' | 'immobilier' | 'specifique';

interface FormulaireModalProps {
    categorie: Categorie;
    prefill?: string;
    onFermer: () => void;
}

interface ChampClient {
    nom: string;
    telephone: string;
    email: string;
}

const WA_NUMBER = '221776729740';

const TITRES: Record<Categorie, string> = {
    vehicules:   'Véhicules',
    telephones:  'Téléphones',
    bureautique: 'Matériel Bureautique',
    immobilier:  'Immobilier',
    specifique:  'Commande Express',
};

const construireMessage = (
    categorie: Categorie,
    champs: Record<string, string>,
    client: ChampClient
): string => {
    const titre = TITRES[categorie];
    let details = '';
    Object.entries(champs)
        .filter(([, v]) => v.trim() !== '')
        .forEach(([k, v]) => { details += '- ' + k + ' : ' + v + '\n'; });

    return (
        '✨ *NOUVELLE DEMANDE — L\'AS LA SOLUTION* ✨\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '_Conciergerie Premium · Dakar · Sénégal_\n\n' +
        '👤 *Client :* ' + client.nom + '\n' +
        '📞 *Contact :* ' + client.telephone + '\n' +
        '📧 *Email :* ' + (client.email.trim() || 'Non renseigné') + '\n' +
        '🏷️ *Catégorie :* ' + titre + '\n\n' +
        '🔍 *Détails de la demande :*\n' +
        details +
        '━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '⏱️ *Prise en charge sous 24h maximum*\n' +
        '🤝 _Notre équipe vous rappelle pour les détails._'
    );
};

const soumettre = (
    categorie: Categorie,
    champs: Record<string, string>,
    client: ChampClient
) => {
    const msg = construireMessage(categorie, champs, client);
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
};

const InputCls = 'w-full bg-[#0d0d0d] border border-white/[0.08] focus:border-ls-gold/60 text-white rounded-xl px-3 py-2.5 text-[13px] outline-none placeholder:text-gray-600 transition-colors';
const LabelCls = 'block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1';
const BtnCls   = 'w-full flex items-center justify-center gap-2 bg-ls-gold hover:bg-ls-gold-light text-ls-black font-black py-3.5 rounded-xl text-[12px] uppercase tracking-widest transition-all duration-200 active:scale-[0.98] mt-2';

const BlocClient = ({
    client,
    onChange,
}: {
    client: ChampClient;
    onChange: (k: keyof ChampClient, v: string) => void;
}) => (
    <div className="space-y-3 pt-4 border-t border-white/[0.06]">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ls-gold">
            ✦ Vos coordonnées
        </p>
        <div>
            <label className={LabelCls}>Prénom &amp; Nom *</label>
            <input
                type="text"
                value={client.nom}
                onChange={(e) => onChange('nom', e.target.value)}
                placeholder="Ex : Moussa Diallo"
                className={InputCls}
            />
        </div>
        <div>
            <label className={LabelCls}>Numéro WhatsApp *</label>
            <input
                type="tel"
                value={client.telephone}
                onChange={(e) => onChange('telephone', e.target.value)}
                placeholder="Ex : +221 77 000 00 00"
                className={InputCls}
            />
        </div>
        <div>
            <label className={LabelCls}>Adresse Email (facultatif)</label>
            <input
                type="email"
                value={client.email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="Ex : moussa@email.com"
                className={InputCls}
            />
        </div>

        {/* ── Texte de confiance ── */}
        <p className="text-[11px] text-gray-500 leading-relaxed italic border-l-2 border-ls-gold/30 pl-3 mt-1">
            "Déléguez votre précieux temps à notre équipe professionnelle sur toutes vos commandes.
            Avec La Solution (L'AS), vos commandes restent prioritaires."
        </p>
    </div>
);

const FormulaireVehicules = ({
    onSoumettre,
}: {
    onSoumettre: (c: Record<string, string>) => void;
}) => {
    const [offre, setOffre]         = useState('');
    const [marque, setMarque]       = useState('');
    const [modele, setModele]       = useState('');
    const [carburant, setCarburant] = useState('');
    const [options, setOptions]     = useState('');
    const [autres, setAutres]       = useState('');

    return (
        <div className="space-y-3">
            <div>
                <label className={LabelCls}>Type d'offre *</label>
                <select value={offre} onChange={(e) => setOffre(e.target.value)} className={InputCls}>
                    <option value="">Sélectionner...</option>
                    <option>Achat</option>
                    <option>Location</option>
                </select>
            </div>
            <div>
                <label className={LabelCls}>Marque du véhicule *</label>
                <input type="text" value={marque} onChange={(e) => setMarque(e.target.value)} placeholder="Ex : Toyota, BMW, Mercedes..." className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Modèle précis *</label>
                <input type="text" value={modele} onChange={(e) => setModele(e.target.value)} placeholder="Ex : RAV4, Série 3, GLE..." className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Carburant</label>
                <select value={carburant} onChange={(e) => setCarburant(e.target.value)} className={InputCls}>
                    <option value="">Sélectionner...</option>
                    <option>Essence</option>
                    <option>Diesel</option>
                    <option>Électrique</option>
                    <option>Hybride</option>
                </select>
            </div>
            <div>
                <label className={LabelCls}>Options majeures</label>
                <textarea value={options} onChange={(e) => setOptions(e.target.value)} rows={2} placeholder="Ex : Toit ouvrant, Cuir, GPS..." className={InputCls + ' resize-none'} />
            </div>
            <div>
                <label className={LabelCls}>Autres caractéristiques</label>
                <textarea value={autres} onChange={(e) => setAutres(e.target.value)} rows={2} placeholder="Toute précision supplémentaire..." className={InputCls + ' resize-none'} />
            </div>
            <button
                onClick={() => onSoumettre({
                    'Type d\'offre': offre,
                    'Marque': marque,
                    'Modèle': modele,
                    'Carburant': carburant,
                    'Options majeures': options,
                    'Autres caractéristiques': autres,
                })}
                className={BtnCls}
            >
                Valider ma demande — WhatsApp
            </button>
        </div>
    );
};

const FormulairePhones = ({
    onSoumettre,
}: {
    onSoumettre: (c: Record<string, string>) => void;
}) => {
    const [marque, setMarque]     = useState('');
    const [modele, setModele]     = useState('');
    const [stockage, setStockage] = useState('');
    const [couleur, setCouleur]   = useState('');

    return (
        <div className="space-y-3">
            <div>
                <label className={LabelCls}>Marque *</label>
                <input type="text" value={marque} onChange={(e) => setMarque(e.target.value)} placeholder="Ex : Apple, Samsung, Xiaomi..." className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Modèle *</label>
                <input type="text" value={modele} onChange={(e) => setModele(e.target.value)} placeholder="Ex : iPhone 15 Pro, S24 Ultra..." className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Capacité de stockage</label>
                <select value={stockage} onChange={(e) => setStockage(e.target.value)} className={InputCls}>
                    <option value="">Sélectionner...</option>
                    <option>128 Go</option>
                    <option>256 Go</option>
                    <option>512 Go</option>
                    <option>1 To</option>
                </select>
            </div>
            <div>
                <label className={LabelCls}>Couleur souhaitée (facultatif)</label>
                <input type="text" value={couleur} onChange={(e) => setCouleur(e.target.value)} placeholder="Ex : Noir, Blanc, Titane..." className={InputCls} />
            </div>
            <button
                onClick={() => onSoumettre({
                    'Marque': marque,
                    'Modèle': modele,
                    'Capacité de stockage': stockage,
                    'Couleur souhaitée': couleur,
                })}
                className={BtnCls}
            >
                Valider ma demande — WhatsApp
            </button>
        </div>
    );
};

const FormulaireBureautique = ({
    onSoumettre,
}: {
    onSoumettre: (c: Record<string, string>) => void;
}) => {
    const [type, setType]     = useState('');
    const [marque, setMarque] = useState('');
    const [modele, setModele] = useState('');
    const [specs, setSpecs]   = useState('');

    return (
        <div className="space-y-3">
            <div>
                <label className={LabelCls}>Type de matériel *</label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Ex : Ordinateur portable, Imprimante..." className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Marque</label>
                <input type="text" value={marque} onChange={(e) => setMarque(e.target.value)} placeholder="Ex : Apple, HP, Dell, Lenovo..." className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Modèle / Référence</label>
                <input type="text" value={modele} onChange={(e) => setModele(e.target.value)} placeholder="Ex : MacBook Pro M3, EliteBook 840..." className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Spécifications techniques</label>
                <textarea value={specs} onChange={(e) => setSpecs(e.target.value)} rows={3} placeholder="RAM, stockage, processeur, écran..." className={InputCls + ' resize-none'} />
            </div>
            <button
                onClick={() => onSoumettre({
                    'Type de matériel': type,
                    'Marque': marque,
                    'Modèle / Référence': modele,
                    'Spécifications techniques': specs,
                })}
                className={BtnCls}
            >
                Valider ma demande — WhatsApp
            </button>
        </div>
    );
};

const FormulaireImmobilier = ({
    onSoumettre,
}: {
    onSoumettre: (c: Record<string, string>) => void;
}) => {
    const [typeProjet, setTypeProjet]     = useState('');
    const [localisation, setLocalisation] = useState('');
    const [budget, setBudget]             = useState('');
    const [caract, setCaract]             = useState('');

    return (
        <div className="space-y-3">
            <div>
                <label className={LabelCls}>Type de projet *</label>
                <select value={typeProjet} onChange={(e) => setTypeProjet(e.target.value)} className={InputCls}>
                    <option value="">Sélectionner...</option>
                    <option>Achat</option>
                    <option>Location</option>
                    <option>Auberge</option>
                    <option>Hôtel 3★</option>
                    <option>Hôtel 4★</option>
                    <option>Hôtel 5★</option>
                </select>
            </div>
            <div>
                <label className={LabelCls}>Localisation / Quartier ciblé *</label>
                <input type="text" value={localisation} onChange={(e) => setLocalisation(e.target.value)} placeholder="Ex : Almadies, Plateau, Mermoz..." className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Budget prévisionnel (facultatif)</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Ex : 500000 FCFA" className={InputCls} />
            </div>
            <div>
                <label className={LabelCls}>Caractéristiques spécifiques</label>
                <textarea value={caract} onChange={(e) => setCaract(e.target.value)} rows={3} placeholder="Nbre de chambres, piscine, parking..." className={InputCls + ' resize-none'} />
            </div>
            <button
                onClick={() => onSoumettre({
                    'Type de projet': typeProjet,
                    'Localisation / Quartier': localisation,
                    'Budget prévisionnel': budget,
                    'Caractéristiques spécifiques': caract,
                })}
                className={BtnCls}
            >
                Valider ma demande — WhatsApp
            </button>
        </div>
    );
};

const FormulaireSpecifique = ({
    prefill,
    onSoumettre,
}: {
    prefill?: string;
    onSoumettre: (c: Record<string, string>) => void;
}) => {
    const [description, setDescription] = useState(prefill || '');

    return (
        <div className="space-y-3">
            <div>
                <label className={LabelCls}>Description détaillée *</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Décrivez précisément le produit ou service que vous recherchez (vêtements, électroménager, matériel industriel...)"
                    className={InputCls + ' resize-none'}
                />
            </div>
            <button
                onClick={() => onSoumettre({
                    'Description du produit / service': description,
                })}
                className={BtnCls}
            >
                Valider ma demande — WhatsApp
            </button>
        </div>
    );
};

export const FormulaireModal = ({
    categorie,
    prefill,
    onFermer,
}: FormulaireModalProps) => {
    const [client, setClient] = useState<ChampClient>({ nom: '', telephone: '', email: '' });
    const [erreur, setErreur] = useState('');

    const majClient = (k: keyof ChampClient, v: string) =>
        setClient((prev) => ({ ...prev, [k]: v }));

    const validerEtSoumettre = (champs: Record<string, string>) => {
        if (!client.nom.trim() || !client.telephone.trim()) {
            setErreur('Veuillez renseigner votre nom et numéro de téléphone.');
            return;
        }
        setErreur('');
        soumettre(categorie, champs, client);
        onFermer();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
            onClick={onFermer}
        >
            <div
                className="w-full max-w-md bg-[#0a0a0a] border border-white/[0.08] rounded-t-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-[#0a0a0a] px-5 pt-5 pb-3 border-b border-white/[0.06] flex items-center justify-between z-10">
                    <div>
                        <p className="text-[10px] text-ls-gold uppercase tracking-[0.15em] font-bold">
                            ✦ Formulaire de demande
                        </p>
                        <p className="text-[15px] font-black text-white mt-0.5">
                            {TITRES[categorie]}
                        </p>
                    </div>
                    <button
                        onClick={onFermer}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-5 py-4 space-y-4">
                    {categorie === 'vehicules'   && <FormulaireVehicules   onSoumettre={validerEtSoumettre} />}
                    {categorie === 'telephones'  && <FormulairePhones      onSoumettre={validerEtSoumettre} />}
                    {categorie === 'bureautique' && <FormulaireBureautique onSoumettre={validerEtSoumettre} />}
                    {categorie === 'immobilier'  && <FormulaireImmobilier  onSoumettre={validerEtSoumettre} />}
                    {categorie === 'specifique'  && (
                        <FormulaireSpecifique prefill={prefill} onSoumettre={validerEtSoumettre} />
                    )}

                    <BlocClient client={client} onChange={majClient} />

                    {erreur && (
                        <p className="text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">
                            {erreur}
                        </p>
                    )}
                </div>

                <div className="h-6" />
            </div>
        </div>
    );
};
