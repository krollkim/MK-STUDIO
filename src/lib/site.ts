/**
 * Single place for everything that is "the business", not "the design".
 *
 * ⚠️ BEFORE GOING LIVE — replace the three placeholders marked TODO below with
 *    Matan's real details. Nothing else in the codebase hardcodes them.
 */

/** WhatsApp requires international digits only: country code, no leading 0, no '+'. */
export const WHATSAPP_PHONE = '972500000000' // TODO: real number, e.g. 972521234567
/** Human-readable phone for the tel: link and the contact card. */
export const PHONE_DISPLAY = '050-000-0000' // TODO: real number
export const PHONE_TEL = '+972500000000' // TODO: real number

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
