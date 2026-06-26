import { createFileRoute } from "@tanstack/react-router";
import { Building2, Fuel, Construction, Mountain, Warehouse, Tent } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader, CTASection } from "@/components/site";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Al Rushd International" },
      {
        name: "description",
        content:
          "Al Rushd International supports construction, oil & gas, infrastructure, mining, logistics and utilities projects across Saudi Arabia.",
      },
      { property: "og:title", content: "Industries We Serve — Al Rushd International" },
      { property: "og:description", content: "Equipment for construction, oil & gas, infrastructure and more." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: Industries,
});

const ICONS = [Building2, Fuel, Construction, Mountain, Warehouse, Tent];

function Industries() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("nav.industries")} title={t("industries.title")} subtitle={t("industries.subtitle")} />
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ICONS.map((Icon, i) => (
            <div key={i} className="flex gap-5 rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy text-on-dark">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{t(`industry.${i + 1}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`industry.${i + 1}.body`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
