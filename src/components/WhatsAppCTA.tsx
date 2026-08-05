import type { Dictionary } from '@/lib/i18n'
import { buildWhatsAppUrl } from '@/lib/site'

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.519 5.26l-.999 3.648 3.748-.957z" />
    </svg>
  )
}

/**
 * THE call to action. There is exactly one CTA style on this site — burnt
 * amber, white label, WhatsApp glyph — identical in the navbar, in every
 * section, in the footer and on the floating button.
 *
 * `btn-amber` (globals.css) carries the gradient, the cross-fade hover and the
 * halo. Nothing here sets a colour, and there is deliberately no colour prop:
 * a second button colour is how a landing page starts telling the visitor
 * there is more than one thing to do.
 */
const CTA_BASE =
  'btn-amber group inline-flex items-center justify-center gap-2.5 rounded-pill ' +
  'font-bold hover:-translate-y-0.5'

const SIZES = {
  sm: 'px-5 py-2.5 text-[15px]',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4.5 text-[17px]',
} as const

export interface CtaCopy {
  label: string
  opensInWhatsApp: string
  whatsappMessage: readonly string[]
}

interface WhatsAppCTAProps {
  cta: CtaCopy
  /** Override the button text; the accessible name still explains WhatsApp. */
  label?: string
  size?: keyof typeof SIZES
  className?: string
}

export default function WhatsAppCTA({
  cta,
  label,
  size = 'md',
  className = '',
}: WhatsAppCTAProps) {
  const text = label ?? cta.label
  return (
    <a
      href={buildWhatsAppUrl(cta.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${text}. ${cta.opensInWhatsApp}`}
      className={`${CTA_BASE} ${SIZES[size]} ${className}`}
    >
      {/* Wrapped in one element so `.btn-amber > *` can lift it above the
          hover layer — a bare text node cannot take a z-index. */}
      <span className="inline-flex items-center gap-2.5">
        <WhatsAppIcon />
        {text}
      </span>
    </a>
  )
}

/**
 * Quiet secondary link. Never a filled button — the page has one button colour
 * and this must not compete with it.
 *
 * The arrow follows the reading direction: in RTL "forward" is leftward, in
 * LTR it is rightward. Using a logical property here rather than a hardcoded
 * glyph is what keeps it correct in both languages.
 */
export function QuietLink({
  href,
  children,
  onDark = false,
  className = '',
}: {
  href: string
  children: React.ReactNode
  onDark?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      className={
        'group inline-flex items-center gap-2 text-base font-semibold underline-offset-8 transition-colors ' +
        (onDark ? 'text-white/75 hover:text-white' : 'text-ink/70 hover:text-accent') +
        ` ${className}`
      }
    >
      {children}
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        /* rtl:-scale-x-100 mirrors the arrow for Hebrew without a second glyph. */
        className="transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}

/** Floating CTA — same amber as every other CTA, mark only.
 *
 * Sits directly ABOVE the accessibility launcher in the same corner. The
 * widget anchors itself at bottom:24 with a matching 56px button, so this
 * clears it: 24 + 56 + 16 gap = 96px.
 *
 * `end-6` is logical, not physical: it resolves to the LEFT corner in Hebrew
 * and the RIGHT corner in English, which is the corner a reader's thumb
 * naturally rests away from the text in each direction. The accessibility
 * launcher is given the matching `side` in the layout so the two stay paired.
 */
export function WhatsAppFloat({ cta }: { cta: CtaCopy & { floatLabel: string } }) {
  return (
    <a
      href={buildWhatsAppUrl(cta.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cta.floatLabel}
      className="btn-amber fixed bottom-24 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full hover:scale-105"
    >
      <span className="inline-flex">
        <WhatsAppIcon size={26} />
      </span>
    </a>
  )
}

/** Convenience: the shape most callers pass. */
export type CtaDict = Dictionary['cta']
