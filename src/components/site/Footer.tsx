import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { categories } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="font-display text-2xl text-white uppercase">
              Mury<span className="text-ember">.</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Historia zaczyna się od jednej ściany. Projektujemy wykończenia dla wnętrz z charakterem.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="hover:text-ember" aria-label="Instagram"><Instagram className="h-5 w-5" strokeWidth={1.4} /></a>
              <a href="#" className="hover:text-ember" aria-label="Facebook"><Facebook className="h-5 w-5" strokeWidth={1.4} /></a>
              <a href="#" className="hover:text-ember" aria-label="Youtube"><Youtube className="h-5 w-5" strokeWidth={1.4} /></a>
            </div>
          </div>

          <div>
            <div className="eyebrow text-white mb-5">Kolekcje</div>
            <ul className="space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to="/kolekcje/$slug" params={{ slug: c.slug }} className="hover:text-ember">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow text-white mb-5">Marka</div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/o-nas" className="hover:text-ember">O nas</Link></li>
              <li><Link to="/inspiracje" className="hover:text-ember">Inspiracje</Link></li>
              <li><Link to="/kontakt" className="hover:text-ember">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-white mb-5">Newsletter</div>
            <p className="text-sm mb-4">Nowe kolekcje i inspiracje, raz w miesiącu.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border border-white/20 focus-within:border-ember"
            >
              <input
                type="email"
                required
                placeholder="Twój e-mail"
                className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none"
              />
              <button className="bg-ember px-4 py-3 text-xs uppercase font-bold text-ink hover:bg-ember-dark">
                Zapisz
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Mury. Wszystkie prawa zastrzeżone.</span>
          <span>Regulamin · Polityka prywatności · Zwroty</span>
        </div>
      </div>
    </footer>
  );
}
