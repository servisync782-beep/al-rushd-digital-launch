import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/site";
import { EQUIPMENT } from "@/data/equipment";
import heroImg from "@/assets/hero.jpg";
import yardImg from "@/assets/yard.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Al Rushd International Company" },
      { name: "description", content: "Photos of the Al Rushd International Company equipment fleet and teams at work across Saudi Arabia." },
      { property: "og:title", content: "Gallery — Al Rushd International Company" },
      { property: "og:description", content: "Our equipment and teams at work." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const { t, pick } = useI18n();
  const images = [
    { src: heroImg, alt: "Work site at dusk", span: "sm:col-span-2 sm:row-span-2" },
    ...EQUIPMENT.map((e) => ({ src: e.image, alt: pick(e.name), span: "" })),
    { src: yardImg, alt: "Equipment yard", span: "sm:col-span-2" },
  ];

  return (
    <>
      <PageHeader eyebrow={t("nav.gallery")} title={t("gallery.title")} subtitle={t("gallery.subtitle")} />
      <section className="container-x py-16 lg:py-24">
        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <div key={i} className={`overflow-hidden rounded-xl border border-border bg-secondary ${img.span}`}>
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
