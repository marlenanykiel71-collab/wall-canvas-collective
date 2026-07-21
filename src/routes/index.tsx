import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Hammer, Leaf, Ruler, Sparkles, Star } from "lucide-react";
import { categories, products } from "@/data/catalog";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mury — Historia zaczyna się od jednej ściany" },
      {
        name: "description",
        content: "Panele 3D, lamele, tapety, panele PCV i drzwi przesuwane w stylu premium.",
      },
      { property: "og:title", content: "Mury — Wykończenia ścian premium" },
      { property: "og:description", content: "Historia zaczyna się od jednej ściany." },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
      },
      {
        name: "twitter:image",
        content: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  }),
  component: HomePage,
});

const usps = [
  { icon: Sparkles, title: "Przemyślany design", body: "Kolekcje projektowane, nie kupowane z hurtowni." },
  { icon: Hammer, title: "Wykonane z dbałością", body: "Materiały, których nie wstyd dotknąć." },
  { icon: Ruler, title: "Łatwy montaż", body: "System, który rozumie realia remontu." },
  { icon: Leaf, title: "Trwałość materiałów", body: "Wykończenia, które starzeją się dobrze." },
] as const;

const inspirations = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&w=1200&q=80",
];

const testimonials = [
  { name: "Anna K.", role: "Warszawa", body: "Panele Onyx zmieniły cały salon. Wygląda jak z magazynu." },
  { name: "Michał D.", role: "Kraków", body: "Lamele dębowe — jakość, na jaką liczyłem, ale nie sądziłem, że dostanę." },
  { name: "Studio Nowak", role: "Poznań", body: "Współpracujemy przy każdej realizacji. Ludzie, materiały, terminy — pełen profesjonalizm." },
];

function HomePage() {
  return (
    <SiteLayout transparentHeader>
      {/* HERO */}
      <section className="relative min-h-screen w-full flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=80"
          alt="Wnętrze premium"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative mx-auto max-w-7xl w-full px-6 pb-24 pt-32 md:px-8 md:pb-32">
          <div className="max-w-4xl animate-rise">
            <div className="eyebrow text-ember mb-6">Kolekcja 2026 · Nowość</div>
            <h1 className="font-display uppercase text-white text-[44px] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[90px] tracking-tight">
              Historia<br />zaczyna się<br />od jednej <span className="text-ember">ściany.</span>
            </h1>
            <p className="mt-8 text-white/70 max-w-lg text-base md:text-lg leading-relaxed">
              Panele 3D, lamele, tapety, PCV, drzwi przesuwane. Wykończenia dla wnętrz z charakterem.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/kolekcje"
                className="bg-ember text-ink px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-ember-dark transition inline-flex items-center gap-2"
              >
                Sprawdź kolekcje <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/inspiracje"
                className="border border-white/60 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-ink transition"
              >
                Odkryj inspiracje
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* USP */}
      <section className="bg-bone py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            {usps.map((u) => (
              <div key={u.title} className="space-y-4">
                <u.icon className="h-8 w-8 text-ember" strokeWidth={1.2} />
                <h3 className="font-display uppercase text-sm tracking-widest">{u.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KOLEKCJE */}
      <section className="bg-walnut text-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="eyebrow text-ember mb-4">Kolekcje</div>
              <h2 className="font-display uppercase text-4xl md:text-6xl leading-none max-w-2xl">
                Twoja przestrzeń,<br />twoje zasady.
              </h2>
            </div>
            <Link to="/kolekcje" className="eyebrow text-white/60 hover:text-ember inline-flex items-center gap-2">
              Wszystkie kolekcje <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                to="/kolekcje/$slug"
                params={{ slug: c.slug }}
                className={`group relative overflow-hidden aspect-3/4 border border-transparent hover:border-ember transition ${
                  i === 0 ? "lg:col-span-2 lg:row-span-2 lg:aspect-auto" : ""
                }`}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 card-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="eyebrow text-ember mb-2">{c.tagline}</div>
                  <h3 className="font-display uppercase text-2xl md:text-3xl">{c.name}</h3>
                  <div className="mt-4 text-xs uppercase tracking-widest inline-flex items-center gap-2 text-white/70 group-hover:text-ember">
                    Zobacz kolekcję <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERY */}
      <section className="bg-bone py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-16 max-w-2xl">
            <div className="eyebrow text-ember mb-4">Wybór redakcji</div>
            <h2 className="font-display uppercase text-4xl md:text-5xl leading-none">
              Przemyślany design.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* INSPIRACJE */}
      <section className="bg-ink text-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="eyebrow text-ember mb-4">Realizacje</div>
              <h2 className="font-display uppercase text-4xl md:text-5xl">Wykonane z dbałością.</h2>
            </div>
            <Link to="/inspiracje" className="eyebrow text-white/60 hover:text-ember inline-flex items-center gap-2">
              Cała galeria <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {inspirations.map((src, i) => (
              <div key={i} className={`relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                <img src={src} alt="Realizacja" className="absolute inset-0 h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section className="bg-bone py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="eyebrow text-ember mb-4">Opinie</div>
          <h2 className="font-display uppercase text-3xl md:text-4xl mb-12">Głosy z realizacji.</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="bg-white p-8 border-l-2 border-ember">
                <div className="flex gap-1 text-ember mb-4">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" strokeWidth={1} />)}
                </div>
                <p className="text-sm leading-relaxed">"{t.body}"</p>
                <footer className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                  {t.name} · {t.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-walnut text-white py-24 md:py-40 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut via-walnut/70 to-walnut/40" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display uppercase text-4xl md:text-6xl lg:text-7xl leading-none">
            Zaczynamy<br />od <span className="text-ember">jednej ściany.</span>
          </h2>
          <p className="mt-6 text-white/70 max-w-lg mx-auto">
            Zamów bezpłatną próbkę materiału. Dotknij zanim wybierzesz.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/kolekcje" className="bg-ember text-ink px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-ember-dark transition">
              Przeglądaj kolekcje
            </Link>
            <Link to="/kontakt" className="border border-white/60 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-ink transition">
              Skontaktuj się
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
