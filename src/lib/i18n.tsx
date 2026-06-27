import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

// Central bilingual dictionary. Keys are dot-namespaced for readability.
const DICT: Dict = {
  // Brand / company
  "brand.name": { en: "Al Rushd International", ar: "الرشد الدولية" },
  "brand.tagline": {
    en: "Heavy Equipment Rental",
    ar: "تأجير المعدات الثقيلة",
  },

  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About Us", ar: "من نحن" },
  "nav.services": { en: "Services", ar: "خدماتنا" },
  "nav.fleet": { en: "Fleet", ar: "الأسطول" },
  "nav.industries": { en: "Industries", ar: "القطاعات" },
  "nav.projects": { en: "Projects", ar: "المشاريع" },
  "nav.gallery": { en: "Gallery", ar: "المعرض" },
  "nav.careers": { en: "Careers", ar: "الوظائف" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.getQuote": { en: "Request a Quote", ar: "اطلب عرض سعر" },

  // Common
  "common.callNow": { en: "Call Now", ar: "اتصل الآن" },
  "common.whatsapp": { en: "WhatsApp", ar: "واتساب" },
  "common.viewDetails": { en: "View Details", ar: "عرض التفاصيل" },
  "common.requestQuote": { en: "Request Quote", ar: "اطلب عرض سعر" },
  "common.allCategories": { en: "All Equipment", ar: "كل المعدات" },
  "common.search": { en: "Search equipment…", ar: "ابحث عن المعدات…" },
  "common.exploreFleet": { en: "Explore Our Fleet", ar: "استكشف أسطولنا" },
  "common.contactUs": { en: "Contact Us", ar: "تواصل معنا" },
  "common.learnMore": { en: "Learn More", ar: "اعرف المزيد" },
  "common.noResults": { en: "No equipment matches your search.", ar: "لا توجد معدات تطابق بحثك." },
  "common.backToFleet": { en: "Back to Fleet", ar: "العودة إلى الأسطول" },
  "common.specifications": { en: "Specifications", ar: "المواصفات" },
  "common.relatedEquipment": { en: "Related Equipment", ar: "معدات ذات صلة" },

  // Hero
  "hero.eyebrow": { en: "Trusted Across the Kingdom", ar: "موثوق في جميع أنحاء المملكة" },
  "hero.title": {
    en: "Heavy Equipment, Ready When You Are",
    ar: "معدات ثقيلة، جاهزة عندما تحتاجها",
  },
  "hero.subtitle": {
    en: "Al Rushd International supplies cranes, excavators, loaders and power solutions for the Kingdom's most demanding projects — backed by 24/7 support and a fully maintained fleet.",
    ar: "توفر الرشد الدولية الرافعات والحفارات واللوادر وحلول الطاقة لأكثر مشاريع المملكة تطلباً — مدعومة بدعم على مدار الساعة وأسطول مُصان بالكامل.",
  },
  "hero.stat1": { en: "Units in Fleet", ar: "وحدة في الأسطول" },
  "hero.stat2": { en: "Years of Service", ar: "سنوات من الخبرة" },
  "hero.stat3": { en: "Support Available", ar: "دعم متواصل" },
  "hero.stat4": { en: "Projects Delivered", ar: "مشروع منجز" },

  // Home sections
  "home.about.eyebrow": { en: "Who We Are", ar: "من نحن" },
  "home.about.title": { en: "Powering Industry With a Dependable Fleet", ar: "ندعم الصناعة بأسطول موثوق" },
  "home.about.body": {
    en: "For over a decade, Al Rushd International has been a leading provider of heavy industrial equipment rental in Saudi Arabia. From earthmoving to lifting and on-site power, we deliver well-maintained machinery and certified operators that keep your project moving.",
    ar: "لأكثر من عقد، كانت الرشد الدولية مزوداً رائداً لتأجير المعدات الصناعية الثقيلة في المملكة العربية السعودية. من أعمال الحفر إلى الرفع والطاقة في الموقع، نوفر معدات مُصانة جيداً ومشغلين معتمدين لإبقاء مشروعك يتقدم.",
  },
  "home.cats.eyebrow": { en: "Equipment Categories", ar: "فئات المعدات" },
  "home.cats.title": { en: "Built for Every Job Site", ar: "مصمم لكل موقع عمل" },
  "home.featured.eyebrow": { en: "From Our Fleet", ar: "من أسطولنا" },
  "home.featured.title": { en: "Featured Equipment", ar: "معدات مميزة" },
  "home.why.eyebrow": { en: "Why Al Rushd", ar: "لماذا الرشد" },
  "home.why.title": { en: "The Reliability Your Project Demands", ar: "الموثوقية التي يتطلبها مشروعك" },
  "home.cta.title": { en: "Need equipment for your next project?", ar: "تحتاج معدات لمشروعك القادم؟" },
  "home.cta.body": {
    en: "Tell us what you need and our team will prepare a tailored rental quote within 24 hours.",
    ar: "أخبرنا بما تحتاجه وسيقوم فريقنا بإعداد عرض تأجير مخصص خلال 24 ساعة.",
  },

  // Why points
  "why.1.title": { en: "Maintained Fleet", ar: "أسطول مُصان" },
  "why.1.body": { en: "Every unit is serviced and inspected before dispatch for maximum uptime.", ar: "تتم صيانة وفحص كل وحدة قبل الإرسال لضمان أقصى وقت تشغيل." },
  "why.2.title": { en: "Certified Operators", ar: "مشغلون معتمدون" },
  "why.2.body": { en: "Skilled, safety-certified operators available with every machine.", ar: "مشغلون مهرة ومعتمدون في السلامة متاحون مع كل آلة." },
  "why.3.title": { en: "24/7 Support", ar: "دعم على مدار الساعة" },
  "why.3.body": { en: "Round-the-clock assistance and rapid on-site response across the Kingdom.", ar: "مساعدة على مدار الساعة واستجابة سريعة في الموقع بجميع أنحاء المملكة." },
  "why.4.title": { en: "Flexible Terms", ar: "شروط مرنة" },
  "why.4.body": { en: "Daily, weekly, monthly and long-term rental plans to fit your timeline.", ar: "خطط تأجير يومية وأسبوعية وشهرية وطويلة الأمد تناسب جدولك." },

  // Services page
  "services.title": { en: "Our Services", ar: "خدماتنا" },
  "services.subtitle": {
    en: "End-to-end heavy equipment rental solutions for construction, infrastructure and industrial projects.",
    ar: "حلول متكاملة لتأجير المعدات الثقيلة لمشاريع البناء والبنية التحتية والصناعية.",
  },
  "service.1.title": { en: "Equipment Rental", ar: "تأجير المعدات" },
  "service.1.body": { en: "Short and long-term rental of cranes, excavators, loaders, forklifts and more.", ar: "تأجير قصير وطويل الأمد للرافعات والحفارات واللوادر والروافع الشوكية والمزيد." },
  "service.2.title": { en: "Operated Rentals", ar: "تأجير مع مشغل" },
  "service.2.body": { en: "Machinery supplied with experienced, certified operators ready to work.", ar: "معدات مزودة بمشغلين معتمدين وذوي خبرة جاهزين للعمل." },
  "service.3.title": { en: "On-Site Power", ar: "الطاقة في الموقع" },
  "service.3.body": { en: "Diesel generators and power solutions to keep your site energised.", ar: "مولدات ديزل وحلول طاقة لإبقاء موقعك مزوداً بالطاقة." },
  "service.4.title": { en: "Logistics & Transport", ar: "الخدمات اللوجستية والنقل" },
  "service.4.body": { en: "Safe delivery and recovery of equipment to and from your job site.", ar: "توصيل واستعادة آمنة للمعدات من وإلى موقع عملك." },
  "service.5.title": { en: "Maintenance & Service", ar: "الصيانة والخدمة" },
  "service.5.body": { en: "Preventive maintenance and on-call repair to minimise downtime.", ar: "صيانة وقائية وإصلاح عند الطلب لتقليل وقت التعطل." },
  "service.6.title": { en: "Project Consultation", ar: "استشارات المشاريع" },
  "service.6.body": { en: "Expert guidance to match the right equipment to your project needs.", ar: "إرشاد متخصص لمطابقة المعدات المناسبة مع احتياجات مشروعك." },
  "service.7.title": { en: "Industrial & Safety Material Supply", ar: "توريد المواد الصناعية ومواد السلامة" },
  "service.7.body": { en: "Reliable supply of industrial consumables, PPE and safety equipment for compliant, well-stocked job sites.", ar: "توريد موثوق للمواد الصناعية ومعدات الوقاية الشخصية وأدوات السلامة لمواقع عمل متوافقة ومجهزة بالكامل." },
  "service.8.title": { en: "Skilled & Semi-Skilled Manpower Supply", ar: "توريد العمالة الماهرة وشبه الماهرة" },
  "service.8.body": { en: "Vetted skilled and semi-skilled labour deployed quickly to keep your projects on schedule.", ar: "عمالة ماهرة وشبه ماهرة مؤهلة يتم توفيرها بسرعة للحفاظ على مشاريعك في موعدها." },
  "service.9.title": { en: "Asphalt Works & Road Marking", ar: "أعمال الأسفلت وعلامات الطرق" },
  "service.9.body": { en: "Asphalt laying, paving and precise road marking for durable, safe roadways and yards.", ar: "رصف الأسفلت والتبليط وعلامات الطرق الدقيقة لطرق وساحات آمنة وطويلة الأمد." },
  "service.10.title": { en: "Scaffolding Services", ar: "خدمات السقالات" },
  "service.10.body": { en: "Supply, erection and dismantling of certified scaffolding for safe access at any height.", ar: "توريد وتركيب وفك السقالات المعتمدة لوصول آمن على أي ارتفاع." },
  "service.11.title": { en: "Fencing Works", ar: "أعمال التسييج" },
  "service.11.body": { en: "Site fencing and hoarding solutions to secure and define your project boundaries.", ar: "حلول التسييج والتسوير لتأمين وتحديد حدود مشروعك." },
  "service.12.title": { en: "Vehicle Rentals", ar: "تأجير المركبات" },
  "service.12.body": { en: "Light and heavy vehicle rentals to move your teams and materials wherever needed.", ar: "تأجير المركبات الخفيفة والثقيلة لنقل فرقك وموادك أينما لزم الأمر." },
  "service.13.title": { en: "Portable Cabin Services", ar: "خدمات الكبائن المتنقلة" },
  "service.13.body": { en: "Portable cabins, offices and accommodation units delivered and installed on-site.", ar: "كبائن ومكاتب ووحدات سكن متنقلة يتم توصيلها وتركيبها في الموقع." },

  // About page
  "about.title": { en: "About Al Rushd International", ar: "عن الرشد الدولية" },
  "about.subtitle": {
    en: "A trusted partner in heavy industrial equipment rental across Saudi Arabia.",
    ar: "شريك موثوق في تأجير المعدات الصناعية الثقيلة في جميع أنحاء المملكة العربية السعودية.",
  },
  "about.story.title": { en: "Our Story", ar: "قصتنا" },
  "about.story.body": {
    en: "Al Rushd International was founded to give contractors and industrial operators dependable access to heavy machinery without the burden of ownership. What began with a handful of machines has grown into one of the region's most reliable rental fleets, serving construction, oil & gas, infrastructure and logistics clients across the Kingdom.",
    ar: "تأسست الرشد الدولية لتمنح المقاولين والمشغلين الصناعيين وصولاً موثوقاً إلى المعدات الثقيلة دون عبء الملكية. ما بدأ بعدد قليل من الآلات نما ليصبح أحد أكثر أساطيل التأجير موثوقية في المنطقة، يخدم عملاء البناء والنفط والغاز والبنية التحتية والخدمات اللوجستية في جميع أنحاء المملكة.",
  },
  "about.mission.title": { en: "Mission", ar: "رسالتنا" },
  "about.mission.body": {
    en: "To keep the Kingdom's projects moving by delivering safe, reliable and well-maintained equipment with exceptional service.",
    ar: "إبقاء مشاريع المملكة متقدمة من خلال توفير معدات آمنة وموثوقة ومُصانة جيداً مع خدمة استثنائية.",
  },
  "about.vision.title": { en: "Vision", ar: "رؤيتنا" },
  "about.vision.body": {
    en: "To be the most trusted heavy equipment rental partner in the region, recognised for reliability, safety and value.",
    ar: "أن نكون شريك تأجير المعدات الثقيلة الأكثر ثقة في المنطقة، معروفين بالموثوقية والسلامة والقيمة.",
  },
  "about.values.title": { en: "Core Values", ar: "قيمنا الأساسية" },
  "value.1.title": { en: "Safety First", ar: "السلامة أولاً" },
  "value.1.body": { en: "Uncompromising safety standards on every machine and every site.", ar: "معايير سلامة لا تقبل المساومة في كل آلة وكل موقع." },
  "value.2.title": { en: "Reliability", ar: "الموثوقية" },
  "value.2.body": { en: "We deliver what we promise, when we promise it.", ar: "نقدم ما نعد به، في الوقت الذي نعد به." },
  "value.3.title": { en: "Integrity", ar: "النزاهة" },
  "value.3.body": { en: "Transparent pricing and honest, long-term relationships.", ar: "تسعير شفاف وعلاقات صادقة طويلة الأمد." },
  "value.4.title": { en: "Excellence", ar: "التميز" },
  "value.4.body": { en: "Continuous improvement in fleet, service and people.", ar: "تحسين مستمر في الأسطول والخدمة والكوادر." },

  // Industries
  "industries.title": { en: "Industries We Serve", ar: "القطاعات التي نخدمها" },
  "industries.subtitle": {
    en: "Our fleet supports a wide range of sectors across the Kingdom.",
    ar: "يدعم أسطولنا مجموعة واسعة من القطاعات في جميع أنحاء المملكة.",
  },
  "industry.1.title": { en: "Construction", ar: "البناء والتشييد" },
  "industry.1.body": { en: "Earthmoving, lifting and material handling for building projects.", ar: "أعمال الحفر والرفع ومناولة المواد لمشاريع البناء." },
  "industry.2.title": { en: "Oil & Gas", ar: "النفط والغاز" },
  "industry.2.body": { en: "Heavy-duty equipment for refineries, pipelines and facilities.", ar: "معدات شديدة التحمل للمصافي وخطوط الأنابيب والمنشآت." },
  "industry.3.title": { en: "Infrastructure", ar: "البنية التحتية" },
  "industry.3.body": { en: "Roads, bridges and utility projects supported end to end.", ar: "دعم متكامل لمشاريع الطرق والجسور والمرافق." },
  "industry.4.title": { en: "Mining & Quarrying", ar: "التعدين والمحاجر" },
  "industry.4.body": { en: "Robust machines built for extraction and haulage operations.", ar: "آلات قوية مصممة لعمليات الاستخراج والنقل." },
  "industry.5.title": { en: "Logistics & Warehousing", ar: "الخدمات اللوجستية والتخزين" },
  "industry.5.body": { en: "Forklifts and handlers for storage and distribution sites.", ar: "روافع شوكية وأدوات مناولة لمواقع التخزين والتوزيع." },
  "industry.6.title": { en: "Events & Utilities", ar: "الفعاليات والمرافق" },
  "industry.6.body": { en: "Power generation and access equipment for temporary needs.", ar: "توليد الطاقة ومعدات الوصول للاحتياجات المؤقتة." },

  // Projects
  "projects.title": { en: "Projects & Portfolio", ar: "المشاريع وأعمالنا" },
  "projects.subtitle": {
    en: "A snapshot of the work our fleet helps make possible.",
    ar: "لمحة عن الأعمال التي يساهم أسطولنا في تحقيقها.",
  },

  // Gallery
  "gallery.title": { en: "Gallery", ar: "المعرض" },
  "gallery.subtitle": { en: "Our equipment and teams at work.", ar: "معداتنا وفرقنا أثناء العمل." },

  // Careers
  "careers.title": { en: "Careers", ar: "الوظائف" },
  "careers.subtitle": {
    en: "Join a team that keeps the Kingdom building. We're always looking for skilled operators, technicians and professionals.",
    ar: "انضم إلى فريق يبني المملكة. نبحث دائماً عن مشغلين وفنيين ومحترفين مهرة.",
  },
  "careers.openroles": { en: "Open Roles", ar: "الوظائف الشاغرة" },
  "careers.apply": { en: "Apply Now", ar: "قدّم الآن" },
  "careers.none": {
    en: "No open positions right now — send your CV and we'll keep it on file.",
    ar: "لا توجد وظائف شاغرة حالياً — أرسل سيرتك الذاتية وسنحتفظ بها.",
  },

  // Contact / RFQ
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "contact.subtitle": {
    en: "Request a quote or get in touch — our team responds within one business day.",
    ar: "اطلب عرض سعر أو تواصل معنا — يستجيب فريقنا خلال يوم عمل واحد.",
  },
  "contact.rfq": { en: "Request for Quote (RFQ)", ar: "طلب عرض سعر" },
  "contact.form.name": { en: "Full Name", ar: "الاسم الكامل" },
  "contact.form.company": { en: "Company", ar: "الشركة" },
  "contact.form.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.form.phone": { en: "Phone", ar: "رقم الهاتف" },
  "contact.form.equipment": { en: "Equipment Needed", ar: "المعدات المطلوبة" },
  "contact.form.message": { en: "Project Details", ar: "تفاصيل المشروع" },
  "contact.form.submit": { en: "Submit Request", ar: "إرسال الطلب" },
  "contact.form.success": { en: "Thank you! We'll be in touch within one business day.", ar: "شكراً لك! سنتواصل معك خلال يوم عمل واحد." },
  "contact.form.error": { en: "Please complete the required fields.", ar: "يرجى إكمال الحقول المطلوبة." },
  "contact.info.title": { en: "Get in Touch", ar: "تواصل معنا" },
  "contact.info.address": { en: "Industrial Area, Riyadh, Saudi Arabia", ar: "المنطقة الصناعية، الرياض، المملكة العربية السعودية" },
  "contact.info.hours": { en: "Sun – Thu: 7:00 AM – 6:00 PM", ar: "الأحد – الخميس: 7:00 ص – 6:00 م" },

  // Footer
  "footer.about": {
    en: "Reliable heavy industrial equipment rental serving construction, oil & gas, and infrastructure projects across Saudi Arabia.",
    ar: "تأجير موثوق للمعدات الصناعية الثقيلة يخدم مشاريع البناء والنفط والغاز والبنية التحتية في جميع أنحاء المملكة العربية السعودية.",
  },
  "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.equipment": { en: "Equipment", ar: "المعدات" },
  "footer.contact": { en: "Contact", ar: "اتصل بنا" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "footer.webmail": { en: "Staff Webmail", ar: "بريد الموظفين" },

  // Categories
  "cat.earthmoving": { en: "Earthmoving", ar: "أعمال الحفر" },
  "cat.lifting": { en: "Lifting & Access", ar: "الرفع والوصول" },
  "cat.power": { en: "Power & Generators", ar: "الطاقة والمولدات" },
  "cat.haulage": { en: "Haulage & Transport", ar: "النقل والشحن" },

  // Blog / FAQ / legal nav
  "nav.blog": { en: "Blog", ar: "المدونة" },
  "nav.faq": { en: "FAQ", ar: "الأسئلة الشائعة" },

  // Common (extended)
  "common.downloadBrochure": { en: "Download Brochure", ar: "تحميل الكتيب" },
  "common.availability": { en: "Availability", ar: "حالة التوفر" },
  "common.available": { en: "Available Now", ar: "متوفر الآن" },
  "common.limited": { en: "Limited Availability", ar: "توفر محدود" },
  "common.keyFeatures": { en: "Key Features", ar: "الميزات الرئيسية" },
  "common.inquire": { en: "Send Inquiry", ar: "إرسال استفسار" },
  "common.readMore": { en: "Read Article", ar: "اقرأ المقال" },
  "common.backToBlog": { en: "Back to Blog", ar: "العودة إلى المدونة" },
  "common.viewAll": { en: "View All", ar: "عرض الكل" },
  "common.emailUs": { en: "Email Us", ar: "راسلنا" },
  "common.filters": { en: "Filters", ar: "التصفية" },

  // Home — industries / trust / testimonials / faq
  "home.industries.eyebrow": { en: "Sectors We Power", ar: "القطاعات التي ندعمها" },
  "home.industries.title": { en: "Industries We Serve", ar: "القطاعات التي نخدمها" },
  "home.clients.eyebrow": { en: "Trusted Across the Kingdom", ar: "موثوق في جميع أنحاء المملكة" },
  "home.clients.title": { en: "A Partner Industry Leaders Rely On", ar: "شريك يعتمد عليه رواد الصناعة" },
  "home.clients.body": {
    en: "From national infrastructure programmes to private industrial sites, contractors choose Al Rushd International for fleet reliability, certified operators and service that never sleeps.",
    ar: "من برامج البنية التحتية الوطنية إلى المواقع الصناعية الخاصة، يختار المقاولون الرشد الدولية لموثوقية الأسطول والمشغلين المعتمدين والخدمة التي لا تتوقف.",
  },
  "home.testi.eyebrow": { en: "Client Voices", ar: "آراء العملاء" },
  "home.testi.title": { en: "What Our Clients Say", ar: "ماذا يقول عملاؤنا" },
  "home.faq.eyebrow": { en: "Good to Know", ar: "معلومات مفيدة" },
  "home.faq.title": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },

  // Blog page
  "blog.title": { en: "Blog & News", ar: "المدونة والأخبار" },
  "blog.subtitle": {
    en: "Industry insights, safety guidance and company updates from the Al Rushd International team.",
    ar: "رؤى القطاع وإرشادات السلامة وأخبار الشركة من فريق الرشد الدولية.",
  },
  "blog.latest.eyebrow": { en: "From the Blog", ar: "من المدونة" },
  "blog.latest.title": { en: "Latest News & Insights", ar: "أحدث الأخبار والرؤى" },
  "blog.minRead": { en: "min read", ar: "دقيقة قراءة" },
  "blog.share": { en: "Share this article", ar: "شارك هذا المقال" },

  // FAQ page
  "faq.title": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  "faq.subtitle": {
    en: "Answers to the questions we hear most about renting heavy equipment from Al Rushd International.",
    ar: "إجابات على أكثر الأسئلة شيوعاً حول تأجير المعدات الثقيلة من الرشد الدولية.",
  },
  "faq.cta": { en: "Still have a question?", ar: "هل لا يزال لديك سؤال؟" },

  // Footer (extended)
  "footer.follow": { en: "Follow Us", ar: "تابعنا" },
  "footer.legal": { en: "Legal", ar: "قانوني" },
  "footer.privacy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "footer.terms": { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  "footer.resources": { en: "Resources", ar: "موارد" },
  "footer.companyProfile": { en: "Company Profile (PDF)", ar: "ملف الشركة (PDF)" },

  // Legal pages
  "privacy.title": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "privacy.subtitle": {
    en: "How Al Rushd International collects, uses and protects your information.",
    ar: "كيف تجمع الرشد الدولية معلوماتك وتستخدمها وتحميها.",
  },
  "terms.title": { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  "terms.subtitle": {
    en: "The terms that govern your use of this website and our rental services.",
    ar: "الشروط التي تحكم استخدامك لهذا الموقع وخدمات التأجير لدينا.",
  },
  "legal.updated": { en: "Last updated: June 2026", ar: "آخر تحديث: يونيو 2026" },
};

interface LangContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
  pick: <T>(obj: { en: T; ar: T }) => T;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && window.localStorage.getItem("ari-lang")) as Lang | null;
    if (stored === "en" || stored === "ar") setLangState(stored);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (typeof window !== "undefined") window.localStorage.setItem("ari-lang", lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((p) => (p === "en" ? "ar" : "en")), []);

  const t = useCallback(
    (key: string) => {
      const entry = DICT[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang],
  );

  const pick = useCallback(
    function <T>(obj: { en: T; ar: T }): T {
      return obj[lang];
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, dir: (lang === "ar" ? "rtl" : "ltr") as "ltr" | "rtl", setLang, toggle, t, pick }),
    [lang, setLang, toggle, t, pick],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

// Company contact constants used across the site.
export const COMPANY = {
  phone: "+966500000000",
  phoneDisplay: "+966 50 000 0000",
  whatsapp: "966500000000",
  email: "info@alrushd-intl.com",
  mapsQuery: "Riyadh+Industrial+Area+Saudi+Arabia",
  // Microsoft 365 / Outlook on the web staff webmail login.
  webmail: "https://outlook.office.com/mail/",
  // Downloadable company profile brochure (PDF in /public/brochures).
  brochure: "/brochures/company-profile.pdf",
  social: {
    linkedin: "https://www.linkedin.com/company/al-rushd-international",
    instagram: "https://www.instagram.com/alrushdintl",
    facebook: "https://www.facebook.com/alrushdintl",
    x: "https://x.com/alrushdintl",
  },
};
