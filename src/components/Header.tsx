import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Globe } from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/al-rushd-logo.jpg.asset.json";
import emblemImg from "@/assets/ar-mark.png.asset.json";

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/fleet", key: "nav.fleet" },
  { to: "/industries", key: "nav.industries" },
  { to: "/projects", key: "nav.projects" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/careers", key: "nav.careers" },
  { to: "/blog", key: "nav.blog" },
  { to: "/contact", key: "nav.contact" },
] as const;

function Logo() {
  const { t } = useI18n();
  // Use the original full logo asset as primary and fall back to the emblem if it fails.
  const primary = logoImg?.url;
  const fallback = emblemImg?.url;
  const [src, setSrc] = useState<string | undefined>(primary ?? fallback);

  return (
    <Link to="/" className="flex items-center gap-3.5 shrink-0 md:gap-4" aria-label={t("brand.name")}>
      <img
        src={src}
        alt={`${t("brand.name")} logo"`}
        width={900}
        height={320}
        className="h-14 w-auto md:h-16"
        loading="eager"
        decoding="async"
        style={{ maxHeight: "64px" }}
        onError={() => {
          if (fallback && src !== fallback) setSrc(fallback);
        }}
      />
      <span className="sr-only">{t("brand.name")}</span>
    </Link>
  );
}

export function Header() {
  const { t, toggle, lang } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
            {lang === "en" ? "العربية" : "EN"}
          </button>
          <Link
            to="/contact"
            className="hidden rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            {t("nav.getQuote")}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border xl:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background xl:hidden",
          open ? "max-h-[36rem]" : "max-h-0",
          "transition-[max-height] duration-300 ease-in-out",
        )}
      >
        <nav className="container-x flex flex-col py-3">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 px-1 pb-2">
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" /> {COMPANY.phoneDisplay}
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-bold text-accent-foreground"
            >
              {t("nav.getQuote")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
