'use client'

import { WhatsAppIcon } from './WhatsAppCTA'
import { buildWhatsAppUrl } from '@/lib/site'
import { usePastHero } from '@/lib/usePastHero'
import type { Dictionary } from '@/lib/i18n'

/**
 * The floating WhatsApp button.
 *
 * Its own file because it is the one thing in the CTA family that needs client
 * JS. Leaving it in WhatsAppCTA.tsx would have pulled that whole module, and
 * every plain `<a>` button in it, into the client bundle.
 *
 * `end-6` keeps it on the reading edge in both directions, and the
 * accessibility launcher in the layout is given the matching physical side so
 * the two stay paired and stacked.
 */
export default function WhatsAppFloat({ cta }: { cta: Dictionary['cta'] }) {
  const pastHero = usePastHero()

  return (
    <a
      href={buildWhatsAppUrl(cta.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cta.floatLabel}
      /* `visibility`, not just opacity: an invisible button that is still in
         the tab order is worse than a visible one in the way. Both properties
         transition, so it fades rather than blinking. */
      aria-hidden={!pastHero}
      tabIndex={pastHero ? undefined : -1}
      className={
        'btn-amber fixed bottom-24 end-6 z-40 flex h-14 w-14 items-center justify-center ' +
        'rounded-full transition-[opacity,visibility,transform] duration-300 hover:scale-105 ' +
        (pastHero ? 'visible opacity-100' : 'invisible opacity-0')
      }
    >
      <span className="inline-flex">
        <WhatsAppIcon size={26} />
      </span>
    </a>
  )
}
