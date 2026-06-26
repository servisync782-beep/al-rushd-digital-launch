import { MessageCircle, Phone } from "lucide-react";
import { useI18n, COMPANY } from "@/lib/i18n";

export function FloatingActions() {
  const { t } = useI18n();
  return (
    <div className="fixed bottom-5 z-40 flex flex-col gap-3 end-5">
      <a
        href={`https://wa.me/${COMPANY.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("common.whatsapp")}
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <a
        href={`tel:${COMPANY.phone}`}
        aria-label={t("common.callNow")}
        className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-amber)] transition-transform hover:scale-105"
      >
        <Phone className="h-7 w-7" />
      </a>
    </div>
  );
}
