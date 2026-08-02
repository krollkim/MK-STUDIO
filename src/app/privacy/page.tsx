import type { Metadata } from 'next'
import LegalPage, { LegalSection } from '@/components/LegalPage'
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, STUDIO } from '@/lib/site'

export const metadata: Metadata = {
  title: `מדיניות פרטיות | ${STUDIO.name}`,
  description: `מדיניות הפרטיות של אתר ${STUDIO.name}: איזה מידע נאסף באתר, ואיך יוצרים קשר בנושא.`,
  alternates: { canonical: '/privacy' },
}

const LAST_UPDATED = '2 באוגוסט 2026'

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="פרטיות" title="מדיניות פרטיות" lastUpdated={LAST_UPDATED}>
      <LegalSection
        title="בקצרה"
        paragraphs={[
          `אתר ${STUDIO.name} הוא דף תדמית בלבד. אין בו טפסים, אין הרשמה, אין אזור אישי ואין מערכת תשלומים, ולכן הוא לא אוסף ולא שומר פרטים אישיים על המבקרים בו.`,
        ]}
      />

      <LegalSection
        title="מה לא נאסף"
        list={[
          'אין באתר טופס יצירת קשר, ולכן לא נאספים שם, טלפון, מייל או כל פרט מזהה אחר.',
          'לא מותקנות באתר מערכות אנליטיקה או פיקסלים פרסומיים, ולא נעשה מעקב אחר התנהגות הגולשים.',
          'האתר לא עושה שימוש בעוגיות (cookies) למטרות שיווק, פרסום או פרופיילינג.',
        ]}
      />

      <LegalSection
        title="פנייה בוואטסאפ"
        paragraphs={[
          'כפתורי הפנייה באתר פותחים שיחת וואטסאפ. מרגע הלחיצה, השיחה מתנהלת בתוך אפליקציית וואטסאפ וכפופה לתנאי השימוש ולמדיניות הפרטיות של Meta, ולא למדיניות זו.',
          `הפרטים שתבחר לשתף בשיחה (שם, טלפון, ומה שתספר על השיר) נשמרים אצל ${STUDIO.owner} לצורך המענה ולצורך ההתקשרות בלבד, ולא מועברים לצד שלישי.`,
        ]}
      />

      <LegalSection
        title="אחסון האתר"
        paragraphs={[
          'האתר מאוחסן אצל ספק תשתית חיצוני. כמו כל שרת אינטרנט, ייתכן שהספק שומר לוגים טכניים (כתובת IP, סוג דפדפן, זמן הבקשה) לצורכי אבטחה ותפעול. מידע זה לא נאסף ולא נצפה על ידינו.',
        ]}
      />

      <LegalSection
        title="הזכויות שלך"
        paragraphs={[
          'מאחר שלא נאסף מידע אישי דרך האתר, אין מאגר שממנו אפשר לבקש עיון, תיקון או מחיקה. אם פנית בוואטסאפ ואתה רוצה שנמחק את ההתכתבות ואת הפרטים שנשמרו ממנה, אפשר לבקש זאת ונטפל בכך.',
        ]}
      />

      <section className="mt-14 rounded-card border border-line bg-surface p-8">
        <h2 className="display-sm text-[1.75rem] text-ink">יצירת קשר בנושא פרטיות</h2>
        <p className="mt-4 leading-relaxed text-muted">
          לכל שאלה או בקשה בנושא הפרטיות אפשר לפנות ל{STUDIO.owner}:
        </p>
        <ul className="mt-6 space-y-3">
          <li>
            <a
              href={`mailto:${EMAIL}`}
              dir="ltr"
              className="inline-block font-semibold text-accent-ink underline underline-offset-4 transition-colors hover:text-accent"
            >
              {EMAIL}
            </a>
          </li>
          <li>
            <a
              href={`tel:${PHONE_TEL}`}
              dir="ltr"
              className="inline-block font-semibold text-ink underline underline-offset-4 transition-colors hover:text-accent"
            >
              {PHONE_DISPLAY}
            </a>
          </li>
        </ul>
      </section>
    </LegalPage>
  )
}
