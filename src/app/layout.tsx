import type { Metadata, Viewport } from 'next'
import { Heebo } from 'next/font/google'
import GSAPInit from '@/components/GSAPInit'
import { SITE_URL, STUDIO } from '@/lib/site'
import './globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
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
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          דילוג לתוכן הראשי
        </a>
        <GSAPInit />
        {children}
      </body>
    </html>
  )
}
