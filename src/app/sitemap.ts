import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAG, localePath } from '@/lib/i18n'

/** Every route, in every language. */
const ROUTES: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/accessibility', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
]

/**
 * Both locales are listed as separate URLs, and each entry carries the
 * `alternates.languages` map so crawlers can pair them up from the sitemap
 * alone rather than relying only on the in-page hreflang tags.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.map((l) => [LOCALE_TAG[l], `${SITE_URL}${localePath(l, path)}`])
          ),
          'x-default': `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`,
        },
      },
    }))
  )
}
