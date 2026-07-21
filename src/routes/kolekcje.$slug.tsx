import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { getCategory, getProductsByCategory, products as ALL } from "@/data/catalog";
import { pluralize } from "@/lib/cart";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  color: fallback(z.string().array(), []).default([]),
  pattern: fallback(z.string().array(), []).default([]),
  size: fallback(z.string().array(), []).default([]),
  material: fallback(z.string().array(), []).default([]),
  min: fallback(z.number(), 0).default(0),
  max: fallback(z.number(), 0).default(0),
  sort: fallback(z.string(), "popular").default("popular"),
});

export const Route = createFileRoute("/kolekcje/$slug")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { category: cat };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Kolekcja — Mury" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.category;
    return {
      meta: [
        { title: `${c.name} — Mury` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.name} — Mury` },
        { property: "og:description", content: c.description },
        { property: "og:image", content: c.image },
        { name: "twitter:image", content: c.image },
      ],
    };
  },
  component: CollectionPage,
});

const sortOptions = [
  { v: "popular", l: "Najpopularniejsze" },
  { v: "newest", l: "Najnowsze" },
  { v: "price-asc", l: "Cena: rosnąco" },
  { v: "price-desc", l: "Cena: malejąco" },
  { v: "sale", l: "Promocje najpierw" },
];

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

type Filters = z.infer<typeof searchSchema>;
type NavFn = (opts: { search: (p: Filters) => Filters }) => void;

function CollectionPage() {
  const loaderData = Route.useLoaderData() as { category: import("@/data/catalog").Category };
  const { category } = loaderData;
  const rawSearch = Route.useSearch();
  const search = rawSearch as unknown as Filters;
  const navigate = useNavigate({ from: Route.fullPath }) as unknown as NavFn;
  const [mobileFilters, setMobileFilters] = useState(false);

  const catProducts = useMemo(() => getProductsByCategory(category.slug), [category.slug]);

  const facets = useMemo(() => {
    const colors = uniq(catProducts.flatMap((p) => p.colors));
    const patterns = uniq(catProducts.flatMap((p) => p.patterns));
    const sizes = uniq(catProducts.flatMap((p) => p.sizes));
    const materials = uniq(catProducts.flatMap((p) => p.materials));
    const priceMin = Math.min(...catProducts.map((p) => p.price));
    const priceMax = Math.max(...catProducts.map((p) => p.price));
    return { colors, patterns, sizes, materials, priceMin, priceMax };
  }, [catProducts]);

  const effMin = search.min || facets.priceMin;
  const effMax = search.max || facets.priceMax;

  const filtered = useMemo(() => {
    let out = catProducts.filter((p) => {
      if (search.color.length && !p.colors.some((c) => search.color.includes(c))) return false;
      if (search.pattern.length && !p.patterns.some((c) => search.pattern.includes(c))) return false;
      if (search.size.length && !p.sizes.some((c) => search.size.includes(c))) return false;
      if (search.material.length && !p.materials.some((c) => search.material.includes(c))) return false;
      if (p.price < effMin || p.price > effMax) return false;
      return true;
    });
    switch (search.sort) {
      case "price-asc": out = [...out].sort((a, b) => a.price - b.price); break;
      case "price-desc": out = [...out].sort((a, b) => b.price - a.price); break;
      case "newest": out = [...out].sort((a, b) => (b.badge === "Nowość" ? 1 : 0) - (a.badge === "Nowość" ? 1 : 0)); break;
      case "sale": out = [...out].sort((a, b) => (b.oldPrice ? 1 : 0) - (a.oldPrice ? 1 : 0)); break;
      default: out = [...out].sort((a, b) => b.reviews - a.reviews);
    }
    return out;
  }, [catProducts, search, effMin, effMax]);

  const toggle = (key: "color" | "pattern" | "size" | "material", value: string) => {
    const cur = search[key];
    const next = cur.includes(value) ? cur.filter((v: string) => v !== value) : [...cur, value];
    navigate({ search: (prev: Filters) => ({ ...prev, [key]: next }) });
  };

  const clear = () =>
    navigate({ search: () => ({ color: [], pattern: [], size: [], material: [], min: 0, max: 0, sort: search.sort }) });

  const activeChips: { key: "color" | "pattern" | "size" | "material"; value: string; label: string }[] = [
    ...search.color.map((v: string) => ({ key: "color" as const, value: v, label: `Kolor: ${v}` })),
    ...search.pattern.map((v: string) => ({ key: "pattern" as const, value: v, label: `Wzór: ${v}` })),
    ...search.size.map((v: string) => ({ key: "size" as const, value: v, label: `Wymiar: ${v}` })),
    ...search.material.map((v: string) => ({ key: "material" as const, value: v, label: `Materiał: ${v}` })),
  ];

  const totalActive = activeChips.length + (search.min ? 1 : 0) + (search.max ? 1 : 0);

  return (
    <SiteLayout>
      {/* Banner */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden text-white">
        <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative mx-auto max-w-7xl w-full px-6 md:px-8 pb-12">
          <nav className="text-xs text-white/60 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-ember">Strona główna</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/kolekcje" className="hover:text-ember">Kolekcje</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{category.name}</span>
          </nav>
          <div className="eyebrow text-ember mb-3">{category.tagline}</div>
          <h1 className="font-display uppercase text-4xl md:text-6xl lg:text-7xl leading-none">{category.name}</h1>
          <p className="mt-4 text-white/70 max-w-xl">{category.description}</p>
        </div>
      </section>

      {/* Sticky bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileFilters(true)}
            className="lg:hidden inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtry {totalActive > 0 && `(${totalActive})`}
          </button>
          <div className="hidden lg:block text-xs uppercase tracking-widest text-muted-foreground">
            Znaleziono <span className="text-foreground font-bold">{filtered.length}</span>{" "}
            {pluralize(filtered.length, ["produkt", "produkty", "produktów"])}
          </div>
          <select
            value={search.sort}
            onChange={(e) => navigate({ search: (p) => ({ ...p, sort: e.target.value }) })}
            className="text-xs uppercase tracking-widest font-bold bg-transparent border border-border px-4 py-2 focus:outline-none focus:border-ember cursor-pointer"
          >
            {sortOptions.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
      </div>

      <section className="bg-bone py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid lg:grid-cols-[280px_1fr] gap-10">
          {/* Desktop filters */}
          <aside className="hidden lg:block sticky top-40 self-start space-y-8">
            <FilterPanel facets={facets} search={search} toggle={toggle} navigate={navigate} clear={clear} effMin={effMin} effMax={effMax} />
          </aside>

          <div>
            <div className="lg:hidden mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Znaleziono <span className="text-foreground font-bold">{filtered.length}</span>{" "}
              {pluralize(filtered.length, ["produkt", "produkty", "produktów"])}
            </div>

            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeChips.map((c) => (
                  <button
                    key={`${c.key}-${c.value}`}
                    onClick={() => toggle(c.key, c.value)}
                    className="inline-flex items-center gap-2 bg-walnut text-white text-[11px] uppercase tracking-widest px-3 py-1.5 hover:bg-ember hover:text-ink transition"
                  >
                    {c.label} <X className="h-3 w-3" />
                  </button>
                ))}
                <button onClick={clear} className="text-[11px] uppercase tracking-widest px-3 py-1.5 border border-border hover:border-ember hover:text-ember">
                  Wyczyść wszystko
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="bg-white p-16 text-center border border-border">
                <h3 className="font-display uppercase text-2xl mb-3">Brak produktów</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Żaden produkt nie spełnia wybranych kryteriów. Spróbuj rozluźnić filtry.
                </p>
                <button onClick={clear} className="bg-ember text-ink px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-ember-dark">
                  Wyczyść filtry
                </button>
              </div>
            ) : filtered.length === 1 ? (
              <div>
                <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  1 produkt pasujący do wybranych filtrów
                </div>
                <div className="max-w-md mx-auto">
                  <ProductCard product={filtered[0]} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filters sheet */}
      {mobileFilters && (
        <div className="lg:hidden fixed inset-0 z-[80] flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileFilters(false)} />
          <div className="relative ml-auto w-full max-w-sm bg-white flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="font-display uppercase">Filtry</div>
              <button onClick={() => setMobileFilters(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <FilterPanel facets={facets} search={search} toggle={toggle} navigate={navigate} clear={clear} effMin={effMin} effMax={effMax} />
            </div>
            <button
              onClick={() => setMobileFilters(false)}
              className="bg-ember text-ink py-4 text-xs font-bold uppercase tracking-widest"
            >
              Pokaż {filtered.length} {pluralize(filtered.length, ["produkt", "produkty", "produktów"])}
            </button>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

type FilterPanelProps = {
  facets: { colors: string[]; patterns: string[]; sizes: string[]; materials: string[]; priceMin: number; priceMax: number };
  search: Filters;
  toggle: (k: "color" | "pattern" | "size" | "material", v: string) => void;
  navigate: NavFn;
  clear: () => void;
  effMin: number;
  effMax: number;
};

function FilterPanel({ facets, search, toggle, navigate, clear, effMin, effMax }: FilterPanelProps) {
  return (
    <div className="space-y-8 text-sm">
      <button onClick={clear} className="text-[11px] uppercase tracking-widest text-ember hover:text-ember-dark font-bold">
        Wyczyść filtry
      </button>

      <FilterGroup label="Kolor">
        {facets.colors.map((c) => (
          <label key={c} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={search.color.includes(c)}
              onChange={() => toggle("color", c)}
              className="h-4 w-4 accent-ember"
            />
            <span className={cn("text-sm group-hover:text-ember", search.color.includes(c) && "font-bold")}>{c}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup label="Wzór / motyw">
        {facets.patterns.map((c) => (
          <label key={c} className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={search.pattern.includes(c)} onChange={() => toggle("pattern", c)} className="h-4 w-4 accent-ember" />
            <span className={cn("group-hover:text-ember", search.pattern.includes(c) && "font-bold")}>{c}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup label="Wymiar">
        {facets.sizes.map((c) => (
          <label key={c} className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={search.size.includes(c)} onChange={() => toggle("size", c)} className="h-4 w-4 accent-ember" />
            <span className={cn("group-hover:text-ember", search.size.includes(c) && "font-bold")}>{c}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup label="Materiał">
        {facets.materials.map((c) => (
          <label key={c} className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" checked={search.material.includes(c)} onChange={() => toggle("material", c)} className="h-4 w-4 accent-ember" />
            <span className={cn("group-hover:text-ember", search.material.includes(c) && "font-bold")}>{c}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup label="Cena">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{effMin} zł</span>
            <span className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground">{effMax} zł</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Od"
              value={search.min || ""}
              onChange={(e) => navigate({ search: (p: Filters) => ({ ...p, min: Number(e.target.value) || 0 }) })}
              className="border border-border px-3 py-2 text-sm focus:outline-none focus:border-ember"
            />
            <input
              type="number"
              placeholder="Do"
              value={search.max || ""}
              onChange={(e) => navigate({ search: (p: Filters) => ({ ...p, max: Number(e.target.value) || 0 }) })}
              className="border border-border px-3 py-2 text-sm focus:outline-none focus:border-ember"
            />
          </div>
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow text-foreground mb-4 pb-3 border-b border-border">{label}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

// keep ALL for potential future cross-cat search
void ALL;
