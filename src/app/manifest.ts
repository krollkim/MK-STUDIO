import type { MetadataRoute } from 'next'
import { DEFAULT_LOCALE, LOCALE_DIR, LOCALE_TAG, getDictionary } from '@/lib/i18n'
import { STUDIO } from '@/lib/site'

/**
 * The web app manifest, served at `/manifest.webmanifest`.
 *
 * Next links it into every page automatically, the same way it links
 * `src/app/icon.svg` and `src/app/apple-icon.png` — which is why there is no
 * `icons:` block in `generateMetadata`. Those two files ARE the icon set as far
 * as the browser tab is concerned, and file-convention metadata wins over the
 * config-based kind, so declaring the same icons twice would be dead code at
 * best and a conflicting `<link>` at worst.
 *
 * What was actually missing is this file. The raster cuts in `/public/favicon`
 * had no consumer at all before it; the manifest is what an installed
 * home-screen icon and an Android launcher read.
 *
 * Hebrew only, deliberately: it is the default locale and the one served from
 * the bare root, and a manifest describes the app as a whole, not one language
 * version of it. `start_url` is '/' for the same reason.
 */
export default function manifest(): MetadataRoute.Manifest {
  const dict = getDictionary(DEFAULT_LOCALE)

  return {
    name: `${STUDIO.name} · ${dict.common.footerTagline}`,
    short_name: STUDIO.name,
    description: dict.meta.description,
    lang: LOCALE_TAG[DEFAULT_LOCALE],
    dir: LOCALE_DIR[DEFAULT_LOCALE],
    start_url: '/',
    display: 'standalone',
    /* Both track the silver ground the site opens on, so the splash screen
       never flashes a colour the site itself does not use. Keep in step with
       the `themeColor` in app/[locale]/layout.tsx. */
    background_color: '#f4f3f0',
    theme_color: '#f4f3f0',
    icons: [
      { src: '/favicon/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { src: '/favicon/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { src: '/favicon/favicon-180.png', sizes: '180x180', type: 'image/png' },
      { src: '/favicon/favicon-512.png', sizes: '512x512', type: 'image/png' },
      /* Scales to whatever a launcher asks for; the rasters above are the
         fallback for the platforms that still refuse SVG. */
      { src: '/favicon/mk-studio-favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
