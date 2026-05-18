import React, { useState } from 'react';
import { catalogueData, NicheSection, BrandData, ProductBrief } from '../../data/catalogueData';

interface CatalogueViewProps {
    onSelectProduct: (product: { niche: string; brand: string; model: string }) => void;
    onGoToCustomForm: () => void;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({ onSelectProduct, onGoToCustomForm }) => {
    const [selectedNiche, setSelectedNiche] = useState<NicheSection | null>(null);
    const [selectedSubSectionName, setSelectedSubSectionName] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);

    // Réinitialiser les filtres pour reculer d'un niveau
    const handleBack = () => {
        if (selectedBrand) {
            setSelectedBrand(null);
        } else if (selectedSubSectionName) {
            setSelectedSubSectionName(null);
        } else if (selectedNiche) {
            setSelectedNiche(null);
        }
    };

    // Récupérer les marques à afficher selon que la niche utilise des sous-sections ou non
    const currentBrands = selectedNiche
        ? selectedNiche.subSections
            ? selectedNiche.subSections.find(s => s.name === selectedSubSectionName)?.brands || []
            : selectedNiche.brands || []
        : [];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Fil d'ariane / Bouton Retour Épuré */}
            {selectedNiche && (
                <button onClick={handleBack} className="text-xs text-ls-gold flex items-center space-x-1 font-semibold uppercase tracking-wider">
                    <span>←</span> <span>Retour {selectedBrand ? 'aux marques' : selectedSubSectionName ? 'aux types' : 'aux catégories'}</span>
                </button>
            )}

            {/* NIVEAU 1 : Choix de la Niche Principale */}
            {!selectedNiche && (
                <div className="space-y-4">
                    <div className="text-center py-2">
                        <h2 className="text-xl font-bold tracking-tight">Que recherchez-vous ?</h2>
                        <p className="text-xs text-gray-400 mt-1">Explorez nos catégories majeures de sourcing</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {catalogueData.map((niche) => (
                            <button
                                key={niche.id}
                                onClick={() => {
                                    setSelectedNiche(niche);
                                    if (niche.subSections && niche.subSections.length > 0) {
                                        setSelectedSubSectionName(niche.subSections[0].name);
                                    }
                                }}
                                className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-950 to-gray-900 border border-gray-800 rounded-xl hover:border-ls-gold/40 transition-all text-left group"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl bg-black p-2 rounded-lg border border-gray-800">{niche.icon}</span>
                                    <span className="font-bold tracking-wide text-sm">{niche.title}</span>
                                </div>
                                <span className="text-ls-gold group-hover:translate-x-1 transition-transform text-xs">→</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* NIVEAU 2A : Si la Niche a des Sous-Sections (ex: Véhicules -> Voiture, Moto...) */}
            {selectedNiche && selectedNiche.subSections && !selectedBrand && (
                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                    {selectedNiche.subSections.map((sub) => (
                        <button
                            key={sub.name}
                            onClick={() => {
                                setSelectedSubSectionName(sub.name);
                                setSelectedBrand(null);
                            }}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedSubSectionName === sub.name
                                    ? 'bg-ls-gold text-ls-black border-ls-gold'
                                    : 'bg-transparent text-gray-400 border-gray-800'
                                }`}
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>
            )}

            {/* NIVEAU 2B : Affichage des Marques disponibles */}
            {selectedNiche && !selectedBrand && (
                <div className="space-y-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Marques Disponibles :</p>
                    <div className="grid grid-cols-2 gap-2">
                        {currentBrands.map((b) => (
                            <button
                                key={b.brandName}
                                onClick={() => setSelectedBrand(b)}
                                className="p-4 bg-gray-950 border border-gray-900 rounded-lg text-center hover:border-ls-gold/30 transition-all font-medium text-xs text-ls-white"
                            >
                                {b.brandName}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* NIVEAU 3 : Fiches Briefs des Modèles */}
            {selectedBrand && (
                <div className="space-y-4">
                    <div className="border-b border-gray-900 pb-2">
                        <h3 className="text-lg font-black tracking-tight text-ls-gold">
                            {selectedBrand.brandName} <span className="text-ls-white text-sm font-normal">({selectedSubSectionName || selectedNiche?.title})</span>
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {selectedBrand.models.map((product) => (
                            <div key={product.id} className="p-4 bg-gradient-to-b from-gray-950 to-black border border-gray-900 rounded-xl space-y-4 shadow-xl">
                                <div>
                                    <h4 className="font-extrabold text-sm tracking-wide text-ls-white">{product.model}</h4>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{product.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {product.specs.map((spec, idx) => (
                                        <span key={idx} className="bg-gray-900 text-gray-400 border border-gray-800 px-2 py-0.5 rounded text-[10px]">
                                            {spec}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => onSelectProduct({
                                        niche: selectedNiche?.title || '',
                                        brand: selectedBrand.brandName,
                                        model: product.model
                                    })}
                                    className="w-full bg-transparent hover:bg-ls-gold text-ls-gold hover:text-ls-black border border-ls-gold/40 hover:border-ls-gold py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider"
                                >
                                    Je veux ce modèle
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SECTION PIED DE PAGE : Redirection Produit introuvable */}
            <div className="pt-6 border-t border-gray-900 text-center space-y-3">
                <p className="text-xs text-gray-400">Vous ne trouvez pas le modèle exact dans notre catalogue ?</p>
                <button
                    onClick={onGoToCustomForm}
                    className="inline-block text-xs font-bold text-ls-gold hover:underline uppercase tracking-wider"
                >
                    Formuler une demande personnalisée →
                </button>
            </div>
        </div>
    );
};