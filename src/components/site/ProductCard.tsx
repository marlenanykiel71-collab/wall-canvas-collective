import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/data/catalog";
import { formatPrice, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const { add, favorites, toggleFav } = useCart();
  const isFav = favorites.includes(product.id);
  const hover = product.images[1] ?? product.images[0];

  return (
    <div className={cn("group relative bg-white", featured && "md:col-span-2 md:row-span-2")}>
      <Link
        to="/produkt/$slug"
        params={{ slug: product.slug }}
        className="block relative overflow-hidden bg-muted"
      >
        <div className={cn("relative w-full", featured ? "aspect-4/3" : "aspect-3/4")}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={hover}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover scale-105 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-ember text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1">
            {product.badge}
          </span>
        )}
      </Link>

      <button
        onClick={() => toggleFav(product.id)}
        className={cn(
          "absolute top-3 right-3 h-9 w-9 flex items-center justify-center bg-white/90 backdrop-blur transition",
          isFav ? "text-ember" : "text-ink hover:text-ember",
        )}
        aria-label="Ulubione"
      >
        <Heart className={cn("h-4 w-4", isFav && "fill-current")} strokeWidth={1.5} />
      </button>

      <div className="pt-5 pb-6 space-y-2">
        <div className="flex items-center gap-1 text-ember">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn("h-3 w-3", i < Math.round(product.rating) ? "fill-current" : "opacity-30")}
              strokeWidth={1}
            />
          ))}
          <span className="ml-1 text-[11px] text-muted-foreground">({product.reviews})</span>
        </div>
        <Link to="/produkt/$slug" params={{ slug: product.slug }}>
          <h3 className="font-display uppercase text-base tracking-tight hover:text-ember transition">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-1">{product.short}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs line-through text-muted-foreground">{formatPrice(product.oldPrice)}</span>
            )}
            <span className="text-[10px] text-muted-foreground">/ {product.unit}</span>
          </div>
          <button
            onClick={() =>
              add({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                variant: `${product.colors[0]} · ${product.sizes[0]}`,
                qty: 1,
                unit: product.unit,
              })
            }
            className="text-[10px] font-bold uppercase tracking-widest text-ink border-b border-ink hover:text-ember hover:border-ember transition"
          >
            + Koszyk
          </button>
        </div>
      </div>
    </div>
  );
}
