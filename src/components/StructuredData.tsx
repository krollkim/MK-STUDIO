import { PHONE_TEL, SITE_URL, STUDIO, buildWhatsAppUrl } from '@/lib/site'
import { LOCALE_TAG, localePath, type Dictionary, type Locale } from '@/lib/i18n'

/**
 * JSON-LD for the studio, per locale.
 *
 * `@id` is shared across languages on purpose: it is the same business, so
 * search engines should merge the two pages into one entity rather than treat
 * them as two studios. Only the human-readable fields change.
 *
 * `telephone` stays here even though the landing page shows no phone number:
 * this is machine-readable metadata, not a visible contact point, and it is
 * what local search uses.
 */
export default function StructuredData({
  locale,
  dict,
}: {
  locale: Locale
  dict: Dictionary
}) {
  const pageUrl = `${SITE_URL}${localePath(locale)}`

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    additionalType: 'https://schema.org/LocalBusiness',
    '@id': `${SITE_URL}/#studio`,
    name: STUDIO.name,
    description: dict.structuredData.description,
    inLanguage: LOCALE_TAG[locale],
    url: pageUrl,
    image: `${SITE_URL}/images/studio-brandmark.png`,
    telephone: PHONE_TEL,
    founder: { '@type': 'Person', name: STUDIO.owner },
    address: {
      '@type': 'PostalAddress',
      addressLocality: STUDIO.city,
      addressRegion: STUDIO.neighborhood,
      addressCountry: 'IL',
    },
    areaServed: { '@type': 'City', name: STUDIO.city },
    sameAs: [buildWhatsAppUrl(dict.cta.whatsappMessage)],
    makesOffer: dict.structuredData.services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.description },
    })),
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: LOCALE_TAG[locale],
    mainEntity: dict.structuredData.faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  )
}
