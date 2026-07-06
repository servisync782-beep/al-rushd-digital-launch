import excavator from "@/assets/equip-excavator.jpg";
import crane from "@/assets/equip-crane.jpg";
import loader from "@/assets/equip-loader.jpg";
import forklift from "@/assets/equip-forklift.jpg";
import telehandler from "@/assets/equip-telehandler.jpg";
import generator from "@/assets/equip-generator.jpg";
import dumptruck from "@/assets/equip-dumptruck.jpg";
import heliForkliftSide from "@/assets/heli-forklift-side.jpg";
import heliForkliftForks from "@/assets/heli-forklift-forks.jpg";

export type Bilingual = { en: string; ar: string };

export type CategoryId = "earthmoving" | "lifting" | "power" | "haulage";

export type Availability = "available" | "limited" | "coming_soon";

export interface Spec {
  label: Bilingual;
  value: Bilingual;
}

export interface Equipment {
  id: string;
  category: CategoryId;
  name: Bilingual;
  short: Bilingual;
  description: Bilingual;
  /** Card / homepage thumbnail. */
  image: string;
  /** Optional real-photo gallery shown on the detail page (falls back to `image`). */
  gallery?: string[];
  /** Optional brand shown on the detail page, e.g. "HELI (China)". */
  brand?: Bilingual;
  availability: Availability;
  features: Bilingual[];
  specs: Spec[];
  featured?: boolean;
}

export const CATEGORIES: { id: CategoryId; key: string; image: string }[] = [
  { id: "earthmoving", key: "cat.earthmoving", image: excavator },
  { id: "lifting", key: "cat.lifting", image: crane },
  { id: "power", key: "cat.power", image: generator },
  { id: "haulage", key: "cat.haulage", image: dumptruck },
];

const spec = (le: string, la: string, ve: string, va: string): Spec => ({
  label: { en: le, ar: la },
  value: { en: ve, ar: va },
});

const feat = (en: string, ar: string): Bilingual => ({ en, ar });

export const EQUIPMENT: Equipment[] = [
  {
    id: "crawler-excavator-30t",
    category: "earthmoving",
    name: { en: "Crawler Excavator 30T", ar: "حفار زاحف 30 طن" },
    short: { en: "Heavy-duty digging and trenching power.", ar: "قوة حفر وخنادق شديدة التحمل." },
    description: {
      en: "A 30-tonne crawler excavator built for large-scale earthmoving, deep excavation and demolition. Reliable hydraulics and a spacious, climate-controlled cab keep operators productive through long shifts.",
      ar: "حفار زاحف بوزن 30 طناً مصمم لأعمال الحفر واسعة النطاق والحفر العميق والهدم. هيدروليك موثوق وكابينة واسعة مكيفة تحافظ على إنتاجية المشغل خلال المناوبات الطويلة.",
    },
    image: excavator,
    featured: true,
    availability: "coming_soon",
    features: [
      feat("Climate-controlled operator cab", "كابينة مشغل مكيفة"),
      feat("Quick-coupler attachment system", "نظام تركيب سريع للملحقات"),
      feat("Fuel-efficient Tier-compliant engine", "محرك موفر للوقود ومطابق للمعايير"),
      feat("Reinforced undercarriage for tough terrain", "هيكل سفلي معزز للتضاريس الصعبة"),
    ],
    specs: [
      spec("Operating Weight", "وزن التشغيل", "30,000 kg", "30,000 كجم"),
      spec("Engine Power", "قوة المحرك", "200 hp", "200 حصان"),
      spec("Bucket Capacity", "سعة القادوس", "1.4 m³", "1.4 م³"),
      spec("Max Dig Depth", "أقصى عمق حفر", "7.2 m", "7.2 م"),
    ],
  },
  {
    id: "wheel-loader-5t",
    category: "earthmoving",
    name: { en: "Wheel Loader", ar: "لودر بعجلات" },
    short: { en: "Fast loading and material handling.", ar: "تحميل سريع ومناولة المواد." },
    description: {
      en: "A versatile wheel loader ideal for loading trucks, stockpiling and site clean-up. High breakout force and excellent maneuverability make it a job-site workhorse.",
      ar: "لودر متعدد الاستخدامات مثالي لتحميل الشاحنات وتكديس المواد وتنظيف الموقع. قوة اقتلاع عالية وقدرة ممتازة على المناورة تجعله حصان عمل في الموقع.",
    },
    image: loader,
    featured: true,
    availability: "coming_soon",
    features: [
      feat("High breakout force bucket", "قادوس بقوة اقتلاع عالية"),
      feat("Tight turning radius", "نصف قطر دوران ضيق"),
      feat("Ride-control for fast travel", "نظام تحكم بالقيادة للتنقل السريع"),
      feat("Excellent operator visibility", "رؤية ممتازة للمشغل"),
    ],
    specs: [
      spec("Operating Weight", "وزن التشغيل", "14,000 kg", "14,000 كجم"),
      spec("Engine Power", "قوة المحرك", "170 hp", "170 حصان"),
      spec("Bucket Capacity", "سعة القادوس", "3.0 m³", "3.0 م³"),
      spec("Dump Height", "ارتفاع التفريغ", "2.9 m", "2.9 م"),
    ],
  },
  {
    id: "all-terrain-crane-50t",
    category: "lifting",
    name: { en: "All-Terrain Crane 50T", ar: "رافعة لجميع التضاريس 50 طن" },
    short: { en: "Powerful lifting for tough access sites.", ar: "رفع قوي للمواقع صعبة الوصول." },
    description: {
      en: "A 50-tonne all-terrain mobile crane combining on-road speed with off-road capability. Telescopic boom and precise load control deliver safe lifts on the most demanding sites.",
      ar: "رافعة متنقلة لجميع التضاريس بوزن 50 طناً تجمع بين السرعة على الطرق والقدرة على التضاريس الوعرة. ذراع تلسكوبي وتحكم حمولة دقيق يوفران رفع آمن في أصعب المواقع.",
    },
    image: crane,
    featured: true,
    availability: "coming_soon",
    features: [
      feat("Telescopic boom with load chart", "ذراع تلسكوبي مع مخطط حمولة"),
      feat("All-wheel steering for tight sites", "توجيه لجميع العجلات للمواقع الضيقة"),
      feat("Computerised load moment indicator", "مؤشر عزم الحمل المحوسب"),
      feat("Outrigger stability monitoring", "مراقبة استقرار الدعامات"),
    ],
    specs: [
      spec("Max Capacity", "أقصى حمولة", "50 t", "50 طن"),
      spec("Max Boom Length", "أقصى طول ذراع", "40 m", "40 م"),
      spec("Engine Power", "قوة المحرك", "360 hp", "360 حصان"),
      spec("Axles", "المحاور", "3", "3"),
    ],
  },
  {
    id: "telehandler-17m",
    category: "lifting",
    name: { en: "Telehandler 17m", ar: "رافعة تلسكوبية 17 م" },
    short: { en: "Reach and place loads at height.", ar: "الوصول ووضع الأحمال على ارتفاع." },
    description: {
      en: "A telescopic handler offering up to 17 metres of lift height. Perfect for placing materials, loading at height and confined-access work with interchangeable attachments.",
      ar: "رافعة تلسكوبية توفر ارتفاع رفع يصل إلى 17 متراً. مثالية لوضع المواد والتحميل على ارتفاع والعمل في الأماكن الضيقة مع ملحقات قابلة للتبديل.",
    },
    image: telehandler,
    availability: "coming_soon",
    features: [
      feat("Interchangeable forks and bucket", "شوكات وقادوس قابلة للتبديل"),
      feat("Four-wheel drive and steering", "دفع وتوجيه رباعي"),
      feat("Load-sensing hydraulics", "هيدروليك يستشعر الحمل"),
      feat("Stabiliser legs for high lifts", "أرجل تثبيت للرفع العالي"),
    ],
    specs: [
      spec("Max Lift Height", "أقصى ارتفاع رفع", "17 m", "17 م"),
      spec("Max Capacity", "أقصى حمولة", "4,000 kg", "4,000 كجم"),
      spec("Engine Power", "قوة المحرك", "130 hp", "130 حصان"),
      spec("Drive", "الدفع", "4WD", "دفع رباعي"),
    ],
  },
  {
    id: "heli-cpcd100-w5g",
    category: "lifting",
    name: { en: "HELI CPCD100-W5G (Model 2026)", ar: "هيلي CPCD100-W5G (موديل 2026)" },
    brand: { en: "HELI (China)", ar: "هيلي (الصين)" },
    short: {
      en: "Heavy-duty 10-tonne diesel forklift for demanding industrial handling.",
      ar: "رافعة شوكية ديزل ثقيلة بسعة 10 أطنان لأعمال المناولة الصناعية الشاقة.",
    },
    description: {
      en: "The HELI CPCD100-W5G (Model 2026) is a heavy-duty 10-tonne diesel forklift engineered for the most demanding warehouse, port and industrial handling operations. Powered by a Japanese-built ISUZU engine with automatic transmission, it combines strength, reliability and operator comfort.",
      ar: "رافعة هيلي CPCD100-W5G (موديل 2026) هي رافعة شوكية ديزل ثقيلة بسعة 10 أطنان مصممة لأصعب عمليات المناولة في المستودعات والموانئ والمنشآت الصناعية. مدعومة بمحرك ايسوزو ياباني مع ناقل حركة أوتوماتيكي، وهي تجمع بين القوة والموثوقية والراحة للمشغل.",
    },
    image: forklift,
    gallery: [heliForkliftSide.url, heliForkliftForks.url],
    availability: "available",
    featured: true,
    features: [
      feat("ISUZU 6-cylinder Japanese diesel engine", "محرك ايسوزو ياباني ديزل بست أسطوانات"),
      feat("Automatic transmission", "ناقل حركة أوتوماتيكي"),
      feat("Side shift & fork positioner", "إزاحة جانبية وموضّع شوكات"),
      feat("4-spool hydraulic control valve (4 levers)", "صمام تحكم هيدروليكي 4 مخارج (4 أذرع)"),
      feat("Grammar suspension seat", "مقعد جرامر بنظام تعليق"),
      feat("Hydraulic power steering", "توجيه هيدروليكي معزز"),
      feat("Tool kit & standard safety components", "طقم أدوات ومكوّنات سلامة قياسية"),
      feat("Operation, service & parts manuals (2 sets)", "أدلة التشغيل والصيانة وقطع الغيار (نسختان)"),
    ],
    specs: [
      spec("Brand", "العلامة التجارية", "HELI (China)", "هيلي (الصين)"),
      spec("Model", "الموديل", "CPCD100-W5G (2026)", "CPCD100-W5G (2026)"),
      spec("Basic Lifting Capacity", "سعة الرفع الأساسية", "10,000 kg @ 600 mm load center", "10,000 كجم عند مركز حمل 600 مم"),
      spec("Engine", "المحرك", "ISUZU Diesel, 6 Cylinders (Japan)", "ايسوزو ديزل، 6 أسطوانات (اليابان)"),
      spec("Engine Model", "موديل المحرك", "A-6BG1 QC-02", "A-6BG1 QC-02"),
      spec("Engine Power", "قوة المحرك", "82 kW @ 2000 rpm", "82 كيلوواط عند 2000 دورة/دقيقة"),
      spec("Mast", "الصاري", "M400 Two-Stage Mast", "صاري M400 من مرحلتين"),
      spec("Lift Height", "ارتفاع الرفع", "4.0 m", "4.0 م"),
      spec("Fork Length", "طول الشوكة", "1970 mm", "1970 مم"),
      spec("Tires", "الإطارات", "Pneumatic (4 front + 2 rear)", "هوائية (4 أمامية + 2 خلفية)"),
      spec("Side Shift", "الإزاحة الجانبية", "Side shift + fork positioner", "إزاحة جانبية + موضّع شوكات"),
      spec("Hydraulic Control", "التحكم الهيدروليكي", "4-spool control valve (4 levers)", "صمام تحكم 4 مخارج (4 أذرع)"),
      spec("Transmission", "ناقل الحركة", "Automatic", "أوتوماتيكي"),
      spec("Seat", "المقعد", "Grammar suspension seat", "مقعد جرامر بنظام تعليق"),
      spec("Steering", "التوجيه", "Hydraulic power steering", "توجيه هيدروليكي معزز"),
    ],
  },
  {
    id: "containerized-generator-500kva",
    category: "power",
    name: { en: "Generator 500 kVA", ar: "مولد 500 ك.ف.أ" },
    short: { en: "Containerized power for any site.", ar: "طاقة مغلفة لأي موقع." },
    description: {
      en: "A containerized 500 kVA diesel generator delivering stable, continuous power for large sites and events. Sound-attenuated enclosure and large fuel tank for extended runtime.",
      ar: "مولد ديزل مغلف بقدرة 500 ك.ف.أ يوفر طاقة مستقرة ومستمرة للمواقع الكبيرة والفعاليات. غلاف عازل للصوت وخزان وقود كبير لتشغيل ممتد.",
    },
    image: generator,
    featured: true,
    availability: "coming_soon",
    features: [
      feat("Sound-attenuated weatherproof enclosure", "غلاف عازل للصوت ومقاوم للعوامل الجوية"),
      feat("Extended-run fuel tank", "خزان وقود لتشغيل ممتد"),
      feat("Digital control and remote monitoring", "تحكم رقمي ومراقبة عن بُعد"),
      feat("Automatic transfer switch ready", "جاهز لمفتاح النقل التلقائي"),
    ],
    specs: [
      spec("Prime Power", "القدرة الأساسية", "500 kVA", "500 ك.ف.أ"),
      spec("Voltage", "الجهد", "400/230 V", "400/230 فولت"),
      spec("Frequency", "التردد", "50 Hz", "50 هرتز"),
      spec("Enclosure", "الغلاف", "Sound-attenuated", "عازل للصوت"),
    ],
  },
  {
    id: "articulated-dump-truck",
    category: "haulage",
    name: { en: "Articulated Dump Truck", ar: "شاحنة قلابة مفصلية" },
    short: { en: "Move heavy material over rough ground.", ar: "نقل المواد الثقيلة فوق الأرض الوعرة." },
    description: {
      en: "A heavy articulated dump truck built for hauling earth, aggregate and spoil across uneven terrain. High payload and all-wheel drive keep material moving in any conditions.",
      ar: "شاحنة قلابة مفصلية ثقيلة مصممة لنقل التراب والركام والمخلفات عبر التضاريس غير المستوية. حمولة عالية ودفع لجميع العجلات يبقي المواد متحركة في أي ظروف.",
    },
    image: dumptruck,
    availability: "coming_soon",
    features: [
      feat("All-wheel drive (6x6)", "دفع لجميع العجلات (6×6)"),
      feat("Articulated chassis for tight turns", "هيكل مفصلي للمنعطفات الضيقة"),
      feat("Heated, tipping body", "صندوق قلاب مُدفأ"),
      feat("Automatic traction control", "تحكم تلقائي بالجر"),
    ],
    specs: [
      spec("Payload", "الحمولة", "30,000 kg", "30,000 كجم"),
      spec("Body Volume", "حجم الصندوق", "18 m³", "18 م³"),
      spec("Engine Power", "قوة المحرك", "370 hp", "370 حصان"),
      spec("Drive", "الدفع", "6x6", "6×6"),
    ],
  },
];

export function getEquipment(id: string) {
  return EQUIPMENT.find((e) => e.id === id);
}

export function relatedEquipment(item: Equipment) {
  return EQUIPMENT.filter((e) => e.category === item.category && e.id !== item.id).slice(0, 3);
}
