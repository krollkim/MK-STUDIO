import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Heebo, Frank_Ruhl_Libre } from 'next/font/google'
import GSAPInit from '@/components/GSAPInit'
import AccessibilityWidget from '@/components/AccessibilityWidget'
import { SITE_URL, STUDIO } from '@/lib/site'
import {
  LOCALES,
  LOCALE_DIR,
  LOCALE_TAG,
  alternatesFor,
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from '@/lib/i18n'
import '../globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
})

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-frank',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f3f0',
}

/** Both locales are prerendered; there is no runtime locale detection. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: alternatesFor(locale, '/', SITE_URL),
    openGraph: {
      type: 'website',
      locale: LOCALE_TAG[locale].replace('-', '_'),
      url: `${SITE_URL}${localePath(locale)}`,
      siteName: STUDIO.name,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [
        { url: '/images/studio-brandmark.png', width: 1400, height: 1400, alt: STUDIO.name },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/images/studio-brandmark.png'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale as Locale)
  const dir = LOCALE_DIR[locale as Locale]

  return (
    <html
      lang={LOCALE_TAG[locale as Locale]}
      dir={dir}
      className={`${heebo.variable} ${frankRuhl.variable}`}
    >
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          {dict.common.skipToContent}
        </a>
        <GSAPInit />
        {children}
        {/* Its launcher takes the lowest slot and the WhatsApp float sits
            directly above it. The widget takes a PHYSICAL side, so it is
            derived from the direction here to stay paired with the float's
            logical `end-6`: left in Hebrew, right in English. */}
        <AccessibilityWidget
          side={dir === 'rtl' ? 'left' : 'right'}
          statementUrl={localePath(locale as Locale, '/accessibility')}
          coordinatorName={dict.a11yWidget.coordinatorName}
          theme={A11Y_THEME}
        />
      </body>
    </html>
  )
}

/**
 * The widget ships with defaults from an earlier palette; this re-points it at
 * the current silver + amber tokens so the panel matches the site.
 */
const A11Y_THEME = {
  bg: '#f4f3f0',
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
