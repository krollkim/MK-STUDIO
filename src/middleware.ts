import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n/config'

/**
 * Keeps Hebrew on unprefixed URLs.
 *
 * Every page lives under `app/[locale]/…`, but the Hebrew site must be served
 * from `/`, `/terms`, … rather than `/he/…`. This rewrites those requests onto
 * the `he` segment WITHOUT changing the address bar, so there is one set of
 * route files and no duplicated tree.
 *
 * Deliberately no Accept-Language sniffing: the default is Hebrew, and the
 * language is chosen by the visitor via the switcher, not guessed for them.
 */
const PREFIXED = LOCALES.filter((l) => l !== DEFAULT_LOCALE)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Already addressed to a prefixed locale — hand straight to the segment.
  if (PREFIXED.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  /**
   * Skip everything that is not a page: Next internals, metadata routes, and
   * anything with a file extension (images, video, fonts).
   */
  matcher: ['/((?!_next|api|.*\\.).*)'],
}
