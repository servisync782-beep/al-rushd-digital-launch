import type { Bilingual } from "@/data/equipment";

export interface FaqItem {
  q: Bilingual;
  a: Bilingual;
}

export const FAQ: FaqItem[] = [
  {
    q: {
      en: "What areas do you serve?",
      ar: "ما هي المناطق التي تخدمونها؟",
    },
    a: {
      en: "Al Rushd International Company supplies and delivers heavy equipment across the Kingdom of Saudi Arabia, including Riyadh, Dammam, Jeddah and major project sites in between.",
      ar: "توفر شركة الرشد الدولية وتوصّل المعدات الثقيلة في جميع أنحاء المملكة العربية السعودية، بما في ذلك الرياض والدمام وجدة ومواقع المشاريع الكبرى بينها.",
    },
  },
  {
    q: {
      en: "Do you offer equipment with operators?",
      ar: "هل توفرون المعدات مع مشغلين؟",
    },
    a: {
      en: "Yes. You can hire equipment bare or with our certified, safety-trained operators. Operated rentals are ideal for specialised lifts and short-duration works.",
      ar: "نعم. يمكنك استئجار المعدات بدون مشغل أو مع مشغلينا المعتمدين والمدربين على السلامة. التأجير مع مشغل مثالي لعمليات الرفع المتخصصة والأعمال قصيرة المدة.",
    },
  },
  {
    q: {
      en: "What are your rental terms?",
      ar: "ما هي شروط التأجير لديكم؟",
    },
    a: {
      en: "We offer daily, weekly, monthly and long-term rental plans. Pricing depends on the equipment, duration, location and whether an operator is included — request a quote for a tailored rate.",
      ar: "نقدم خطط تأجير يومية وأسبوعية وشهرية وطويلة الأمد. يعتمد السعر على المعدة والمدة والموقع وما إذا كان المشغل مشمولاً — اطلب عرض سعر للحصول على سعر مخصص.",
    },
  },
  {
    q: {
      en: "Do you handle delivery and collection?",
      ar: "هل تتولون التوصيل والاستلام؟",
    },
    a: {
      en: "Yes. Our logistics team manages safe transport of equipment to and from your job site, including permits and escort where required for oversized loads.",
      ar: "نعم. يدير فريقنا اللوجستي النقل الآمن للمعدات من وإلى موقع عملك، بما في ذلك التصاريح والمرافقة عند الحاجة للأحمال كبيرة الحجم.",
    },
  },
  {
    q: {
      en: "How quickly can equipment be mobilised?",
      ar: "ما مدى سرعة تجهيز المعدات؟",
    },
    a: {
      en: "For in-stock units we can typically mobilise within 24–48 hours of a confirmed order, subject to location and transport. Urgent requirements are accommodated wherever possible.",
      ar: "للوحدات المتوفرة في المخزون، يمكننا عادةً التجهيز خلال 24–48 ساعة من تأكيد الطلب، حسب الموقع والنقل. نلبي الاحتياجات العاجلة كلما أمكن.",
    },
  },
  {
    q: {
      en: "Is maintenance included during the rental?",
      ar: "هل الصيانة مشمولة خلال فترة التأجير؟",
    },
    a: {
      en: "Routine and preventive maintenance on rented equipment is covered by Al Rushd International Company. Our on-call service team responds rapidly to minimise any downtime.",
      ar: "الصيانة الروتينية والوقائية للمعدات المستأجرة مشمولة من قبل شركة الرشد الدولية. يستجيب فريق الخدمة عند الطلب بسرعة لتقليل أي توقف.",
    },
  },
];
