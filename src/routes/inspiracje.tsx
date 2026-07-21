import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/inspiracje")({
  head: () => ({
    meta: [
      { title: "Inspiracje — Mury" },
      { name: "description", content: "Galeria realizacji wnętrz z naszymi wykończeniami." },
      { property: "og:title", content: "Inspiracje — Mury" },
      { property: "og:description", content: "Realizacje wnętrz z naszymi wykończeniami." },
    ],
  }),
  component: InspiracjePage,
});

const gallery = [
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
];

function InspiracjePage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <SiteLayout>
      <section className="bg-walnut text-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="eyebrow text-ember mb-4">Realizacje</div>
          <h1 className="font-display uppercase text-5xl md:text-7xl leading-none max-w-3xl">
            Wnętrza,<br />które opowiadają.
          </h1>
        </div>
      </section>

      <section className="bg-ink py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setOpen(src)}
              className={`relative overflow-hidden group ${i % 5 === 0 ? "aspect-4/5" : "aspect-square"}`}
            >
              <img src={src} alt="Realizacja" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-ember/0 group-hover:bg-ember/20 transition" />
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center p-6" onClick={() => setOpen(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-ember" onClick={() => setOpen(null)}>
            <X className="h-8 w-8" />
          </button>
          <img src={open} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
        </div>
      )}
    </SiteLayout>
  );
}
