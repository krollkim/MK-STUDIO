/**
 * Single place for everything that is "the business", not "the design".
 *
 * Language-independent only. Anything a human reads lives in the dictionary
 * (src/lib/i18n) so it exists once per locale — including the prefilled
 * WhatsApp message, which is why `buildWhatsAppUrl` takes the message rather
 * than owning one.
 *
 * ⚠️ BEFORE GOING LIVE — SITE_URL is still a placeholder.
 */

/* ---------------------------------------------------------------------------
   The one conversion channel.

   WhatsApp is the ONLY way to reach the studio from the landing page itself.
   A phone button next to the CTA splits attention and asks the visitor to make
   a decision they did not come here to make, and nothing is actually lost:
   WhatsApp is a phone number underneath.
   --------------------------------------------------------------------------- */

/** WhatsApp requires international digits only: country code, no leading 0, no '+'. */
export const WHATSAPP_PHONE = '972528777017'

/* ---------------------------------------------------------------------------
   Formal contact details.

   NOT for the landing page. They exist because the accessibility statement
   legally has to name a way to report a problem, and the terms / privacy pages
   need a contact. Do not reintroduce them next to a CTA.
   --------------------------------------------------------------------------- */

/** Human-readable phone, legal pages only. */
export const PHONE_DISPLAY = '052-877-7017'
/** `tel:` form of the same number, legal pages only. */
export const PHONE_TEL = '+972528777017'
/** Contact email, legal pages only. */
export const EMAIL = 'matan73737@gmail.com'

export const SITE_URL = 'https://mkstudio.co.il' // TODO: real domain (canonical + hreflang + JSON-LD)

/** Language-independent facts. Names stay Latin in both locales. */
export const STUDIO = {
  name: 'M.K Studio',
  owner: 'Matan',
  neighborhood: 'Florentin',
  city: 'Tel Aviv',
} as const

/** The one funnel label written into every lead message. */
export const FUNNEL = 'M.K Studio landing page'

/** Build a wa.me deep link with a prefilled (URL-encoded) message. */
export function buildWhatsAppUrl(messageLines: readonly string[]): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(messageLines.join('\n'))}`
}
