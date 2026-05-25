import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { InstallPopup } from './components/pwa/InstallPopup';
import { FormulaireModal } from './components/modals/FormulaireModal';

type Categorie = 'vehicules' | 'telephones' | 'bureautique' | 'immobilier' | 'specifique';

interface ModalState {
    ouverte: boolean;
    categorie: Categorie;
    prefill: string;
}

const CATEGORIES: { id: Categorie; label: string; icone: string; desc: string; gold?: boolean }[] = [
    { id: 'vehicules',   label: 'Véhicules',                              icone: '🚗', desc: 'Auto, moto, utilitaires' },
    { id: 'telephones',  label: 'Téléphones',                             icone: '📱', desc: 'Smartphones & tech mobile' },
    { id: 'bureautique', label: 'Matériel Bureautique',                   icone: '💻', desc: 'Informatique & équipements' },
    { id: 'immobilier',  label: 'Immobilier',                             icone: '🏠', desc: 'Logement & séjours' },
    { id: 'specifique',  label: 'COMMANDE EXPRESS',                       icone: '⚡', desc: 'Autre produit ou service', gold: true },
];

export default function App() {
    const [modal, setModal] = useState<ModalState>({
        ouverte: false,
        categorie: 'specifique',
        prefill: '',
    });

    const ouvrirModal = (categorie: Categorie, prefill = '') =>
        setModal({ ouverte: true, categorie, prefill });

    const fermerModal = () =>
        setModal((prev) => ({ ...prev, ouverte: false }));

    const onRechercheValidee = (texte: string) =>
        ouvrirModal('specifique', texte);

    return (
        <div className="min-h-screen bg-ls-black text-ls-white flex flex-col font-sans">

            <Header onRechercheValidee={onRechercheValidee} />

            <main className="flex-grow px-4 pt-7 pb-16 max-w-md mx-auto w-full space-y-8">

                {/* ── TITRE ── */}
                <div className="space-y-2 animate-fade-in">
                    <h1 className="text-[1.75rem] font-black tracking-tight leading-[1.2]">
                        L'AS, la plateforme qui<br />
                        <span className="text-ls-gold">simplifie vos achats</span><br />
                        et acquisitions.
                    </h1>
                </div>

                {/* ── CATÉGORIES ── */}
                <div className="space-y-2.5 animate-fade-in">
                    {CATEGORIES.map((cat, idx) => (
                        <button
                            key={cat.id}
                            onClick={() => ouvrirModal(cat.id)}
                            className={
                                cat.gold
                                    ? 'w-full flex items-center justify-between bg-ls-gold hover:bg-ls-gold-light rounded-2xl px-4 py-4 transition-all duration-200 group active:scale-[0.99] animate-fade-in'
                                    : 'w-full flex items-center justify-between bg-[#0f0f0f] border border-white/[0.07] hover:border-ls-gold/40 rounded-2xl px-4 py-4 transition-all duration-200 group active:scale-[0.99] animate-fade-in'
                            }
                            style={{ animationDelay: idx * 60 + 'ms' }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={
                                    cat.gold
                                        ? 'w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0'
                                        : 'w-10 h-10 rounded-xl bg-ls-gold/10 border border-ls-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ls-gold/20 transition-colors'
                                }>
                                    <span className={cat.gold ? 'text-ls-black font-black text-base' : 'text-xl'}>
                                        {cat.icone}
                                    </span>
                                </div>
                                <div className="text-left">
                                    <p className={cat.gold ? 'text-[14px] font-black text-ls-black' : 'text-[14px] font-bold text-white'}>
                                        {cat.label}
                                    </p>
                                    <p className={cat.gold ? 'text-[11px] text-black/60 mt-0.5' : 'text-[11px] text-gray-600 mt-0.5'}>
                                        {cat.desc}
                                    </p>
                                </div>
                            </div>
                            <svg
                                className={cat.gold ? 'w-4 h-4 text-ls-black flex-shrink-0' : 'w-4 h-4 text-gray-600 group-hover:text-ls-gold transition-colors flex-shrink-0'}
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    ))}
                </div>

                {/* ── BLOC TEXTE ── */}
                <div className="space-y-4 pt-2 animate-fade-in border-t border-white/[0.05]">
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                        Un clic suffit pour que votre demande soit prise en compte dans les meilleurs
                        délais possibles <strong className="text-white">(Max 24h)</strong>.
                        Formulez une demande et la mise à disposition est effectuée.
                    </p>
                    <p className="text-[13px] text-gray-500 leading-relaxed italic border-l-2 border-ls-gold/40 pl-4">
                        "Déléguez votre précieux temps à notre équipe professionnelle sur toutes vos commandes.
                        Avec La Solution (L'AS), vos commandes restent prioritaires."
                    </p>
                </div>

            </main>

            <Footer />
            <InstallPopup />

            {modal.ouverte && (
                <FormulaireModal
                    categorie={modal.categorie}
                    prefill={modal.prefill}
                    onFermer={fermerModal}
                />
            )}
        </div>
    );
}
