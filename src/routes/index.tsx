import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Headset,
  CalendarClock,
  CheckCircle2,
  Building2,
  Fuel,
  Construction,
  Mountain,
  Warehouse,
  Tent,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import yardImg from "@/assets/yard.jpg";
import { useI18n } from "@/lib/i18n";
import { CATEGORIES, EQUIPMENT } from "@/data/equipment";
import { FAQ } from "@/data/faq";
import { EquipmentCard, SectionHeading, CTASection, Testimonials, FaqAccordion } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Rushd International — Heavy Equipment Rental in Saudi Arabia" },
      {
        name: "description",
        content:
          "Rent cranes, excavators, loaders, forklifts and generators from Al Rushd International. Maintained fleet, certified operators and 24/7 support across the Kingdom.",
      },
      { property: "og:title", content: "Al Rushd International — Heavy Equipment Rental" },
      {
        property: "og:description",
        content: "Maintained fleet, certified operators and 24/7 support across Saudi Arabia.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const WHY_ICONS = [ShieldCheck, Users, Headset, CalendarClock];

function Home() {
  const { t, pick } = useI18n();
  const featured = EQUIPMENT.filter((e) => e.featured);

  const stats = [
    { value: "350+", key: "hero.stat1" },
    { value: "12+", key: "hero.stat2" },
    { value: "24/7", key: "hero.stat3" },
    { value: "500+", key: "hero.stat4" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="surface-dark relative overflow-hidden">
        <img
          src={heroImg}
          alt="Heavy construction equipment at a Saudi work site at dusk"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(15,27,45,0.96) 25%, rgba(15,27,45,0.55) 100%)" }}
        />
        <div className="container-x relative py-24 md:py-36">
          <div className="max-w-2xl animate-fade-up">
            <span className="eyebrow">{t("hero.eyebrow")}</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] text-on-dark sm:text-5xl md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
              >
                {t("common.exploreFleet")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md border border-white/25 px-6 py-3.5 text-sm font-bold text-on-dark transition-colors hover:bg-white/10"
              >
                {t("nav.getQuote")}
              </Link>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="relative border-t border-white/10 bg-navy/60 backdrop-blur">
          <div className="container-x grid grid-cols-2 gap-px md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.key} className="py-7 text-center">
                <div className="font-display text-3xl font-bold text-accent md:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-on-dark-muted">
                  {t(s.key)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
          <img
            src={yardImg}
            alt="Al Rushd International equipment yard"
            loading="lazy"
            width={1400}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <SectionHeading eyebrow={t("home.about.eyebrow")} title={t("home.about.title")}>
            {t("home.about.body")}
          </SectionHeading>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {["why.1.title", "why.2.title", "why.3.title", "why.4.title"].map((k) => (
              <li key={k} className="flex items-center gap-2.5 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                {t(k)}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent"
          >
            {t("common.learnMore")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading center eyebrow={t("home.cats.eyebrow")} title={t("home.cats.title")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to="/fleet"
                className="group relative aspect-[4/5] overflow-hidden rounded-xl"
              >
                <img
                  src={c.image}
                  alt={t(c.key)}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl font-bold text-on-dark">{t(c.key)}</h3>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    {t("common.exploreFleet")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured equipment */}
      <section className="container-x py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={t("home.featured.eyebrow")} title={t("home.featured.title")} />
          <Link to="/fleet" className="inline-flex items-center gap-2 text-sm font-bold text-accent">
            {t("common.exploreFleet")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading center eyebrow={t("home.why.eyebrow")} title={t("home.why.title")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ICONS.map((Icon, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{t(`why.${i + 1}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`why.${i + 1}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
