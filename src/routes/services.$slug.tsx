import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  HardHat,
  Users,
  Construction,
  Layers,
  Fence,
  Car,
  Container,
  type LucideIcon,
} from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";
import { getService, SERVICE_DETAILS, type Bilingual } from "@/data/services";
import { CTASection } from "@/components/site";

const ICONS: Record<string, LucideIcon> = {
  HardHat,
  Users,
  Construction,
  Layers,
  Fence,
  Car,
  Container,
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const item = getService(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ params, loaderData }) => {
    const item = loaderData?.item;
    const name = item?.title.en ?? "Service";
    const path = `/services/${params.slug}`;
    return {
      meta: [
        { title: `${name} — Al Rushd International` },
        { name: "description", content: item?.summary.en ?? "Industrial services from Al Rushd International." },
        { property: "og:title", content: `${name} — Al Rushd International` },
        { property: "og:description", content: item?.summary.en ?? "" },
        { property: "og:url", content: path },
      ],
      links: [{ rel: "canonical", href: path }],
      scripts: item
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Service",
                name: item.title.en,
                description: item.description.en,
                provider: { "@type": "Organization", name: "Al Rushd International" },
                areaServed: "SA",
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Services", item: "/services" },
                  { "@type": "ListItem", position: 2, name: item.title.en, item: path },
                ],
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
  component: ServiceDetail,
});

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container-x py-32 text-center">
      <p className="text-muted-foreground">{t("common.noResults")}</p>
      <Link to="/services" className="mt-4 inline-block font-bold text-accent">
        {t("common.backToServices")}
      </Link>
    </div>
  );
}

function ErrorView({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="container-x py-32 text-center">
      <p className="text-muted-foreground">Something went wrong.</p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="mt-4 font-bold text-accent"
      >
        Try again
      </button>
    </div>
  );
}

function ServiceDetail() {
  const { item } = Route.useLoaderData();
  const { t, pick } = useI18n();
  const Icon = ICONS[item.icon] ?? HardHat;
  const related = SERVICE_DETAILS.filter((s) => s.slug !== item.slug).slice(0, 3);
  const waText = encodeURIComponent(`Hello, I'd like to request a quote for ${item.title.en}.`);

  return (
    <>
      <section className="surface-dark relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, #f5a623 0 2px, transparent 2px 22px)",
          }}
        />
        <div className="container-x relative py-16 md:py-24">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-on-dark-muted hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("common.backToServices")}
          </Link>
          <div className="mt-8 flex items-start gap-5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent">
              <Icon className="h-8 w-8" />
            </span>
            <div>
              <span className="eyebrow">{t("nav.services")}</span>
              <h1 className="mt-2 max-w-3xl text-3xl font-bold text-on-dark md:text-5xl">
                {pick(item.title)}
              </h1>
              <span className="mt-3 inline-flex items-center rounded-md bg-accent px-3 py-1 text-sm font-bold text-accent-foreground shadow">
                {t("common.comingSoon")}
              </span>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted">
            {pick(item.summary)}
          </p>
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 lg:grid-cols-3 lg:py-24">
        <div className="lg:col-span-2">
          <p className="text-base leading-relaxed text-muted-foreground">{pick(item.description)}</p>

          <h2 className="mt-10 font-display text-xl font-bold">{t("common.whatsIncluded")}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {item.includes.map((f: Bilingual, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{pick(f)}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] lg:sticky lg:top-24">
            <h2 className="font-display text-lg font-bold">{t("nav.getQuote")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("home.cta.body")}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
              >
                <CheckCircle2 className="h-4 w-4" />
                {t("nav.getQuote")}
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" />
                {t("common.whatsapp")}
              </a>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary"
              >
                <Phone className="h-4 w-4" />
                {t("common.callNow")}
              </a>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="container-x">
            <h2 className="text-2xl font-bold">{t("common.relatedServices")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const RIcon = ICONS[r.icon] ?? HardHat;
                return (
                  <Link
                    key={r.slug}
                    to="/services/$slug"
                    params={{ slug: r.slug }}
                    className="group rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-accent"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <RIcon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold">{pick(r.title)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{pick(r.summary)}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      {t("common.learnMore")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
