import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Linkedin, Instagram, Facebook } from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";
import logoImg from "@/assets/al-rushd-logo.jpg.asset.json";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark mt-24">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid place-items-center rounded-lg bg-on-dark p-1.5 shadow-sm">
              <img
                src={logoImg.url}
                alt={`${t("brand.name")} logo`}
                width={517}
                height={481}
                className="h-11 w-auto object-contain"
              />
            </span>
            <span className="font-display text-lg font-bold text-on-dark">{t("brand.name")}</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-dark-muted">{t("footer.about")}</p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { href: COMPANY.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: COMPANY.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: COMPANY.social.facebook, Icon: Facebook, label: "Facebook" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-on-dark-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-on-dark">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-on-dark-muted">
            {[
              { to: "/about", key: "nav.about" },
              { to: "/services", key: "nav.services" },
              { to: "/industries", key: "nav.industries" },
              { to: "/projects", key: "nav.projects" },
              { to: "/blog", key: "nav.blog" },
              { to: "/careers", key: "nav.careers" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-on-dark">
            {t("footer.equipment")}
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-on-dark-muted">
            {[
              { key: "cat.earthmoving" },
              { key: "cat.lifting" },
              { key: "cat.power" },
              { key: "cat.haulage" },
            ].map((l) => (
              <li key={l.key}>
                <Link to="/fleet" className="transition-colors hover:text-accent">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-on-dark">
            {t("footer.contact")}
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-on-dark-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{t("contact.info.address")}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${COMPANY.phone}`} className="hover:text-accent" dir="ltr">
                {COMPANY.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-accent">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{t("contact.info.hours")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-on-dark-muted sm:flex-row">
          <span>
            © {year} {t("brand.name")}. {t("footer.rights")}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link to="/privacy" className="transition-colors hover:text-accent">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="transition-colors hover:text-accent">
              {t("footer.terms")}
            </Link>
            <a
              href={COMPANY.webmail}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5" />
              {t("footer.webmail")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
