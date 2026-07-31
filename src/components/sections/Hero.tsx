import Image from 'next/image'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import Logo from '@/components/Logo'
import { HERO } from '@/lib/content'

/**
 * Section 1 — Hero. Split layout: value line + the single CTA on the right
 * (RTL reading start), a real studio photo on the left. Kept light and airy
 * rather than a dark full-bleed image, per the brand direction.
 */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-bg pt-28 pb-16 sm:pt-32 lg:pb-24">
      {/* Soft brand wash behind the content — keeps the page bright, not flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-gradient-to-b from-accent-soft/70 via-surface/60 to-bg"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Logo size={64} className="mb-8" />

          <p className="mb-5 inline-flex rounded-pill border border-line bg-white/70 px-4 py-1.5 text-[13px] font-medium text-muted">
            {HERO.eyebrow}
          </p>

          <h1 className="text-[clamp(2.35rem,6.5vw,4.15rem)] font-extrabold leading-[1.08] tracking-tight text-ink">
            {HERO.headline}
            <br />
            <span className="text-accent">{HERO.headlineAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted sm:text-lg">
            {HERO.subhead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppCTA className="w-full sm:w-auto" />
            <a
              href={HERO.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3.5 text-base font-semibold text-ink transition-colors hover:text-accent"
            >
              {HERO.secondaryCta.label}
              {/* RTL: "forward" is leftward, so the arrow points left. */}
              <span aria-hidden="true">←</span>
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-muted">
            {HERO.badges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-xl2 bg-surface shadow-[0_30px_70px_-40px_rgba(20,22,26,0.55)]">
            <Image
              src="/images/hero-studio.webp"
              alt="מתן ויוצר יושבים יחד מול עמדת השליטה באולפן M.K Studio ועובדים על שיר"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Small floating caption card — grounds the photo in a real place. */}
          <div className="absolute -bottom-5 right-4 rounded-2xl border border-line bg-white/95 px-5 py-3 shadow-[0_16px_40px_-24px_rgba(20,22,26,0.5)] backdrop-blur-sm sm:right-6">
            <p className="text-sm font-bold text-ink">סשן הפקה באולפן</p>
            <p className="text-xs text-muted">פלורנטין, תל אביב</p>
          </div>
        </div>
      </div>
    </section>
  )
}
