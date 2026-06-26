import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CTASection } from "@/components/site";
import { getPost } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    const title = post?.title.en ?? "Article";
    const path = `/blog/${params.slug}`;
    return {
      meta: [
        { title: `${title} — Al Rushd International` },
        { name: "description", content: post?.excerpt.en ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: post?.excerpt.en ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: path },
        ...(post ? [{ property: "og:image", content: post.image }] : []),
      ],
      links: [{ rel: "canonical", href: path }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title.en,
                description: post.excerpt.en,
                image: post.image,
                datePublished: post.date,
                author: { "@type": "Organization", name: "Al Rushd International" },
                publisher: { "@type": "Organization", name: "Al Rushd International" },
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Blog", item: "/blog" },
                  { "@type": "ListItem", position: 2, name: post.title.en, item: path },
                ],
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
  component: Post,
});

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container-x py-32 text-center">
      <p className="text-muted-foreground">404</p>
      <Link to="/blog" className="mt-4 inline-block font-bold text-accent">
        {t("common.backToBlog")}
      </Link>
    </div>
  );
}

function ErrorView({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="container-x py-32 text-center">
      <p className="text-muted-foreground">Something went wrong.</p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="mt-4 font-bold text-accent"
      >
        Try again
      </button>
    </div>
  );
}

function Post() {
  const { post } = Route.useLoaderData();
  const { t, pick, lang } = useI18n();
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <div className="container-x pt-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("common.backToBlog")}
        </Link>
      </div>

      <article className="container-x py-10 lg:py-14">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">{pick(post.category)}</span>
          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{pick(post.title)}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" /> {pick(post.author)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> {fmt(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readMinutes} {t("blog.minRead")}
            </span>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
          <img src={post.image} alt={pick(post.title)} width={1200} height={600} className="h-full w-full object-cover" />
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {post.body.map((para: { en: string; ar: string }, i: number) => (
            <p key={i} className="mb-5 text-base leading-relaxed text-foreground/90">
              {pick(para)}
            </p>
          ))}
        </div>
      </article>

      <CTASection />
    </>
  );
}
