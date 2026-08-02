import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Globe } from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";
import { cn } from "@/lib/utils";
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

  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={t("brand.name")}>
      <img
        src={emblemImg.url}
        alt={`${t("brand.name")} logo`}
        width={147}
        height={86}
        className="h-10 w-auto shrink-0 object-contain md:h-11"
        loading="eager"
        decoding="sync"
      />
      <span className="max-w-40 font-display text-sm font-bold leading-tight text-foreground sm:max-w-none sm:text-base md:text-lg">
        {t("brand.name")}
      </span>
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
