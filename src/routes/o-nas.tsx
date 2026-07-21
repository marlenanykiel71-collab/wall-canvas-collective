import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nas — Mury" },
      { name: "description", content: "Marka wykończeń wnętrz. Projektujemy, nie sprzedajemy z hurtowni." },
      { property: "og:title", content: "O nas — Mury" },
      { property: "og:description", content: "Marka wykończeń wnętrz z charakterem." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative h-[70vh] min-h-[500px] flex items-end text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative mx-auto max-w-7xl w-full px-6 md:px-8 pb-16">
          <div className="eyebrow text-ember mb-4">O nas</div>
          <h1 className="font-display uppercase text-5xl md:text-7xl lg:text-[90px] leading-none max-w-4xl">
            Nie sprzedajemy<br />materiałów.<br /><span className="text-ember">Projektujemy tło.</span>
          </h1>
        </div>
      </section>

      <section className="bg-bone py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8 space-y-8 text-lg leading-relaxed">
          <p>
            Zaczęliśmy od jednej ściany. Panelu, który miał być kompromisem, a stał się deklaracją.
            Od tamtego wieczora zbudowaliśmy pięć kolekcji, każdą projektowaną jak apartament — z pomysłem, dyscypliną i długim życiem.
          </p>
          <p>
            Nie prowadzimy hurtowni. Prowadzimy studio. Wybieramy materiały, których nie wstyd dotknąć.
            Fakturę sprawdzamy palcami zanim trafi na katalog. Kolor porównujemy w trzech różnych światłach.
          </p>
          <p className="font-display uppercase text-3xl text-ember">
            Twoja przestrzeń, twoje zasady.
          </p>
        </div>
      </section>

      <section className="bg-walnut text-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid md:grid-cols-3 gap-12">
          {[
            { n: "07", t: "Lat na rynku", b: "Od pierwszej realizacji do sieci showroomów." },
            { n: "5 000+", t: "Wnętrz z naszymi materiałami", b: "Domy, biura, hotele, restauracje." },
            { n: "48h", t: "Wysyłka próbek", b: "Zanim zdecydujesz — dotknij." },
          ].map((s) => (
            <div key={s.n}>
              <div className="font-display text-ember text-6xl md:text-7xl">{s.n}</div>
              <div className="mt-4 eyebrow">{s.t}</div>
              <p className="mt-3 text-sm text-white/70 max-w-xs">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bone py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display uppercase text-4xl md:text-5xl">Zaczniemy od twojej ściany?</h2>
          <Link to="/kontakt" className="inline-block mt-8 bg-ember text-ink px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-ember-dark">
            Skontaktuj się
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
