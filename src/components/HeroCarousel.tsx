import { useCallback, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useI18n } from "@/lib/i18n";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";

type Cta = { label: { en: string; ar: string }; to: "/contact" | "/fleet"; primary?: boolean };

type Slide = {
  image: string;
  eyebrow: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  ctas: Cta[];
};

const SLIDES: Slide[] = [
  {
    image: slide1,
    eyebrow: { en: "Welcome to Al Rushd International Company", ar: "مرحبًا بكم في شركة الرشد الدولية" },
    title: {
      en: "Reliable Heavy Equipment Rental for Every Project",
      ar: "تأجير معدات ثقيلة موثوق لكل مشروع",
    },
    subtitle: {
      en: "Al Rushd International Company delivers dependable equipment rental solutions for construction and industrial projects across the Kingdom — backed by responsive, personal service.",
      ar: "تقدّم شركة الرشد الدولية حلول تأجير معدات موثوقة لمشاريع البناء والمشاريع الصناعية في جميع أنحاء المملكة، مدعومة بخدمة شخصية سريعة الاستجابة.",
    },
    ctas: [
      { label: { en: "Request a Quote", ar: "اطلب عرض سعر" }, to: "/contact", primary: true },
      { label: { en: "Explore Our Equipment", ar: "استكشف معداتنا" }, to: "/fleet" },
    ],
  },
  {
    image: slide2,
    eyebrow: { en: "Ready When You Are", ar: "جاهزون عند الحاجة" },
    title: {
      en: "Heavy Equipment Built for Every Job Site",
      ar: "معدات ثقيلة مصممة لكل موقع عمل",
    },
    subtitle: {
      en: "Hand-picked, dependable machines delivered on time and ready to work.",
      ar: "آلات موثوقة مختارة بعناية تُسلَّم في الوقت المحدد وجاهزة للعمل.",
    },
    ctas: [
      { label: { en: "Explore Our Equipment", ar: "استكشف معداتنا" }, to: "/fleet", primary: true },
      { label: { en: "Request a Quote", ar: "اطلب عرض سعر" }, to: "/contact" },
    ],
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
    ctas: [
      { label: { en: "Explore Our Equipment", ar: "استكشف معداتنا" }, to: "/fleet", primary: true },
      { label: { en: "Request a Quote", ar: "اطلب عرض سعر" }, to: "/contact" },
    ],
  },
];

export function HeroCarousel() {
  const { pick, dir } = useI18n();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: dir, align: "start", containScroll: "trimSnaps", duration: 24 },
    [Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const s = emblaApi.selectedScrollSnap();
      slideRefs.current.forEach((el, i) => el?.setAttribute("data-active", String(i === s)));
      dotRefs.current.forEach((el, i) => el?.setAttribute("data-active", String(i === s)));
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="surface-dark relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex [will-change:transform]">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              data-active={i === 0}
              className="group relative min-w-0 flex-[0_0_100%]"
            >
              <img
                src={slide.image}
                alt={pick(slide.title)}
                width={1600}
                height={907}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
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
                  <span className="eyebrow translate-y-3 opacity-0 transition-all duration-700 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
                    {pick(slide.eyebrow)}
                  </span>
                  <h1 className="mt-5 translate-y-4 text-4xl font-bold leading-[1.05] text-on-dark opacity-0 transition-all delay-100 duration-700 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100 sm:text-5xl md:text-6xl">
                    {pick(slide.title)}
                  </h1>
                  <p className="mt-6 max-w-xl translate-y-4 text-lg leading-relaxed text-on-dark-muted opacity-0 transition-all delay-200 duration-700 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
                    {pick(slide.subtitle)}
                  </p>
                  <div className="mt-9 flex translate-y-4 flex-wrap gap-3 opacity-0 transition-all delay-300 duration-700 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
                    {slide.ctas.map((cta) =>
                      cta.primary ? (
                        <Link
                          key={cta.to + "p"}
                          to={cta.to}
                          className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5"
                        >
                          {pick(cta.label)}
                          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                        </Link>
                      ) : (
                        <Link
                          key={cta.to + "s"}
                          to={cta.to}
                          className="inline-flex items-center rounded-md border border-white/25 px-6 py-3.5 text-sm font-bold text-on-dark transition-colors hover:bg-white/10"
                        >
                          {pick(cta.label)}
                        </Link>
                      ),
                    )}
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
        className="absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/25 bg-navy/40 p-2.5 text-on-dark transition-colors hover:bg-accent hover:text-accent-foreground sm:grid sm:place-items-center start-4 lg:start-8"
      >
        <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/25 bg-navy/40 p-2.5 text-on-dark transition-colors hover:bg-accent hover:text-accent-foreground sm:grid sm:place-items-center end-4 lg:end-8"
      >
        <ChevronRight className="h-5 w-5 rtl:rotate-180" />
      </button>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            data-active={i === 0}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-2 w-2 rounded-full bg-white/40 transition-all duration-300 hover:bg-white/70 data-[active=true]:w-8 data-[active=true]:bg-accent"
          />
        ))}
      </div>
    </section>
  );
}
