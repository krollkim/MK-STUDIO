'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import WhatsAppCTA from './WhatsAppCTA'
import LanguageSwitcher from './LanguageSwitcher'
import { localePath, stripLocale, type Dictionary, type Locale } from '@/lib/i18n'

interface NavbarProps {
  locale: Locale
  dict: Dictionary
  /**
   * True when the page opens with the dark cinematic hero: the bar starts
   * transparent with light marks and flips to the silver bar once scrolled.
   * Light pages (the legal routes) leave this off.
   */
  overDarkHero?: boolean
}

export default function Navbar({ locale, dict, overDarkHero = false }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onDark = overDarkHero && !scrolled && !open

  /**
   * The nav anchors are on-page fragments. On any route other than the home
   * page a bare fragment resolves against the CURRENT path, so `/terms#services`
   * just sits there and the visitor is stranded. Off the home page every link
   * becomes an absolute, locale-correct URL.
   */
  const onHome = stripLocale(pathname) === '/'
  const sectionHref = (hash: string) => (onHome ? hash : `${localePath(locale)}${hash}`)
  const homeHref = onHome ? '#top' : localePath(locale)

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ' +
        (scrolled || open
          ? 'border-b border-line bg-bg/85 backdrop-blur-xl'
          : 'border-b border-transparent') +
        (onDark ? ' bg-gradient-to-b from-night/65 via-night/25 to-transparent' : '')
      }
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Over the hero the logo is hidden: the hero shows the wordmark large
            directly below, and two logos stacked read as a mistake. */}
        <a
          href={homeHref}
          aria-label={onHome ? dict.common.backToTop : dict.common.backHome}
          className={
            'shrink-0 transition-opacity duration-500 ' +
            (onDark ? 'pointer-events-none opacity-0' : 'opacity-100')
          }
          tabIndex={onDark ? -1 : undefined}
          aria-hidden={onDark ? 'true' : undefined}
        >
          {/* 40px, not 36: below 40 the component falls back to the
              small-size cut, and the bar has 72px of height to spare. */}
          <span className="sm:hidden">
            <Logo variant="mark" size={34} tone={onDark ? 'light' : 'dark'} />
          </span>
          <span className="hidden sm:block">
            <Logo variant="lockup" size={40} tone={onDark ? 'light' : 'dark'} />
          </span>
        </a>

        <nav aria-label={dict.common.mainNav} className="hidden flex-1 justify-center gap-8 lg:flex">
          {dict.nav.links.map((l) => (
            <a
              key={l.href}
              href={sectionHref(l.href)}
              className={
                'text-[15px] font-medium transition-colors ' +
                (onDark ? 'text-white/85 hover:text-white' : 'text-muted hover:text-ink')
              }
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <LanguageSwitcher label={dict.common.langSwitcherLabel} onDark={onDark} />
          <div className="hidden lg:block">
            <WhatsAppCTA cta={dict.cta} label={dict.nav.ctaShort} size="sm" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            className={
              'flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ' +
              (onDark ? 'border-white/30 text-white' : 'border-line text-ink')
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={dict.common.mobileNav}
          className="border-t border-line bg-bg px-5 py-6 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {dict.nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={sectionHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="display-sm block rounded-2xl px-3 py-3 text-2xl text-ink transition-colors hover:bg-surface"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <WhatsAppCTA cta={dict.cta} className="w-full" />
          </div>
        </nav>
      )}
    </header>
  )
}
