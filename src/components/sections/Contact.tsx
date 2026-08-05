import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import AmbientWord from '@/components/AmbientWord'
import type { Dictionary } from '@/lib/i18n'

/**
 * Section 7b — the closing CTA. Exactly one action: WhatsApp.
 *
 * There is deliberately no phone number here. Formal contact details live on
 * the legal pages, where they are required; on the landing page they only add
 * a decision between two channels that lead to the same person.
 */
export default function Contact({ dict }: { dict: Dictionary }) {
  const { contact } = dict

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-night px-5 py-32 sm:px-8 lg:py-48"
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
        {contact.ambient}
      </AmbientWord>

      <ScrollReveal className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-5 text-accent-lit">{contact.eyebrow}</p>
        <h2 className="display text-[clamp(2.75rem,7vw,5.5rem)] text-white">{contact.title}</h2>
        <p className="mx-auto mt-7 max-w-xl text-[clamp(1.0625rem,1.7vw,1.3125rem)] leading-relaxed text-white/70">
          {contact.subtitle}
        </p>

        {/* One button, and a reason to press it. No phone alternative: a second
            channel only asks the visitor to choose, and WhatsApp is a phone
            number anyway. */}
        <div className="mt-12 flex flex-col items-center gap-4.5">
          <WhatsAppCTA cta={dict.cta} size="lg" className="w-full sm:w-auto" />
          <p className="text-[14px] text-[#A79D93]">{contact.reassurance}</p>
        </div>

        <p className="mx-auto mt-16 max-w-xl border-t border-white/12 pt-9 text-[15px] text-white/60">
          {contact.location}
        </p>
      </ScrollReveal>
    </section>
  )
}
