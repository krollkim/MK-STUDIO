'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import WhatsAppCTA from './WhatsAppCTA'
import { NAV_LINKS } from '@/lib/content'

interface NavbarProps {
  /**
   * True when the page opens with the dark cinematic hero: the bar starts
   * transparent with light marks and flips to the greige bar once scrolled.
   * Light pages (e.g. /accessibility) leave this off and stay dark-on-light.
   */
  overDarkHero?: boolean
}

export default function Navbar({ overDarkHero = false }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  /**
   * The nav anchors are on-page fragments (`#services`). On any route other
   * than the home page a bare fragment resolves against the CURRENT path, so
   * `/privacy#services` just sits there doing nothing and the visitor is
   * stranded with no way back. Off the home page every link becomes absolute.
   *
   * Derived from the pathname rather than a prop so a new route added later
   * cannot forget to pass it.
   */
  const onHome = pathname === '/'
  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`)
  const homeHref = onHome ? '#top' : '/'

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

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ' +
        (scrolled || open
          ? 'border-b border-line bg-bg/85 backdrop-blur-xl'
          : 'border-b border-transparent') +
        // Over the photo hero the bar needs its own scrim — the top of the
        // frame is pale wood and white links wash out against it.
        (onDark ? ' bg-gradient-to-b from-night/65 via-night/25 to-transparent' : '')
      }
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Over the hero the logo is hidden: the hero itself shows the wordmark
            large, directly below, and two logos stacked on top of each other
            read as a mistake. It fades in as the hero scrolls away, which is
            exactly when the bar needs to carry the identity on its own. */}
        <a
          href={homeHref}
          aria-label={onHome ? 'M.K Studio, חזרה לראש הדף' : 'M.K Studio, חזרה לדף הבית'}
          className={
            'shrink-0 transition-opacity duration-500 ' +
            (onDark ? 'pointer-events-none opacity-0' : 'opacity-100')
          }
          tabIndex={onDark ? -1 : undefined}
          aria-hidden={onDark ? 'true' : undefined}
        >
          <span className="sm:hidden">
            <Logo size={36} markOnly />
          </span>
          <span className="hidden sm:block">
            <Logo size={36} />
          </span>
        </a>

        <nav aria-label="ניווט ראשי" className="hidden flex-1 justify-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
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

        <div className="hidden shrink-0 lg:block">
          <WhatsAppCTA label="סשן היכרות חינם" size="sm" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'סגירת התפריט' : 'פתיחת התפריט'}
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

      {open && (
        <nav
          id="mobile-menu"
          aria-label="ניווט ראשי (נייד)"
          className="border-t border-line bg-bg px-5 py-6 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={sectionHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 display-sm text-2xl text-ink transition-colors hover:bg-surface"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {/* Same amber CTA as everywhere else — no second colour on mobile. */}
            <WhatsAppCTA className="w-full" />
          </div>
        </nav>
      )}
    </header>
  )
}
