import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import StaggerReveal from '@/components/StaggerReveal'
import AmbientWord from '@/components/AmbientWord'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import { SERVICES } from '@/lib/content'

/**
 * Section 3 — the three services as an editorial list, then the outcome as a
 * warm-dark statement block with the brand poster floating beside it.
 */
export default function Services() {
  return (
    <section
      id="services"
      className="silver-up relative overflow-hidden px-5 py-28 sm:px-8 lg:py-40"
    >
      <AmbientWord position="start" className="top-24">
        צליל
      </AmbientWord>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={SERVICES.eyebrow} title={SERVICES.title} lead={SERVICES.lead} />

        <StaggerReveal columns={1} stagger={0.1} className="mt-20 flex flex-col">
          {SERVICES.items.map((item) => (
            <article
              key={item.title}
              className="group grid gap-x-12 gap-y-5 border-t border-line py-11 lg:grid-cols-[24rem_1fr] lg:py-16"
            >
              <h3 className="display-sm text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink transition-colors group-hover:text-accent">
                {item.title}
              </h3>

              <div>
                <p className="max-w-2xl text-[17px] leading-relaxed text-muted">{item.body}</p>
                <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2.5 text-sm font-medium text-ink/60">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="amber-fill h-1.5 w-1.5 rounded-full" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </StaggerReveal>

        {/* The outcome — what the visitor actually walks away with. */}
        <ScrollReveal className="mt-24 lg:mt-32">
          <div className="relative grid items-center gap-12 rounded-hero bg-night px-7 py-14 sm:px-12 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:px-16 lg:py-20">
            <div>
              <p className="eyebrow mb-5 text-accent-lit">{SERVICES.outcome.eyebrow}</p>
              <h3 className="display text-[clamp(2rem,4.2vw,3.25rem)] text-white">
                {SERVICES.outcome.title}
              </h3>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70">
                {SERVICES.outcome.body}
              </p>

              <ul className="mt-9 space-y-4">
                {SERVICES.outcome.points.map((p) => (
                  <li key={p} className="flex gap-3.5 text-[16px] leading-relaxed text-white/90">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent-lit"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>

              <WhatsAppCTA className="mt-11" />
            </div>

            {/* The brandmark is a square poster — a square frame keeps the
                lettering intact, and it floats rather than sitting in a box. */}
            <div className="relative aspect-square overflow-hidden rounded-card shadow-float-lg lg:rotate-2">
              <Image
                src="/images/studio-brandmark.webp"
                alt="גרפיקת המותג של M.K Studio — עמדת ההקלטה עם מיקרופון, מוניטורים, פסנתר וגיטרות"
                fill
                sizes="(max-width: 1024px) 100vw, 20rem"
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
