import { CTA_LABEL, WHATSAPP_URL } from '@/lib/site'

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
 * amber, white label, WhatsApp glyph — and it looks identical in the navbar,
 * in every section, in the footer and on the floating button. `size` changes
 * the padding, never the colour.
 *
 * Deliberately NOT a variant system: a second colour is how a landing page
 * starts telling the visitor there is more than one thing to do.
 */
// `btn-amber` (globals.css) carries the two-layer amber gradient, its
// cross-fade hover and the warm halo. Nothing here sets a colour.
const CTA_BASE =
  'btn-amber group inline-flex items-center justify-center gap-2.5 rounded-pill ' +
  'font-bold hover:-translate-y-0.5'

const SIZES = {
  sm: 'px-5 py-2.5 text-[15px]',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4.5 text-[17px]',
} as const

interface WhatsAppCTAProps {
  label?: string
  size?: keyof typeof SIZES
  href?: string
  className?: string
  ariaLabel?: string
}

export default function WhatsAppCTA({
  label = CTA_LABEL,
  size = 'md',
  href = WHATSAPP_URL,
  className = '',
  ariaLabel,
}: WhatsAppCTAProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? `${label} — נפתח בוואטסאפ בחלון חדש`}
      className={`${CTA_BASE} ${SIZES[size]} ${className}`}
    >
      {/* Wrapped in one element so `.btn-amber > *` can lift it above the
          hover layer — a bare text node cannot take a z-index. */}
      <span className="inline-flex items-center gap-2.5">
        <WhatsAppIcon />
        {label}
      </span>
    </a>
  )
}

/**
 * Quiet secondary link. Never a filled button — the page has one button colour
 * and this must not compete with it.
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
      {/* RTL: "forward" is leftward. */}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1">
        ←
      </span>
    </a>
  )
}

/**
 * Floating CTA — same amber as every other CTA, mark only.
 *
 * Sits directly ABOVE the accessibility launcher in the same corner. The
 * widget anchors itself at bottom:24 with a matching 56px button, so this
 * clears it: 24 + 56 + 16 gap = 96px. `left-6` matches the widget's 24px
 * inset so the two read as one column of identical amber circles.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פתיחת שיחת וואטסאפ עם M.K Studio בחלון חדש"
      className="btn-amber fixed bottom-24 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full hover:scale-105"
    >
      <span className="inline-flex">
        <WhatsAppIcon size={26} />
      </span>
    </a>
  )
}
