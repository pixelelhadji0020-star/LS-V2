import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { InstallPopup } from './components/pwa/InstallPopup';
import { FormulaireModal } from './components/modals/FormulaireModal';
import { LOGO_LAS } from './assets/logo';

type Categorie = 'vehicules' | 'telephones' | 'bureautique' | 'immobilier' | 'specifique';

interface ModalState {
    ouverte: boolean;
    categorie: Categorie;
    prefill: string;
}

const CATEGORIES: { id: Categorie; label: string; icone: string; desc: string; gold?: boolean }[] = [
    { id: 'vehicules',   label: 'Véhicules',           icone: '🚗', desc: 'Auto, moto, utilitaires' },
    { id: 'telephones',  label: 'Téléphones',           icone: '📱', desc: 'Smartphones & tech mobile' },
    { id: 'bureautique', label: 'Matériel Bureautique', icone: '💻', desc: 'Informatique & équipements' },
    { id: 'immobilier',  label: 'Immobilier',           icone: '🏠', desc: 'Logement & séjours' },
    { id: 'specifique',  label: 'COMMANDE EXPRESS',     icone: 'panier', desc: 'Autre produit ou service', gold: true },
];

// Icône panier SVG épuré
const IconPanier = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
    </svg>
);

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

            <main className="flex-grow px-4 pt-0 pb-16 max-w-md mx-auto w-full space-y-8">

                {/* ══════════════════════════════════
                    BLOC HERO — Identité L'AS
                ══════════════════════════════════ */}
                <div className="relative w-full overflow-hidden rounded-b-3xl bg-gradient-to-b from-[#1a1400] to-ls-black pt-10 pb-8 px-6 text-center">

                    {/* Filigrane L/S derrière */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                        <span className="text-[11rem] font-black text-white/[0.03] tracking-[-0.05em] leading-none">
                            L/S
                        </span>
                    </div>

                    {/* Logo centré */}
                    <div className="relative flex justify-center mb-5">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-ls-gold/30 shadow-xl shadow-ls-gold/10">
                            <img
                                src={LOGO_LAS}
                                alt="L'AS — La Solution Express"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Textes */}
                    <div className="relative space-y-2">
                        <p className="text-[10px] text-ls-gold uppercase tracking-[0.2em] font-bold">
                            ✦ Conciergerie Premium · Dakar
                        </p>
                        <h1 className="text-[1.6rem] font-black tracking-tight leading-[1.15] text-white">
                            La Solution Express
                        </h1>
                        <p className="text-[12px] text-gray-400 leading-relaxed max-w-xs mx-auto">
                            Sourcing & acquisition premium au Sénégal.
                            Un clic suffit pour que votre demande soit prise en compte dans les meilleurs
                        délais possibles <strong className="text-white">(Max 24h)</strong>. 
                        </p>

                        {/* Ligne décorative */}
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-ls-gold/40" />
                            <span className="text-ls-gold text-xs">✦</span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-ls-gold/40" />
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════
                    TITRE SECTION
                ══════════════════════════════════ */}
                <div className="space-y-1 px-1 animate-fade-in">
                    <h2 className="text-[1.2rem] font-black tracking-tight leading-[1.2]">
                        L'AS, la plateforme qui{' '}
                        <span className="text-ls-gold">simplifie vos achats</span>{' '}
                        et acquisitions.
                    </h2>
                </div>

                {/* ══════════════════════════════════
                    CATÉGORIES
                ══════════════════════════════════ */}
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
                                    {cat.icone === 'panier' ? (
                                        <IconPanier className={cat.gold ? 'w-5 h-5 text-ls-black' : 'w-5 h-5 text-ls-gold'} />
                                    ) : (
                                        <span className="text-xl">{cat.icone}</span>
                                    )}
                                </div>
                                <div className="text-left">
                                    <p className={cat.gold ? 'text-[13px] font-black text-ls-black' : 'text-[14px] font-bold text-white'}>
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

                {/* ══════════════════════════════════
                    BLOC TEXTE
                ══════════════════════════════════ */}
                <div className="space-y-4 pt-2 animate-fade-in border-t border-white/[0.05]">
                    <p className="text-[13px] text-gray-400 leading-relaxed">
                       
                        Formulez une demande et la mise à disposition est effectuée.
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
