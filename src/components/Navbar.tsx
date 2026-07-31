'use client'

import { useEffect, useState } from 'react'
import Logo from './Logo'
import WhatsAppCTA from './WhatsAppCTA'
import { NAV_LINKS } from '@/lib/content'

/**
 * Sticky RTL navbar. Transparent over the hero, then solidifies on scroll so the
 * light hero stays clean at the top of the page.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ' +
        (scrolled || open
          ? 'border-b border-line bg-bg/90 backdrop-blur-md'
          : 'border-b border-transparent')
      }
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* The hero carries the full wordmark, so on phones the bar shows the
            monogram alone and the two don't compete. */}
        <a href="#top" aria-label="M.K Studio — חזרה לראש הדף" className="shrink-0">
          <span className="sm:hidden">
            <Logo size={38} markOnly />
          </span>
          <span className="hidden sm:block">
            <Logo size={38} />
          </span>
        </a>

        <nav aria-label="ניווט ראשי" className="hidden flex-1 justify-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <WhatsAppCTA label="סשן היכרות חינם" className="px-5 py-2.5 text-[15px]" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'סגירת התפריט' : 'פתיחת התפריט'}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
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
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 text-lg font-medium text-ink transition-colors hover:bg-surface"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <WhatsAppCTA variant="green" className="w-full" />
          </div>
        </nav>
      )}
    </header>
  )
}
