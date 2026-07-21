import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "kontakt@mury.pl";
const CONTACT_PHONE = "+48 500 000 000";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Mury" },
      { name: "description", content: "Napisz do nas. Wysyłamy próbki i doradzamy przy realizacjach." },
      { property: "og:title", content: "Kontakt — Mury" },
      { property: "og:description", content: "Napisz do nas. Wysyłamy próbki i doradzamy." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko").max(100),
  email: z.string().trim().email("Nieprawidłowy adres e-mail").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Podaj temat").max(150),
  message: z.string().trim().min(10, "Wiadomość musi mieć min. 10 znaków").max(2000),
  consent: z.literal(true, { message: "Zgoda jest wymagana" }),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const upd = (k: keyof typeof form) => (v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.matchMedia("(max-width: 768px)").matches;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) {
        errs[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});

    const body = `${form.name}\n${form.phone || "—"}\n\n${form.message}`;
    const encSubject = encodeURIComponent(form.subject);
    const encBody = encodeURIComponent(body);

    const url = isMobile()
      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encSubject}&body=${encBody}`
      : `mailto:${CONTACT_EMAIL}?subject=${encSubject}&body=${encBody}`;

    window.open(url, "_blank");
    setSent(true);
  };

  return (
    <SiteLayout>
      <section className="bg-walnut text-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="eyebrow text-ember mb-4">Kontakt</div>
          <h1 className="font-display uppercase text-5xl md:text-7xl leading-none max-w-3xl">
            Porozmawiajmy<br />o twojej ścianie.
          </h1>
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8 grid lg:grid-cols-[1fr_400px] gap-12">
          <form onSubmit={submit} noValidate className="bg-white p-8 md:p-12 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Imię i nazwisko *" error={errors.name}>
                <input value={form.name} onChange={(e) => upd("name")(e.target.value)} className={inp(errors.name)} maxLength={100} />
              </Field>
              <Field label="E-mail *" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => upd("email")(e.target.value)} className={inp(errors.email)} maxLength={255} />
              </Field>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Telefon" error={errors.phone}>
                <input type="tel" value={form.phone} onChange={(e) => upd("phone")(e.target.value)} className={inp(errors.phone)} maxLength={30} />
              </Field>
              <Field label="Temat *" error={errors.subject}>
                <input value={form.subject} onChange={(e) => upd("subject")(e.target.value)} className={inp(errors.subject)} maxLength={150} />
              </Field>
            </div>
            <Field label="Treść wiadomości *" error={errors.message}>
              <textarea rows={6} value={form.message} onChange={(e) => upd("message")(e.target.value)} className={cn(inp(errors.message), "resize-none")} maxLength={2000} />
            </Field>

            <label className="flex items-start gap-3 text-xs text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={form.consent} onChange={(e) => upd("consent")(e.target.checked)} className="mt-0.5 h-4 w-4 accent-ember shrink-0" />
              <span>Wyrażam zgodę na kontakt w celu odpowiedzi na zapytanie zgodnie z polityką prywatności. *</span>
            </label>
            {errors.consent && <p className="text-xs text-destructive -mt-4">{errors.consent}</p>}

            <button type="submit" className="w-full bg-ember text-ink py-4 text-xs font-bold uppercase tracking-widest hover:bg-ember-dark transition">
              Wyślij wiadomość
            </button>

            {sent && (
              <div className="border-l-2 border-ember bg-bone p-4 text-sm">
                Otworzyliśmy dla Ciebie szkic wiadomości — wystarczy kliknąć „wyślij" w swojej poczcie.
              </div>
            )}
          </form>

          <aside className="space-y-8">
            <div>
              <div className="eyebrow text-ember mb-3">Bezpośrednio</div>
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="flex items-start gap-3 py-4 border-b border-border hover:text-ember">
                <Phone className="h-5 w-5 mt-0.5 text-ember" strokeWidth={1.4} />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Telefon</div>
                  <div className="font-display text-lg">{CONTACT_PHONE}</div>
                </div>
              </a>
              <div className="flex items-start gap-3 py-4 border-b border-border">
                <Mail className="h-5 w-5 mt-0.5 text-ember" strokeWidth={1.4} />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</div>
                  <div className="font-display text-lg select-all">{CONTACT_EMAIL}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 py-4 border-b border-border">
                <MapPin className="h-5 w-5 mt-0.5 text-ember" strokeWidth={1.4} />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Showroom</div>
                  <div className="font-display text-lg leading-tight">ul. Prosta 51<br />00-838 Warszawa</div>
                </div>
              </div>
              <div className="flex items-start gap-3 py-4">
                <Clock className="h-5 w-5 mt-0.5 text-ember" strokeWidth={1.4} />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Godziny</div>
                  <div className="font-display text-sm leading-tight">Pon–Pt · 10:00–18:00<br />Sob · 10:00–14:00</div>
                </div>
              </div>
            </div>

            <div className="aspect-4/3 bg-walnut relative overflow-hidden">
              <iframe
                title="Mapa"
                src="https://www.openstreetmap.org/export/embed.html?bbox=20.98,52.22,21.03,52.24&layer=mapnik"
                className="absolute inset-0 h-full w-full grayscale contrast-125"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function inp(err?: string) {
  return cn(
    "w-full border-b bg-transparent py-3 text-sm focus:outline-none transition",
    err ? "border-destructive" : "border-border focus:border-ember",
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground mb-2 block">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
