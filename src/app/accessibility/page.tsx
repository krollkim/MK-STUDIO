import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, STUDIO, WHATSAPP_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: `הצהרת נגישות | ${STUDIO.name}`,
  description: `הצהרת הנגישות של אתר ${STUDIO.name}: רמת הנגישות, ההתאמות שבוצעו ודרכי פנייה לרכז הנגישות.`,
  alternates: { canonical: '/accessibility' },
  robots: { index: true, follow: true },
}

/** Last substantive review of the accessibility state of the site. */
const LAST_UPDATED = '31 ביולי 2026'

const SECTIONS = [
  {
    title: 'המחויבות שלנו',
    paragraphs: [
      `ב-${STUDIO.name} אנחנו רואים בנגישות האתר חלק מהותי מהשירות. אנחנו פועלים כדי שכל אדם, לרבות אנשים עם מוגבלות, יוכל לגלוש באתר בצורה עצמאית, נוחה ושוויונית.`,
      'האתר נבנה בהתאם לעקרונות תקן ישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.1 ברמה AA, ובהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.',
    ],
  },
  {
    title: 'ההתאמות שבוצעו באתר',
    list: [
      'האתר בנוי בעברית עם כיווניות RTL מלאה וסימון שפה תקין (lang="he").',
      'מבנה כותרות היררכי ותקין (H1 יחיד בכל עמוד, ואחריו H2 ו-H3), המאפשר ניווט יעיל בקורא מסך.',
      'ניווט מלא באמצעות מקלדת, כולל קישור "דילוג לתוכן הראשי" בתחילת כל עמוד וסימון מיקוד (focus) ברור ובולט.',
      'טקסט חלופי (alt) לכל התמונות המשמעותיות; תמונות דקורטיביות מסומנות כך שקוראי מסך מדלגים עליהן.',
      'סרטונים מופעלים ביוזמת המשתמש בלבד. אין ניגון אוטומטי ואין קול שמתחיל מעצמו.',
      'ניגודיות צבעים העומדת בדרישות רמה AA עבור טקסט ורכיבי ממשק.',
      'כיבוד הגדרת מערכת ההפעלה "העדפת תנועה מופחתת" (prefers-reduced-motion): כשההגדרה פעילה, אנימציות הגלילה מושבתות.',
      'טקסט הניתן להגדלה בדפדפן ללא אובדן תוכן או פונקציונליות.',
      'שימוש בתגיות סמנטיות ובתכונות ARIA בכפתורים, בתפריטים ובאזורי הדף.',
    ],
  },
  {
    title: 'מגבלות ידועות',
    paragraphs: [
      'חלק מההמלצות באתר מוצגות כצילומי מסך אמיתיים של הודעות וואטסאפ. לכל צילום מסך קיים תיאור טקסטואלי חלופי המוסר את תוכן ההמלצה, אך הטקסט עצמו אינו ניתן לבחירה או להגדלה בתוך התמונה.',
      'סרטוני ההמלצה והסרטון האישי אינם כוללים כתוביות בשלב זה. אנחנו פועלים להוספת כתוביות, ובינתיים נשמח למסור את תוכן הסרטונים בכתב לכל מי שיפנה אלינו.',
      'ייתכן שדפים או רכיבים מסוימים באתר טרם הונגשו במלואם. אנחנו ממשיכים לבדוק ולשפר את האתר באופן שוטף.',
    ],
  },
]

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="silver-light px-5 pt-32 pb-24 sm:px-8 lg:pt-44">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow mb-5">נגישות</p>
          <h1 className="display text-[clamp(2.5rem,6vw,4rem)] text-ink">הצהרת נגישות</h1>
          <p className="mt-5 text-sm text-muted">עודכן לאחרונה: {LAST_UPDATED}</p>

          {SECTIONS.map((section) => (
            <section key={section.title} className="mt-14">
              <h2 className="display-sm text-[1.75rem] text-ink">{section.title}</h2>

              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-muted">
                  {p}
                </p>
              ))}

              {section.list && (
                <ul className="mt-5 space-y-3">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 24)} className="flex gap-3.5 leading-relaxed text-muted">
                      <span
                        aria-hidden="true"
                        className="amber-fill mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mt-14 rounded-card border border-line bg-surface p-8">
            <h2 className="display-sm text-[1.75rem] text-ink">פניות בנושא נגישות</h2>
            <p className="mt-4 leading-relaxed text-muted">
              נתקלתם בבעיית נגישות באתר, או שיש לכם הצעה לשיפור? נשמח מאוד לשמוע. רכז הנגישות שלנו
              הוא {STUDIO.owner}, ואנחנו משתדלים לטפל בכל פנייה בהקדם האפשרי.
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent-ink underline underline-offset-4 transition-colors hover:text-accent"
                >
                  פנייה בוואטסאפ
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
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  dir="ltr"
                  className="inline-block font-semibold text-ink underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </section>

          <p className="mt-12">
            <Link
              href="/"
              className="font-semibold text-ink underline underline-offset-4 transition-colors hover:text-accent"
            >
              חזרה לדף הבית
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  )
}
