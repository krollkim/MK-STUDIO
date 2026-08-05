import type { Dictionary } from './types'

/**
 * English.
 *
 * Written for tone, not translated word for word. The Hebrew is warm, direct
 * and slightly confessional; the English has to sound like a person wrote it,
 * not like the Hebrew ran through a translator. Where a literal rendering
 * would sound stiff, the line is rewritten to carry the same feeling.
 *
 * Em dashes are allowed here (they are native to English) but kept sparse —
 * a page full of them reads as machine-written in this language too.
 */
export const en: Dictionary = {
  meta: {
    title: 'M.K Studio | Recording & Music Production in Florentin, Tel Aviv',
    description:
      "Matan's recording and music production studio in Florentin, Tel Aviv. Songs produced end to end: writing, playing, tracking, mixing and mastering. Studio time and guitar lessons. First session is free.",
    keywords: [
      'recording studio',
      'recording studio Tel Aviv',
      'music production',
      'song production',
      'mixing and mastering',
      'guitar lessons',
      'Florentin',
      'M.K Studio',
    ],
  },

  common: {
    skipToContent: 'Skip to main content',
    backHome: 'M.K Studio, back to home',
    backToTop: 'M.K Studio, back to top',
    mainNav: 'Main navigation',
    mobileNav: 'Main navigation (mobile)',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    langSwitcherLabel: 'Switch to Hebrew',
    lastUpdated: 'Last updated',
    legalNav: 'Legal links',
    footerTagline: 'Recording & music production',
    locationShort: 'Florentin · Tel Aviv',
    rights: 'All rights reserved',
    whatsappWord: 'WhatsApp',
  },

  nav: {
    links: [
      { label: 'What I do', href: '#services' },
      { label: 'The room', href: '#space' },
      { label: 'About Matan', href: '#about' },
      { label: 'Reviews', href: '#proof' },
      { label: 'How it works', href: '#process' },
    ],
    ctaShort: 'Free first session',
  },

  cta: {
    label: 'Book a free first session',
    opensInWhatsApp: 'opens WhatsApp in a new tab',
    floatLabel: 'Open a WhatsApp chat with M.K Studio in a new tab',
    whatsappMessage: [
      'Hi Matan, I found M.K Studio online.',
      "I'd love to book a free first session. I've written something and I want to turn it into a song.",
    ],
  },

  hero: {
    eyebrow: 'Recording & music production · Florentin, Tel Aviv',
    headline: 'We turn your words',
    headlineAccent: 'into a finished song',
    subhead:
      "You've written something you believe in and no idea how to turn it into a song? That's exactly what I'm here for. Writing, playing, tracking, mixing and mastering, all under one roof, and you walk out with a song that's ready to release.",
    secondaryCta: { label: 'What happens in the first session', href: '#process' },
    badges: ['Full production, start to finish', 'Acoustically treated room in Florentin', 'First session free'],
    photoAlt:
      'Matan and an artist sitting together at the console in M.K Studio, working on a song',
  },

  audience: {
    eyebrow: 'Who this is for',
    title: "Anyone with something to say who hasn't heard it played yet",
    lead: "If you write for the drawer, record yourself on your phone, and feel that song deserves more, you're in the right place.",
    ambient: 'WORDS',
    items: [
      {
        title: 'Writers and creators, 20+',
        body: 'People who already have the words, looking for someone to give them a sound and a shape.',
      },
      {
        title: 'Artists at the start',
        body: "You've got a song or two, and you want a first single you won't be embarrassed to put on Spotify.",
      },
      {
        title: 'Anyone who wants to play',
        body: 'One-on-one guitar lessons, at your pace, built around the songs you actually want to play.',
      },
    ],
  },

  services: {
    eyebrow: 'The work and the result',
    title: 'Everything covered: from the first word to the song on streaming',
    lead: 'You bring the idea. The rest happens here, in the studio, together.',
    ambient: 'SOUND',
    items: [
      {
        title: 'Song production',
        body: 'The whole thing: writing, arrangement, real instruments played live, vocal tracking, mixing and mastering. One process, one person accountable.',
        bullets: ['Writing & arrangement', 'Playing & tracking', 'Mixing & mastering'],
      },
      {
        title: 'Studio time',
        body: 'A carefully built, acoustically treated room in Florentin with professional gear. Right for vocals, guitars, podcasts or demos.',
        bullets: ['Vocal sessions', 'Instrument tracking', 'Demos & scratch takes'],
      },
      {
        title: 'Guitar lessons',
        body: "Personal lessons built around what you want to play. From your first chord to playing your own song front to back.",
        bullets: ['One on one', 'Any level', 'Built around you'],
      },
    ],
    outcome: {
      eyebrow: 'The result',
      title: 'What you walk out with',
      body: "A mastered song, ready to release everywhere. And along the way, direction too: what to do with it, where to send it, and how to keep going from here.",
      points: [
        'A mastered file ready for Spotify, Apple Music and the rest',
        'Guidance on what to do with the song once it exists',
        'Stems and working versions, because the song stays yours',
      ],
      posterAlt:
        'M.K Studio brand graphic: the recording setup with microphone, monitors, piano and guitars',
    },
  },

  space: {
    eyebrow: 'The room',
    title: 'We built this place from nothing',
    lead: 'Wall after wall, panel after panel, until it became a room where you can actually hear yourself.',
    stageLabel: 'Stage {n} of {total}',
    steps: [
      {
        title: 'The shell',
        caption: 'An empty room, a desk built by hand, and the whole idea still on paper.',
        image: '/images/studio-build-1',
        alt: 'First build stage of the studio: the console desk being built by hand in an empty room',
      },
      {
        title: 'The acoustics',
        caption: 'Isolation, panels, bass traps and monitors. The room starts to sound right.',
        image: '/images/studio-build-2',
        alt: 'Second build stage: acoustic panels, bass traps and monitors installed in the studio',
      },
      {
        title: 'The room, alive',
        caption: "And here's the place you record your song in.",
        image: '/images/studio-final',
        alt: 'The finished M.K Studio: console, piano, guitars and full acoustic treatment',
      },
    ],
  },

  about: {
    eyebrow: 'Why Matan',
    title: "I'm not just a producer. First of all, I listen.",
    ambient: 'SONG',
    body: [
      "I'm hungry to create. Music isn't work for me. It's the thing I get up for.",
      "Before I touch an instrument, I want to understand you: where this song came from, what the feeling behind the words is, and what you're actually trying to say. Only then do I translate that into chords, into an arrangement, into sound.",
      "I'm a people person. The process here is intimate. There's no assembly line and no templates. There's one song, yours, and the two of us in the room until it sounds the way it should.",
    ],
    quote: 'The words are already yours. My job is to let them be heard.',
    valueNote: {
      title: 'A word about cost',
      body: "Real production isn't something you can do alone in a bedroom. It takes an ear, a room, gear and hours of work. You're not buying studio time here; you're walking out with a finished song that simply didn't exist before.",
    },
    video: {
      src: '/video/matan-story.mp4',
      poster: '/video/matan-story-poster.jpg',
      label: 'Matan on himself and the studio',
    },
    playLabel: 'Play the video',
    guitarAlt: 'Matan tracking guitar with an artist in the studio, at the console',
    sessionAlt: 'A recording session at M.K Studio',
  },

  proof: {
    eyebrow: 'In their words',
    title: 'What people say after going through it',
    videos: [
      { name: 'Or', role: 'Guitar student', quote: "I learned to play without feeling like I was studying." },
      { name: 'Tair', role: 'Songwriter', quote: 'I came in with words and left with a song.' },
      { name: 'Next up', role: 'This one could be yours' },
    ],
    placeholder: { title: 'Saved spot', subtitle: 'for the next video review' },
    reviewAlts: [
      'A WhatsApp thank-you from Karin: "Thank you so much for everything, for the time and the care. You genuinely rescued me from a broken playback to a really beautiful one."',
      'A WhatsApp message from Amit Igar: "The studio I rented was insane, the gear is unbelievable. Every take came out amazing, we tracked both vocals and guitars, and the acoustics were just stunning."',
      'A WhatsApp message from Naftali: "Yesterday I pulled out a guitar in front of everyone and played for an hour! You are a king."',
    ],
  },

  process: {
    eyebrow: 'How it works',
    title: 'Four steps from first message to a song that’s out',
    /* Pairs with the Contact section's ambient word: the two read as one
       phrase across the sections ("HERE … BEGINS"), the way the Hebrew
       "מכאן … נתחיל" does. They must never be the same word. */
    ambient: 'HERE',
    steps: [
      {
        title: 'A quick chat on WhatsApp',
        body: 'Message me, tell me in one line what you have. No forms, no commitment.',
      },
      {
        title: 'A free first session',
        body: "We meet at the studio, listen to what you wrote, and work out where it could go. Even if we don't continue, you leave with a direction.",
      },
      {
        title: 'The production',
        body: 'Writing, arrangement, playing, tracking, mixing and mastering. Step by step, with you in the room signing off on each one.',
      },
      {
        title: 'Finished song and release',
        body: 'You get a mastered file ready for the platforms, plus guidance on what to do with it next.',
      },
    ],
  },

  contact: {
    eyebrow: "Let's start",
    title: 'The first session is on us',
    subtitle:
      "Send me one line on WhatsApp about what you've written, and we'll set up a session at the studio. No cost, no commitment.",
    /* Second half of the phrase begun by the Process section. */
    ambient: 'BEGINS',
    reassurance: 'No commitment · usually answered within a few hours',
    location: 'The studio is in Florentin, Tel Aviv',
  },

  structuredData: {
    description:
      'Recording and music production studio in Florentin, Tel Aviv. Songs produced end to end: writing, playing, tracking, mixing and mastering. Studio time and guitar lessons.',
    services: [
      {
        name: 'Song production',
        description:
          'Full production: writing, arrangement, playing, vocal tracking, mixing and mastering, through to a mastered song ready to release.',
      },
      {
        name: 'Studio time',
        description:
          'Vocal, guitar, podcast and demo sessions in an acoustically treated room in Florentin.',
      },
      {
        name: 'Guitar lessons',
        description:
          'One-on-one guitar lessons for any level, built around the songs the student wants to play.',
      },
    ],
    faq: [
      {
        question: 'Where is the studio?',
        answer: 'M.K Studio is in Florentin, Tel Aviv.',
      },
      {
        question: 'How does a project start?',
        answer:
          'Send a WhatsApp message, book a free first session at the studio, and from there the production begins: writing, arrangement, playing, tracking, mixing and mastering.',
      },
      {
        question: 'Is the first session really free?',
        answer:
          "Yes. The first meeting at the studio is free and carries no commitment. We listen to what you've written and work out where it could go.",
      },
      {
        question: 'What do I get at the end?',
        answer:
          'A mastered song ready to release on every streaming platform, along with guidance on what to do with it next.',
      },
    ],
  },

  a11yWidget: {
    coordinatorName: 'Accessibility coordinator: Matan',
  },

  legal: {
    accessibility: {
      metaTitle: 'Accessibility statement | M.K Studio',
      metaDescription:
        "M.K Studio's accessibility statement: the level of accessibility, the adjustments made, and how to reach the accessibility coordinator.",
      eyebrow: 'Accessibility',
      title: 'Accessibility statement',
      lastUpdated: '31 July 2026',
      sections: [
        {
          title: 'Our commitment',
          paragraphs: [
            'At M.K Studio we treat accessibility as part of the service, not an afterthought. We work to make sure anyone, including people with disabilities, can use this site independently, comfortably and equally.',
            'The site was built following Israeli Standard 5568, which is based on the WCAG 2.1 Level AA guidelines, and in line with the Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 2013.',
          ],
        },
        {
          title: 'What has been done',
          list: [
            'The site is available in Hebrew with full RTL direction and in English with LTR direction, each correctly marked up.',
            'A correct heading hierarchy (a single H1 per page, then H2 and H3), which makes screen-reader navigation efficient.',
            'Full keyboard navigation, including a "skip to main content" link at the start of every page and a clear, visible focus indicator.',
            'Alternative text on every meaningful image; decorative images are marked so screen readers skip them.',
            'Videos only play when the visitor starts them. Nothing autoplays and no sound starts on its own.',
            'Colour contrast that meets Level AA for text and interface elements.',
            'The operating-system "reduced motion" preference is respected: when it is on, scroll animations are disabled.',
            'Text can be enlarged in the browser without losing content or functionality.',
            'Semantic markup and ARIA attributes on buttons, menus and page regions.',
          ],
        },
        {
          title: 'Known limitations',
          paragraphs: [
            'Some of the reviews on the site are shown as real screenshots of WhatsApp messages. Each one has alternative text carrying the content of the review, but the text inside the image cannot be selected or enlarged.',
            'The review videos and the personal video do not currently have captions. We are working on adding them, and in the meantime we are happy to provide the content in writing to anyone who asks.',
            'Some pages or components may not yet be fully accessible. We continue to test and improve the site on an ongoing basis.',
          ],
        },
      ],
      contact: {
        title: 'Accessibility enquiries',
        body: 'Ran into an accessibility problem, or have a suggestion? We would genuinely like to hear it. Our accessibility coordinator is Matan, and we try to handle every enquiry as quickly as we can.',
        whatsapp: 'Message on WhatsApp',
      },
    },

    terms: {
      metaTitle: 'Terms of use | M.K Studio',
      metaDescription:
        'Terms of use for the M.K Studio site: the status of the information, copyright, and how to get in touch.',
      eyebrow: 'Terms',
      title: 'Terms of use',
      lastUpdated: '2 August 2026',
      sections: [
        {
          title: 'General',
          paragraphs: [
            'This site presents the services of M.K Studio, a recording and music production studio in Florentin, Tel Aviv. Browsing and using the site constitutes agreement to the terms below.',
          ],
        },
        {
          title: 'The information on this site',
          list: [
            'The content here is general information about the services and does not constitute a binding offer.',
            'There is no price list on this site. Scope, timelines and fees are agreed separately with each client, in writing, before work begins.',
            'The first session is provided free of charge, with no commitment on either side.',
          ],
        },
        {
          title: 'Intellectual property',
          paragraphs: [
            'All content on this site, including the photographs, videos, recordings, text and logo, belongs to M.K Studio or is shown with the permission of its owners. It may not be copied, reproduced, distributed or used commercially without prior written consent.',
            'The reviews shown on the site are real messages and content received from clients, published with their permission.',
          ],
        },
        {
          title: 'Rights in your song',
          paragraphs: [
            'The rights in the work you bring to the studio remain yours. How rights in the finished recording are shared, where relevant, is agreed in advance and in writing with each client before production begins.',
          ],
        },
        {
          title: 'External links and services',
          paragraphs: [
            "The contact buttons on this site open WhatsApp. Using it is subject to Meta's terms of service and privacy policy, which are outside our control.",
          ],
        },
        {
          title: 'Liability',
          paragraphs: [
            'We make an effort to keep the information on this site accurate and current. Even so, errors are possible, and nothing on the site creates a binding obligation. The site is provided as is.',
          ],
        },
        {
          title: 'Changes to these terms',
          paragraphs: [
            'These terms may be updated from time to time. The binding version is the one published on this page, and the date at the top shows when it was last updated.',
          ],
        },
      ],
      contact: {
        title: 'Get in touch',
        body: 'For questions about these terms, you can reach Matan at:',
      },
    },

    privacy: {
      metaTitle: 'Privacy policy | M.K Studio',
      metaDescription:
        'The M.K Studio privacy policy: what information the site collects, and how to get in touch about it.',
      eyebrow: 'Privacy',
      title: 'Privacy policy',
      lastUpdated: '2 August 2026',
      sections: [
        {
          title: 'The short version',
          paragraphs: [
            'The M.K Studio site is a single presentation page. It has no forms, no sign-up, no account area and no payment system, so it does not collect or store any personal details about the people who visit it.',
          ],
        },
        {
          title: 'What is not collected',
          list: [
            'There is no contact form, so no name, phone number, email or other identifying detail is collected.',
            'No analytics platforms or advertising pixels are installed, and visitor behaviour is not tracked.',
            'The site does not use cookies for marketing, advertising or profiling.',
          ],
        },
        {
          title: 'Contacting via WhatsApp',
          paragraphs: [
            "The contact buttons on this site open a WhatsApp chat. From that point the conversation happens inside WhatsApp and is governed by Meta's terms of service and privacy policy, not by this one.",
            'Whatever you choose to share in that conversation (your name, your number, and what you tell us about the song) is kept by Matan solely in order to reply and to work together, and is not passed to any third party.',
          ],
        },
        {
          title: 'Hosting',
          paragraphs: [
            'The site is hosted by an external infrastructure provider. Like any web server, that provider may keep technical logs (IP address, browser type, request time) for security and operational purposes. We do not collect or review that information.',
          ],
        },
        {
          title: 'Your rights',
          paragraphs: [
            'Because no personal information is collected through the site, there is no database to request access to, correct or delete. If you contacted us on WhatsApp and want the conversation and the details in it deleted, ask and we will take care of it.',
          ],
        },
      ],
      contact: {
        title: 'Privacy enquiries',
        body: 'For any question or request about privacy, you can reach Matan at:',
      },
    },
  },
}
