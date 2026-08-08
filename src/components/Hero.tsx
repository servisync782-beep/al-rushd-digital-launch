import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-refinery.jpg";

export function Hero() {
  const { t, pick } = useI18n();

  return (
    <section className="surface-dark relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt="Industrial plant at dusk"
        width={1920}
        height={1088}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,27,45,0.86) 0%, rgba(15,27,45,0.55) 40%, rgba(15,27,45,0.88) 100%)",
        }}
      />

      <div className="container-x relative flex min-h-[72vh] flex-col justify-center py-24 md:min-h-[80vh] md:py-32">
        <span className="eyebrow">{pick({ en: "Beyond Expectations", ar: "ما يفوق التوقعات" })}</span>

        <h1 className="mt-6 font-brand text-5xl font-normal leading-[1.05] tracking-[0.06em] text-on-dark sm:text-6xl lg:text-7xl">
          {pick({ en: "AL RUSHD", ar: "الرشد" })}
          <span className="mt-2 block font-brand text-2xl font-normal tracking-[0.14em] text-on-dark-muted sm:text-3xl lg:text-4xl">
            {pick({ en: "INTERNATIONAL COMPANY", ar: "الدولية" })}
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-dark-muted">
          {pick({
            en: "Heavy equipment rental, industrial supply and site services for construction, energy and logistics projects across the Kingdom — delivered with reliability and responsive, personal service.",
            ar: "تأجير المعدات الثقيلة والتوريد الصناعي وخدمات المواقع لمشاريع الإنشاء والطاقة واللوجستيات في جميع أنحاء المملكة — بموثوقية وخدمة شخصية سريعة الاستجابة.",
          })}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
          >
            {t("common.requestQuote")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <Link
            to="/fleet"
            className="inline-flex items-center rounded-md border border-white/25 px-7 py-3.5 text-sm font-bold text-on-dark transition-colors hover:bg-white/10"
          >
            {t("common.exploreFleet")}
          </Link>
        </div>
      </div>
    </section>
  );
}
