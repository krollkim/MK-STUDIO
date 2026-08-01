import Link from 'next/link'
import Logo from './Logo'
import { WhatsAppIcon } from './WhatsAppCTA'
import { PHONE_DISPLAY, PHONE_TEL, STUDIO, WHATSAPP_URL } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="silver-light px-5 py-16 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-9 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Logo size={40} />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            אולפן הקלטות והפקה מוזיקלית · {STUDIO.neighborhood}, {STUDIO.city}
          </p>
        </div>

        <nav aria-label="קישורי תחתית" className="flex flex-col gap-2.5 text-sm">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-accent-ink transition-colors hover:text-accent"
          >
            <WhatsAppIcon size={16} />
            וואטסאפ
          </a>
          <a href={`tel:${PHONE_TEL}`} className="text-muted transition-colors hover:text-ink" dir="ltr">
            {PHONE_DISPLAY}
          </a>
          <Link href="/accessibility" className="text-muted transition-colors hover:text-ink">
            הצהרת נגישות
          </Link>
        </nav>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-line pt-6 text-xs text-muted">
        © {year} {STUDIO.name}. כל הזכויות שמורות.
      </p>
    </footer>
  )
}
