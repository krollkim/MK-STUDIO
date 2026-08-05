import Link from 'next/link'
import { WhatsAppIcon } from './WhatsAppCTA'
import { STUDIO, buildWhatsAppUrl } from '@/lib/site'
import { localePath, type Dictionary, type Locale } from '@/lib/i18n'

/**
 * The footer is a silver plate with the wordmark pressed into it.
 *
 * The visual work lives in `.site-footer*` in globals.css — the deboss, the
 * brushed grooves and the sheen are effects Tailwind cannot express readably.
 * Layout stays in utilities here.
 *
 * The seam above it is the only one left on the site, and carries the only
 * amber dot on the page.
 */
export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear()

  const legalLinks = [
    { href: '/accessibility', label: dict.legal.accessibility.title },
    { href: '/terms', label: dict.legal.terms.title },
    { href: '/privacy', label: dict.legal.privacy.title },
  ]

  return (
    <>
      <div className="seam" aria-hidden="true" />

      <footer className="site-footer">
        <div className="site-footer__brush" aria-hidden="true" />
        <div className="site-footer__sheen" aria-hidden="true" />

        {/* ---- identity + the one contact channel ----
             Stacked and centred while it is a column; the desktop
             space-between row is untouched from md up. */}
        <div className="relative flex flex-col items-center gap-8 px-5 text-center sm:px-12 md:flex-row md:items-start md:justify-between md:gap-12 md:text-start lg:px-24">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <span className="site-footer__monogram" aria-hidden="true">
              MK
            </span>
            <div>
              <p className="font-serif text-[21px] leading-tight text-ink">
                {dict.common.footerTagline}
              </p>
              <p className="mt-1.5 text-[13px] tracking-[0.3em] text-[#6E665F]">
                {dict.common.locationShort}
              </p>
            </div>
          </div>

          {/* WhatsApp only. No phone number in the footer. */}
          <a
            href={buildWhatsAppUrl(dict.cta.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 self-center text-[18px] font-medium text-amber-deep transition-colors hover:text-[#B4581F] md:self-start md:pt-3.5"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B4581F]" />
            <WhatsAppIcon size={18} />
            {dict.common.whatsappWord}
          </a>
        </div>

        {/* ---- the pressed wordmark ---- */}
        <div className="site-footer__mark">M.K STUDIO</div>

        {/* Extra bottom padding on phones: the floating WhatsApp and
            accessibility buttons occupy the bottom 152px of the viewport and
            sat on top of the last legal link. Verified by hit-testing. */}
        <div className="relative mt-10 flex flex-col items-center gap-6 px-5 pb-40 text-center sm:px-12 md:flex-row md:items-center md:justify-between md:gap-8 md:pb-11 md:text-start lg:px-24">
          <p className="text-[13px] text-[#6E665F]">
            © {STUDIO.name} {year} · {dict.common.rights}
          </p>
          <nav
            aria-label={dict.common.legalNav}
            className="flex flex-wrap justify-center gap-x-6.5 gap-y-3 md:justify-start"
          >
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={localePath(locale, l.href)}
                className="text-[15px] text-[#4E4842] transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  )
}
