import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useI18n } from "@/lib/i18n";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";
import logoImg from "@/assets/al-rushd-logo.jpg.asset.json";

type Slide = {
  image: string;
  eyebrow: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
};

const SLIDES: Slide[] = [
  {
    image: slide1,
    eyebrow: { en: "Trusted Across the Kingdom", ar: "موثوق في جميع أنحاء المملكة" },
    title: {
      en: "We Power Your Projects with Reliable Equipment Solutions",
      ar: "نُشغّل مشاريعك بحلول معدات موثوقة",
    },
    subtitle: {
      en: "Well-maintained cranes, loaders and forklifts backed by responsive, personal service.",
      ar: "رافعات ولوادر وروافع شوكية جيدة الصيانة مع خدمة شخصية سريعة الاستجابة.",
    },
  },
  {
    image: slide2,
    eyebrow: { en: "Ready When You Are", ar: "جاهزون عند الحاجة" },
    title: {
      en: "Heavy Equipment Rental Built for Every Job Site",
      ar: "تأجير معدات ثقيلة مصمم لكل موقع عمل",
    },
    subtitle: {
      en: "Hand-picked, dependable machines delivered on time and ready to work.",
      ar: "آلات موثوقة مختارة بعناية تُسلَّم في الوقت المحدد وجاهزة للعمل.",
    },
  },
  {
    image: slide3,
    eyebrow: { en: "Precision & Uptime", ar: "دقة وموثوقية" },
    title: {
      en: "Keep Operations Moving with Premium Handling Gear",
      ar: "حافظ على استمرارية العمل مع معدات مناولة متميزة",
    },
    subtitle: {
      en: "Forklifts and telehandlers maintained to the highest standards for safe, steady output.",
      ar: "روافع شوكية وتيليهاندلر تخضع لأعلى معايير الصيانة لأداء آمن ومستقر.",
    },
  },
];

export function HeroCarousel() {
  const { t, pick, dir } = useI18n();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: dir },
    [Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="surface-dark relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <img
                src={slide.image}
                alt={pick(slide.title)}
                width={1920}
                height={1088}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(15,27,45,0.94) 20%, rgba(15,27,45,0.5) 75%, rgba(15,27,45,0.35) 100%)",
                }}
              />
              <div className="container-x relative py-24 md:py-32 lg:py-40">
                <div className="max-w-2xl">
                  <span
                    className={`eyebrow transition-all duration-700 ${
                      selected === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                  >
                    {pick(slide.eyebrow)}
                  </span>
                  <h1
                    className={`mt-5 text-4xl font-bold leading-[1.05] text-on-dark transition-all delay-100 duration-700 sm:text-5xl md:text-6xl ${
                      selected === i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    {pick(slide.title)}
                  </h1>
                  <p
                    className={`mt-6 max-w-xl text-lg leading-relaxed text-on-dark-muted transition-all delay-200 duration-700 ${
                      selected === i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    {pick(slide.subtitle)}
                  </p>
                  <div
                    className={`mt-9 flex flex-wrap gap-3 transition-all delay-300 duration-700 ${
                      selected === i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
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
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/25 bg-navy/40 p-2.5 text-on-dark backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground sm:grid sm:place-items-center start-4 lg:start-8"
      >
        <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/25 bg-navy/40 p-2.5 text-on-dark backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground sm:grid sm:place-items-center end-4 lg:end-8"
      >
        <ChevronRight className="h-5 w-5 rtl:rotate-180" />
      </button>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              selected === i ? "w-8 bg-accent" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
