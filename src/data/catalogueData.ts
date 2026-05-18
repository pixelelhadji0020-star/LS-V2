export interface ProductBrief {
    id: string;
    model: string;
    description: string;
    specs: string[];
}

export interface BrandData {
    brandName: string;
    models: ProductBrief[];
}

export interface SubSection {
    name: string;
    brands: BrandData[];
}

export interface NicheSection {
    id: string;
    title: string;
    icon: string;
    subSections?: SubSection[]; // Pour les structures complexes comme Véhicules
    brands?: BrandData[];       // Pour les structures directes comme Téléphonie
}

export const catalogueData: NicheSection[] = [
    {
        id: 'vehicules',
        title: 'Véhicules',
        icon: '🚗',
        subSections: [
            {
                name: 'Voiture',
                brands: [
                    {
                        brandName: 'Toyota',
                        models: [
                            { id: 'v1', model: 'RAV4', description: 'SUV Robuste et économique', specs: ['Année 2020-2025', 'Diesel / Essence', 'Boîte Auto'] },
                            { id: 'v2', model: 'Prado', description: '4x4 Premium tout-terrain', specs: ['Année 2021-2026', 'Gasoil', 'Version Luxe'] }
                        ]
                    },
                    {
                        brandName: 'Mercedes-Benz',
                        models: [
                            { id: 'v3', model: 'Classe C', description: 'Berline élégante et technologique', specs: ['Année 2022-2026', 'Essence', 'Pack AMG'] }
                        ]
                    }
                ]
            },
            {
                name: 'Scooter & Moto',
                brands: [
                    {
                        brandName: 'Yamaha',
                        models: [
                            { id: 'v4', model: 'TMAX 560', description: 'Maxi-scooter ultra performant', specs: ['Neuf ou Occasion', 'Keyless', 'Édition Tech MAX'] }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'telephonie',
        title: 'Téléphonie & Accessoires',
        icon: '📱',
        brands: [
            {
                brandName: 'Apple',
                models: [
                    { id: 't1', model: 'iPhone 15 Pro Max', description: 'Le fleuron d\'Apple en titane', specs: ['128Go / 256Go / 512Go / 1To', 'État Neuf ou Reconditionné'] }
                ]
            },
            {
                brandName: 'Samsung',
                models: [
                    { id: 't2', model: 'Galaxy S24 Ultra', description: 'Performances extrêmes avec IA intégrée', specs: ['256Go / 512Go', 'Style Noir Titane'] }
                ]
            }
        ]
    },
    {
        id: 'bureautique',
        title: 'Matériel Bureautique',
        icon: '💻',
        subSections: [
            {
                name: 'Ordinateurs Portables',
                brands: [
                    {
                        brandName: 'Apple',
                        models: [
                            { id: 'b1', model: 'MacBook Pro M3', description: 'Puissance ultime pour les professionnels', specs: ['Écran 14" ou 16"', '16Go / 32Go RAM', 'SSD 512Go+'] }
                        ]
                    },
                    {
                        brandName: 'HP',
                        models: [
                            { id: 'b2', model: 'EliteBook', description: 'Fiabilité et sécurité pour la bureautique pro', specs: ['Core i7', '16Go RAM', 'Clavier AZERTY'] }
                        ]
                    }
                ]
            },
            {
                name: 'Accessoires',
                brands: [
                    {
                        brandName: 'Multi-Marques',
                        models: [
                            { id: 'b3', model: 'Chargeurs & Batteries Spécifiques', description: 'Composants d\'origine certifiés toutes marques', specs: ['Préciser le modèle exact de votre PC à la commande'] }
                        ]
                    }
                ]
            }
        ]
    }
];