import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { InstallPopup } from './components/pwa/InstallPopup';
import { CatalogueView } from './components/catalogue/CatalogueView';
import { CustomFormView } from './components/form/CustomFormView';
import { sendToWhatsApp } from './utils/whatsappConnector';

type ViewType = 'home' | 'catalogue' | 'custom-form';

export default function App() {
    const [view, setView] = useState<ViewType>('home');
    const [selectedProductFromCatalogue, setSelectedProductFromCatalogue] = useState<{
        niche: string;
        brand: string;
        model: string;
    } | null>(null);

    return (
        <div className="min-h-screen bg-ls-black text-ls-white flex flex-col font-sans selection:bg-ls-gold selection:text-ls-black">
            {/* En-tête */}
            <Header setView={(v) => { setView(v); setSelectedProductFromCatalogue(null); }} currentView={view} />

            {/* Conteneur Mobile-First */}
            <main className="flex-grow flex flex-col px-4 pt-6 pb-12 max-w-md mx-auto w-full">

                {/* ÉCRAN 1 : ACCUEIL */}
                {view === 'home' && (
                    <div className="flex-grow flex flex-col justify-between space-y-8 animate-fade-in">
                        <div className="space-y-6 mt-4">
                            <div className="inline-block border border-ls-gold/40 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-ls-gold font-medium">
                                Sourcing & Conciergerie Premium
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
                                LS, une plateforme qui <span className="text-ls-gold">simplifie</span> vos achats et acquisitions.
                            </h1>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Un clic suffit pour que votre demande soit prise en compte dans les meilleurs délais possibles (Max 48h) ;
                            </p>
                        </div>

                        <div className="bg-gradient-to-b from-gray-950 to-ls-black p-5 rounded-2xl border border-gray-900 space-y-3 shadow-xl">
                            <p className="text-xs text-ls-gold uppercase tracking-wider font-bold">Domaines d'expertise :</p>
                            <p className="text-sm text-gray-300 font-medium leading-relaxed">
                                Véhicule neuf ou occasion, téléphone et accessoires, vêtements, électroménagers, matériels bureautiques…
                            </p>
                            <div className="pt-2 text-xs italic text-gray-400">
                                Formuler une demande et la mise à la disposition est effectuée.
                            </div>
                        </div>

                        <div className="space-y-2 border-l-2 border-ls-gold pl-4 my-4">
                            <p className="text-xs text-gray-400 italic">
                                Déléguer votre précieux temps à notre équipe professionnelle sur toutes vos commandes.
                            </p>
                            <p className="text-sm font-bold text-ls-white tracking-wide">
                                Avec La_Solution (LS), vos commandes restent prioritaires
                            </p>
                        </div>

                        <div className="space-y-3 pt-4">
                            <button
                                onClick={() => setView('catalogue')}
                                className="w-full bg-ls-gold hover:bg-ls-gold-hover text-ls-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-ls-gold/10 uppercase tracking-wider text-sm"
                            >
                                Explorer le Catalogue
                            </button>
                            <button
                                onClick={() => setView('custom-form')}
                                className="w-full bg-transparent hover:bg-white/5 text-ls-white font-semibold py-4 rounded-xl transition-all border border-gray-800 uppercase tracking-wider text-sm"
                            >
                                Faire une demande personnalisée
                            </button>
                        </div>
                    </div>
                )}

                {/* ÉCRAN 2 : CATALOGUE ACTIF */}
                {view === 'catalogue' && (
                    <CatalogueView
                        onGoToCustomForm={() => setView('custom-form')}
                        onSelectProduct={(prod) => {
                            // Envoi direct du produit choisi dans le catalogue
                            sendToWhatsApp({
                                type: 'catalogue',
                                niche: prod.niche,
                                brand: prod.brand,
                                model: prod.model
                            });
                        }}
                    />
                )}

                {/* ÉCRAN 3 : FORMULAIRE INTELLIGENT ACTIF */}
                {view === 'custom-form' && (
                    <CustomFormView
                        initialProduct={selectedProductFromCatalogue}
                        onSubmitDemand={(formData) => {
                            // Envoi des infos saisies dans le formulaire personnalisé
                            sendToWhatsApp({
                                type: 'custom',
                                niche: formData.niche,
                                productName: formData.productName,
                                spec1: formData.spec1,
                                spec2: formData.spec2,
                                budget: formData.budget,
                                location: formData.location,
                                imageCount: formData.imageCount
                            });
                        }}
                    />
                )}

            </main>

            <Footer />
            <InstallPopup />
        </div>
    );
}