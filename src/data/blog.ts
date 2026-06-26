import type { Bilingual } from "@/data/equipment";
import excavator from "@/assets/equip-excavator.jpg";
import crane from "@/assets/equip-crane.jpg";
import generator from "@/assets/equip-generator.jpg";
import yard from "@/assets/yard.jpg";

export interface BlogPost {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  category: Bilingual;
  author: Bilingual;
  date: string; // ISO
  readMinutes: number;
  image: string;
  body: Bilingual[]; // paragraphs
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "choosing-the-right-excavator",
    title: {
      en: "How to Choose the Right Excavator for Your Project",
      ar: "كيف تختار الحفار المناسب لمشروعك",
    },
    excerpt: {
      en: "Operating weight, dig depth and attachments all matter. Here is how to match an excavator to the job before you rent.",
      ar: "وزن التشغيل وعمق الحفر والملحقات كلها تهم. إليك كيفية مطابقة الحفار مع المهمة قبل التأجير.",
    },
    category: { en: "Equipment Guide", ar: "دليل المعدات" },
    author: { en: "Al Rushd Fleet Team", ar: "فريق أسطول الرشد" },
    date: "2026-06-10",
    readMinutes: 5,
    image: excavator,
    body: [
      {
        en: "Selecting the correct excavator class is the single biggest factor in keeping an earthworks programme on schedule. Under-sizing the machine slows production and overworks the hydraulics, while over-sizing inflates transport and fuel costs without adding value.",
        ar: "اختيار فئة الحفار الصحيحة هو العامل الأكبر في الحفاظ على جدول أعمال الحفر. فاختيار آلة أصغر من اللازم يبطئ الإنتاج ويرهق الهيدروليك، بينما الآلة الأكبر من اللازم ترفع تكاليف النقل والوقود دون قيمة مضافة.",
      },
      {
        en: "Start with operating weight and dig depth. For deep utility trenching and bulk excavation, a 30-tonne crawler excavator offers the reach and breakout force most Kingdom infrastructure projects demand. For confined urban sites, a smaller, more maneuverable class is usually the better choice.",
        ar: "ابدأ بوزن التشغيل وعمق الحفر. لحفر الخدمات العميق والحفر بالجملة، يوفر الحفار الزاحف بوزن 30 طناً الوصول وقوة الاقتلاع التي تتطلبها معظم مشاريع البنية التحتية في المملكة. أما المواقع الحضرية الضيقة فعادةً ما تكون الفئة الأصغر والأكثر مناورة هي الخيار الأفضل.",
      },
      {
        en: "Finally, plan your attachments early. Quick-coupler systems let a single machine switch between buckets, breakers and compactors, reducing the number of units on hire. Our team can recommend the right configuration as part of every quotation.",
        ar: "أخيراً، خطط لملحقاتك مبكراً. تتيح أنظمة التركيب السريع للآلة الواحدة التبديل بين القواديس والكسارات والمداكك، مما يقلل عدد الوحدات المستأجرة. يمكن لفريقنا التوصية بالتهيئة المناسبة كجزء من كل عرض سعر.",
      },
    ],
  },
  {
    slug: "crane-lift-planning-safety",
    title: {
      en: "Crane Lift Planning: A Safety-First Checklist",
      ar: "تخطيط رفع الرافعات: قائمة السلامة أولاً",
    },
    excerpt: {
      en: "Ground conditions, load charts and exclusion zones — the essentials every lift plan must cover before the boom goes up.",
      ar: "حالة الأرض ومخططات الحمولة ومناطق الاستبعاد — أساسيات يجب أن تغطيها كل خطة رفع قبل رفع الذراع.",
    },
    category: { en: "Safety", ar: "السلامة" },
    author: { en: "Operations Department", ar: "قسم العمليات" },
    date: "2026-05-22",
    readMinutes: 6,
    image: crane,
    body: [
      {
        en: "Every safe lift begins long before the crane arrives on site. A documented lift plan protects your crew, your schedule and the surrounding public, and it is a non-negotiable part of how Al Rushd International operates.",
        ar: "تبدأ كل عملية رفع آمنة قبل وصول الرافعة إلى الموقع بوقت طويل. تحمي خطة الرفع الموثقة طاقمك وجدولك والجمهور المحيط، وهي جزء غير قابل للتفاوض من طريقة عمل الرشد الدولية.",
      },
      {
        en: "Confirm ground bearing capacity and use outrigger mats where required. Verify the load weight, radius and the crane's rated capacity at that radius against the manufacturer load chart — never the boom length alone. Establish exclusion zones and assign a qualified signaller for every lift.",
        ar: "تأكد من قدرة تحمل الأرض واستخدم حصائر الدعامات عند الحاجة. تحقق من وزن الحمل ونصف القطر والقدرة المقدرة للرافعة عند ذلك النصف مقابل مخطط حمولة الشركة المصنعة — وليس طول الذراع وحده. حدد مناطق الاستبعاد وعيّن مشير إشارة مؤهلاً لكل عملية رفع.",
      },
      {
        en: "When you hire an operated crane from Al Rushd, our certified operators arrive with the documentation, rigging knowledge and safety discipline to execute the plan exactly as written.",
        ar: "عند استئجار رافعة مع مشغل من الرشد، يصل مشغلونا المعتمدون بالوثائق ومعرفة التجهيز وانضباط السلامة لتنفيذ الخطة تماماً كما هي مكتوبة.",
      },
    ],
  },
  {
    slug: "site-power-generator-sizing",
    title: {
      en: "Sizing On-Site Power: Avoid Under and Over-Provisioning",
      ar: "تحديد حجم الطاقة في الموقع: تجنب النقص والإفراط",
    },
    excerpt: {
      en: "A generator that is too small trips under load; one too large wastes fuel. Here is how to size site power correctly.",
      ar: "المولد الصغير جداً يفصل تحت الحمل، والكبير جداً يهدر الوقود. إليك كيفية تحديد حجم طاقة الموقع بشكل صحيح.",
    },
    category: { en: "Power Solutions", ar: "حلول الطاقة" },
    author: { en: "Power Systems Team", ar: "فريق أنظمة الطاقة" },
    date: "2026-04-30",
    readMinutes: 4,
    image: generator,
    body: [
      {
        en: "Temporary site power is easy to get wrong. List every load — tower cranes, welding sets, site offices, lighting — and account for starting (inrush) current on motor-driven equipment, which can be several times the running load.",
        ar: "من السهل الخطأ في طاقة الموقع المؤقتة. اذكر كل حمل — الرافعات البرجية ومعدات اللحام والمكاتب والإنارة — واحسب تيار البدء للمعدات ذات المحركات، والذي قد يكون أضعاف حمل التشغيل.",
      },
      {
        en: "Add a sensible margin for future loads, then choose a generator rated comfortably above peak demand. A containerized 500 kVA unit covers most medium and large sites, and its sound-attenuated enclosure keeps noise within limits near occupied areas.",
        ar: "أضف هامشاً معقولاً للأحمال المستقبلية، ثم اختر مولداً مقدراً بشكل مريح فوق ذروة الطلب. تغطي الوحدة المغلفة بقدرة 500 ك.ف.أ معظم المواقع المتوسطة والكبيرة، ويبقي غلافها العازل للصوت الضوضاء ضمن الحدود قرب المناطق المأهولة.",
      },
    ],
  },
  {
    slug: "rent-vs-buy-heavy-equipment",
    title: {
      en: "Rent vs Buy: The Economics of Heavy Equipment",
      ar: "التأجير مقابل الشراء: اقتصاديات المعدات الثقيلة",
    },
    excerpt: {
      en: "Utilisation rate, maintenance and capital tie-up determine whether renting beats owning. We break down the numbers.",
      ar: "معدل الاستخدام والصيانة وتجميد رأس المال تحدد ما إذا كان التأجير يتفوق على الملكية. نحلل الأرقام.",
    },
    category: { en: "Industry Insight", ar: "رؤية القطاع" },
    author: { en: "Al Rushd International", ar: "الرشد الدولية" },
    date: "2026-03-18",
    readMinutes: 5,
    image: yard,
    body: [
      {
        en: "The decision to rent or buy comes down to utilisation. Equipment used below roughly 60–70% of the time rarely justifies ownership once you factor in maintenance, storage, insurance, depreciation and the capital locked up in the asset.",
        ar: "يعتمد قرار التأجير أو الشراء على الاستخدام. المعدات المستخدمة أقل من نحو 60–70% من الوقت نادراً ما تبرر الملكية بعد حساب الصيانة والتخزين والتأمين والإهلاك ورأس المال المجمد في الأصل.",
      },
      {
        en: "Renting converts a large fixed cost into a predictable operating cost, transfers maintenance risk to the supplier, and gives you access to the exact machine each phase of work requires. For most contractors, a blended fleet — owning core machines and renting the rest — delivers the best return.",
        ar: "يحوّل التأجير تكلفة ثابتة كبيرة إلى تكلفة تشغيلية يمكن التنبؤ بها، وينقل مخاطر الصيانة إلى المورد، ويمنحك الوصول إلى الآلة المناسبة لكل مرحلة عمل. لمعظم المقاولين، يحقق الأسطول المختلط — امتلاك الآلات الأساسية وتأجير الباقي — أفضل عائد.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
