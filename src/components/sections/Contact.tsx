import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import WhatsAppCTA, { WhatsAppIcon } from '@/components/WhatsAppCTA'
import AmbientWord from '@/components/AmbientWord'
import { CONTACT } from '@/lib/content'
import { PHONE_DISPLAY, PHONE_TEL, STUDIO } from '@/lib/site'

/**
 * Section 7b — the repeat CTA and the contact details. One amber button, same
 * as everywhere else; the phone stays a quiet outlined link so it never
 * competes with the WhatsApp path.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-night px-5 py-28 sm:px-8 lg:py-40"
    >
      <Image
        src="/images/recording-session.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-night/75" />
      <AmbientWord position="center" tone="dark" className="top-10">
        נתחיל
      </AmbientWord>

      <ScrollReveal className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-5 text-accent-lit">{CONTACT.eyebrow}</p>
        <h2 className="display text-[clamp(2.75rem,7vw,5.5rem)] text-white">{CONTACT.title}</h2>
        <p className="mx-auto mt-7 max-w-xl text-[clamp(1.0625rem,1.7vw,1.3125rem)] leading-relaxed text-white/70">
          {CONTACT.subtitle}
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
          <WhatsAppCTA size="lg" className="w-full sm:w-auto" />
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-pill border border-white/25 px-8 py-4.5 text-base font-semibold text-white/85 transition-colors hover:border-white/55 hover:text-white sm:w-auto"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
        </div>

        <dl className="mx-auto mt-16 grid max-w-xl gap-7 border-t border-white/12 pt-9 text-right sm:grid-cols-2">
          <div>
            <dt className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/45">
              איפה
            </dt>
            <dd className="mt-2 text-white/90">
              {STUDIO.neighborhood}, {STUDIO.city}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/45">
              הדרך המהירה
            </dt>
            <dd className="mt-2 flex items-start justify-start gap-2.5 text-white/90">
              <span className="mt-1 shrink-0 text-accent-lit">
                <WhatsAppIcon size={16} />
              </span>
              <span>הודעה בוואטסאפ — עונה בדרך כלל תוך כמה שעות</span>
            </dd>
          </div>
        </dl>
      </ScrollReveal>
    </section>
  )
}
