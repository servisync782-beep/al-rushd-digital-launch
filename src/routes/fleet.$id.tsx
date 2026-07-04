import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  Download,
  Circle,
  ChevronRight,
  Cog,
  Gauge,
  MoveHorizontal,
  SlidersHorizontal,
  Armchair,
  Navigation,
  ShieldCheck,
  FileText,
  Send,
} from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";
import { getEquipment, relatedEquipment, type Spec, type Bilingual } from "@/data/equipment";
import { EquipmentCard, CTASection } from "@/components/site";
import { ProductGallery } from "@/components/ProductGallery";
import { RentalEnquiryForm } from "@/components/RentalEnquiryForm";

export const Route = createFileRoute("/fleet/$id")({
  loader: ({ params }) => {
    const item = getEquipment(params.id);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ params, loaderData }) => {
    const item = loaderData?.item;
    const name = item?.name.en ?? "Equipment";
    const path = `/fleet/${params.id}`;
    const shareImage = item?.gallery?.[0] ?? item?.image;
    return {
      meta: [
        { title: `${name} — Al Rushd International` },
        { name: "description", content: item?.short.en ?? "Heavy equipment for rent." },
        { property: "og:title", content: `${name} — Al Rushd International` },
        { property: "og:description", content: item?.short.en ?? "" },
        { property: "og:type", content: "product" },
        { property: "og:url", content: path },
        ...(shareImage ? [{ property: "og:image", content: shareImage }] : []),
      ],
      links: [{ rel: "canonical", href: path }],
      scripts: item
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: item.name.en,
                description: item.description.en,
                image: item.gallery ?? [item.image],
                category: item.category,
                brand: { "@type": "Brand", name: item.brand?.en ?? "Al Rushd International" },
                additionalProperty: item.specs.map((s) => ({
                  "@type": "PropertyValue",
                  name: s.label.en,
                  value: s.value.en,
                })),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                  { "@type": "ListItem", position: 2, name: "Fleet", item: "/fleet" },
                  { "@type": "ListItem", position: 3, name: item.name.en, item: path },
                ],
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
  component: Detail,
});

const FEATURE_ICONS = [
  Cog,
  Gauge,
  MoveHorizontal,
  SlidersHorizontal,
  Armchair,
  Navigation,
  ShieldCheck,
  FileText,
];

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container-x py-32 text-center">
      <p className="text-muted-foreground">{t("common.noResults")}</p>
      <Link to="/fleet" className="mt-4 inline-block font-bold text-accent">
        {t("common.backToFleet")}
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

function Detail() {
  const { item } = Route.useLoaderData();
  const { t, pick } = useI18n();
  const related = relatedEquipment(item);
  const gallery = item.gallery ?? [item.image];
  const isComingSoon = item.availability === "coming_soon";
  const waText = encodeURIComponent(
    `Hello, I'd like to enquire about renting the ${item.name.en}.`,
  );

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/50">
        <div className="container-x flex flex-wrap items-center gap-1.5 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">
            {t("nav.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
          <Link to="/fleet" className="hover:text-accent">
            {t("nav.fleet")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
          <span className="font-semibold text-foreground">{pick(item.name)}</span>
        </div>
      </nav>

      {/* Hero: gallery + summary */}
      <section className="container-x grid gap-10 py-10 lg:grid-cols-2 lg:py-14">
        <ProductGallery images={gallery} alt={pick(item.name)} />

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{t(`cat.${item.category}`)}</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                item.availability === "available"
                  ? "bg-green-500/15 text-green-700 dark:text-green-400"
                  : isComingSoon
                    ? "bg-accent text-accent-foreground shadow"
                    : "bg-accent/15 text-accent"
              }`}
            >
              {!isComingSoon && (
                <Circle
                  className={`h-2 w-2 fill-current ${
                    item.availability === "available" ? "text-green-600" : "text-accent"
                  }`}
                />
              )}
              {t(`common.${item.availability}`)}
            </span>
          </div>

          {item.brand && (
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-accent">
              {pick(item.brand)}
            </p>
          )}
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">{pick(item.name)}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{pick(item.short)}</p>

          {/* Quick spec highlights */}
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {item.specs.slice(0, 4).map((s: Spec, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <dt className="text-xs text-muted-foreground">{pick(s.label)}</dt>
                <dd className="mt-1 font-display font-bold">{pick(s.value)}</dd>
              </div>
            ))}
          </dl>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" />
              {t("common.rentalEnquiry")}
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              {t("common.whatsapp")}
            </a>
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary"
            >
              <Phone className="h-4 w-4" />
              {t("common.callNow")}
            </a>
            <a
              href={COMPANY.brochure}
              download
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary"
            >
              <Download className="h-4 w-4" />
              {t("common.downloadBrochure")}
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container-x py-14">
          <span className="eyebrow">{t("common.overview")}</span>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-muted-foreground">
            {pick(item.description)}
          </p>
        </div>
      </section>

      {/* Feature cards */}
      {item.features.length > 0 && (
        <section className="container-x py-14">
          <h2 className="text-2xl font-bold md:text-3xl">{t("common.keyFeatures")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {item.features.map((f: Bilingual, i: number) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-accent"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm font-semibold leading-relaxed">{pick(f)}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Specifications */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container-x py-14">
          <h2 className="text-2xl font-bold md:text-3xl">{t("common.specifications")}</h2>
          <dl className="mt-8 grid gap-x-10 gap-y-0 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
            {item.specs.map((s: Spec, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 text-sm last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
              >
                <dt className="text-muted-foreground">{pick(s.label)}</dt>
                <dd className="text-end font-semibold">{pick(s.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Rental enquiry form */}
      <section id="enquiry" className="container-x scroll-mt-24 py-16">
        <div className="mx-auto max-w-3xl">
          <RentalEnquiryForm equipmentName={item.name.en} />
        </div>
      </section>

      {/* Related equipment */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary py-16">
          <div className="container-x">
            <h2 className="text-2xl font-bold">{t("common.relatedEquipment")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <EquipmentCard key={r.id} item={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
