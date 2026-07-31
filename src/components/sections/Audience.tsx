import SectionHeading from '@/components/SectionHeading'
import StaggerReveal from '@/components/StaggerReveal'
import AmbientWord from '@/components/AmbientWord'
import { AUDIENCE } from '@/lib/content'

/**
 * Section 2 — "למי זה". Editorial list, not a card row: hairline rules, big
 * serif titles, a wide indent. Three bordered boxes read as a template; three
 * entries in a list read as a magazine spread.
 */
export default function Audience() {
  return (
    <section
      id="audience"
      className="silver-down relative overflow-hidden px-5 py-28 sm:px-8 lg:py-40"
    >
      <AmbientWord position="end" className="top-16">
        מילים
      </AmbientWord>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={AUDIENCE.eyebrow} title={AUDIENCE.title} lead={AUDIENCE.lead} />

        <StaggerReveal columns={1} stagger={0.1} className="mt-20 flex flex-col">
          {AUDIENCE.items.map((item, i) => (
            <article
              key={item.title}
              className="grid gap-x-10 gap-y-4 border-t border-line py-10 sm:grid-cols-[6rem_1fr] lg:grid-cols-[8rem_22rem_1fr] lg:py-14"
            >
              <span
                aria-hidden="true"
                className="amber-text display-sm text-3xl lg:text-4xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="display-sm text-[clamp(1.5rem,3vw,2.125rem)] text-ink">
                {item.title}
              </h3>
              <p className="max-w-xl text-[17px] leading-relaxed text-muted sm:col-span-2 lg:col-span-1 lg:pt-1.5">
                {item.body}
              </p>
            </article>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
