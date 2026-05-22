import { useState } from 'react';

interface HeaderProps {
    onDemandeClick: () => void;
}

const ETAPES_MENU = [
    { n: '01', t: 'Formulez votre demande via le grand carré central.' },
    { n: '02', t: 'Vous êtes redirigé directement sur WhatsApp.' },
    { n: '03', t: 'Notre équipe vous appelle pour caler les détails.' },
    { n: '04', t: 'Nous trouvons et livrons votre commande en 24h.' },
];

const WA_HREF = 'https://wa.me/221776729740';

export const Header = ({ onDemandeClick }: HeaderProps) => {
    const [menuOuvert, setMenuOuvert] = useState(false);

    const fermer = () => setMenuOuvert(false);
    const basculer = () => setMenuOuvert((v) => !v);

    const navBoutonClass = menuOuvert
        ? 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 bg-ls-green/10 text-ls-green'
        : 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 text-gray-400 hover:text-ls-white hover:bg-white/5';

    const chevronClass = menuOuvert
        ? 'w-3 h-3 transition-transform duration-200 rotate-180'
        : 'w-3 h-3 transition-transform duration-200 rotate-0';

    return (
        <>
            <header className="sticky top-0 z-40 w-full bg-ls-black/95 backdrop-blur-xl border-b border-white/[0.06] px-5 py-3.5 flex justify-between items-center">

                <button onClick={fermer} className="group flex items-center gap-2.5" aria-label="LS La Solution">
                    <div className="w-8 h-8 rounded-lg bg-ls-green flex items-center justify-center shadow-lg shadow-ls-green/20">
                        <span className="text-ls-black font-black text-xs tracking-widest">LS</span>
                    </div>
                    <span className="text-ls-white font-bold text-sm tracking-wider group-hover:text-ls-green transition-colors duration-200">
                        La Solution
                    </span>
                </button>

                <nav className="flex items-center gap-1">
                    <button onClick={basculer} className={navBoutonClass}>
                        Menu
                        <svg className={chevronClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => { fermer(); onDemandeClick(); }}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-ls-green text-ls-black hover:bg-ls-green-light transition-all duration-200 active:scale-95"
                    >
                        Demande Express
                    </button>
                </nav>
            </header>{menuOuvert && (
                <div className="fixed inset-0 z-30 pt-[57px]" onClick={fermer}>
                    <div className="mx-auto max-w-md px-4 pt-2" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-[#0f0f0f] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 animate-slide-down">

                            <div className="p-5 border-b border-white/[0.06]">
                                <p className="text-[10px] text-ls-green uppercase tracking-[0.15em] font-bold mb-4">
                                    ✦ Comment ça marche
                                </p>
                                <div className="space-y-3">
                                    {ETAPES_MENU.map(({ n, t }) => (
                                        <div key={n} className="flex items-start gap-3">
                                            <span className="w-5 h-5 rounded-full border border-ls-green/40 flex items-center justify-center text-[9px] font-black text-ls-green flex-shrink-0 mt-0.5">
                                                {n}
                                            </span>
                                            <p className="text-[12px] text-gray-300 leading-snug">{t}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-5">
                                <p className="text-[10px] text-ls-green uppercase tracking-[0.15em] font-bold mb-3">
                                    ✦ Nous contacter
                                </p>
                                
                                    href={WA_HREF}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={fermer}
                                    className="flex items-center gap-2.5 bg-[#128c7e]/10 border border-[#128c7e]/30 hover:border-[#128c7e]/60 px-4 py-3 rounded-xl transition-all duration-200 group"
                                >
                                    <svg className="w-4 h-4 text-[#25d366] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <div>
                                        <p className="text-[11px] font-bold text-white group-hover:text-[#25d366] transition-colors">
                                            Nous contacter sur WhatsApp
                                        </p>
                                        <p className="text-[10px] text-gray-500">+221 77 672 97 40</p>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
