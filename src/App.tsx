import { useRef } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { InstallPopup } from './components/pwa/InstallPopup';

// ── Numéro WhatsApp LS ───────────────────────────────────────
const WA_NUMBER = "221776729740";

const envoyerWhatsApp = () => {
    const msg =
        `✨ *NOUVELLE DEMANDE — LS LA SOLUTION* ✨\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `_Conciergerie Premium · Dakar · Sénégal_\n\n` +
        `🔍 Bonjour, je souhaite formuler une demande de sourcing.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `⏱️ *Prise en charge sous 24h maximum*\n` +
        `🤝 _Notre équipe vous rappelle pour les détails._`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

// ── Domaines illustratifs (non cliquables) ───────────────────
const DOMAINES = [
    { icon: '🚗', label: 'Voitures',    desc: 'Neuf & occasion, toutes marques' },
    { icon: '🏠', label: 'Immobilier',  desc: 'Location & achat à Dakar' },
    { icon: '💻', label: 'Matériels',   desc: 'Tech, bureautique, électro' },
];

// ── 4 étapes du service ──────────────────────────────────────
const ETAPES = [
    { n: '01', t: 'Vous formulez votre demande via le grand carré.' },
    { n: '02', t: 'Vous êtes redirigé directement sur WhatsApp.' },
    { n: '03', t: 'Notre équipe vous appelle pour caler les détails manquants.' },
    { n: '04', t: 'Nous trouvons et livrons votre commande en 24h.' },
];

export default function App() {

    // Ref pour le smooth scroll vers le grand carré
    const carreRef = useRef<HTMLDivElement>(null);

    const scrollVersDemande = () => {
        carreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="min-h-screen bg-ls-black text-ls-white flex flex-col font-sans">

            <Header onDemandeClick={scrollVersDemande} />

            <main className="flex-grow flex flex-col px-4 pt-7 pb-16 max-w-md mx-auto w-full space-y-8">

                {/* ══════════════════════════════════════
                    HERO
                ══════════════════════════════════════ */}
                <div className="space-y-3 animate-fade-in">
                    <span className="badge-gold">✦ Sourcing & Conciergerie Premium · Dakar</span>
                    <h1 className="text-[2rem] font-black tracking-tight leading-[1.15] mt-3">
                        Vous cherchez,<br />
                        <span className="text-ls-gold">on trouve & on livre.</span>
                    </h1>
                    <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs">
                        Pas de stock. Un service de sourcing humain,
                        réactif et basé à Dakar — livraison sous <strong className="text-gray-300">24h</strong>.
                    </p>
                </div>

                {/* ══════════════════════════════════════
                    BENTO GRID
                ══════════════════════════════════════ */}
                <div className="grid grid-cols-2 gap-2.5 animate-fade-in delay-75">

                    {/* ── Grand carré — CTA principal ── */}
                    <div
                        ref={carreRef}
                        onClick={envoyerWhatsApp}
                        className="col-span-2 group relative bg-gradient-to-br from-[#1c1600] via-[#111] to-[#0a0a0a] border border-ls-gold/35 hover:border-ls-gold/70 rounded-2xl p-5 cursor-pointer transition-all duration-300 shadow-lg shadow-ls-gold/5 hover:shadow-ls-gold/15 active:scale-[0.985] overflow-hidden"
                    >
                        {/* Halo doré au hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-ls-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                        <div className="relative flex flex-col items-center text-center gap-3 py-3">
                            <div className="w-14 h-14 rounded-2xl bg-ls-gold/10 border border-ls-gold/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">🔍</span>
                            </div>

                            <div>
                                <p className="text-[15px] font-black text-ls-white tracking-tight">
                                    Formuler une demande précise
                                </p>
                                <p className="text-[11px] text-gray-500 mt-1">
                                    Décrivez ce que vous cherchez — on s'occupe du reste.
                                </p>
                            </div>

                            {/* Faux bouton visuel */}
                            <div className="flex items-center gap-2 bg-ls-gold text-ls-black px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest group-hover:bg-ls-gold-light transition-colors duration-200 mt-1 shadow-md shadow-ls-gold/30">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                Envoyer sur WhatsApp
                            </div>
                        </div>
                    </div>

                    {/* ── 3 petites cartes illustratives (non cliquables) ── */}
                    {DOMAINES.map(({ icon, label, desc }, idx) => (
                        <div
                            key={label}
                            className={`bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/[0.06] rounded-xl p-4 animate-fade-in ${idx === 2 ? 'col-span-2 flex items-center gap-4' : ''}`}
                            style={{ animationDelay: `${(idx + 1) * 60}ms` }}
                        >
                            <span className="text-2xl">{icon}</span>
                            <div className={idx === 2 ? '' : 'mt-2'}>
                                <p className="text-[13px] font-bold text-ls-white leading-snug">{label}</p>
                                <p className="text-[10px] text-gray-600 mt-0.5 leading-snug">{desc}</p>
                            </div>
                        </div>
                    ))}

                </div>

                {/* ══════════════════════════════════════
                    SECTION EXPLICATIVE — compacte
                ══════════════════════════════════════ */}
                <div className="space-y-4 animate-fade-in delay-150">

                    {/* Délai */}
                    <div className="flex items-center gap-2.5 bg-ls-gold/5 border border-ls-gold/15 rounded-xl px-4 py-3">
                        <span className="text-lg">⏱️</span>
                        <p className="text-[12px] text-ls-gold font-bold">
                            Prise en charge & livraison sous <span className="underline underline-offset-2">24h maximum</span>
                        </p>
                    </div>

                    {/* Séparateur titré */}
                    <div className="flex items-center gap-3">
                        <div className="gold-divider flex-1" />
                        <p className="text-[10px] text-gray-600 uppercase tracking-[0.15em] whitespace-nowrap">
                            Le flux en 4 étapes
                        </p>
                        <div className="gold-divider flex-1" />
                    </div>

                    {/* 4 étapes */}
                    <div className="space-y-2.5">
                        {ETAPES.map(({ n, t }) => (
                            <div key={n} className="flex items-start gap-3">
                                <span className="w-5 h-5 rounded-full border border-ls-gold/35 flex items-center justify-center text-[9px] font-black text-ls-gold flex-shrink-0 mt-0.5">
                                    {n}
                                </span>
                                <p className="text-[12px] text-gray-400 leading-snug">{t}</p>
                            </div>
                        ))}
                    </div>

                    {/* Promesse */}
                    <div className="border-l-2 border-ls-gold/40 pl-4 mt-2">
                        <p className="text-[11px] text-gray-500 italic leading-relaxed">
                            "Nous ne vendons pas de stock. Nous trouvons exactement ce que vous cherchez, où que ce soit au Sénégal."
                        </p>
                        <p className="text-[11px] font-bold text-gray-300 mt-1.5 tracking-wide">
                            LS — La Solution, Dakar.
                        </p>
                    </div>

                </div>

            </main>

            <Footer />
            <InstallPopup />
        </div>
    );
}
