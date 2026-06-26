import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Al Rushd International" },
      {
        name: "description",
        content:
          "The terms and conditions governing the use of the Al Rushd International website and our heavy equipment rental services.",
      },
      { property: "og:title", content: "Terms & Conditions — Al Rushd International" },
      { property: "og:description", content: "Terms governing our website and rental services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

interface Section {
  en: { h: string; p: string[] };
  ar: { h: string; p: string[] };
}

const SECTIONS: Section[] = [
  {
    en: {
      h: "Use of This Website",
      p: [
        "By accessing this website you agree to use it lawfully and not to misuse its content, forms or services. All content, branding and imagery on this site is the property of Al Rushd International unless otherwise stated.",
      ],
    },
    ar: {
      h: "استخدام هذا الموقع",
      p: [
        "بدخولك هذا الموقع فإنك توافق على استخدامه بشكل قانوني وعدم إساءة استخدام محتواه أو نماذجه أو خدماته. جميع المحتوى والعلامة التجارية والصور على هذا الموقع ملك للرشد الدولية ما لم يُذكر خلاف ذلك.",
      ],
    },
  },
  {
    en: {
      h: "Quotations & Pricing",
      p: [
        "Quotations are prepared on request and are valid for the period stated in the quotation. Prices depend on equipment, rental duration, location, operator requirements and availability, and may change before a rental agreement is signed.",
      ],
    },
    ar: {
      h: "عروض الأسعار والتسعير",
      p: [
        "تُعد عروض الأسعار عند الطلب وتكون سارية للفترة المذكورة في العرض. تعتمد الأسعار على المعدات ومدة التأجير والموقع ومتطلبات المشغل والتوفر، وقد تتغير قبل توقيع اتفاقية التأجير.",
      ],
    },
  },
  {
    en: {
      h: "Rental Agreements",
      p: [
        "All rentals are subject to a signed rental agreement which sets out the equipment, rates, duration, delivery terms, insurance and the responsibilities of each party. The hirer is responsible for the safe and proper use of equipment during the rental period.",
      ],
    },
    ar: {
      h: "اتفاقيات التأجير",
      p: [
        "تخضع جميع عمليات التأجير لاتفاقية تأجير موقعة تحدد المعدات والأسعار والمدة وشروط التسليم والتأمين ومسؤوليات كل طرف. يتحمل المستأجر مسؤولية الاستخدام الآمن والسليم للمعدات خلال فترة التأجير.",
      ],
    },
  },
  {
    en: {
      h: "Liability",
      p: [
        "Al Rushd International maintains its fleet to a high standard but is not liable for indirect or consequential losses arising from equipment use, save as required by applicable law. Nothing in these terms limits liability that cannot be excluded by law.",
      ],
    },
    ar: {
      h: "المسؤولية",
      p: [
        "تحافظ الرشد الدولية على أسطولها بمعايير عالية لكنها غير مسؤولة عن الخسائر غير المباشرة أو التبعية الناشئة عن استخدام المعدات، إلا بالقدر الذي يقتضيه القانون المعمول به. لا شيء في هذه الشروط يحد من المسؤولية التي لا يمكن استبعادها قانوناً.",
      ],
    },
  },
  {
    en: {
      h: "Governing Law",
      p: [
        "These terms are governed by the laws of the Kingdom of Saudi Arabia. Any disputes shall be subject to the jurisdiction of the competent Saudi courts.",
      ],
    },
    ar: {
      h: "القانون الحاكم",
      p: [
        "تخضع هذه الشروط لأنظمة المملكة العربية السعودية. وتخضع أي نزاعات لاختصاص المحاكم السعودية المختصة.",
      ],
    },
  },
];

function Terms() {
  const { t, pick } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("footer.legal")} title={t("terms.title")} subtitle={t("terms.subtitle")} />
      <section className="container-x py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted-foreground">{t("legal.updated")}</p>
          {SECTIONS.map((s, i) => {
            const c = pick(s);
            return (
              <div key={i} className="mt-10">
                <h2 className="font-display text-xl font-bold">{c.h}</h2>
                {c.p.map((para, j) => (
                  <p key={j} className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
