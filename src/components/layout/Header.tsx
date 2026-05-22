import { useState, useRef, KeyboardEvent } from 'react';

interface HeaderProps {
    onRechercheValidee: (texte: string) => void;
}

export const Header = ({ onRechercheValidee }: HeaderProps) => {
    const [recherche, setRecherche] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const valider = () => {
        if (recherche.trim()) {
            onRechercheValidee(recherche.trim());
            setRecherche('');
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') valider();
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-ls-black/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3">
            <div className="max-w-md mx-auto flex items-center gap-3">
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-ls-green flex items-center justify-center shadow-lg shadow-ls-green/20">
                        <span className="text-ls-black font-black text-xs tracking-widest">LS</span>
                    </div>
                </div>
                <div className="flex-1 flex items-center bg-[#111] border border-white/[0.08] rounded-xl px-3 gap-2 focus-within:border-ls-green/50 transition-colors">
                    <button
                        onClick={valider}
                        className="flex-shrink-0 text-gray-500 hover:text-ls-green transition-colors"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                        </svg>
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Que recherchez-vous ?"
                        className="flex-1 bg-transparent py-2.5 text-[13px] text-white placeholder:text-gray-600 outline-none"
                    />
                </div>
            </div>
        </header>
    );
};
