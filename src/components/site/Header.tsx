import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { categories } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/inspiracje", label: "Inspiracje" },
  { to: "/o-nas", label: "O nas" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [colOpen, setColOpen] = useState(false);
  const { count, open, favorites } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onHero = path === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [path]);

  const dark = scrolled || !onHero || mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        dark ? "bg-walnut text-white shadow-lg" : "bg-transparent text-white",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <Link to="/" className="font-display text-lg tracking-tight uppercase md:text-xl">
          Mury<span className="text-ember">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setColOpen(true)}
            onMouseLeave={() => setColOpen(false)}
          >
            <button className="eyebrow hover:text-ember transition">Kolekcje</button>
            {colOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                <div className="w-72 bg-walnut-deep border border-white/10 shadow-2xl">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to="/kolekcje/$slug"
                      params={{ slug: c.slug }}
                      className="block px-5 py-3 text-sm text-white/80 hover:text-ember hover:bg-white/5 border-b border-white/5 last:border-0"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="eyebrow hover:text-ember transition">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block hover:text-ember transition" aria-label="Szukaj">
            <Search className="h-5 w-5" strokeWidth={1.4} />
          </button>
          <Link to="/kolekcje" className="hidden sm:block hover:text-ember transition relative" aria-label="Ulubione">
            <Heart className="h-5 w-5" strokeWidth={1.4} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-ember text-[10px] text-ink flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </Link>
          <button onClick={open} className="hover:text-ember transition relative" aria-label="Koszyk">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-ember text-[10px] text-ink flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </button>
          <button
            className="lg:hidden hover:text-ember transition"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-walnut-deep min-h-[calc(100vh-4rem)] px-6 py-8 space-y-6 overflow-y-auto">
          <div>
            <div className="eyebrow text-ember mb-4">Kolekcje</div>
            <div className="space-y-3">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/kolekcje/$slug"
                  params={{ slug: c.slug }}
                  className="block font-display text-2xl uppercase hover:text-ember"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 space-y-3">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="block font-display text-2xl uppercase hover:text-ember">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
