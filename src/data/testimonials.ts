import type { Bilingual } from "@/data/equipment";

export interface Testimonial {
  quote: Bilingual;
  author: Bilingual;
  role: Bilingual;
  company: Bilingual;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      en: "Al Rushd delivered a fully maintained crane fleet on time for a critical lift. Their operators were professional and the support line answered every call.",
      ar: "وفرت الرشد أسطول رافعات مُصاناً بالكامل في الوقت المحدد لعملية رفع حرجة. كان مشغلوهم محترفين وخط الدعم يرد على كل اتصال.",
    },
    author: { en: "Khalid Al-Otaibi", ar: "خالد العتيبي" },
    role: { en: "Project Director", ar: "مدير المشروع" },
    company: { en: "Vertex Construction", ar: "فيرتكس للإنشاءات" },
  },
  {
    quote: {
      en: "We rely on Al Rushd for earthmoving across multiple sites. Equipment uptime is excellent and billing is always transparent.",
      ar: "نعتمد على الرشد لأعمال الحفر في مواقع متعددة. وقت تشغيل المعدات ممتاز والفوترة شفافة دائماً.",
    },
    author: { en: "Sara Al-Harbi", ar: "سارة الحربي" },
    role: { en: "Procurement Manager", ar: "مديرة المشتريات" },
    company: { en: "Northgate Infrastructure", ar: "نورثغيت للبنية التحتية" },
  },
  {
    quote: {
      en: "Their containerized generators kept our refinery shutdown powered without a single interruption. A genuinely dependable partner.",
      ar: "أبقت مولداتهم المغلفة إيقاف مصفاتنا مزوداً بالطاقة دون أي انقطاع. شريك موثوق حقاً.",
    },
    author: { en: "Mohammed Al-Qahtani", ar: "محمد القحطاني" },
    role: { en: "Site Operations Lead", ar: "قائد عمليات الموقع" },
    company: { en: "Gulf Energy Services", ar: "خدمات الطاقة الخليجية" },
  },
];
