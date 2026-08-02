/**
 * Single place for everything that is "the business", not "the design".
 *
 * ⚠️ BEFORE GOING LIVE — replace every placeholder marked TODO below with
 *    Matan's real details. Nothing else in the codebase hardcodes them.
 */

/* ---------------------------------------------------------------------------
   The one conversion channel.

   WhatsApp is the ONLY way to reach the studio from the landing page itself.
   A phone button next to the CTA splits attention and asks the visitor to make
   a decision they did not come here to make, and nothing is actually lost:
   WhatsApp is a phone number underneath. The audience (creators, 20+) lives
   there already.
   --------------------------------------------------------------------------- */

/** WhatsApp requires international digits only: country code, no leading 0, no '+'. */
export const WHATSAPP_PHONE = '972528777017'

/* ---------------------------------------------------------------------------
   Formal contact details.

   These are NOT for the landing page. They exist because the accessibility
   statement legally has to name a way to report a problem, and the terms /
   privacy pages need a contact. Do not reintroduce them next to a CTA.
   --------------------------------------------------------------------------- */

/** Human-readable phone, legal pages only. */
export const PHONE_DISPLAY = '052-877-7017'
/** `tel:` form of the same number, legal pages only. */
export const PHONE_TEL = '+972528777017'
/** Contact email, legal pages only. */
export const EMAIL = 'matan73737@gmail.com'

export const SITE_URL = 'https://mkstudio.co.il' // TODO: real domain (used for canonical + JSON-LD)

export const STUDIO = {
  name: 'M.K Studio',
  legalName: 'M.K Studio, אולפן הקלטות והפקה מוזיקלית',
  owner: 'מתן',
  neighborhood: 'פלורנטין',
  city: 'תל אביב',
  tagline: 'הופכים את המילים שלך לשיר מוגמר',
} as const

/** The one funnel label written into every lead message. */
export const FUNNEL = 'דף נחיתה M.K Studio'

/** The single prefilled message behind the primary CTA. */
export const WHATSAPP_MESSAGE = [
  `היי מתן, הגעתי מ${STUDIO.name} באינטרנט.`,
  'אשמח לקבוע סשן היכרות חינם. יש לי משהו שכתבתי ואני רוצה להפוך אותו לשיר.',
].join('\n')

/** Build a wa.me deep link with an optional prefilled (URL-encoded) message. */
export function buildWhatsAppUrl(
  message: string = WHATSAPP_MESSAGE,
  phone: string = WHATSAPP_PHONE
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/** The canonical CTA used across every section. */
export const CTA_LABEL = 'קבע סשן היכרות חינם'
export const WHATSAPP_URL = buildWhatsAppUrl()
