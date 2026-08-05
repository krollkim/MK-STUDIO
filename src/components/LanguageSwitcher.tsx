'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { ScrollTrigger } from '@/lib/gsap'
import {
  DEFAULT_LOCALE,
  LOCALE_BADGE,
  LOCALE_DIR,
  LOCALE_TAG,
  localeFromPathname,
  localePath,
  stripLocale,
  type Locale,
} from '@/lib/i18n'

interface LanguageSwitcherProps {
  /** Accessible name, already in the current language. */
  label: string
  /** Light marks for sitting over the dark hero. */
  onDark?: boolean
  className?: string
}

/**
 * One-click he ↔ en toggle. Not a dropdown: there are two languages, so a menu
 * would be one interaction too many.
 *
 * The URL is the source of truth, not component state. The button NAVIGATES
 * between `/` and `/en`, because each language has to be its own indexable
 * page — a client-side state flip would leave both languages on one URL and
 * make the whole `/en` SEO strategy pointless.
 *
 * It also preserves the current route: from `/terms` you land on `/en/terms`,
 * not back at the home page.
 *
 * Three details that make it look right, all deliberate:
 *   1. `strokeWidth={1.8}` on the globe. The 2.0 default reads heavy and cheap.
 *   2. The border is always present but transparent, so the hover state does
 *      not move a single pixel.
 *   3. Height matches the CTA beside it, so they share a baseline even though
 *      this one has no background at rest.
 */
export default function LanguageSwitcher({
  label,
  onDark = false,
  className = '',
}: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const current = localeFromPathname(pathname)
  const next: Locale = current === DEFAULT_LOCALE ? 'en' : DEFAULT_LOCALE

  const toggle = () => {
    const route = stripLocale(pathname)
    /**
     * Flip <html> immediately so the direction change lands with the
     * navigation instead of a frame later, then let GSAP recompute. An
     * RTL↔LTR flip moves every trigger position on the page, and without the
     * refresh the pinned studio sequence keeps its old coordinates.
     * Inside rAF so it runs after the browser has laid the new direction out.
     */
    document.documentElement.lang = LOCALE_TAG[next]
    document.documentElement.dir = LOCALE_DIR[next]
    router.push(localePath(next, route))
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className={
        'flex h-[40px] items-center gap-2 rounded-lg border border-transparent px-3 ' +
        'transition-colors duration-200 sm:h-[44px] sm:px-3.5 ' +
        (onDark
          ? 'text-white/80 hover:border-white/15 hover:bg-amber-mid/55 hover:text-white'
          : 'text-muted hover:border-ink/10 hover:bg-amber-mid/15 hover:text-ink') +
        ` ${className}`
      }
    >
      <Globe size={17} strokeWidth={1.8} aria-hidden="true" />
      <span className="text-[0.72rem] font-bold tracking-wider sm:text-[0.8rem]" dir="ltr">
        {LOCALE_BADGE[current]}
      </span>
    </button>
  )
}
