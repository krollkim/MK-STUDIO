import type { Metadata } from 'next'
import LegalPage, { LegalSection } from '@/components/LegalPage'
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, STUDIO } from '@/lib/site'

export const metadata: Metadata = {
  title: `תנאי שימוש | ${STUDIO.name}`,
  description: `תנאי השימוש באתר ${STUDIO.name}: מעמד המידע באתר, זכויות יוצרים ודרכי יצירת קשר.`,
  alternates: { canonical: '/terms' },
}

const LAST_UPDATED = '2 באוגוסט 2026'

export default function TermsPage() {
  return (
    <LegalPage eyebrow="תנאים" title="תנאי שימוש" lastUpdated={LAST_UPDATED}>
      <LegalSection
        title="כללי"
        paragraphs={[
          `האתר מציג את השירותים של ${STUDIO.name}, אולפן הקלטות והפקה מוזיקלית ב${STUDIO.neighborhood}, ${STUDIO.city}. הגלישה באתר ושימוש בו מהווים הסכמה לתנאים שלהלן.`,
          'התנאים מנוסחים בלשון זכר מטעמי נוחות בלבד, ומתייחסים לכל המגדרים.',
        ]}
      />

      <LegalSection
        title="המידע באתר"
        list={[
          'התכנים באתר הם מידע כללי על השירותים, ואינם מהווים הצעה מחייבת.',
          'אין באתר מחירון. היקף העבודה, לוחות הזמנים והתמורה נקבעים בנפרד מול כל לקוח, בכתב, לפני תחילת העבודה.',
          'סשן ההיכרות הראשון ניתן ללא עלות וללא התחייבות משני הצדדים.',
        ]}
      />

      <LegalSection
        title="קניין רוחני"
        paragraphs={[
          `כל התכנים באתר — לרבות הצילומים, הסרטונים, ההקלטות, הטקסטים והלוגו — הם קניינו של ${STUDIO.name} או שמוצגים באישור בעליהם. אין להעתיק, לשכפל, להפיץ או לעשות בהם שימוש מסחרי ללא אישור מראש ובכתב.`,
          'ההמלצות המוצגות באתר הן הודעות ותכנים אמיתיים שהתקבלו מלקוחות, ומוצגים באישורם.',
        ]}
      />

      <LegalSection
        title="הזכויות בשיר שלך"
        paragraphs={[
          'הזכויות ביצירה שאתה מביא לאולפן נשארות שלך. חלוקת הזכויות בתוצר המוגמר, ככל שרלוונטית, מוסכמת מראש ובכתב מול כל לקוח לפני תחילת ההפקה.',
        ]}
      />

      <LegalSection
        title="קישורים ושירותים חיצוניים"
        paragraphs={[
          'כפתורי הפנייה באתר מפנים לאפליקציית וואטסאפ. השימוש בה כפוף לתנאי השימוש ולמדיניות הפרטיות של Meta, שאינם באחריותנו.',
        ]}
      />

      <LegalSection
        title="אחריות"
        paragraphs={[
          'נעשה מאמץ לוודא שהמידע באתר מדויק ועדכני. עם זאת, ייתכנו טעויות או אי-דיוקים, ואין באמור באתר כדי ליצור התחייבות. האתר מוגש כמות שהוא (as is).',
        ]}
      />

      <LegalSection
        title="שינוי התנאים"
        paragraphs={[
          'התנאים עשויים להתעדכן מעת לעת. הנוסח המחייב הוא זה המפורסם בעמוד זה, והתאריך שבראשו מציין את מועד העדכון האחרון.',
        ]}
      />

      <section className="mt-14 rounded-card border border-line bg-surface p-8">
        <h2 className="display-sm text-[1.75rem] text-ink">יצירת קשר</h2>
        <p className="mt-4 leading-relaxed text-muted">
          לשאלות בנוגע לתנאי השימוש אפשר לפנות ל{STUDIO.owner}:
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
