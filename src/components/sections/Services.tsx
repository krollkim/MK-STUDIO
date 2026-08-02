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
      className="silver-deep relative overflow-hidden px-5 py-32 sm:px-8 lg:py-48"
    >
      {/* Anchored to the gutter beside the services list, below the heading
          block — at the top it sat directly behind the H2 and disappeared. */}
      <AmbientWord position="start" className="top-[38%]">
        צליל
      </AmbientWord>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={SERVICES.eyebrow} title={SERVICES.title} lead={SERVICES.lead} />

        <StaggerReveal columns={1} stagger={0.1} className="mt-24 flex flex-col">
          {SERVICES.items.map((item) => (
            <article
              key={item.title}
              className="group grid gap-x-12 gap-y-5 border-t border-line py-11 lg:grid-cols-[24rem_1fr] lg:py-16"
            >
              {/* Sans-bold, not serif: this is an item inside a section, and
                  the typeface is what says so. */}
              <h3 className="h-item text-ink transition-colors group-hover:text-accent-ink">
                {item.title}
              </h3>

              <div>
                <p className="body-lg max-w-2xl text-muted">{item.body}</p>
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
          {/* 24rem, not 20rem: the text column was 640px wide while its own
              content is capped at max-w-xl (576px), so the extra 64px was dead
              space. Giving it to the poster makes its lettering legible without
              reflowing a single line of copy. */}
          <div className="relative grid items-center gap-12 rounded-hero bg-night px-7 py-14 sm:px-12 lg:grid-cols-[1fr_24rem] lg:gap-16 lg:px-16 lg:py-20">
            <div>
              <p className="eyebrow mb-6 text-accent-lit">{SERVICES.outcome.eyebrow}</p>
              <h3 className="h-block text-white">{SERVICES.outcome.title}</h3>
              <p className="body-lg mt-7 max-w-xl text-white/70">{SERVICES.outcome.body}</p>

              <ul className="mt-10 space-y-4">
                {SERVICES.outcome.points.map((p) => (
                  <li key={p} className="body-lg flex gap-3.5 text-white/90">
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
                alt="גרפיקת המותג של M.K Studio: עמדת ההקלטה עם מיקרופון, מוניטורים, פסנתר וגיטרות"
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="object-cover"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
