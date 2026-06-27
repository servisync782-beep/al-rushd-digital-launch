import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, UserCog, Zap, PackageCheck, Wrench, ClipboardList, HardHat, Users, Construction, Layers, Fence, Car, Container, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader, CTASection } from "@/components/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Al Rushd International" },
      {
        name: "description",
        content:
          "Equipment rental, operated rentals, on-site power, logistics, maintenance and project consultation from Al Rushd International across Saudi Arabia.",
      },
      { property: "og:title", content: "Our Services — Al Rushd International" },
      { property: "og:description", content: "End-to-end heavy equipment rental solutions." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Truck, n: 1 },
  { icon: UserCog, n: 2 },
  { icon: Zap, n: 3 },
  { icon: PackageCheck, n: 4 },
  { icon: Wrench, n: 5 },
  { icon: ClipboardList, n: 6 },
  { icon: HardHat, n: 7, slug: "industrial-safety-material-supply" },
  { icon: Users, n: 8, slug: "manpower-supply" },
  { icon: Construction, n: 9, slug: "asphalt-road-marking" },
  { icon: Layers, n: 10, slug: "scaffolding-services" },
  { icon: Fence, n: 11, slug: "fencing-works" },
  { icon: Car, n: 12, slug: "vehicle-rentals" },
  { icon: Container, n: 13, slug: "portable-cabin-services" },
] as const;

function Services() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("nav.services")} title={t("services.title")} subtitle={t("services.subtitle")} />
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, n }) => (
            <div
              key={n}
              className="group rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-accent"
            >
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">{t(`service.${n}.title`)}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t(`service.${n}.body`)}</p>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
