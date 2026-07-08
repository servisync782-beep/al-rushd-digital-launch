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
import yardImg from "@/assets/yard.jpg";
import { useI18n } from "@/lib/i18n";
import { CATEGORIES, EQUIPMENT } from "@/data/equipment";
import { FAQ } from "@/data/faq";
import { EquipmentCard, SectionHeading, CTASection, FaqAccordion, Reveal } from "@/components/site";
import { HeroCarousel } from "@/components/HeroCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Rushd International — Heavy Equipment Rental in Saudi Arabia" },
      {
        name: "description",
        content:
          "Al Rushd International offers dependable forklift rental in Saudi Arabia — well-maintained equipment, flexible terms and responsive, personal service.",
      },
      { property: "og:title", content: "Al Rushd International — Forklift & Equipment Rental" },
      {
        property: "og:description",
        content: "Well-maintained equipment, flexible rental terms and responsive service across Saudi Arabia.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const WHY_ICONS = [ShieldCheck, Users, Headset, CalendarClock];
const INDUSTRY_ICONS = [Building2, Fuel, Construction, Mountain, Warehouse, Tent];

const TRUST_ICONS = [ShieldCheck, Headset, CalendarClock, Building2];

function Home() {
  const { t, pick } = useI18n();
  const featured = EQUIPMENT.filter((e) => e.featured);

  const trust = [
    { key: "point1", Icon: TRUST_ICONS[0] },
    { key: "point2", Icon: TRUST_ICONS[1] },
    { key: "point3", Icon: TRUST_ICONS[2] },
    { key: "point4", Icon: TRUST_ICONS[3] },
  ];

  return (
    <>
      {/* Hero carousel */}
      <HeroCarousel />

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
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 90}>
                <Link
                  to="/fleet"
                  className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
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
              </Reveal>
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
          {featured.map((item, i) => (
            <Reveal key={item.id} delay={i * 90}>
              <EquipmentCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading center eyebrow={t("home.why.eyebrow")} title={t("home.why.title")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ICONS.map((Icon, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="h-full rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-accent">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{t(`why.${i + 1}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`why.${i + 1}.body`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries served */}
      <section className="container-x py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={t("home.industries.eyebrow")} title={t("home.industries.title")} />
          <Link to="/industries" className="inline-flex items-center gap-2 text-sm font-bold text-accent">
            {t("common.viewAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_ICONS.map((Icon, i) => (
            <Reveal key={i} delay={i * 70}>
              <Link
                to="/industries"
                className="group flex h-full gap-5 rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy text-on-dark transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{t(`industry.${i + 1}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`industry.${i + 1}.body`)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Client trust band */}
      <section className="surface-dark relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, #f5a623 0 2px, transparent 2px 22px)",
          }}
        />
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-[1fr_auto] lg:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">{t("home.clients.eyebrow")}</span>
            <h2 className="mt-3 text-3xl font-bold text-on-dark md:text-4xl">{t("home.clients.title")}</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-on-dark-muted">{t("home.clients.body")}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {trust.map(({ key, Icon }, i) => (
              <Reveal
                key={key}
                delay={i * 90}
                className="rounded-2xl border border-white/10 bg-navy-light/40 p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-4 font-display text-base font-bold text-on-dark">
                  {t(`home.clients.${key}.title`)}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-on-dark-muted">
                  {t(`home.clients.${key}.body`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20 lg:py-28">
        <SectionHeading center eyebrow={t("home.faq.eyebrow")} title={t("home.faq.title")} />
        <div className="mt-12">
          <FaqAccordion items={FAQ.slice(0, 4)} />
        </div>
        <div className="mt-8 text-center">
          <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-accent">
            {t("common.viewAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      <CTASection />

    </>
  );
}
