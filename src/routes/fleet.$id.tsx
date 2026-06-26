import { createFileRoute, Link, useRouter, notFound } from "@tanstack/react-router";
import { ArrowLeft, Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";
import { getEquipment, relatedEquipment, type Spec } from "@/data/equipment";
import { EquipmentCard, CTASection } from "@/components/site";

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
    return {
      meta: [
        { title: `${name} — Al Rushd International` },
        { name: "description", content: item?.short.en ?? "Heavy equipment for rent." },
        { property: "og:title", content: `${name} — Al Rushd International` },
        { property: "og:description", content: item?.short.en ?? "" },
        { property: "og:type", content: "product" },
        { property: "og:url", content: path },
        ...(item ? [{ property: "og:image", content: item.image }] : []),
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
                image: item.image,
                category: item.category,
                brand: { "@type": "Brand", name: "Al Rushd International" },
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
                  { "@type": "ListItem", position: 1, name: "Fleet", item: "/fleet" },
                  { "@type": "ListItem", position: 2, name: item.name.en, item: path },
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
  const waText = encodeURIComponent(`Hello, I'd like to enquire about renting the ${item.name.en}.`);

  return (
    <>
      <div className="container-x pt-10">
        <Link to="/fleet" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("common.backToFleet")}
        </Link>
      </div>

      <section className="container-x grid gap-10 py-10 lg:grid-cols-2 lg:py-14">
        <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-[var(--shadow-card)]">
          <img src={item.image} alt={pick(item.name)} width={800} height={600} className="h-full w-full object-cover" />
        </div>

        <div>
          <span className="eyebrow">{t(`cat.${item.category}`)}</span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{pick(item.name)}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{pick(item.description)}</p>

          <h2 className="mt-8 font-display text-lg font-bold">{t("common.specifications")}</h2>
          <dl className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {item.specs.map((s: Spec, i: number) => (
              <div key={i} className="flex items-center justify-between gap-4 bg-card px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{pick(s.label)}</dt>
                <dd className="font-semibold">{pick(s.value)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              {t("common.requestQuote")}
            </Link>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary"
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
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary py-16">
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

