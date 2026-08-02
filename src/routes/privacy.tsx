import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Al Rushd International Company" },
      {
        name: "description",
        content:
          "How Al Rushd International Company collects, uses, stores and protects the personal information of website visitors and clients.",
      },
      { property: "og:title", content: "Privacy Policy — Al Rushd International Company" },
      { property: "og:description", content: "How we handle and protect your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

interface Section {
  en: { h: string; p: string[] };
  ar: { h: string; p: string[] };
}

const SECTIONS: Section[] = [
  {
    en: {
      h: "Information We Collect",
      p: [
        "When you submit a request for quotation, contact form or job application, we collect the details you provide — such as your name, company, email address, phone number and the equipment or services you are interested in.",
        "We also collect limited, non-identifying technical data (such as browser type and pages visited) to understand how the site is used and to improve it.",
      ],
    },
    ar: {
      h: "المعلومات التي نجمعها",
      p: [
        "عند إرسال طلب عرض سعر أو نموذج اتصال أو طلب توظيف، نجمع التفاصيل التي تقدمها — مثل اسمك وشركتك وبريدك الإلكتروني ورقم هاتفك والمعدات أو الخدمات التي تهتم بها.",
        "نجمع أيضاً بيانات تقنية محدودة وغير معرّفة (مثل نوع المتصفح والصفحات التي تمت زيارتها) لفهم كيفية استخدام الموقع وتحسينه.",
      ],
    },
  },
  {
    en: {
      h: "How We Use Your Information",
      p: [
        "We use your information to respond to enquiries, prepare quotations, fulfil rental agreements, process job applications and communicate with you about our services.",
        "We do not sell your personal information to third parties.",
      ],
    },
    ar: {
      h: "كيف نستخدم معلوماتك",
      p: [
        "نستخدم معلوماتك للرد على الاستفسارات وإعداد عروض الأسعار وتنفيذ اتفاقيات التأجير ومعالجة طلبات التوظيف والتواصل معك بشأن خدماتنا.",
        "نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة.",
      ],
    },
  },
  {
    en: {
      h: "Data Protection",
      p: [
        "We apply reasonable technical and organisational measures to protect your information against unauthorised access, loss or misuse. Access to personal data is limited to staff who need it to serve you.",
      ],
    },
    ar: {
      h: "حماية البيانات",
      p: [
        "نطبق تدابير تقنية وتنظيمية معقولة لحماية معلوماتك من الوصول غير المصرح به أو الفقدان أو سوء الاستخدام. الوصول إلى البيانات الشخصية يقتصر على الموظفين الذين يحتاجونها لخدمتك.",
      ],
    },
  },
  {
    en: {
      h: "Your Rights",
      p: [
        "You may request access to, correction of, or deletion of the personal information we hold about you. To exercise these rights, contact us at info@alrushd-intl.com.",
      ],
    },
    ar: {
      h: "حقوقك",
      p: [
        "يمكنك طلب الوصول إلى معلوماتك الشخصية التي نحتفظ بها أو تصحيحها أو حذفها. لممارسة هذه الحقوق، تواصل معنا على info@alrushd-intl.com.",
      ],
    },
  },
  {
    en: {
      h: "Updates to This Policy",
      p: [
        "We may update this Privacy Policy from time to time. The latest version will always be available on this page with its effective date.",
      ],
    },
    ar: {
      h: "تحديثات هذه السياسة",
      p: [
        "قد نحدّث سياسة الخصوصية هذه من وقت لآخر. ستكون أحدث نسخة متاحة دائماً على هذه الصفحة مع تاريخ سريانها.",
      ],
    },
  },
];

function Privacy() {
  const { t, pick } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t("footer.legal")} title={t("privacy.title")} subtitle={t("privacy.subtitle")} />
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
