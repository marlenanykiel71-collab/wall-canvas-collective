export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "panele-samoprzylepne",
    name: "Panele samoprzylepne 3D",
    tagline: "Ściana, która zmienia wszystko",
    description:
      "Trójwymiarowe panele nakładane w minutę. Bez kleju, bez pyłu, bez kompromisów.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "lamele",
    name: "Lamele ścienne",
    tagline: "Rytm drewna",
    description: "Pionowe listwy, które nadają wnętrzu strukturę i ciepło.",
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "tapety",
    name: "Tapety autorskie",
    tagline: "Tło dla codzienności",
    description:
      "Kolekcje projektowane z myślą o wnętrzach, które mają charakter.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "panele-pcv",
    name: "Panele PCV",
    tagline: "Odporność w każdym detalu",
    description: "Wodoodporne wykończenie do łazienek, kuchni i przestrzeni użytkowych.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "drzwi-przesuwane",
    name: "Drzwi przesuwane",
    tagline: "Przestrzeń bez granic",
    description: "Systemy przesuwne, które porządkują otwarte plany dnia.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // slug
  price: number;
  oldPrice?: number;
  unit: "m²" | "szt.";
  colors: string[];
  patterns: string[];
  sizes: string[];
  materials: string[];
  rating: number;
  reviews: number;
  badge?: "Nowość" | "Promocja" | "Bestseller";
  short: string;
  description: string;
  images: string[];
};

const interior = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const products: Product[] = [
  {
    id: "p-1",
    slug: "onyx-3d",
    name: "Onyx 3D",
    category: "panele-samoprzylepne",
    price: 129,
    oldPrice: 159,
    unit: "m²",
    colors: ["Czarny", "Grafit"],
    patterns: ["Geometryczny"],
    sizes: ["70×70 cm", "100×100 cm"],
    materials: ["Pianka XPE"],
    rating: 4.8,
    reviews: 42,
    badge: "Promocja",
    short: "Głęboka czerń z rzeźbioną fakturą fali.",
    description:
      "Panel 3D o gęstej, matowej strukturze — chłonie światło i buduje kameralny nastrój.",
    images: [
      interior("photo-1616486338812-3dadae4b4ace"),
      interior("photo-1618221195710-dd6b41faaea6"),
    ],
  },
  {
    id: "p-2",
    slug: "sahara-3d",
    name: "Sahara 3D",
    category: "panele-samoprzylepne",
    price: 119,
    unit: "m²",
    colors: ["Piaskowy", "Biały"],
    patterns: ["Fala", "Organiczny"],
    sizes: ["70×70 cm"],
    materials: ["Pianka XPE"],
    rating: 4.6,
    reviews: 28,
    badge: "Nowość",
    short: "Miękka, jasna fala. Światło buduje relief.",
    description:
      "Delikatny, organiczny wzór — idealny do sypialni i salonu w tonacji ciepłej.",
    images: [interior("photo-1615529182904-14819c35db37")],
  },
  {
    id: "p-3",
    slug: "monolit-3d",
    name: "Monolit 3D",
    category: "panele-samoprzylepne",
    price: 149,
    unit: "m²",
    colors: ["Biały", "Kość słoniowa"],
    patterns: ["Geometryczny"],
    sizes: ["100×100 cm"],
    materials: ["Gips"],
    rating: 4.9,
    reviews: 61,
    short: "Architektoniczny, ostry rytm.",
    description: "Twardy gipsowy relief. Malowalny. Dla przestrzeni z ambicją.",
    images: [interior("photo-1618219944342-824e40a13285")],
  },
  {
    id: "p-4",
    slug: "lamela-oak",
    name: "Lamela Oak",
    category: "lamele",
    price: 189,
    unit: "szt.",
    colors: ["Dąb naturalny"],
    patterns: ["Drewno"],
    sizes: ["270 cm"],
    materials: ["MDF", "Filc"],
    rating: 4.9,
    reviews: 87,
    badge: "Bestseller",
    short: "Ciepły dąb, akustyczne wykończenie.",
    description:
      "Lamele akustyczne z filcem — porządkują dźwięk i przestrzeń jednocześnie.",
    images: [interior("photo-1615529182904-14819c35db37")],
  },
  {
    id: "p-5",
    slug: "lamela-noir",
    name: "Lamela Noir",
    category: "lamele",
    price: 219,
    unit: "szt.",
    colors: ["Czarny", "Orzech"],
    patterns: ["Drewno"],
    sizes: ["270 cm", "300 cm"],
    materials: ["MDF", "Filc"],
    rating: 4.7,
    reviews: 34,
    short: "Głęboka czerń. Rytm ciszy.",
    description: "Ciemna lamela dla wnętrz z charakterem galerii.",
    images: [interior("photo-1616486338812-3dadae4b4ace")],
  },
  {
    id: "p-6",
    slug: "tapeta-atelier",
    name: "Atelier",
    category: "tapety",
    price: 89,
    unit: "m²",
    colors: ["Beż", "Terrakota"],
    patterns: ["Organiczny"],
    sizes: ["Rolka 10 m"],
    materials: ["Flizelina"],
    rating: 4.7,
    reviews: 22,
    badge: "Nowość",
    short: "Ręcznie malowana faktura płótna.",
    description:
      "Tapeta o teksturze surowego płótna — bazowa, ale nigdy nudna.",
    images: [interior("photo-1618221195710-dd6b41faaea6")],
  },
  {
    id: "p-7",
    slug: "tapeta-noir",
    name: "Noir Botanica",
    category: "tapety",
    price: 99,
    unit: "m²",
    colors: ["Czarny", "Zielony"],
    patterns: ["Roślinny"],
    sizes: ["Rolka 10 m"],
    materials: ["Flizelina"],
    rating: 4.8,
    reviews: 41,
    short: "Ciemna roślinność w skali makro.",
    description: "Dramatyczny motyw roślinny w głębokiej czerni.",
    images: [interior("photo-1618221195710-dd6b41faaea6")],
  },
  {
    id: "p-8",
    slug: "pcv-marmo",
    name: "PCV Marmo",
    category: "panele-pcv",
    price: 79,
    unit: "m²",
    colors: ["Biały", "Marmurowy"],
    patterns: ["Marmur"],
    sizes: ["25×265 cm"],
    materials: ["PCV"],
    rating: 4.5,
    reviews: 55,
    short: "Efekt marmuru. Wodoodporny.",
    description: "Do łazienek, kuchni, stref serwisowych. Łatwe czyszczenie.",
    images: [interior("photo-1600607687939-ce8a6c25118c")],
  },
  {
    id: "p-9",
    slug: "pcv-graphite",
    name: "PCV Graphite",
    category: "panele-pcv",
    price: 75,
    unit: "m²",
    colors: ["Grafit", "Czarny"],
    patterns: ["Gładki"],
    sizes: ["25×265 cm"],
    materials: ["PCV"],
    rating: 4.4,
    reviews: 30,
    badge: "Promocja",
    oldPrice: 95,
    short: "Matowy grafit. Bez fug.",
    description: "Nowoczesny grafit do stref mokrych i technicznych.",
    images: [interior("photo-1600607687939-ce8a6c25118c")],
  },
  {
    id: "p-10",
    slug: "drzwi-linea",
    name: "Linea",
    category: "drzwi-przesuwane",
    price: 1990,
    unit: "szt.",
    colors: ["Czarny", "Biały"],
    patterns: ["Szkło", "Rama"],
    sizes: ["90×210 cm", "100×210 cm"],
    materials: ["Aluminium", "Szkło"],
    rating: 4.9,
    reviews: 18,
    badge: "Nowość",
    short: "Szkło w aluminiowej ramie.",
    description: "System przesuwny naścienny — inspirowany loftem.",
    images: [interior("photo-1600585154340-be6161a56a0c")],
  },
  {
    id: "p-11",
    slug: "drzwi-oak",
    name: "Oak Slide",
    category: "drzwi-przesuwane",
    price: 2490,
    unit: "szt.",
    colors: ["Dąb naturalny", "Orzech"],
    patterns: ["Drewno"],
    sizes: ["90×210 cm"],
    materials: ["MDF", "Fornir"],
    rating: 4.8,
    reviews: 24,
    short: "Naturalny fornir dębowy.",
    description: "Ciepłe drewno, system barnowy. Do domów i biur.",
    images: [interior("photo-1600585154340-be6161a56a0c")],
  },
  {
    id: "p-12",
    slug: "drzwi-noir",
    name: "Noir Slide",
    category: "drzwi-przesuwane",
    price: 2290,
    unit: "szt.",
    colors: ["Czarny"],
    patterns: ["Gładki"],
    sizes: ["90×210 cm", "100×210 cm"],
    materials: ["MDF"],
    rating: 4.7,
    reviews: 16,
    short: "Głęboka czerń, matowe wykończenie.",
    description: "Minimalistyczne drzwi w matowym czarnym lakierze.",
    images: [interior("photo-1600585154340-be6161a56a0c")],
  },
];

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const getProduct = (id: string) => products.find((p) => p.id === id || p.slug === id);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
