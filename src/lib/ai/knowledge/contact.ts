import type { KnowledgeChunk } from "./personal";

export const contactChunks: KnowledgeChunk[] = [
  {
    id: "contact-info",
    category: "contact",
    titleEn: "Contact Information & Official Links",
    titleAr: "معلومات التواصل والروابط الرسمية",
    contentEn: `Official Contact Details for Jebril Aabed:
- Email: jebrilaabed@gmail.com
- Phone / WhatsApp: +972 593-478-714
- GitHub: https://github.com/jebrilabed
- LinkedIn: https://www.linkedin.com/in/jebril-aabed
- WhatsApp Direct Chat: https://wa.me/qr/OK4HMSQXWPT2C1
- Portfolio Website: https://jebril-aabed-portfolio.vercel.app/
- Resume / CV Download: /Jebril-Aabed-Software-Engineer-CV.pdf
- Location: Gaza, Palestine (Available for worldwide remote collaboration).`,
    contentAr: `بيانات التواصل الرسمية مع جبريل عابد:
- البريد الإلكتروني: jebrilaabed@gmail.com
- الهاتف / واتساب: +972 593-478-714
- حساب GitHub: https://github.com/jebrilabed
- حساب LinkedIn: https://www.linkedin.com/in/jebril-aabed
- رابط واتساب المباشر: https://wa.me/qr/OK4HMSQXWPT2C1
- الموقع الرسمي: https://jebril-aabed-portfolio.vercel.app/
- تحميل السيرة الذاتية (CV): /Jebril-Aabed-Software-Engineer-CV.pdf
- الموقع: غزة، فلسطين (متاح للعمل عن بعد مع مختلف الفرق العالمية).`,
    tags: [
      "contact", "email", "phone", "whatsapp", "linkedin", "github", "cv", "resume", "hire",
      "تواصل", "إيميل", "بريد", "واتساب", "لينكدإن", "جيت هب", "سيرة ذاتية", "رقم", "هاتف"
    ],
    links: [
      { labelEn: "Email: jebrilaabed@gmail.com", labelAr: "البريد: jebrilaabed@gmail.com", url: "mailto:jebrilaabed@gmail.com" },
      { labelEn: "LinkedIn Profile", labelAr: "حساب LinkedIn", url: "https://www.linkedin.com/in/jebril-aabed" },
      { labelEn: "GitHub Profile", labelAr: "حساب GitHub", url: "https://github.com/jebrilabed" },
      { labelEn: "WhatsApp Chat", labelAr: "محادثة WhatsApp مباشرة", url: "https://wa.me/qr/OK4HMSQXWPT2C1" },
      { labelEn: "Download CV (PDF)", labelAr: "تحميل السيرة الذاتية (PDF)", url: "/Jebril-Aabed-Software-Engineer-CV.pdf" },
    ],
  },
];

