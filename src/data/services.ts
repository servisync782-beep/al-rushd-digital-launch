export type Bilingual = { en: string; ar: string };

export interface ServiceDetail {
  slug: string;
  icon: string;
  title: Bilingual;
  summary: Bilingual;
  description: Bilingual;
  includes: Bilingual[];
}

const b = (en: string, ar: string): Bilingual => ({ en, ar });

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "industrial-safety-material-supply",
    icon: "HardHat",
    title: b("Industrial & Safety Material Supply", "توريد المواد الصناعية ومواد السلامة"),
    summary: b(
      "Reliable supply of industrial consumables, PPE and safety equipment for compliant, well-stocked job sites.",
      "توريد موثوق للمواد الصناعية ومعدات الوقاية الشخصية وأدوات السلامة لمواقع عمل متوافقة ومجهزة بالكامل.",
    ),
    description: b(
      "Al Rushd International Company supplies a complete range of industrial and safety materials to keep your operations running and your workforce protected. From personal protective equipment and signage to consumables, tools and site safety hardware, we source certified products and deliver them on schedule. Our team helps you stay compliant with Saudi and international HSE standards while controlling procurement costs through dependable, single-source supply.",
      "توفر شركة الرشد الدولية مجموعة كاملة من المواد الصناعية ومواد السلامة للحفاظ على سير عملياتك وحماية القوى العاملة لديك. من معدات الوقاية الشخصية واللافتات إلى المواد الاستهلاكية والأدوات وأجهزة السلامة في الموقع، نوفر منتجات معتمدة ونسلّمها في الوقت المحدد. يساعدك فريقنا على الالتزام بمعايير الصحة والسلامة والبيئة السعودية والدولية مع التحكم في تكاليف الشراء من خلال توريد موثوق من مصدر واحد.",
    ),
    includes: [
      b("Certified PPE: helmets, gloves, boots, eyewear", "معدات وقاية شخصية معتمدة: خوذ وقفازات وأحذية ونظارات"),
      b("Site safety signage and barriers", "لافتات وحواجز السلامة في الموقع"),
      b("Industrial consumables and hand tools", "مواد استهلاكية صناعية وأدوات يدوية"),
      b("Scheduled bulk delivery to site", "توصيل بالجملة مجدول إلى الموقع"),
    ],
  },
  {
    slug: "manpower-supply",
    icon: "Users",
    title: b("Skilled & Semi-Skilled Manpower Supply", "توريد العمالة الماهرة وشبه الماهرة"),
    summary: b(
      "Vetted skilled and semi-skilled labour deployed quickly to keep your projects on schedule.",
      "عمالة ماهرة وشبه ماهرة مؤهلة يتم توفيرها بسرعة للحفاظ على مشاريعك في موعدها.",
    ),
    description: b(
      "Scale your workforce on demand with Al Rushd International Company's manpower supply service. We provide vetted skilled and semi-skilled personnel — operators, riggers, technicians, masons, scaffolders and general labour — ready to mobilise at short notice. Every worker is screened for qualifications, safety awareness and experience, so you get a productive, compliant team without the overhead of long-term recruitment.",
      "وسّع قوتك العاملة عند الطلب مع خدمة توريد العمالة من شركة الرشد الدولية. نوفر عمالة ماهرة وشبه ماهرة مؤهلة — مشغلين ورافعي أحمال وفنيين وبنّائين وعمال سقالات وعمالة عامة — جاهزين للتعبئة في وقت قصير. يتم فحص كل عامل من حيث المؤهلات والوعي بالسلامة والخبرة، لتحصل على فريق منتج ومتوافق دون أعباء التوظيف طويل الأمد.",
    ),
    includes: [
      b("Certified equipment operators and riggers", "مشغلو معدات ورافعو أحمال معتمدون"),
      b("Technicians, masons and skilled trades", "فنيون وبنّاؤون وحرفيون مهرة"),
      b("Fast mobilisation and flexible contracts", "تعبئة سريعة وعقود مرنة"),
      b("Full compliance with labour regulations", "التزام كامل بأنظمة العمل"),
    ],
  },
  {
    slug: "asphalt-road-marking",
    icon: "Construction",
    title: b("Asphalt Works & Road Marking", "أعمال الأسفلت وعلامات الطرق"),
    summary: b(
      "Asphalt laying, paving and precise road marking for durable, safe roadways and yards.",
      "رصف الأسفلت والتبليط وعلامات الطرق الدقيقة لطرق وساحات آمنة وطويلة الأمد.",
    ),
    description: b(
      "From access roads and parking yards to internal site routes, Al Rushd International Company delivers high-quality asphalt works and road marking. Our crews handle surface preparation, base laying, asphalt paving and compaction, followed by precise thermoplastic or paint road marking to keep traffic safe and organised. We use proven materials and modern equipment to produce durable surfaces built for heavy industrial use.",
      "من طرق الوصول وساحات الانتظار إلى المسارات الداخلية للموقع، تقدم شركة الرشد الدولية أعمال أسفلت وعلامات طرق عالية الجودة. تتولى فرقنا تجهيز السطح ووضع الطبقة الأساسية ورصف الأسفلت والدمك، يتبعها وضع علامات طرق دقيقة بالثيرموبلاستيك أو الطلاء للحفاظ على حركة مرور آمنة ومنظمة. نستخدم مواد مثبتة ومعدات حديثة لإنتاج أسطح متينة مصممة للاستخدام الصناعي الثقيل.",
    ),
    includes: [
      b("Surface preparation and base laying", "تجهيز السطح ووضع الطبقة الأساسية"),
      b("Asphalt paving and compaction", "رصف الأسفلت والدمك"),
      b("Thermoplastic and paint road marking", "علامات طرق بالثيرموبلاستيك والطلاء"),
      b("Parking, yards and access roads", "مواقف وساحات وطرق وصول"),
    ],
  },
  {
    slug: "scaffolding-services",
    icon: "Layers",
    title: b("Scaffolding Services", "خدمات السقالات"),
    summary: b(
      "Supply, erection and dismantling of certified scaffolding for safe access at any height.",
      "توريد وتركيب وفك السقالات المعتمدة لوصول آمن على أي ارتفاع.",
    ),
    description: b(
      "Al Rushd International Company provides complete scaffolding solutions for construction, maintenance and industrial projects. We supply, erect, inspect and dismantle certified scaffolding systems designed for safe working access at any height. Erection is carried out by trained scaffolders following strict safety procedures, with tagging and inspection to keep your site compliant and your teams protected throughout the project.",
      "توفر شركة الرشد الدولية حلول سقالات متكاملة لمشاريع البناء والصيانة والمشاريع الصناعية. نقوم بتوريد وتركيب وفحص وفك أنظمة السقالات المعتمدة المصممة لوصول آمن للعمل على أي ارتفاع. يتم التركيب بواسطة عمال سقالات مدربين وفق إجراءات سلامة صارمة، مع وضع البطاقات والفحص للحفاظ على توافق موقعك وحماية فرقك طوال المشروع.",
    ),
    includes: [
      b("Certified scaffolding supply and rental", "توريد وتأجير سقالات معتمدة"),
      b("Trained erection and dismantling crews", "فرق تركيب وفك مدربة"),
      b("Inspection and safety tagging", "الفحص ووضع بطاقات السلامة"),
      b("Access solutions for any height", "حلول وصول لأي ارتفاع"),
    ],
  },
  {
    slug: "fencing-works",
    icon: "Fence",
    title: b("Fencing Works", "أعمال التسييج"),
    summary: b(
      "Site fencing and hoarding solutions to secure and define your project boundaries.",
      "حلول التسييج والتسوير لتأمين وتحديد حدود مشروعك.",
    ),
    description: b(
      "Secure and define your project with Al Rushd International Company's fencing works. We supply and install temporary and permanent fencing, hoarding and barriers — including chain-link, panel and solid hoarding systems — to protect sites, control access and meet safety and regulatory requirements. Fast installation and reliable materials keep your perimeter secure from mobilisation through to project handover.",
      "أمّن وحدّد مشروعك مع أعمال التسييج من شركة الرشد الدولية. نقوم بتوريد وتركيب التسييج المؤقت والدائم والتسوير والحواجز — بما في ذلك أنظمة السلك الشبكي والألواح والتسوير الصلب — لحماية المواقع والتحكم في الدخول وتلبية متطلبات السلامة والأنظمة. تركيب سريع ومواد موثوقة تحافظ على أمان محيطك من التعبئة حتى تسليم المشروع.",
    ),
    includes: [
      b("Chain-link, panel and solid hoarding", "سلك شبكي وألواح وتسوير صلب"),
      b("Temporary and permanent fencing", "تسييج مؤقت ودائم"),
      b("Gates and controlled access points", "بوابات ونقاط دخول محكومة"),
      b("Rapid supply and installation", "توريد وتركيب سريع"),
    ],
  },
  {
    slug: "vehicle-rentals",
    icon: "Car",
    title: b("Vehicle Rentals", "تأجير المركبات"),
    summary: b(
      "Light and heavy vehicle rentals to move your teams and materials wherever needed.",
      "تأجير المركبات الخفيفة والثقيلة لنقل فرقك وموادك أينما لزم الأمر.",
    ),
    description: b(
      "Keep your project mobile with Al Rushd International Company's vehicle rental fleet. We offer light and heavy vehicles — pickups, vans, buses, flatbeds and trucks — available with or without drivers, on flexible short and long-term terms. Every vehicle is well-maintained and ready for the demands of industrial sites, helping you move teams, tools and materials reliably and cost-effectively.",
      "حافظ على حركة مشروعك مع أسطول تأجير المركبات من شركة الرشد الدولية. نوفر مركبات خفيفة وثقيلة — شاحنات صغيرة وحافلات وعربات مسطحة وشاحنات — متاحة مع أو بدون سائقين، بشروط مرنة قصيرة وطويلة الأمد. كل مركبة مصانة جيداً وجاهزة لمتطلبات المواقع الصناعية، مما يساعدك على نقل الفرق والأدوات والمواد بموثوقية وفعالية من حيث التكلفة.",
    ),
    includes: [
      b("Pickups, vans, buses and trucks", "شاحنات صغيرة وعربات وحافلات وشاحنات"),
      b("With or without professional drivers", "مع أو بدون سائقين محترفين"),
      b("Flexible short and long-term terms", "شروط مرنة قصيرة وطويلة الأمد"),
      b("Maintained, site-ready vehicles", "مركبات مصانة وجاهزة للموقع"),
    ],
  },
  {
    slug: "portable-cabin-services",
    icon: "Container",
    title: b("Portable Cabin Services", "خدمات الكبائن المتنقلة"),
    summary: b(
      "Portable cabins, offices and accommodation units delivered and installed on-site.",
      "كبائن ومكاتب ووحدات سكن متنقلة يتم توصيلها وتركيبها في الموقع.",
    ),
    description: b(
      "Set up site facilities fast with Al Rushd International Company's portable cabin services. We supply, deliver and install a range of portable units — site offices, accommodation, ablution and toilet blocks, stores and prayer rooms — ready for immediate use. Units are durable, insulated and configurable to your headcount and layout, giving your project comfortable, compliant facilities from day one.",
      "جهّز مرافق الموقع بسرعة مع خدمات الكبائن المتنقلة من شركة الرشد الدولية. نقوم بتوريد وتوصيل وتركيب مجموعة من الوحدات المتنقلة — مكاتب الموقع ووحدات السكن ودورات المياه والمخازن وغرف الصلاة — جاهزة للاستخدام الفوري. الوحدات متينة ومعزولة وقابلة للتهيئة حسب عدد الأفراد والتخطيط، مما يوفر لمشروعك مرافق مريحة ومتوافقة من اليوم الأول.",
    ),
    includes: [
      b("Site offices and meeting rooms", "مكاتب موقع وغرف اجتماعات"),
      b("Accommodation and ablution units", "وحدات سكن ودورات مياه"),
      b("Stores, kitchens and prayer rooms", "مخازن ومطابخ وغرف صلاة"),
      b("Delivery, installation and connection", "التوصيل والتركيب والتوصيلات"),
    ],
  },
];

export function getService(slug: string) {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
