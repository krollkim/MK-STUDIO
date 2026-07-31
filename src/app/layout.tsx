import type { Metadata, Viewport } from 'next'
import { Heebo, Frank_Ruhl_Libre } from 'next/font/google'
import GSAPInit from '@/components/GSAPInit'
import AccessibilityWidget from '@/components/AccessibilityWidget'
import { PHONE_DISPLAY, SITE_URL, STUDIO } from '@/lib/site'
import './globals.css'

/**
 * The widget ships with its own defaults from the earlier warm-greige palette;
 * this re-points it at the current silver + amber tokens so the panel matches
 * the site instead of quietly reintroducing the old colours.
 */
const A11Y_THEME = {
  bg: '#f3f2ef',
  surface: '#fbfaf8',
  surface2: '#e4e2dc',
  night: '#1b1815',
  ink: '#1a1917',
  muted: '#5c5952',
  line: '#d3d0c8',
  wood: '#7a5433',
  woodSoft: '#d8c3a6',
  accent: '#b5541f',
  accentHover: '#7c2e12',
  accentSoft: '#f0e2d5',
  accentLit: '#e39264',
}

/** Body / UI. */
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
})

/** Display. A Hebrew serif is what gives the headlines their voice. */
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-frank',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f1eb',
}

const TITLE = `${STUDIO.name} | אולפן הקלטות והפקה מוזיקלית ב${STUDIO.neighborhood}, ${STUDIO.city}`
const DESCRIPTION =
  'אולפן הקלטות והפקה מוזיקלית של מתן בפלורנטין, תל אביב. הפקת שירים מקצה לקצה — הלחנה, נגינה, הקלטה, מיקס ומאסטרינג — הקלטות ולימודי גיטרה. סשן היכרות ראשון ללא עלות.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'אולפן הקלטות',
    'אולפן הקלטות תל אביב',
    'הפקה מוזיקלית',
    'הפקת שירים',
    'מיקס ומאסטרינג',
    'לימודי גיטרה',
    'פלורנטין',
    'M.K Studio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: SITE_URL,
    siteName: STUDIO.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/images/studio-brandmark.png', width: 1400, height: 1400, alt: STUDIO.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/studio-brandmark.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frankRuhl.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          דילוג לתוכן הראשי
        </a>
        <GSAPInit />
        {children}
        {/* Bottom-left corner (RTL). Its launcher takes the lowest slot and the
            WhatsApp float sits directly above it — see WhatsAppFloat. */}
        <AccessibilityWidget
          side="left"
          statementUrl="/accessibility"
          coordinatorName={`רכז נגישות: ${STUDIO.owner}`}
          coordinatorPhone={PHONE_DISPLAY}
          theme={A11Y_THEME}
        />
      </body>
    </html>
  )
}
