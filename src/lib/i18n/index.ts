import { he } from './he'
import { en } from './en'
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAG, localePath, type Locale } from './config'
import type { Dictionary } from './types'

const DICTIONARIES: Record<Locale, Dictionary> = { he, en }

/** The single accessor. Every string on the site comes through here. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale]
}

export type { Dictionary, NavLink, LegalBlock } from './types'
export * from './config'

/** Substitute `{key}` placeholders, e.g. stageLabel: "Stage {n} of {total}". */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match
  )
}

/**
 * canonical + hreflang for one route, in one place.
 *
 * Every page points at its own locale as canonical and at every locale
 * (including itself) via hreflang, with `x-default` on Hebrew — it is both the
 * primary market and the bare root.
 */
export function alternatesFor(
  locale: Locale,
  path: string,
  siteUrl: string
): { canonical: string; languages: Record<string, string> } {
  const abs = (l: Locale) => `${siteUrl}${localePath(l, path)}`
  return {
    canonical: abs(locale),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [LOCALE_TAG[l], abs(l)])),
      'x-default': abs(DEFAULT_LOCALE),
    },
  }
}
