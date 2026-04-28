# 🎨 خطة تصميم صفحة البورتفوليو الشخصي

## الهدف
بناء صفحة بورتفوليو شخصية احترافية باستخدام **Next.js 14** و **Tailwind CSS**، تتضمن: نبذة شخصية، أعمال، مهارات، شهادات، تعليم، وتواصل — مع **Lazy Loading** و**Animations** سلسة.

---

## مراجعة مطلوبة من المستخدم

> [!IMPORTANT]
> الرجاء تزويدي بالمعلومات التالية لأملأ البورتفوليو بشكل حقيقي:
> - **اسمك الكامل** و**مسماك الوظيفي** (مثلاً: Full Stack Developer)
> - **نبذة مختصرة** عنك (2-3 جمل)
> - **قائمة مهاراتك** (React, Next.js, Node.js, ...)
> - **مشاريعك** (اسم المشروع، وصف، رابط GitHub/Demo)
> - **شهاداتك وتعليمك**
> - **رابط LinkedIn / GitHub / Email / WhatsApp**

> [!NOTE]
> سيتم استخدام بيانات تجريبية placeholder حتى تزودني بالمعلومات الفعلية.

---

## التقنيات المستخدمة

| التقنية | الاستخدام |
|---------|-----------|
| **Next.js 14** (App Router) | Framework الأساسي |
| **Tailwind CSS v3** | Styling |
| **Framer Motion** | Animations |
| **Intersection Observer API** | Lazy Loading |
| **React Icons** | أيقونات |
| **next/image** | تحسين الصور |

---

## هيكل الصفحة (Sections)

```
Portfolio
├── 📌 Navbar          — شريط التنقل (Fixed + Mobile Burger)
├── 🏠 Hero            — مقدمة + اسم + مسمى + CTA buttons
├── 👤 About           — نبذة + صورة شخصية
├── 🛠️ Skills          — مهارات بـ Progress Bars / Icon Grid
├── 💼 Projects        — بطاقات الأعمال + Filter بالتصنيف
├── 🎓 Education       — Timeline للتعليم
├── 🏆 Certificates    — بطاقات الشهادات
├── 📞 Contact         — نموذج تواصل + روابط سوشيال
└── 🔽 Footer          — حقوق + روابط سريعة
```

---

## هيكل المشروع

```
MyProtofolio/
├── app/
│   ├── layout.tsx          — Root Layout (fonts, metadata)
│   ├── page.tsx            — الصفحة الرئيسية (تجمع كل Sections)
│   └── globals.css         — Global Styles
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── Certificates.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/
│   └── useInView.ts        — Custom hook للـ Lazy Loading
├── data/
│   └── portfolio.ts        — كل البيانات (مهارات، مشاريع، ...)
├── public/
│   ├── profile.jpg
│   └── projects/           — صور المشاريع
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## تفاصيل التصميم

### 🎨 نظام الألوان (Dark Mode أساسي)
- **Background**: `#0a0a0f` (أسود فضائي)
- **Surface**: `#111118` (بطاقات)
- **Primary**: `#6c63ff` (بنفسجي راقٍ)
- **Accent**: `#00d4ff` (أزرق سيان لامع)
- **Text**: `#e2e8f0` (أبيض ناعم)
- **Muted**: `#64748b` (رمادي)

### ✨ Animations المخططة

| العنصر | Animation |
|--------|-----------|
| Hero Name | Typewriter Effect |
| Hero Subtitle | Fade in + slide up |
| Section Titles | Slide in من اليسار |
| Skill Bars | Fill animation عند الظهور |
| Project Cards | Fade in + scale من الأسفل |
| Education Timeline | Draw line + fade in |
| Certificate Cards | Flip effect |
| Nav Links | Underline slide |
| Buttons | Glow pulse |
| Scroll | Smooth scroll |

### ⚡ Lazy Loading Strategy
- **Custom `useInView` Hook** باستخدام `IntersectionObserver`
- كل Section تظهر فقط عند وصول المستخدم إليها
- **`next/image`** مع `loading="lazy"` لكل الصور
- Project Cards تُحمَّل progressively

---

## التعديلات على الملفات

### [NEW] `package.json` dependencies إضافية
```json
{
  "framer-motion": "^11.0.0",
  "react-icons": "^5.0.0",
  "@emailjs/browser": "^4.0.0"
}
```

---

## كل Section بالتفصيل

### 1. Navbar
- **Fixed** في الأعلى مع blur backdrop
- Logo (الاسم) على اليسار
- Links: About, Skills, Projects, Education, Certs, Contact
- **Mobile**: Hamburger menu مع slide-down animation
- Active link highlight أثناء الـ scroll

### 2. Hero Section
- اسمك بخط كبير مع Typewriter animation
- مسماك الوظيفي بلون Primary
- نص وصفي مختصر
- زرين: **"استعرض أعمالي"** + **"تواصل معي"**
- خلفية: Gradient + Floating particles أو Grid pattern
- Scroll indicator (سهم يتحرك)

### 3. About Section
- صورتك الشخصية على اليمين (مع border glow)
- نبذة على اليسار
- بعض الإحصائيات (عدد المشاريع، سنوات الخبرة...)
- زر تحميل CV

### 4. Skills Section
- **تصنيفان**: Frontend / Backend / Tools
- Tabs للتصفية بين الأقسام
- كل مهارة: أيقونة + اسم + Progress bar متحركة

### 5. Projects Section  
- **Filter buttons** (All / Frontend / Backend / Full Stack)
- Grid من Cards: صورة + اسم + وصف + تقنيات + روابط
- Hover effect: overlay مع buttons
- كل card تظهر بـ staggered animation

### 6. Education Timeline
- خط زمني عمودي
- كل مرحلة: University/School + سنة + درجة
- Draw animation للخط عند الظهور

### 7. Certificates
- Grid من بطاقات الشهادات
- كل بطاقة: شعار الجهة + اسم الشهادة + تاريخ
- Click لفتح الشهادة

### 8. Contact Section
- **Form**: الاسم + البريد + الرسالة + زر إرسال
- **EmailJS** لإرسال الرسائل مباشرة (بدون backend)
- روابط سوشيال: GitHub, LinkedIn, WhatsApp, Email
- كل أيقونة لها hover glow بلونها الخاص

### 9. Footer
- نص حقوق + الاسم
- روابط سريعة
- زر Back to Top

---

## خطة التنفيذ (بالترتيب)

1. `[ ]` إنشاء مشروع Next.js + Tailwind
2. `[ ]` إعداد `tailwind.config` بالألوان المخصصة
3. `[ ]` إنشاء ملف `data/portfolio.ts` بالبيانات
4. `[ ]` إنشاء `useInView` hook
5. `[ ]` بناء `Navbar`
6. `[ ]` بناء `Hero`
7. `[ ]` بناء `About`
8. `[ ]` بناء `Skills`
9. `[ ]` بناء `Projects`
10. `[ ]` بناء `Education`
11. `[ ]` بناء `Certificates`
12. `[ ]` بناء `Contact`
13. `[ ]` بناء `Footer`
14. `[ ]` ربط كل شيء في `page.tsx`
15. `[ ]` Testing + Polish

---

## خطة التحقق

### اختبار يدوي
- التأكد من عمل الـ Animations عند الـ Scroll
- التأكد من الـ Responsive على Mobile/Tablet/Desktop
- اختبار نموذج التواصل
- اختبار الـ Filter في Projects

### Performance
- Lighthouse score > 90
- الصور محسّنة بـ `next/image`
- Lazy loading فعّال لكل Section
