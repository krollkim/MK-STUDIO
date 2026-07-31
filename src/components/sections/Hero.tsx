import Image from 'next/image'
import WhatsAppCTA, { QuietLink } from '@/components/WhatsAppCTA'
import Logo from '@/components/Logo'
import { HERO } from '@/lib/content'

/**
 * Section 1 — cinematic hero. Full-bleed warm-dark studio frame, one enormous
 * serif line, one CTA. The dark ground is deliberate: it makes the greige of
 * every section below read as light and airy by contrast, and it is the only
 * place on the page where the photography gets to be the whole composition.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night px-5 pb-14 pt-32 sm:px-8 sm:pb-20 lg:pb-24"
    >
      <Image
        src="/images/hero-studio.webp"
        alt="מתן ויוצר יושבים יחד מול עמדת השליטה באולפן M.K Studio ועובדים על שיר"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[center_30%]"
      />

      {/* Warm dark grade. The stops are pushed high on purpose: the headline
          lands over pale wood acoustic panels, and anything lighter than this
          drops white-on-photo contrast to ~4:1. Dark through ~60% of the
          height, then it opens up so the room still breathes at the top. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-night from-10% via-night/88 via-62% to-night/45"
      />
      {/* Second scrim from the reading edge (right, in RTL) so the type side
          stays the darkest part of the frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-l from-night/70 via-night/20 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl">
        <Logo tone="light" size={58} className="mb-10 sm:mb-12" />

        <p className="mb-7 flex items-center gap-3 text-[13px] font-medium tracking-wide text-white/60">
          <span aria-hidden="true" className="h-px w-10 bg-accent-lit" />
          {HERO.eyebrow}
        </p>

        <h1 className="display max-w-[16ch] text-[clamp(3rem,9.5vw,7.5rem)] text-white">
          {HERO.headline}{' '}
          <span className="text-accent-lit">{HERO.headlineAccent}</span>
        </h1>

        <p className="mt-8 max-w-2xl text-[clamp(1.0625rem,1.7vw,1.375rem)] leading-relaxed text-white/70">
          {HERO.subhead}
        </p>

        <div className="mt-11 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <WhatsAppCTA size="lg" className="w-full sm:w-auto" />
          <QuietLink href={HERO.secondaryCta.href} onDark>
            {HERO.secondaryCta.label}
          </QuietLink>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-9 gap-y-3 border-t border-white/12 pt-7 text-sm text-white/55">
          {HERO.badges.map((b) => (
            <li key={b} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-lit" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
