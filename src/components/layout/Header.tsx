import React from 'react';

interface HeaderProps {
    setView: (view: 'home' | 'catalogue' | 'custom-form') => void;
    currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
    return (
        <header className="sticky top-0 z-40 w-full bg-ls-black/90 backdrop-blur-md border-b border-ls-gold/20 px-4 py-4 flex justify-between items-center">
            {/* Logo Minimaliste */}
            <button
                onClick={() => setView('home')}
                className="text-2xl font-black tracking-widest text-ls-white hover:text-ls-gold transition-colors"
            >
                LS
            </button>

            {/* Navigation Rapide */}
            <nav className="flex space-x-4 text-xs font-semibold uppercase tracking-wider">
                <button
                    onClick={() => setView('catalogue')}
                    className={`transition-colors ${currentView === 'catalogue' ? 'text-ls-gold' : 'text-gray-400 hover:text-ls-white'}`}
                >
                    Catalogue
                </button>
                <button
                    onClick={() => setView('custom-form')}
                    className={`transition-colors ${currentView === 'custom-form' ? 'text-ls-gold' : 'text-gray-400 hover:text-ls-white'}`}
                >
                    Demande Express
                </button>
            </nav>
        </header>
    );
};