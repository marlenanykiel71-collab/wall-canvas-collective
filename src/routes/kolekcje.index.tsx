import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/catalog";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/kolekcje/")({
  head: () => ({
    meta: [
      { title: "Kolekcje — Mury" },
      { name: "description", content: "Pięć kolekcji wykończeń: panele 3D, lamele, tapety, PCV, drzwi." },
      { property: "og:title", content: "Kolekcje — Mury" },
      { property: "og:description", content: "Pięć kolekcji wykończeń wnętrz." },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <SiteLayout>
      <section className="bg-walnut text-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="eyebrow text-ember mb-4">Kolekcje</div>
          <h1 className="font-display uppercase text-5xl md:text-7xl leading-none max-w-3xl">
            Pięć światów<br />jednej marki.
          </h1>
          <p className="mt-6 text-white/70 max-w-xl">
            Wybierz kategorię i przejdź do listy produktów. Filtruj po kolorze, materiale, wymiarze i cenie.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid gap-4 md:grid-cols-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/kolekcje/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden aspect-4/3 border border-transparent hover:border-ember transition"
            >
              <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 card-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <div className="eyebrow text-ember mb-2">{c.tagline}</div>
                <h2 className="font-display uppercase text-2xl md:text-3xl">{c.name}</h2>
                <p className="mt-2 text-sm text-white/70 max-w-md">{c.description}</p>
                <div className="mt-4 eyebrow inline-flex items-center gap-2 group-hover:text-ember">
                  Zobacz <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
