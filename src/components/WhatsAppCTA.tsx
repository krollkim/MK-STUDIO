import { CTA_LABEL, WHATSAPP_URL } from '@/lib/site'

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
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

type Variant = 'solid' | 'green' | 'outline'

const VARIANTS: Record<Variant, string> = {
  solid: 'bg-primary text-white hover:bg-ink shadow-[0_10px_30px_-12px_rgba(20,22,26,0.6)]',
  green: 'bg-whatsapp text-[#06301a] hover:brightness-95 shadow-[0_10px_30px_-12px_rgba(37,211,102,0.7)]',
  outline: 'border border-ink/20 bg-white/70 text-ink hover:border-ink/40 hover:bg-white',
}

interface WhatsAppCTAProps {
  label?: string
  variant?: Variant
  /** Extra note appended to the prefilled message so you can tell CTAs apart. */
  href?: string
  className?: string
  /** Optional context for screen readers when several CTAs share a label. */
  ariaLabel?: string
}

/**
 * The site's single conversion action: open WhatsApp with a prefilled Hebrew
 * message. Everything routes here — there is no form and no phone-first path.
 */
export default function WhatsAppCTA({
  label = CTA_LABEL,
  variant = 'solid',
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
      className={
        'inline-flex items-center justify-center gap-2.5 rounded-pill px-7 py-3.5 text-base font-bold ' +
        'transition-all duration-200 hover:-translate-y-0.5 ' +
        VARIANTS[variant] +
        ' ' +
        className
      }
    >
      <WhatsAppIcon />
      {label}
    </a>
  )
}

/** Always-visible floating WhatsApp button (RTL: pinned bottom-left of viewport). */
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פתיחת שיחת וואטסאפ עם M.K Studio בחלון חדש"
      className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)] transition-transform hover:scale-105 sm:bottom-7 sm:left-7"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
