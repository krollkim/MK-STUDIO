import { PHONE_TEL, SITE_URL, STUDIO, WHATSAPP_URL } from '@/lib/site'

/**
 * JSON-LD for the studio. LocalBusiness so Google (and AI assistants) can state
 * what M.K Studio is, where it is and what it offers, plus a short FAQ that
 * mirrors the on-page copy.
 */
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  additionalType: 'https://schema.org/LocalBusiness',
  '@id': `${SITE_URL}/#studio`,
  name: STUDIO.name,
  legalName: STUDIO.legalName,
  description:
    'אולפן הקלטות והפקה מוזיקלית בפלורנטין, תל אביב. הפקת שירים מקצה לקצה — הלחנה, נגינה, הקלטה, מיקס ומאסטרינג — הקלטות ולימודי גיטרה.',
  url: SITE_URL,
  image: `${SITE_URL}/images/studio-brandmark.png`,
  telephone: PHONE_TEL,
  founder: { '@type': 'Person', name: STUDIO.owner },
  address: {
    '@type': 'PostalAddress',
    addressLocality: STUDIO.city,
    addressRegion: STUDIO.neighborhood,
    addressCountry: 'IL',
  },
  areaServed: { '@type': 'City', name: STUDIO.city },
  sameAs: [WHATSAPP_URL],
  slogan: STUDIO.tagline,
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'הפקת שירים',
        description:
          'מעטפת הפקה מלאה: הלחנה, עיבוד, נגינה, הקלטת שירה, מיקס ומאסטרינג, עד שיר ממוסטר מוכן להפצה.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'אולפן הקלטות',
        description: 'הקלטות שירה, גיטרות, פודקאסט ודמו בחלל מטופל אקוסטית בפלורנטין.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'לימודי גיטרה',
        description: 'שיעורי גיטרה אישיים אחד-על-אחד, לכל רמה, מותאמים לשירים שהתלמיד רוצה לנגן.',
      },
    },
  ],
}

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'איפה נמצא האולפן?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${STUDIO.name} נמצא ב${STUDIO.neighborhood}, ${STUDIO.city}.`,
      },
    },
    {
      '@type': 'Question',
      name: 'איך מתחילים תהליך?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'שולחים הודעה בוואטסאפ, קובעים סשן היכרות באולפן ללא עלות, ומשם ממשיכים לתהליך ההפקה: הלחנה, עיבוד, נגינה, הקלטה, מיקס ומאסטרינג.',
      },
    },
    {
      '@type': 'Question',
      name: 'האם סשן ההיכרות באמת בחינם?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'כן. הפגישה הראשונה באולפן היא ללא עלות וללא התחייבות — שומעים מה כתבת ומבינים לאן זה יכול ללכת.',
      },
    },
    {
      '@type': 'Question',
      name: 'מה מקבלים בסוף התהליך?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'שיר ממוסטר מוכן להפצה בכל פלטפורמות ההאזנה, יחד עם הכוונה מה לעשות איתו הלאה.',
      },
    },
  ],
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  )
}
