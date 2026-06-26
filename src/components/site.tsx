import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import type { Equipment } from "@/data/equipment";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="surface-dark relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #f5a623 0 2px, transparent 2px 22px)",
        }}
      />
      <div className="container-x relative py-20 md:py-28">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-4 max-w-3xl text-4xl font-bold text-on-dark md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-dark-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  center,
  children,
}: {
  eyebrow?: string;
  title: string;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}

export function EquipmentCard({ item }: { item: Equipment }) {
  const { t, pick } = useI18n();
  return (
    <Link
      to="/fleet/$id"
      params={{ id: item.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={item.image}
          alt={pick(item.name)}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 rounded-md bg-navy/85 px-3 py-1 text-xs font-semibold text-on-dark start-3">
          {t(`cat.${item.category}`)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold">{pick(item.name)}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{pick(item.short)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {t("common.viewDetails")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}

export function CTASection() {
  const { t } = useI18n();
  return (
    <section className="container-x py-20">
      <div className="surface-dark relative overflow-hidden rounded-3xl px-6 py-14 text-center md:px-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{ background: "var(--gradient-accent)" }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-on-dark md:text-4xl">
            {t("home.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-on-dark-muted">{t("home.cta.body")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
            >
              {t("nav.getQuote")}
            </Link>
            <Link
              to="/fleet"
              className="rounded-md border border-white/25 px-6 py-3 text-sm font-bold text-on-dark transition-colors hover:bg-white/10"
            >
              {t("common.exploreFleet")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
