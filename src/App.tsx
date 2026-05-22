import { useRef, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { InstallPopup } from './components/pwa/InstallPopup';

const WA_NUMBER = '221776729740';

const envoyerWhatsApp = (texte: string) => {
    const contenu = texte.trim()
        ? texte.trim()
        : 'Bonjour, je souhaite formuler une demande de sourcing.';
    const msg =
        '✨ *NOUVELLE DEMANDE — LS LA SOLUTION* ✨\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '_Conciergerie Premium · Dakar · Sénégal_\n\n' +
        '🔍 *Ma demande :*\n' +
        contenu + '\n\n' +
        '━━━━━━━━━━━━━━━━━━━━━━━\n' +
        '⏱️ *Prise en charge sous 24h maximum*\n' +
        '🤝 _Notre équipe vous rappelle pour les détails._';
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
};

export default function App() {

    const carreRef = useRef<HTMLDivElement>(null);
    const [demande, setDemande] = useState('');

    const scrollVersDemande = () => {
        carreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className="min-h-screen bg-ls-black text-ls-white flex flex-col font-sans">

            <Header onDemandeClick={scrollVersDemande} />

            <main className="flex-grow flex flex-col px-4 pt-7 pb-16 max-w-md mx-auto w-full space-y-10">

                {/* ── HERO ── */}
                <div className="space-y-3 animate-fade-in">
                    <span className="badge-green">✦ Sourcing & Conciergerie Premium · Dakar</span>
                    <h1 className="text-[2rem] font-black tracking-tight leading-[1.15] mt-3">
                        Vous cherchez,<br />
                        <span className="text-ls-green">on trouve & on livre.</span>
                    </h1>
                    <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs">
                        Pas de stock. Un service de sourcing humain,
                        réactif et basé à Dakar — livraison sous{' '}
                        <strong className="text-gray-300">24h</strong>.
                    </p>
                </div>

                {/* ── GRAND CARRÉ CENTRAL — seul CTA ── */}
                <div
                    ref={carreRef}
                    className="relative bg-gradient-to-br from-[#021a10] via-[#0d0d0d] to-[#0a0a0a] border border-ls-green/30 rounded-2xl p-6 shadow-xl shadow-ls-green/5 animate-fade-in"
                >
                    {/* Halo vert */}
                    <div className="absolute inset-0 bg-gradient-to-br from-ls-green/5 to-transparent rounded-2xl pointer-events-none" />

                    <div className="relative flex flex-col items-center text-center gap-4">

                        {/* Icône loupe */}
                        <div className="w-16 h-16 rounded-2xl bg-ls-green/10 border border-ls-green/25 flex items-center justify-center">
                            <span className="text-4xl">🔍</span>
                        </div>

                        {/* Titre */}
                        <div>
                            <p className="text-[17px] font-black text-ls-white tracking-tight leading-snug">
                                Dites-nous ce que vous cherchez
                            </p>
                            <p className="text-[12px] text-gray-500 mt-1.5 leading-relaxed">
                                Voiture, appartement, téléphone, matériel…<br />
                                nous trouvons et livrons tout sous 24h.
                            </p>
                        </div>

                        {/* Champ de texte */}
                        <textarea
                            value={demande}
                            onChange={(e) => setDemande(e.target.value)}
                            placeholder="Décrivez le produit que vous souhaitez trouver..."
                            rows={3}
                            className="input-green resize-none text-left leading-relaxed"
                        />

                        {/* Bouton principal */}
                        <button
                            onClick={() => envoyerWhatsApp(demande)}
                            className="w-full flex items-center justify-center gap-2.5 bg-ls-green hover:bg-ls-green-light text-ls-black font-black py-3.5 rounded-xl text-[12px] uppercase tracking-widest transition-all duration-200 active:scale-[0.98] shadow-lg shadow-ls-green/20"
                        >
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Rechercher &amp; Nous Contacter sur WhatsApp
                        </button>

                        <p className="text-[10px] text-gray-600">
                            Prise en charge sous <strong className="text-gray-500">24h maximum</strong> — notre équipe vous rappelle.
                        </p>

                    </div>
                </div>

                {/* ── SECTION EXPLICATIVE ── */}
                <div className="space-y-5 animate-fade-in">

                    <div className="text-center">
                        <div className="green-divider w-12 mx-auto mb-4" />
                        <p className="text-[11px] text-ls-green uppercase tracking-[0.15em] font-bold">
                            ✦ Comment notre service fonctionne
                        </p>
                    </div>

                    {/* Étape 1 */}
                    <div className="flex items-start gap-4 bg-[#0d0d0d] border border-white/[0.05] rounded-xl p-4">
                        <div className="w-9 h-9 rounded-xl bg-ls-green/10 border border-ls-green/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">📝</span>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-ls-white">
                                1. Demande Express
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                Formulez votre recherche précise via le grand carré et validez.
                            </p>
                        </div>
                    </div>

                    {/* Étape 2 */}
                    <div className="flex items-start gap-4 bg-[#0d0d0d] border border-white/[0.05] rounded-xl p-4">
                        <div className="w-9 h-9 rounded-xl bg-ls-green/10 border border-ls-green/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">💬</span>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-ls-white">
                                2. Contact WhatsApp
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                Vous êtes redirigé vers WhatsApp pour finaliser l'envoi de votre demande.
                            </p>
                        </div>
                    </div>

                    {/* Étape 3 */}
                    <div className="flex items-start gap-4 bg-[#0d0d0d] border border-white/[0.05] rounded-xl p-4">
                        <div className="w-9 h-9 rounded-xl bg-ls-green/10 border border-ls-green/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">📞</span>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-ls-white">
                                3. Confirmation par appel
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                Notre équipe vous appelle pour préciser les détails manquants.
                            </p>
                        </div>
                    </div>

                    {/* Étape 4 */}
                    <div className="flex items-start gap-4 bg-[#0d0d0d] border border-white/[0.05] rounded-xl p-4">
                        <div className="w-9 h-9 rounded-xl bg-ls-green/10 border border-ls-green/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">📦</span>
                        </div>
                        <div>
                            <p className="text-[12px] font-bold text-ls-white">
                                4. Recherche &amp; Livraison
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                Nous trouvons le produit et nous occupons de la livraison sous 24h.
                            </p>
                        </div>
                    </div>

                </div>

            </main>

            <Footer />
            <InstallPopup />
        </div>
    );
}
