import SectionHeading from '@/components/SectionHeading'
import ScrollReveal from '@/components/ScrollReveal'
import AmbientWord from '@/components/AmbientWord'
import type { Dictionary } from '@/lib/i18n'

/**
 * Section 2 — "who this is for". Three profiles laid out as an EDITORIAL
 * SPREAD, not a grid: each takes a different column span, indent and numeral
 * size, so the eye moves down a page rather than scanning three identical
 * rows. The asymmetry is the point; evenly aligned rows read as a template no
 * matter how good the copy is.
 */

/** Per-entry layout. Deliberately irregular; do not "tidy" these into a grid.
 *  Column starts are logical (`col-start` follows the writing direction), so
 *  the stagger mirrors correctly between RTL and LTR. */
const LAYOUT = [
  {
    wrapper: 'lg:col-span-8 lg:col-start-1',
    numeral: 'text-[clamp(3.5rem,7vw,6rem)]',
    title: 'text-[clamp(1.75rem,3vw,2.5rem)]',
    body: 'max-w-xl',
  },
  {
    wrapper: 'lg:col-span-7 lg:col-start-5 lg:mt-24',
    numeral: 'text-[clamp(2.75rem,5vw,4.5rem)]',
    title: 'text-[clamp(1.5rem,2.4vw,2rem)]',
    body: 'max-w-lg',
  },
  {
    wrapper: 'lg:col-span-7 lg:col-start-2 lg:mt-24',
    numeral: 'text-[clamp(3rem,5.5vw,5rem)]',
    title: 'text-[clamp(1.625rem,2.7vw,2.25rem)]',
    body: 'max-w-xl',
  },
]

export default function Audience({ dict }: { dict: Dictionary }) {
  const { audience } = dict

  return (
    <section
      id="audience"
      /* Light band. Follows the dark hero, so that boundary is already
         emphatic and needs no seam. */
      className="silver-light relative overflow-hidden px-5 py-32 sm:px-8 lg:py-48"
    >
      <AmbientWord position="end" className="top-[46%]">
        {audience.ambient}
      </AmbientWord>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={audience.eyebrow} title={audience.title} lead={audience.lead} />

        <div className="mt-24 grid gap-16 lg:grid-cols-12 lg:gap-y-0">
          {audience.items.map((item, i) => {
            const l = LAYOUT[i] ?? LAYOUT[0]
            return (
              <ScrollReveal key={item.title} className={l.wrapper}>
                <article>
                  {/* No `block` here: `.amber-text` must keep its box hugging
                      the glyphs or the gradient shifts with the direction. */}
                  <span
                    aria-hidden="true"
                    className={`amber-text display leading-none ${l.numeral}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={`h-item mt-5 text-ink ${l.title}`}>{item.title}</h3>
                  <p className={`body-lg mt-4 text-muted ${l.body}`}>{item.body}</p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
