import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CATEGORIES, EQUIPMENT, type CategoryId } from "@/data/equipment";
import { PageHeader, EquipmentCard, CTASection } from "@/components/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fleet/")({
  head: () => ({
    meta: [
      { title: "Equipment Fleet & Catalogue — Al Rushd International Company" },
      {
        name: "description",
        content:
          "Browse our fleet of cranes, excavators, loaders, telehandlers, forklifts, generators and dump trucks available for rent across Saudi Arabia.",
      },
      { property: "og:title", content: "Equipment Fleet — Al Rushd International Company" },
      { property: "og:description", content: "Cranes, excavators, loaders, generators and more, ready to rent." },
      { property: "og:url", content: "/fleet" },
    ],
    links: [{ rel: "canonical", href: "/fleet" }],
  }),
  component: Fleet,
});

function Fleet() {
  const { t, pick } = useI18n();
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EQUIPMENT.filter((e) => {
      const matchesCat = cat === "all" || e.category === cat;
      const matchesQuery =
        !q ||
        e.name.en.toLowerCase().includes(q) ||
        e.name.ar.includes(q) ||
        e.short.en.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [cat, query]);

  const filters: { id: CategoryId | "all"; label: string }[] = [
    { id: "all", label: t("common.allCategories") },
    ...CATEGORIES.map((c) => ({ id: c.id, label: t(c.key) })),
  ];

  return (
    <>
      <PageHeader eyebrow={t("nav.fleet")} title={t("common.exploreFleet")} subtitle={t("services.subtitle")} />

      <section className="container-x py-12 lg:py-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setCat(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  cat === f.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-foreground/80 hover:border-accent",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("common.search")}
              className="w-full rounded-md border border-border bg-card py-2.5 text-sm outline-none ring-accent/40 transition focus:ring-2 ps-9 pe-3"
            />
          </div>
        </div>

        {results.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">{t("common.noResults")}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}
