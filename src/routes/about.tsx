import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, ShieldCheck, BadgeCheck, Handshake, Sparkles } from "lucide-react";
import yardImg from "@/assets/yard.jpg";
import { useI18n } from "@/lib/i18n";
import { PageHeader, SectionHeading, CTASection } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Al Rushd International" },
      {
        name: "description",
        content:
          "Learn about Al Rushd International, a trusted heavy equipment rental partner serving construction, oil & gas and infrastructure projects across Saudi Arabia.",
      },
      { property: "og:title", content: "About Al Rushd International" },
      { property: "og:description", content: "A trusted partner in heavy industrial equipment rental." },
      { property: "og:image", content: yardImg },
    ],
  }),
  component: About,
});

const VALUE_ICONS = [ShieldCheck, BadgeCheck, Handshake, Sparkles];

function About() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("home.about.eyebrow")} title={t("about.title")} subtitle={t("about.subtitle")} />

      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <SectionHeading title={t("about.story.title")}>{t("about.story.body")}</SectionHeading>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
          <img src={yardImg} alt="Equipment yard" loading="lazy" width={1400} height={900} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: "about.mission.title", body: "about.mission.body" },
            { icon: Eye, title: "about.vision.title", body: "about.vision.body" },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">{t(title)}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t(body)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20 lg:py-28">
        <SectionHeading center eyebrow={t("home.why.eyebrow")} title={t("about.values.title")} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_ICONS.map((Icon, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-7 text-center shadow-[var(--shadow-card)]">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-accent/15 text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{t(`value.${i + 1}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`value.${i + 1}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
