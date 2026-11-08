import type { KnowledgeChunk } from "./personal";

export const skillsChunks: KnowledgeChunk[] = [
  {
    id: "skills-frontend",
    category: "skills",
    titleEn: "Frontend Development Skills (Strongest Domain)",
    titleAr: "مهارات تطوير الواجهات الأمامية (مجال التميز الأساسي)",
    contentEn: `Frontend Development is Jebril's primary specialty:
- Core Frameworks: React.js (React 18 & 19), Next.js (App Router, Server Components, SSR, SSG, Turbopack).
- Languages: TypeScript (strict types, interfaces, generics), JavaScript (ES6+ async/await, closures, functional patterns).
- Styling & UI Libraries: Tailwind CSS (Tailwind v3 & v4, custom utility systems), Material UI (MUI), CSS Modules, HTML5 semantic markup, CSS3 animations.
- Animation & Interaction: Framer Motion, 2D Canvas / Pixel Art sprites rendering, Web Audio API sound effects.
- State Management: React Context API, Redux Toolkit, custom React Hooks.
- Architecture: Component-driven architecture, responsive mobile-first design, dark/light theme systems, accessibility (a11y), internationalization (i18n, RTL/LTR).`,
    contentAr: `تطوير الواجهات الأمامية (Frontend) هو التخصص ومجال القوة الأساسي لجبريل:
- أطر العمل: React.js (بما في ذلك React 18 و 19)، و Next.js (App Router، Server Components، SSR، SSG).
- لغات البرمجة: TypeScript (بناء الأنواع الصارمة والواجهات البرمجية)، و JavaScript الحديثة (ES6+).
- التصميم والتنسيق: Tailwind CSS (بما فيها إصدار Tailwind 4)، و Material UI (MUI)، و CSS Modules، والتصميم المتجاوب (Responsive Design).
- الحركة والتفاعل: Framer Motion، الرسوم المتحركة بالبكسل (Pixel Art Canvas/Sprites)، وتأثيرات الصوت عبر Web Audio API.
- إدارة الحالة: React Context API، Redux Toolkit، والـ Custom Hooks.
- المعمارية: دعم كامل للاتجاهين (RTL للغة العربية و LTR للإنجليزية)، والوصولية، والتحسين لمحركات البحث.`,
    tags: [
      "frontend", "react", "nextjs", "typescript", "javascript", "tailwind", "mui", "redux", "framer motion",
      "واجهات", "فرونت إند", "رياكت", "نكست", "تايب سكريبت", "تيلويند", "تصميم", "موبايل"
    ],
  },
  {
    id: "skills-backend",
    category: "skills",
    titleEn: "Backend & Database Skills",
    titleAr: "مهارات الواجهات الخلفية وقواعد البيانات",
    contentEn: `Backend & Database Capabilities (used to build full functional full-stack features):
- APIs: FastAPI (Python), Next.js API Routes (Route Handlers), RESTful API design.
- Programming Languages: Python, TypeScript, Node.js runtime.
- Databases: PostgreSQL, Supabase (PostgreSQL + Auth + Storage), MongoDB, Prisma ORM (schema migrations, relations).
- Authentication: Auth.js (NextAuth), JWT, Supabase Auth.
- Note: Jebril uses backend technologies effectively to support frontend applications, integrate APIs, and build full-stack prototypes, while keeping his main professional focus on frontend excellence.`,
    contentAr: `مهارات الواجهات الخلفية (Backend) وقواعد البيانات:
- واجهات برمجة التطبيقات: FastAPI (Python)، و Next.js Route Handlers، وتصميم الـ REST APIs.
- لغات البرمجة: Python، و TypeScript، و JavaScript.
- قواعد البيانات: PostgreSQL، و Supabase (قواعد بيانات، توثيق وتخزين)، و MongoDB، و Prisma ORM.
- التوثيق والحماية: Auth.js (NextAuth)، و JWT، و Supabase Auth.
- ملاحظة: يوظف جبريل هذه المهارات الخلفية لربط الواجهات وتطوير تطبيقات متكاملة (Full-stack) مع بقاء تركيزه وتخصصه الأساسي في الواجهات الأمامية.`,
    tags: [
      "backend", "fastapi", "python", "postgresql", "prisma", "supabase", "mongodb", "rest api", "auth",
      "باك إند", "قواعد بيانات", "بايثون", "بوستجريس", "بريما", "سوبابيس"
    ],
  },
  {
    id: "skills-ai",
    category: "skills",
    titleEn: "AI Integration & RAG Skills",
    titleAr: "مهارات تكامل الذكاء الاصطناعي و RAG",
    contentEn: `AI Integration & Generative Workflows:
- Large Language Models: Google Gemini API (Gemini 1.5 Flash, Gemini 1.5 Pro, Gemini 2.0 Flash).
- Frameworks: LangChain (Python & JavaScript/TypeScript), Prompt Engineering, ChatPromptTemplates, Output Parsers.
- RAG (Retrieval-Augmented Generation): Document chunking, semantic retrieval, embeddings (Google text-embedding-004), vector similarity search.
- Vector Databases: ChromaDB, in-memory vector stores, hybrid semantic + lexical search.
- Practical Applications: AI chatbots, conversational portfolio assistants, document Q&A, context-aware user interfaces.`,
    contentAr: `مهارات الذكاء الاصطناعي وتوليد النصوص المعزز بالاسترجاع (RAG):
- النماذج التوليدية: Google Gemini API (Gemini 1.5 Flash، Pro، Gemini 2.0).
- أطر العمل: LangChain (Python و TypeScript)، وهندسة الأوامر (Prompt Engineering).
- تقنية RAG: تجزئة المستندات، التضمين الدلالي (Embeddings بواسطة Google text-embedding-004)، والبحث عن التشابه الدلالي.
- قواعد بيانات المتجهات: ChromaDB، ومستودعات المتجهات المدمجة، والبحث الهجين (Hybrid Search).
- التطبيقات العملية: المساعدات الذكية للمواقع والمتاجر، والاستعلام عن البيانات الذاتية وسير العمل المؤتمتة.`,
    tags: [
      "ai", "gemini", "langchain", "rag", "chromadb", "embeddings", "llm", "vector",
      "ذكاء اصطناعي", "جيميناي", "لانغ تشين", "تضمين", "بحث دلالي", "نماذج لغوية"
    ],
  },
  {
    id: "skills-tools",
    category: "skills",
    titleEn: "Tools, DevOps & Workflow",
    titleAr: "الأدوات ومنهجيات العمل والـ DevOps",
    contentEn: `Development Tools & Workflows:
- Version Control: Git, GitHub (branching, pull requests, versioning).
- Deployment & Hosting: Vercel, Render, Netlify.
- Containerization: Docker (containerizing FastAPI and Node applications).
- API Testing & Optimization: Postman, k6 (load testing).
- Design Tools: Figma (translating design systems into pixel-perfect code).
- Code Quality: ESLint, TypeScript compiler, Turbopack, Prettier.`,
    contentAr: `أدوات التطوير ومنهجيات العمل:
- إدارة الإصدارات: Git و GitHub (إدارة الفروع و Pull Requests).
- الاستضافة والنشر: Vercel و Render و Netlify.
- الحاويات: Docker (تشغيل وتطويق بيئات العمل).
- اختبار واجهات البرمجة والأداء: Postman و k6 (لاختبار الحمل والأداء).
- أدوات التصميم: Figma (تحويل التصاميم إلى واجهات برمجية متطابقة بالبكسل).
- جودة الكود: ESLint، فاحص TypeScript، و Turbopack.`,
    tags: [
      "git", "github", "docker", "vercel", "postman", "figma", "tools", "devops",
      "أدوات", "ديف أوبس", "جيت", "دوكر", "فيرسل", "فيجما"
    ],
  },
];

