/**
 * Locale configuration.
 *
 * URL shape: Hebrew is the primary market and lives at the ROOT (`/`, no
 * prefix); English lives under `/en`. Both are separately indexable.
 *
 * Internally every page still renders from `app/[locale]/…`. A middleware
 * rewrite maps the unprefixed Hebrew URLs onto `/he/…` so there is exactly one
 * set of route files — the URL stays clean, the code does not fork.
 */

export const LOCALES = ['he', 'en'] as const
export type Locale = (typeof LOCALES)[number]

/** Hebrew. Also the locale served from the bare root. */
export const DEFAULT_LOCALE: Locale = 'he'

export const LOCALE_DIR: Record<Locale, 'rtl' | 'ltr'> = {
  he: 'rtl',
  en: 'ltr',
}

/** `lang` attribute + hreflang value. */
export const LOCALE_TAG: Record<Locale, string> = {
  he: 'he-IL',
  en: 'en',
}

/** Two-letter country code shown in the switcher. */
export const LOCALE_BADGE: Record<Locale, string> = {
  he: 'IL',
  en: 'US',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/**
 * Build a public URL for a locale.
 *
 * `path` is the locale-independent route ('/', '/terms', …). The default
 * locale gets no prefix, which is the whole point of the URL strategy.
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return clean || '/'
  return `/${locale}${clean}`
}

/**
 * Strip the locale prefix off a real pathname, giving the route that the
 * switcher can re-apply to the other locale. `/en/terms` → `/terms`.
 */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1)
  }
  return pathname || '/'
}

/** Which locale a real pathname is showing. */
export function localeFromPathname(pathname: string): Locale {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale
  }
  return DEFAULT_LOCALE
}
