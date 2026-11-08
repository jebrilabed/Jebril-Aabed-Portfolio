export interface KnowledgeChunk {
  id: string;
  category: "personal" | "skills" | "projects" | "education" | "contact" | "faq";
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  tags: string[];
  links?: Array<{ labelEn: string; labelAr: string; url: string }>;
}

export const personalInfoChunks: KnowledgeChunk[] = [
  {
    id: "personal-bio",
    category: "personal",
    titleEn: "About Jebril Aabed",
    titleAr: "نبذة عن جبريل عابد",
    contentEn: `Full Name: Jebril Aabed (جبريل عابد).
Location: Gaza, Palestine.
Professional Role: Software Developer & Frontend Specialist with strong AI Integration focus.
Current Status: Active university student pursuing a Bachelor's Degree in Computer Systems & Software Engineering at Al-Azhar University of Gaza. Expected graduation is within approximately one year (~2026/2027).
Core Focus: Modern frontend development using React.js, Next.js, and TypeScript, building responsive, accessible, high-performance web applications and e-commerce platforms. Also experienced in backend APIs (FastAPI, Next.js API routes) and practical AI integration (Google Gemini, LangChain, RAG workflows, and ChromaDB).
Philosophy: Clean, maintainable code, reusable components, responsive mobile-first UI, and practical AI that delivers real user value.`,
    contentAr: `الاسم الكامل: جبريل عابد (Jebril Aabed).
الموقع: غزة، فلسطين.
المسمى المهني: مطور برمجيات ومتخصص في الواجهات الأمامية (Frontend) مع تكامل الذكاء الاصطناعي (AI Integration).
الوضع التعليمي الحالي: طالب جامعي نشط يدرس بكالوريوس في هندسة أنظمة الحاسوب والبرمجيات في جامعة الأزهر بغزة، والمدة المتبقية للتخرج قرابة عام واحد (~2026/2027).
التركيز الأساسي: تطوير الواجهات الأمامية الحديثة باستخدام React.js و Next.js و TypeScript، وبناء تطبيقات ويب ومتاجر إلكترونية عالية الأداء وسريعة الاستجابة. كما يمتلك خبرة عملية في بناء واجهات برمجة التطبيقات الخلفية (FastAPI و Next.js API Routes) وتطبيقات الذكاء الاصطناعي التوليدي عبر Gemini و LangChain و RAG و ChromaDB.`,
    tags: [
      "jebril", "aabed", "bio", "about", "who is", "location", "gaza", "palestine",
      "جبريل", "عابد", "من هو", "نبذة", "الموقع", "غزة", "فلسطين", "تعريف"
    ],
  },
  {
    id: "personal-availability",
    category: "personal",
    titleEn: "Availability & Work Preferences",
    titleAr: "التوفر للعمل ونوع الفرص",
    contentEn: `Work Availability: Jebril is actively open to remote full-time, part-time, contract, or freelance opportunities as a Frontend Developer or Full-Stack / AI-Integration Junior Developer.
Location Constraints: Located in Gaza, Palestine; works remotely with global teams across various time zones.
Languages: Arabic (Native), English (Professional Working Proficiency).`,
    contentAr: `التوفر للعمل: جبريل متاح ومستعد للفرص عن بعد (Remote) سواء بدوام كامل (Full-time)، أو دوام جزئي (Part-time)، أو عقود عمل ومشاريع حرة (Freelance/Contract) كمطور واجهات أمامية أو مطور تكامل ذكاء اصطناعي.
الموقع ونمط العمل: مقيم في غزة، فلسطين ويعمل بكفاءة عن بعد مع فرق عمل عالمية في مختلف المناطق الزمنية.
اللغات: العربية (اللغة الأم)، والإنجليزية (مستوى مهني ممتاز).`,
    tags: [
      "availability", "hire", "job", "remote", "freelance", "opportunity", "work",
      "توظيف", "عمل", "متاح", "عن بعد", "فريلانس", "فرص", "دوام"
    ],
    links: [
      { labelEn: "Email Jebril", labelAr: "مراسلة جبريل عبر البريد", url: "mailto:jebrilaabed@gmail.com" },
      { labelEn: "LinkedIn Profile", labelAr: "الملف الشخصي على لينكدإن", url: "https://www.linkedin.com/in/jebril-aabed" },
    ],
  },
];

