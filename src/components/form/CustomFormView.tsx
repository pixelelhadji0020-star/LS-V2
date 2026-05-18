import React, { useState, useEffect } from 'react';

interface CustomFormViewProps {
    onSubmitDemand: (formData: any) => void;
    initialProduct?: { niche: string; brand: string; model: string } | null;
}

// Données d'autocomplétion prédictive simplifiées pour la saisie utilisateur
const suggestionsData: Record<string, string[]> = {
    'Véhicules': ['Toyota RAV4', 'Toyota Prado', 'Mercedes Classe C', 'Yamaha TMAX 560', 'Ford Focus', 'BMW Série 3', 'Hyundai Tucson'],
    'Téléphonie & Accessoires': ['iPhone 15 Pro Max', 'iPhone 14 Pro', 'Samsung Galaxy S24 Ultra', 'Samsung Galaxy A54', 'AirPods Pro 2'],
    'Matériel Bureautique': ['MacBook Pro M3', 'MacBook Air M2', 'HP EliteBook', 'Dell XPS 13', 'Imprimante HP LaserJet'],
    'Chaussures & Vêtements': ['Nike Air Force 1', 'Adidas Stan Smith', 'Jordan 4 Retro', 'Costume Slim Fit', 'Sac de luxe'],
    'Électroménagers': ['Réfrigérateur Samsung', 'Micro-ondes LG', 'Machine à laver Whirlpool', 'Climatiseur Split Sharp']
};

export const CustomFormView: React.FC<CustomFormViewProps> = ({ onSubmitDemand, initialProduct }) => {
    // États du formulaire
    const [niche, setNiche] = useState(initialProduct?.niche || 'Véhicules');
    const [productSearch, setProductSearch] = useState(
        initialProduct ? `${initialProduct.brand} ${initialProduct.model}` : ''
    );
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Champs additionnels conditionnels
    const [spec1, setSpec1] = useState(''); // ex: Carburant ou RAM
    const [spec2, setSpec2] = useState(''); // ex: Boîte ou Stockage
    const [budget, setBudget] = useState('');
    const [clientLocation, setClientLocation] = useState('Dakar Plateau');

    // Gestion de l'upload de photos (Stockage temporaire en Base64 pour l'aperçu)
    const [images, setImages] = useState<string[]>([]);

    // Logique d'autocomplétion
    useEffect(() => {
        if (productSearch.trim() === '' || !showSuggestions) {
            setSuggestions([]);
            return;
        }

        const currentNicheSuggestions = suggestionsData[niche] || [];
        const filtered = currentNicheSuggestions.filter(item =>
            item.toLowerCase().includes(productSearch.toLowerCase())
        );
        setSuggestions(filtered);
    }, [productSearch, niche, showSuggestions]);

    // Réinitialiser les caractéristiques si la catégorie change
    useEffect(() => {
        if (!initialProduct) {
            setSpec1('');
            setSpec2('');
        }
    }, [niche, initialProduct]);

    // Gestion du chargement des images depuis la galerie
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).slice(0, 3 - images.length); // Max 3 photos

            filesArray.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        setImages(prev => [...prev, reader.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!productSearch.trim()) return;

        onSubmitDemand({
            niche,
            productName: productSearch,
            spec1,
            spec2,
            budget,
            location: clientLocation,
            imageCount: images.length
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-left animate-fade-in">
            <div className="text-center py-2 border-b border-gray-900">
                <h2 className="text-xl font-bold tracking-tight text-ls-gold">Votre Demande Sourcing</h2>
                <p className="text-xs text-gray-400 mt-1">Laissez notre équipe professionnelle chercher pour vous</p>
            </div>

            {/* 1. Sélection de la Niche */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Catégorie du produit</label>
                <select
                    value={niche}
                    onChange={(e) => { setNiche(e.target.value); setProductSearch(''); }}
                    className="w-full bg-gray-950 border border-gray-800 text-ls-white p-3 rounded-xl text-sm focus:border-ls-gold focus:outline-none transition-all"
                >
                    {Object.keys(suggestionsData).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* 2. Recherche avec Autocomplétion Prédictive */}
            <div className="space-y-1.5 relative">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Modèle ou Marque Recherché</label>
                <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => { setProductSearch(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Ex: Toyota RAV4, iPhone 15, MacBook..."
                    className="w-full bg-gray-950 border border-gray-800 text-ls-white p-3 rounded-xl text-sm focus:border-ls-gold focus:outline-none transition-all"
                    required
                />

                {/* Liste déroulante des suggestions prédictives */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-gray-950 border border-gray-800 rounded-xl max-h-40 overflow-y-auto z-50 shadow-2xl">
                        {suggestions.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => {
                                    setProductSearch(item);
                                    setShowSuggestions(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs border-b border-gray-900/50 hover:bg-gray-900 text-gray-300 hover:text-ls-gold transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Champs Conditionnels Dynamiques selon la Niche */}
            {niche === 'Véhicules' && (
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Carburant</label>
                        <select value={spec1} onChange={(e) => setSpec1(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-3 rounded-xl text-xs text-white focus:border-ls-gold focus:outline-none">
                            <option value="">Indifférent</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Essence">Essence</option>
                            <option value="Hybride/Électrique">Hybride / Électrique</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Transmission</label>
                        <select value={spec2} onChange={(e) => setSpec2(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-3 rounded-xl text-xs text-white focus:border-ls-gold focus:outline-none">
                            <option value="">Indifférent</option>
                            <option value="Automatique">Automatique</option>
                            <option value="Manuelle">Manuelle</option>
                        </select>
                    </div>
                </div>
            )}

            {niche === 'Matériel Bureautique' && (
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">RAM requise</label>
                        <select value={spec1} onChange={(e) => setSpec1(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-3 rounded-xl text-xs text-white focus:border-ls-gold focus:outline-none">
                            <option value="">Bureautique standard</option>
                            <option value="8 Go RAM">8 Go</option>
                            <option value="16 Go RAM">16 Go</option>
                            <option value="32 Go RAM et +">32 Go ou +</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Type d'usage</label>
                        <input type="text" value={spec2} onChange={(e) => setSpec2(e.target.value)} placeholder="Ex: Dev, Secrétariat, Comptabilité" className="w-full bg-gray-950 border border-gray-800 p-3 rounded-xl text-xs text-white focus:border-ls-gold focus:outline-none" />
                    </div>
                </div>
            )}

            {niche === 'Téléphonie & Accessoires' && (
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Stockage</label>
                        <select value={spec1} onChange={(e) => setSpec1(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-3 rounded-xl text-xs text-white focus:border-ls-gold focus:outline-none">
                            <option value="">Indifférent</option>
                            <option value="128 Go">128 Go</option>
                            <option value="256 Go">256 Go</option>
                            <option value="512 Go ou +">512 Go / 1 To</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">État désiré</label>
                        <select value={spec2} onChange={(e) => setSpec2(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-3 rounded-xl text-xs text-white focus:border-ls-gold focus:outline-none">
                            <option value="Neuf en boîte">Neuf Scellé</option>
                            <option value="Excellent état (Occasion)">Occasion certifiée</option>
                        </select>
                    </div>
                </div>
            )}

            {/* 4. Budget Indicatif & Localisation */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Budget Estimé (FCFA)</label>
                    <input
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Ex: 500 000 ou Dispo"
                        className="w-full bg-gray-950 border border-gray-800 text-ls-white p-3 rounded-xl text-sm focus:border-ls-gold focus:outline-none"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Zone de Livraison</label>
                    <select value={clientLocation} onChange={(e) => setClientLocation(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-3 rounded-xl text-sm text-white focus:border-ls-gold focus:outline-none">
                        <option value="Dakar Plateau">Dakar Plateau</option>
                        <option value="Almadies / Ngor">Almadies / Ngor</option>
                        <option value="Mermoz / Fann">Mermoz / Fann</option>
                        <option value="Guédiawaye / Parcelles">Guédiawaye / Parcelles</option>
                        <option value="Rufisque / Diamniadio">Rufisque / Diamniadio</option>
                        <option value="Autre région (Sénégal)">Autre région</option>
                    </select>
                </div>
            </div>

            {/* 5. Module d'Upload de Photos (Max 3) */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Photos d'illustration ({images.length}/3)</label>

                <div className="flex items-center space-x-2">
                    {images.length < 3 && (
                        <label className="w-16 h-16 flex flex-col items-center justify-center bg-gray-950 border border-dashed border-gray-800 hover:border-ls-gold rounded-xl cursor-pointer transition-all">
                            <span className="text-lg text-gray-500">+</span>
                            <span className="text-[9px] text-gray-500">Galerie</span>
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                        </label>
                    )}

                    {/* Miniatures d'aperçu des photos sélectionnées */}
                    <div className="flex space-x-2 overflow-x-auto">
                        {images.map((img, index) => (
                            <div key={index} className="relative w-16 h-16 rounded-xl border border-gray-800 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-[10px] text-gray-500 italic">Idéal pour une pièce auto exacte, un modèle de meuble ou des vêtements précis.</p>
            </div>

            {/* 6. Bouton de Soumission Direct vers l'Étape 5 */}
            <div className="pt-2">
                <button
                    type="submit"
                    className="w-full bg-ls-gold hover:bg-ls-gold-hover text-ls-black font-extrabold py-4 rounded-xl transition-all uppercase tracking-wider text-xs shadow-lg shadow-ls-gold/5"
                >
                    Soumettre la demande sur WhatsApp
                </button>
            </div>
        </form>
    );
};