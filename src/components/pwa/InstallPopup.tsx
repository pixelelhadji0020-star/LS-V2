import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const InstallPopup: React.FC = () => {
    const { deferredPrompt, isIOS, isStandalone, promptInstall } = usePWAInstall();
    const [isVisible, setIsVisible] = useState(true);

    // Ne rien afficher si déjà installé ou si fermé par l'utilisateur
    if (isStandalone || !isVisible) return null;
    // Ne rien afficher si ce n'est ni iOS ni un Android prêt à installer
    if (!isIOS && !deferredPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 bg-ls-black text-ls-white p-4 rounded-xl shadow-2xl border border-ls-gold z-50 animate-fade-in-up">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-ls-gold text-lg">Installer LS</h3>
                <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
                    ✕
                </button>
            </div>

            <p className="text-sm mb-4">
                Avec La_Solution (LS), vos commandes restent prioritaires. Installez l'application pour un accès rapide.
            </p>

            {isIOS ? (
                <div className="text-sm bg-gray-800 p-3 rounded-lg border border-gray-700">
                    Pour installer, appuyez sur <span className="font-bold border bg-gray-700 px-1 rounded">Partager</span> en bas de votre écran, puis sur <span className="font-bold">Sur l'écran d'accueil</span>.
                </div>
            ) : (
                <button
                    onClick={promptInstall}
                    className="w-full bg-ls-gold hover:bg-ls-gold-hover text-ls-black font-bold py-3 rounded-lg transition-colors"
                >
                    Ajouter à l'écran d'accueil
                </button>
            )}
        </div>
    );
};