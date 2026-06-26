import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";
import { PageHeader, FaqAccordion } from "@/components/site";
import { FAQ } from "@/data/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Al Rushd International" },
      {
        name: "description",
        content:
          "Answers to common questions about heavy equipment rental, operators, delivery, terms and availability from Al Rushd International.",
      },
      { property: "og:title", content: "Frequently Asked Questions — Al Rushd International" },
      { property: "og:description", content: "Common questions about renting heavy equipment in Saudi Arabia." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q.en,
            acceptedAnswer: { "@type": "Answer", text: f.a.en },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("nav.faq")} title={t("faq.title")} subtitle={t("faq.subtitle")} />
      <section className="container-x py-16 lg:py-24">
        <FaqAccordion items={FAQ} />

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-secondary p-8 text-center">
          <h2 className="font-display text-xl font-bold">{t("faq.cta")}</h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
            >
              {t("nav.getQuote")}
            </Link>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-bold transition-colors hover:bg-background"
            >
              <MessageCircle className="h-4 w-4" /> {t("common.whatsapp")}
            </a>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-sm font-bold transition-colors hover:bg-background"
            >
              <Phone className="h-4 w-4" /> {t("common.callNow")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
