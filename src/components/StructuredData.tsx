import { PHONE_TEL, SITE_URL, STUDIO, buildWhatsAppUrl } from '@/lib/site'
import { LOCALE_TAG, localePath, type Dictionary, type Locale } from '@/lib/i18n'

/**
 * JSON-LD for the studio, per locale.
 *
 * Everything is emitted as ONE `@graph` so the nodes can reference each other
 * by `@id` instead of repeating themselves: the studio names Matan as its
 * founder, Matan works for the studio, the site is published by the studio,
 * and each page is part of that site and about that studio. Loose `<script>`
 * tags would carry the same triples but leave a crawler to guess that they
 * describe the same handful of things.
 *
 * WHICH NODES ARE SHARED ACROSS LOCALES, and why:
 *
 *   · studio, matan, website — ONE node each, same `@id` in both languages.
 *     They are the same business, the same person and the same site, so search
 *     engines should merge the two pages onto one entity rather than conclude
 *     there are two studios or two sites. Only Hebrew/English wording differs.
 *   · webpage, faq — one PER locale. A page really is a distinct thing per
 *     language, and it is where `inLanguage` belongs.
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
  const localeRoot = localePath(locale)

  /**
   * Base for the per-page `@id`s below. Hebrew resolves to a trailing slash
   * here, and that is left alone on purpose: an `@id` is an opaque identifier,
   * not an address anything fetches. It only has to be stable and unique, and
   * rewriting one would silently orphan every `isPartOf` / `about` pointing
   * at it.
   */
  const pageUrl = `${SITE_URL}${localeRoot}`

  /**
   * The same page, spelled the way the canonical and `og:url` spell it.
   *
   * `localePath` returns '/' for Hebrew, so `pageUrl` comes out as
   * `https://mk-records.com/` while Next normalises the canonical down to
   * `https://mk-records.com`. `url` IS meant to be resolved, so it has to
   * match the canonical character for character: two spellings of one address
   * is precisely the duplicate that a canonical exists to rule out. English
   * needs no special case, since '/en' carries no trailing slash to begin with.
   */
  const canonicalUrl = localeRoot === '/' ? SITE_URL : pageUrl

  const studioId = `${SITE_URL}/#studio`
  const matanId = `${SITE_URL}/#matan`
  const websiteId = `${SITE_URL}/#website`
  const webpageId = `${pageUrl}#webpage`
  const whatsappUrl = buildWhatsAppUrl(dict.cta.whatsappMessage)

  /**
   * The business.
   *
   * NOT `MusicGroup` — that type describes a band, a group of performers. This
   * is a place of business that happens to make music, so it is a
   * `LocalBusiness` (it has an address and serves an area) and a
   * `ProfessionalService` (the offering is a service, not a product), narrowed
   * to "recording studio" via the productontology `additionalType`. Schema.org
   * has no native recording-studio type; that URI is the standard way to say it.
   *
   * NO `inLanguage`: it is a property of `CreativeWork`, not of an
   * `Organization` or a `Place`. The language of each PAGE is carried by the
   * WebPage node below and by `<html lang>`.
   *
   * NO `openingHoursSpecification` and NO `priceRange`. Both are deliberate.
   * The studio does not keep counter hours — the conversion is a booked
   * session, not a walk-in — and publishing hours nobody keeps is worse than
   * publishing none. `potentialAction` below says what to do instead.
   *
   * NO `aggregateRating`. The testimonials on the page are first-party, and
   * self-serving review markup is against Google's structured-data policy: it
   * earns a manual action, not stars.
   */
  const studio = {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    additionalType: 'http://www.productontology.org/id/Recording_studio',
    '@id': studioId,
    name: STUDIO.name,
    description: dict.structuredData.description,
    url: canonicalUrl,
    /* The WebP cut, not the PNG. Both are 1254x1254 and visually identical,
       but the PNG is 3.82MB against 342KB — 11.5x — and this field is fetched
       by Googlebot, the Rich Results Test and every LLM that reads the graph.
       Nothing renders it to a visitor, so the PNG bought nothing. */
    image: `${SITE_URL}/images/studio-brandmark.webp`,
    telephone: PHONE_TEL,
    founder: { '@id': matanId },

    /**
     * Copied off the studio's Google Maps listing so that the schema and the
     * Business Profile assert the same address, character for character. The
     * two locale-dependent lines come from the dictionary; the postcode and
     * the country code are the same in either language, so they live here.
     *
     * NO `addressRegion`. Google does not use the district on an Israeli
     * record, and every extra field is one more thing that can fail to match.
     */
    address: {
      '@type': 'PostalAddress',
      streetAddress: dict.structuredData.address.streetAddress,
      addressLocality: dict.structuredData.address.addressLocality,
      postalCode: '6195001',
      addressCountry: 'IL',
    },
    /** The pin from the same Maps listing as the address above. */
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.0600791,
      longitude: 34.7740821,
    },
    areaServed: { '@type': 'City', name: STUDIO.city },

    /**
     * `sameAs` is for IDENTITY: other places on the web that are this same
     * business. The wa.me link that used to sit here is an ACTION, not an
     * identity, and it now lives in `potentialAction`, where it belongs.
     */
    sameAs: ['https://www.facebook.com/MkStudioRec'],

    /** The one conversion action on the site, stated as an action. */
    potentialAction: {
      '@type': 'CommunicateAction',
      target: whatsappUrl,
      name: dict.cta.label,
    },

    makesOffer: dict.structuredData.services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.description },
    })),
  }

  /** The producer. Linked both ways: `founder` above, `worksFor` here. */
  const matan = {
    '@type': 'Person',
    '@id': matanId,
    name: dict.structuredData.person.name,
    jobTitle: dict.structuredData.person.jobTitle,
    worksFor: { '@id': studioId },
    sameAs: [
      'https://www.instagram.com/matankatz7',
      'https://open.spotify.com/artist/7F7ERG25fVsOj5mEBjVYnR',
    ],
  }

  /**
   * The site as a whole — ONE node, shared by both languages, exactly like the
   * business and the Person.
   *
   * It deliberately carries no `inLanguage`. A WebSite per locale would say
   * there are two sites here rather than one site in two languages, which is
   * the opposite of what the shared business `@id` is working to establish.
   * The language belongs on the WebPage below, which is the thing that
   * actually has one. `name` is Latin, so it reads the same either way.
   */
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: SITE_URL,
    name: STUDIO.name,
    publisher: { '@id': studioId },
  }

  /**
   * This page, in this language. Everything locale-dependent that used to sit
   * on the WebSite now sits here: one WebPage per locale, both part of the one
   * WebSite, both about the one studio.
   */
  const webpage = {
    '@type': 'WebPage',
    '@id': webpageId,
    url: canonicalUrl,
    inLanguage: LOCALE_TAG[locale],
    isPartOf: { '@id': websiteId },
    about: { '@id': studioId },
  }

  /** Attached to the WebPage it is rendered on, not to the site. */
  const faq = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    inLanguage: LOCALE_TAG[locale],
    isPartOf: { '@id': webpageId },
    mainEntity: dict.structuredData.faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [studio, matan, website, webpage, faq],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
