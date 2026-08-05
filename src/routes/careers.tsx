import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Briefcase } from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";
import { PageHeader } from "@/components/site";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Al Rushd International Company" },
      { name: "description", content: "Join Al Rushd International Company. We hire skilled equipment operators, technicians and professionals across Saudi Arabia." },
      { property: "og:title", content: "Careers — Al Rushd International Company" },
      { property: "og:description", content: "Join a team that keeps the Kingdom building." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Careers,
});

const ROLES = [
  { en: { title: "Heavy Equipment Operator", loc: "Jubail" }, ar: { title: "مشغل معدات ثقيلة", loc: "الجبيل" } },
  { en: { title: "Mobile Crane Operator", loc: "Jubail" }, ar: { title: "مشغل رافعة متنقلة", loc: "الجبيل" } },
  { en: { title: "Diesel Mechanic / Technician", loc: "Jubail" }, ar: { title: "ميكانيكي ديزل / فني", loc: "الجبيل" } },
  { en: { title: "Fleet Coordinator", loc: "Jubail" }, ar: { title: "منسق أسطول", loc: "الجبيل" } },
];

function Careers() {
  const { t, pick } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("nav.careers")} title={t("careers.title")} subtitle={t("careers.subtitle")} />
      <section className="container-x py-16 lg:py-24">
        <h2 className="text-2xl font-bold">{t("careers.openroles")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("careers.none")}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {ROLES.map((r, i) => {
            const role = pick(r);
            return (
              <div key={i} className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display font-bold">{role.title}</h3>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {role.loc}
                    </span>
                  </div>
                </div>
                <a
                  href="https://forms.gle/iL2ELn8VdibCQi1j6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground"
                >
                  {t("careers.apply")}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
