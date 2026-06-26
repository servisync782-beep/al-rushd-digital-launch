import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader, CTASection } from "@/components/site";
import { CATEGORIES } from "@/data/equipment";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Portfolio — Al Rushd International" },
      {
        name: "description",
        content:
          "A selection of construction, infrastructure and industrial projects supported by the Al Rushd International equipment fleet.",
      },
      { property: "og:title", content: "Projects & Portfolio — Al Rushd International" },
      { property: "og:description", content: "Work our fleet helps make possible across the Kingdom." },
    ],
  }),
  component: Projects,
});

const PROJECTS = [
  {
    en: { title: "Riyadh Metro Corridor", scope: "Excavation & material handling for a major transit corridor.", sector: "Infrastructure" },
    ar: { title: "ممر مترو الرياض", scope: "أعمال الحفر ومناولة المواد لممر نقل رئيسي.", sector: "البنية التحتية" },
  },
  {
    en: { title: "Industrial Plant Expansion", scope: "Crane lifts and on-site power for a refinery upgrade.", sector: "Oil & Gas" },
    ar: { title: "توسعة مصنع صناعي", scope: "رفع بالرافعات وطاقة في الموقع لترقية مصفاة.", sector: "النفط والغاز" },
  },
  {
    en: { title: "Logistics Hub Build-Out", scope: "Forklifts and telehandlers for a distribution centre.", sector: "Logistics" },
    ar: { title: "إنشاء مركز لوجستي", scope: "روافع شوكية ورافعات تلسكوبية لمركز توزيع.", sector: "الخدمات اللوجستية" },
  },
  {
    en: { title: "Coastal Highway Project", scope: "Earthmoving fleet and haulage over rough terrain.", sector: "Infrastructure" },
    ar: { title: "مشروع الطريق الساحلي", scope: "أسطول حفر ونقل فوق تضاريس وعرة.", sector: "البنية التحتية" },
  },
  {
    en: { title: "Mining Site Mobilisation", scope: "Heavy dump trucks and loaders for extraction works.", sector: "Mining" },
    ar: { title: "تجهيز موقع تعدين", scope: "شاحنات قلابة ثقيلة ولوادر لأعمال الاستخراج.", sector: "التعدين" },
  },
  {
    en: { title: "Event Power Supply", scope: "Containerised generators for a large-scale event.", sector: "Utilities" },
    ar: { title: "إمداد طاقة لفعالية", scope: "مولدات مغلفة لفعالية واسعة النطاق.", sector: "المرافق" },
  },
];

function Projects() {
  const { t, pick } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("nav.projects")} title={t("projects.title")} subtitle={t("projects.subtitle")} />
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => {
            const c = pick(p);
            const img = CATEGORIES[i % CATEGORIES.length].image;
            return (
              <article key={i} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={img} alt={c.title} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 rounded-md bg-accent px-3 py-1 text-xs font-bold text-accent-foreground start-3">
                    {c.sector}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.scope}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CTASection />
    </>
  );
}
