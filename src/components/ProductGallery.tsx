import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const safe = images.length > 0 ? images : [];
  const count = safe.length;

  const go = useCallback(
    (dir: number) => setActive((i) => (count ? (i + dir + count) % count : 0)),
    [count],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  if (count === 0) return null;

  return (
    <div>
      {/* Main image */}
      <button
        type="button"
        onClick={() => setLightbox(true)}
        aria-label={t("gallery.zoom")}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-[var(--shadow-card)]"
      >
        <img
          src={safe[active]}
          alt={alt}
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute grid h-11 w-11 place-items-center rounded-full bg-navy/70 text-on-dark opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 bottom-4 end-4">
          <ZoomIn className="h-5 w-5" />
        </span>
        {count > 1 && (
          <>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-navy/60 text-on-dark backdrop-blur transition hover:bg-navy start-3"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-navy/60 text-on-dark backdrop-blur transition hover:bg-navy end-3"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </span>
          </>
        )}
      </button>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {safe.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                i === active ? "border-accent" : "border-transparent hover:border-border"
              }`}
            >
              <img src={src} alt="" width={200} height={200} className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label={t("gallery.close")}
            className="absolute grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 end-4 top-4"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={safe[active]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label={t("gallery.prev")}
                className="absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 start-4"
              >
                <ChevronLeft className="h-7 w-7 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label={t("gallery.next")}
                className="absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 end-4"
              >
                <ChevronRight className="h-7 w-7 rtl:rotate-180" />
              </button>
              <div className="absolute bottom-5 start-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white rtl:translate-x-1/2">
                {active + 1} / {count}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
