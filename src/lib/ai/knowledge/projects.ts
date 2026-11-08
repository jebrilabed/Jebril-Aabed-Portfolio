import type { KnowledgeChunk } from "./personal";

export const projectsChunks: KnowledgeChunk[] = [
  {
    id: "project-organaza",
    category: "projects",
    titleEn: "Organaza Fashion – E-Commerce Platform",
    titleAr: "متجر أورجانزا للأزياء (Organaza Fashion)",
    contentEn: `Organaza Fashion is a modern Arabic fashion e-commerce platform built with Next.js, React, TypeScript, and Tailwind CSS.
Features:
- Responsive RTL interface optimized for Arabic fashion shoppers.
- Multilingual and internationalization support.
- Advanced product filtering, category browsing, wishlist, and cart state.
- Secure checkout workflows and customer account handling.
- Full-featured admin dashboard for managing products, inventory, categories, and customer orders.
- Database & Backend: PostgreSQL with Prisma ORM and Auth.js.
- AI Assistant Integration: AI-powered product discovery and assistant workflows.`,
    contentAr: `متجر أورجانزا للأزياء (Organaza Fashion) هو منصة تجارة إلكترونية عصرية متخصصة في الأزياء، مبنية بواسطة Next.js و React و TypeScript و Tailwind CSS:
- واجهة مستخدم عربية كاملة بتصميم RTL متجاوب وسلس.
- دعم تعدد اللغات والترجمة.
- فلترة متقدمة للمنتجات حسب الأقسام، سلة تسوق، وعملية دفع آمنة.
- لوحة تحكم إدارية متكاملة (Admin Dashboard) لإدارة المنتجات، المخزون، الطلبات، والفئات.
- قواعد البيانات: PostgreSQL عبر Prisma ORM ونظام توثيق Auth.js.
- دمج مساعد ذكاء اصطناعي لدعم تجربة التسوق والتوصيات.`,
    tags: [
      "organaza", "fashion", "ecommerce", "store", "nextjs", "prisma", "postgresql", "rtl", "shop",
      "أورجانزا", "متجر", "أزياء", "تجارة إلكترونية", "نكست", "شوب"
    ],
    links: [
      { labelEn: "Live Demo", labelAr: "المعاينة الحية", url: "https://organza-fashion.vercel.app/" },
      { labelEn: "GitHub Repository", labelAr: "مستودع الكود", url: "https://github.com/jebrilabed/organza-fashion.git" },
    ],
  },
  {
    id: "project-payperview",
    category: "projects",
    titleEn: "PayPerView – AI-Powered Content Platform",
    titleAr: "منصة PayPerView المدعومة بالذكاء الاصطناعي",
    contentEn: `PayPerView is an innovative AI-driven digital platform.
Jebril's Role & Contributions:
- Role: Frontend & AI Integration Developer.
- Technologies: FastAPI, LangChain, Google Gemini, Retrieval-Augmented Generation (RAG), ChromaDB, React/Next.js.
- Responsibilities: Designed and built responsive frontend user interfaces, integrated LangChain orchestration pipelines with ChromaDB vector search to retrieve relevant content for users, and connected the client to FastAPI endpoints.
- Important note: Jebril contributed specifically as Frontend and AI integration developer on the team without claiming sole ownership of the entire platform backend infrastructure.`,
    contentAr: `منصة PayPerView هي منصة رقمية متطورة مدعومة بتقنيات الذكاء الاصطناعي التوليدي:
- دور جبريل ومسؤولياته: مطور واجهات أمامية وتكامل ذكاء اصطناعي (Frontend & AI Integration Developer).
- التقنيات المستخدمة: FastAPI، و LangChain، و Google Gemini، و RAG، و ChromaDB، و React/Next.js.
- المهام المنجزة: تطوير واجهات المستخدم التفاعلية، وربط مسارات LangChain مع استرجاع المتجهات عبر ChromaDB، وربط الواجهات بخدمات FastAPI لتوفير تجربة استعلام وبحث ذكية.
- ملاحظة هامة: كانت مسؤوليته محددة في تطوير الواجهات وتكامل الذكاء الاصطناعي ضمن الفريق دون ادعاء ملكية البنية التحتية الخلفية بأكملها.`,
    tags: [
      "payperview", "ai", "rag", "chromadb", "langchain", "fastapi", "gemini",
      "باي بير فيو", "ذكاء اصطناعي", "لانغ تشين", "تضمين", "بحث دلالي"
    ],
  },
  {
    id: "project-academic-library",
    category: "projects",
    titleEn: "Academic Library Platform",
    titleAr: "منصة المكتبة الأكاديمية (Academic Library)",
    contentEn: `Academic Library is a comprehensive academic platform designed for university students to easily access course summaries, lectures, and study resources.
Technologies: React.js, Material UI (MUI), Axios, React Router, Context API.
Features:
- Clean, structured academic hierarchy (faculties, departments, courses, terms).
- Instant multi-criteria search and filtering for lectures, summaries, and revision guides.
- Responsive design tailored for mobile and tablet study sessions.`,
    contentAr: `منصة المكتبة الأكاديمية (Academic Library) هي منصة تعليمية متكاملة مخصصة لطلاب الجامعات للوصول بسهولة للتلخيصات، المحاضرات، والمواد الدراسية:
- التقنيات: React.js، و Material UI (MUI)، و Axios، و React Router، و Context API.
- المميزات: هيكلية أكاديمية منظمة (كليات، أقسام، فصول دراسية، ومساقات)، بحث سريع وفلترة متقدمة، وواجهة متجاوبة ومريحة للدراسة على الهاتف والحاسوب.`,
    tags: [
      "academic library", "library", "react", "mui", "material ui", "university", "study",
      "مكتبة أكاديمية", "جامعة", "دراسة", "رياكت", "ماتيريال يو آي"
    ],
    links: [
      { labelEn: "Live Demo", labelAr: "المعاينة الحية", url: "https://academic-library.vercel.app/" },
      { labelEn: "GitHub Repository", labelAr: "مستودع الكود", url: "https://github.com/jebrilabed/Academic-Library.git" },
    ],
  },
  {
    id: "project-weather-app",
    category: "projects",
    titleEn: "Weather App",
    titleAr: "تطبيق الطقس التفاعلي (Weather App)",
    contentEn: `A modern, responsive weather forecast application.
Technologies: React, OpenWeather API, Geolocation API, CSS Modules / Tailwind CSS.
Features:
- Live weather conditions and multi-day meteorological forecasts.
- Automatic location detection via Geolocation API with global city search.
- Dark and light theme modes and internationalization.`,
    contentAr: `تطبيق الطقس هو تطبيق تفاعلي حديث لمتابعة أحوال الطقس والتنبؤات الجوية:
- التقنيات: React، و OpenWeather API، و Geolocation API، و Tailwind CSS.
- المميزات: عرض حالة الطقس الحالية وتوقعات الأيام القادمة، تحديد الموقع التلقائي، والبحث عن أي مدينة حول العالم، مع دعم السمات الفاتحة والداكنة.`,
    tags: [
      "weather", "weather app", "react", "api", "geolocation", "forecast",
      "طقس", "تطبيق الطقس", "رياكت", "تنبؤات"
    ],
  },
  {
    id: "project-baraa-store",
    category: "projects",
    titleEn: "Bara’a Store – E-Commerce Platform",
    titleAr: "متجر براءة (Bara’a Store)",
    contentEn: `Bara’a Store is an Arabic e-commerce platform dedicated to skincare, personal care, and home fragrance products.
Technologies: Next.js, TypeScript, PostgreSQL, Prisma ORM, Auth.js.
Features:
- Elegant Arabic RTL shopping experience.
- Customer account portal, shopping cart, and secure checkout.
- Comprehensive admin control panel for inventory, product variants, and orders.`,
    contentAr: `متجر براءة (Bara’a Store) هو متجر إلكتروني عربي للعناية الشخصية والعطور المنزلية:
- التقنيات: Next.js، و TypeScript، و Prisma ORM، و PostgreSQL، و Auth.js.
- المميزات: واجهة RTL عربية أنيقة وسريعة، إدارة سلة المشتريات والحسابات، ولوحة إدارة كاملة للمنتجات والمخزون والطلبات.`,
    tags: [
      "baraa", "ecommerce", "nextjs", "skincare", "prisma", "postgresql",
      "براءة", "متجر براءة", "تجارة إلكترونية"
    ],
    links: [
      { labelEn: "Live Demo", labelAr: "المعاينة الحية", url: "https://bara-a-store.vercel.app/" },
      { labelEn: "GitHub Repository", labelAr: "مستودع الكود", url: "https://github.com/jebrilabed/bara-a-store.git" },
    ],
  },
  {
    id: "project-rawnq-store",
    category: "projects",
    titleEn: "RAWNQ Home & Living – E-Commerce Platform",
    titleAr: "متجر رونق للمنزل والديكور (RAWNQ Store)",
    contentEn: `RAWNQ Home & Living is a modern e-commerce storefront for home decor and furnishings.
Technologies: Next.js, React, TypeScript, PostgreSQL, Prisma, Cloudinary, Best Route shipping API.
Features:
- Integrated shipping and delivery tracking via Best Route API.
- Cloudinary media optimization for fast asset loading.
- Product wishlist, cart, and admin inventory control.`,
    contentAr: `متجر رونق (RAWNQ) هو منصة تسوق حديثة لمنتجات الديكور والمستلزمات المنزلية:
- التقنيات: Next.js، و React، و TypeScript، و Prisma، و PostgreSQL، و Cloudinary، و Best Route API للشحن.
- المميزات: ربط مباشر مع شركة الشحن لإنشاء وتتبع الشحنات، تحسين وسائط الصور عبر Cloudinary، ولوحة تحكم شاملة.`,
    tags: [
      "rawnq", "ecommerce", "home", "living", "nextjs", "shipping", "cloudinary",
      "رونق", "متجر رونق", "ديكور", "شحن"
    ],
    links: [
      { labelEn: "Live Demo", labelAr: "المعاينة الحية", url: "https://rawnq-store-kohl.vercel.app/" },
      { labelEn: "GitHub Repository", labelAr: "مستودع الكود", url: "https://github.com/jebrilabed/rawnq-store.git" },
    ],
  },
  {
    id: "project-portfolio",
    category: "projects",
    titleEn: "Personal Portfolio & Interactive Pixel Journey",
    titleAr: "معرض الأعمال الشخصي ورحلة البكسل التفاعلية (Portfolio & Journey)",
    contentEn: `Jebril Aabed's personal portfolio website and interactive gamified developer journey.
Technologies: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, Web Audio API, Canvas / CSS Pixel Art sprites.
Features:
- High performance, responsive layout with dark neon cybernetic design language.
- Interactive 2D Pixel Art Developer Journey (/journey) with 5 animated sprite states, parallax world, keyboard & touch controls, and retro audio.
- Integrated AI Portfolio Assistant with streaming RAG retrieval.`,
    contentAr: `الموقع الشخصي ومعرض الأعمال لجبريل عابد ورحلة البكسل التفاعلية:
- التقنيات: Next.js 16، و React 19، و TypeScript، و Tailwind CSS، و Framer Motion، و Web Audio API، ورسوم البكسل المتحركة.
- المميزات: تصميم داكن متطور مستوحى من لغة الـ Cyberpunk، تجربة لعب تفاعلية في صفحة /journey تمكن الزائر من استكشاف المسار والشخصية، ومساعد ذكاء اصطناعي تفاعلي بتقنية RAG.`,
    tags: [
      "portfolio", "journey", "pixel art", "nextjs", "react", "framer motion", "personal website",
      "بورتفوليو", "معرض أعمال", "رحلة", "بكسل آرت", "موقع شخصي"
    ],
    links: [
      { labelEn: "Portfolio Website", labelAr: "موقع البورتفوليو", url: "https://jebril-aabed-portfolio.vercel.app/" },
      { labelEn: "Interactive Pixel Journey", labelAr: "رحلة البكسل التفاعلية", url: "https://jebril-aabed-portfolio.vercel.app/journey" },
      { labelEn: "GitHub Repository", labelAr: "مستودع الكود", url: "https://github.com/jebrilabed/Jebril-Aabed-Portfolio.git" },
    ],
  },
];

