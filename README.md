# M.K Studio — דף נחיתה

דף נחיתה יחיד (MVP) לאולפן ההקלטות וההפקה המוזיקלית של מתן בפלורנטין, תל אביב.
עברית, RTL קשיח, מטרה אחת: להפוך מבקר לפנייה בוואטסאפ.

**סטאק:** Next.js 15 (App Router) · React 19 · Tailwind v4 (CSS-first) · GSAP + ScrollTrigger.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## ⚠️ לפני העלייה לאוויר

הכול מרוכז בקובץ אחד — [src/lib/site.ts](src/lib/site.ts):

| מה | איפה | ערך נוכחי |
|---|---|---|
| מספר וואטסאפ (ספרות בלבד, בלי 0 מוביל) | `WHATSAPP_PHONE` | `972500000000` — **placeholder** |
| טלפון לתצוגה | `PHONE_DISPLAY` | `050-000-0000` — **placeholder** |
| טלפון ל-`tel:` | `PHONE_TEL` | `+972500000000` — **placeholder** |
| דומיין (canonical, sitemap, JSON-LD) | `SITE_URL` | `https://mkstudio.co.il` — **placeholder** |

בלי הערכים האמיתיים כפתור ה-CTA יפתח שיחה עם מספר לא קיים.

---

## מבנה הדף

| # | סקשן | קומפוננטה |
|---|---|---|
| 1 | Hero — לוגו, שורת ערך, CTA | [Hero.tsx](src/components/sections/Hero.tsx) |
| 2 | למי זה מתאים | [Audience.tsx](src/components/sections/Audience.tsx) |
| 3 | השירות והתוצאה | [Services.tsx](src/components/sections/Services.tsx) |
| 4 | החלל — רצף GSAP מפונן | [StudioSequence.tsx](src/components/sections/StudioSequence.tsx) |
| 5 | למה מתן + סרטון | [About.tsx](src/components/sections/About.tsx) |
| 6 | הוכחות | [Proof.tsx](src/components/sections/Proof.tsx) → `SocialProofSection` |
| 7 | CTA חוזר + יצירת קשר | [Contact.tsx](src/components/sections/Contact.tsx) |

**כל הטקסטים** נמצאים ב-[src/lib/content.ts](src/lib/content.ts) — לא בתוך ה-JSX.
[brand.json](brand.json) הוא מסמך המקור לטון, לצבעים ולקופי.

---

## איך מוסיפים המלצות (בנוי לזה)

הכול ב-[src/components/sections/Proof.tsx](src/components/sections/Proof.tsx):

- **סרטון המלצה שלישי** — לשים את הקובץ ב-`public/proof/` ולמלא את האובייקט
  השלישי ב-`VIDEOS` (`src`, `poster`, `name`, `role`, `quote`, `duration`).
  כל עוד אין `src`, הכרטיס מציג "מקום שמור" ולא מנסה לנגן.
- **ביקורת כתובה נוספת** — לחתוך את הצילום מסך (ראו `screenshot()` ב-
  `scripts/prepare-assets.mjs`) ולהוסיף `{ image, imageAlt }` ל-`REVIEWS`.
- כשיהיו ~8 ביקורות, אפשר להוריד את השכפול ב-`MARQUEE` (הוא רק ממלא את רוחב המסך).

---

## נכסים

`scripts/prepare-assets.mjs` ממיר את תיקיית `מתן - תכנים` הגולמית ל-`public/`:
המרת HEIC ל-JPEG/WebP, הקטנה, וחיתוך צילומי המסך של ההמלצות.
התיקייה הגולמית ב-`.gitignore` (כ-600MB).

הרצה מחדש: `node scripts/prepare-assets.mjs`

**וידאו:** סרטון "מי אני" המקורי היה 3840×2160 ו-592MB. הוא קודד מחדש ל-1080p
(6.5MB, `+faststart`) ומוגש עם `preload="none"` — כלום לא יורד עד שלוחצים play.

**צנעת הפרט בצילומי המסך:** החיתוך של קרין מסיר את שורת הכותרת שהכילה מספר טלפון,
והחיתוך של נפתלי משאיר רק את הודעת ההמלצה — כל השיחה שלפניה נחתכה החוצה.

---

## נגישות

- `<html lang="he" dir="rtl">`, קישור "דילוג לתוכן", מיקוד מקלדת גלוי, alt לכל תמונה.
- אנימציות הגלילה נכבות תחת `prefers-reduced-motion`; הרצף המפונן רץ רק מ-1024px ומעלה
  ומתחת לזה מוצג כרשימה סטטית.
- הצהרת נגישות מלאה: `/accessibility`.
- **חסר עדיין:** כתוביות לסרטונים (מתועד כמגבלה ידועה בהצהרה).

## SEO

`metadata` ב-layout, JSON-LD (`MusicGroup`/`LocalBusiness` + `FAQPage`) ב-
[StructuredData.tsx](src/components/StructuredData.tsx), `sitemap.xml` ו-`robots.txt`.
כולם נגזרים מ-`SITE_URL` — לעדכן שם ולא בכל קובץ בנפרד.

## כלי פיתוח

```bash
node scripts/screenshot.mjs <outDir> http://localhost:3000 1440 900 /
```
צילום מסך לכל סקשן אחרי גלילה מלאה + דיווח על שגיאות קונסול ורכיבים שנתקעו ב-opacity 0.
