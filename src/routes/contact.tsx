import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useI18n, COMPANY } from "@/lib/i18n";
import { PageHeader } from "@/components/site";
import { EQUIPMENT } from "@/data/equipment";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Request a Quote — Al Rushd International" },
      {
        name: "description",
        content:
          "Contact Al Rushd International for heavy equipment rental quotes. Call, WhatsApp or submit an RFQ — we respond within one business day.",
      },
      { property: "og:title", content: "Contact Us — Al Rushd International" },
      { property: "og:description", content: "Request a heavy equipment rental quote across Saudi Arabia." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { t, pick } = useI18n();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", equipment: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error(t("contact.form.error"));
      return;
    }
    const subject = `RFQ — ${form.equipment || form.company || form.name}`;
    const body = [
      `${t("contact.form.name")}: ${form.name}`,
      `${t("contact.form.company")}: ${form.company || "—"}`,
      `${t("contact.form.email")}: ${form.email}`,
      `${t("contact.form.phone")}: ${form.phone}`,
      `${t("contact.form.equipment")}: ${form.equipment || "—"}`,
      "",
      `${t("contact.form.message")}:`,
      form.message || "—",
    ].join("\n");
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    toast.success(t("contact.form.success"));
    setForm({ name: "", company: "", email: "", phone: "", equipment: "", message: "" });
  };

  const field = "w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm outline-none ring-accent/40 transition focus:ring-2";

  return (
    <>
      <PageHeader eyebrow={t("nav.contact")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-24">
        {/* RFQ form */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8">
          <h2 className="font-display text-2xl font-bold">{t("contact.rfq")}</h2>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">{t("contact.form.name")} *</label>
              <input className={field} value={form.name} onChange={set("name")} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">{t("contact.form.company")}</label>
              <input className={field} value={form.company} onChange={set("company")} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">{t("contact.form.email")} *</label>
              <input type="email" className={field} value={form.email} onChange={set("email")} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">{t("contact.form.phone")} *</label>
              <input type="tel" dir="ltr" className={field} value={form.phone} onChange={set("phone")} required />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium">{t("contact.form.equipment")}</label>
              <select className={field} value={form.equipment} onChange={set("equipment")}>
                <option value="">—</option>
                {EQUIPMENT.map((e) => (
                  <option key={e.id} value={e.name.en}>
                    {pick(e.name)}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium">{t("contact.form.message")}</label>
              <textarea rows={4} className={field} value={form.message} onChange={set("message")} />
            </div>
            <button
              type="submit"
              className="sm:col-span-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
            >
              {t("contact.form.submit")}
            </button>
          </form>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-bold">{t("contact.info.title")}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{t("contact.info.address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <a href={`tel:${COMPANY.phone}`} dir="ltr" className="hover:text-accent">{COMPANY.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-accent">{COMPANY.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{t("contact.info.hours")}</span>
              </li>
            </ul>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-bold text-white"
            >
              <MessageCircle className="h-4 w-4" /> {t("common.whatsapp")}
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
            <iframe
              title="Al Rushd International location"
              src={`https://www.google.com/maps?q=${COMPANY.mapsQuery}&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
