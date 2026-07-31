import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import WhatsAppCTA, { WhatsAppIcon } from '@/components/WhatsAppCTA'
import { CONTACT } from '@/lib/content'
import { PHONE_DISPLAY, PHONE_TEL, STUDIO } from '@/lib/site'

/** Section 7b — the repeat CTA and the contact details. The page ends here. */
export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink px-5 py-20 sm:px-8 lg:py-28">
      <Image
        src="/images/recording-session.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />

      <ScrollReveal className="relative mx-auto max-w-3xl text-center">
        <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.18em] text-accent">
          {CONTACT.eyebrow}
        </p>
        <h2 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.12] tracking-tight text-white">
          {CONTACT.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
          {CONTACT.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <WhatsAppCTA variant="green" className="w-full sm:w-auto" />
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-pill border border-white/25 px-7 py-3.5 text-base font-bold text-white transition-colors hover:border-white/60 sm:w-auto"
          >
            <svg
              width="20"
              height="20"
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

        <dl className="mx-auto mt-12 grid max-w-xl gap-6 border-t border-white/15 pt-8 text-right sm:grid-cols-2">
          <div>
            <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
              איפה
            </dt>
            <dd className="mt-1.5 text-white">
              {STUDIO.neighborhood}, {STUDIO.city}
            </dd>
          </div>
          <div>
            <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
              הדרך המהירה
            </dt>
            <dd className="mt-1.5 flex items-start justify-start gap-2 text-white">
              <span className="mt-1 shrink-0">
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
