import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/site";
import { BLOG_POSTS } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & News — Al Rushd International" },
      {
        name: "description",
        content:
          "Heavy equipment guides, safety insights and company news from Al Rushd International, Saudi Arabia's trusted equipment rental partner.",
      },
      { property: "og:title", content: "Blog & News — Al Rushd International" },
      { property: "og:description", content: "Industry insights and updates from the Al Rushd team." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
  const { t, pick, lang } = useI18n();
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      <PageHeader eyebrow={t("nav.blog")} title={t("blog.title")} subtitle={t("blog.subtitle")} />
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={post.image}
                  alt={pick(post.title)}
                  loading="lazy"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 rounded-md bg-accent px-3 py-1 text-xs font-bold text-accent-foreground start-3">
                  {pick(post.category)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" /> {fmt(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {post.readMinutes} {t("blog.minRead")}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-lg font-bold leading-snug">{pick(post.title)}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{pick(post.excerpt)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {t("common.readMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
