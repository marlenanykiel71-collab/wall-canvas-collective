import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Heart, Minus, Plus, ShieldCheck, Star, Truck, Wrench } from "lucide-react";
import { useState } from "react";
import { getProduct, products } from "@/data/catalog";
import { formatPrice, useCart } from "@/lib/cart";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produkt/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Produkt — Mury" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Mury` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.name} — Mury` },
        { property: "og:description", content: p.short },
        { property: "og:image", content: p.images[0] },
        { name: "twitter:image", content: p.images[0] },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, favorites, toggleFav } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [openTab, setOpenTab] = useState("opis");

  const isFav = favorites.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <div className="bg-bone">
        <div className="mx-auto max-w-7xl px-6 md:px-8 py-6">
          <nav className="text-xs text-muted-foreground flex items-center gap-2">
            <Link to="/" className="hover:text-ember">Strona główna</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/kolekcje/$slug" params={{ slug: product.category }} className="hover:text-ember">
              Kolekcja
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden bg-bone group">
              <img
                src={product.images[img] ?? product.images[0]}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-ember text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  {product.badge}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImg(i)}
                    className={cn("aspect-square w-20 overflow-hidden border-2", img === i ? "border-ember" : "border-transparent")}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex gap-1 text-ember mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-current" : "opacity-30")} strokeWidth={1} />
              ))}
              <span className="ml-2 text-xs text-muted-foreground">{product.rating} · {product.reviews} opinii</span>
            </div>
            <h1 className="font-display uppercase text-3xl md:text-5xl leading-none">{product.name}</h1>
            <p className="mt-4 text-muted-foreground">{product.short}</p>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-4xl">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg line-through text-muted-foreground">{formatPrice(product.oldPrice)}</span>
              )}
              <span className="text-xs text-muted-foreground uppercase tracking-widest">/ {product.unit}</span>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <div className="eyebrow mb-3">Kolor · {color}</div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={cn(
                        "px-4 py-2 text-xs uppercase tracking-widest border transition",
                        color === c ? "border-ember bg-ember text-ink font-bold" : "border-border hover:border-ember",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="eyebrow mb-3">Wymiar</div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        "px-4 py-2 text-xs uppercase tracking-widest border transition",
                        size === s ? "border-ember bg-ember text-ink font-bold" : "border-border hover:border-ember",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="eyebrow mb-3">Ilość ({product.unit})</div>
                <div className="inline-flex items-center border border-border">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-bone"><Minus className="h-4 w-4" /></button>
                  <span className="px-6 font-display text-lg">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:bg-bone"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <button
                onClick={() =>
                  add({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    variant: `${color} · ${size}`,
                    qty,
                    unit: product.unit,
                  })
                }
                className="w-full bg-ember text-ink py-4 text-xs font-bold uppercase tracking-widest hover:bg-ember-dark transition"
              >
                Dodaj do koszyka · {formatPrice(product.price * qty)}
              </button>
              <div className="flex gap-3">
                <button className="flex-1 border border-foreground py-4 text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition">
                  Zamów próbkę
                </button>
                <button
                  onClick={() => toggleFav(product.id)}
                  className={cn("border border-border w-14 flex items-center justify-center hover:border-ember", isFav && "text-ember border-ember")}
                >
                  <Heart className={cn("h-5 w-5", isFav && "fill-current")} strokeWidth={1.4} />
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <UspSmall icon={Truck} label="Darmowa dostawa od 500 zł" />
              <UspSmall icon={Wrench} label="Łatwy montaż" />
              <UspSmall icon={ShieldCheck} label="Gwarancja jakości" />
            </div>

            <div className="mt-10 border-t border-border">
              {[
                { id: "opis", label: "Opis szczegółowy", body: product.description },
                { id: "params", label: "Parametry techniczne", body: `Materiał: ${product.materials.join(", ")}. Wymiary: ${product.sizes.join(", ")}. Wzór: ${product.patterns.join(", ")}.` },
                { id: "dostawa", label: "Dostawa i zwroty", body: "Wysyłka 2–5 dni roboczych. 14 dni na zwrot bez podania przyczyny." },
                { id: "care", label: "Pielęgnacja", body: "Czyścić miękką, wilgotną ściereczką. Nie stosować środków ściernych." },
              ].map((t) => (
                <div key={t.id} className="border-b border-border">
                  <button
                    onClick={() => setOpenTab(openTab === t.id ? "" : t.id)}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <span className="text-xs uppercase tracking-widest font-bold">{t.label}</span>
                    <Plus className={cn("h-4 w-4 transition-transform", openTab === t.id && "rotate-45")} />
                  </button>
                  {openTab === t.id && <p className="pb-4 text-sm text-muted-foreground">{t.body}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-bone py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="eyebrow text-ember mb-3">Z tej kolekcji</div>
            <h2 className="font-display uppercase text-3xl md:text-4xl mb-10">Zobacz też.</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}

function UspSmall({ icon: Icon, label }: { icon: typeof Truck; label: string }) {
  return (
    <div className="text-center">
      <Icon className="h-5 w-5 mx-auto text-ember mb-2" strokeWidth={1.2} />
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}
