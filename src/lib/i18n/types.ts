/**
 * The shape every locale must fill.
 *
 * This is the ONLY place site copy lives. There is no second copy in
 * brand.json any more — that file drifted out of sync once already and now
 * documents design decisions only.
 *
 * Anything a human or a screen reader can read belongs here: headings, body,
 * button labels, `alt`, `aria-label`, page metadata, JSON-LD and the prefilled
 * WhatsApp message.
 */

export interface NavLink {
  label: string
  /** Locale-independent route or on-page hash. */
  href: string
}

export interface LegalBlock {
  title: string
  paragraphs?: string[]
  list?: string[]
}

export interface Dictionary {
  meta: {
    title: string
    description: string
    keywords: string[]
  }

  common: {
    skipToContent: string
    backHome: string
    backToTop: string
    mainNav: string
    mobileNav: string
    openMenu: string
    closeMenu: string
    langSwitcherLabel: string
    lastUpdated: string
    legalNav: string
    footerTagline: string
    /** "Florentin · Tel Aviv" — used under the logo and in the footer. */
    locationShort: string
    rights: string
    whatsappWord: string
  }

  nav: {
    links: NavLink[]
    ctaShort: string
  }

  cta: {
    label: string
    /** Appended to the accessible name, e.g. "opens WhatsApp in a new tab". */
    opensInWhatsApp: string
    floatLabel: string
    /** Prefilled message body. */
    whatsappMessage: string[]
  }

  hero: {
    eyebrow: string
    headline: string
    headlineAccent: string
    subhead: string
    secondaryCta: NavLink
    badges: string[]
    photoAlt: string
  }

  audience: {
    eyebrow: string
    title: string
    lead: string
    ambient: string
    items: { title: string; body: string }[]
  }

  services: {
    eyebrow: string
    title: string
    lead: string
    ambient: string
    items: { title: string; body: string; bullets: string[] }[]
    outcome: {
      eyebrow: string
      title: string
      body: string
      points: string[]
      posterAlt: string
    }
  }

  space: {
    eyebrow: string
    title: string
    lead: string
    /** "Stage {n} of {total}" — `{n}` and `{total}` are substituted. */
    stageLabel: string
    steps: { title: string; caption: string; image: string; alt: string }[]
  }

  about: {
    eyebrow: string
    title: string
    ambient: string
    body: string[]
    quote: string
    valueNote: { title: string; body: string }
    video: { src: string; poster: string; label: string }
    playLabel: string
    guitarAlt: string
    sessionAlt: string
  }

  proof: {
    eyebrow: string
    title: string
    videos: { name: string; role: string; quote?: string }[]
    placeholder: { title: string; subtitle: string }
    reviewAlts: string[]
  }

  process: {
    eyebrow: string
    title: string
    ambient: string
    steps: { title: string; body: string }[]
  }

  contact: {
    eyebrow: string
    title: string
    subtitle: string
    ambient: string
    reassurance: string
    location: string
  }

  structuredData: {
    description: string
    services: { name: string; description: string }[]
    faq: { question: string; answer: string }[]
  }

  a11yWidget: {
    coordinatorName: string
  }

  legal: {
    accessibility: {
      metaTitle: string
      metaDescription: string
      eyebrow: string
      title: string
      lastUpdated: string
      sections: LegalBlock[]
      contact: { title: string; body: string; whatsapp: string }
    }
    terms: {
      metaTitle: string
      metaDescription: string
      eyebrow: string
      title: string
      lastUpdated: string
      sections: LegalBlock[]
      contact: { title: string; body: string }
    }
    privacy: {
      metaTitle: string
      metaDescription: string
      eyebrow: string
      title: string
      lastUpdated: string
      sections: LegalBlock[]
      contact: { title: string; body: string }
    }
  }
}
