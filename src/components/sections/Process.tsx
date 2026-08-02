'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHeading from '@/components/SectionHeading'
import AmbientWord from '@/components/AmbientWord'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import { PROCESS } from '@/lib/content'

/**
 * Section 7a — the four steps as a JOURNEY, not a table.
 *
 * A single rail is drawn from step 01 to step 04 as the section scrolls, and
 * each step lights up (numeral, dot and label) the moment the rail reaches it.
 * That turns four equal columns into something with direction and a sense of
 * moving forward, which is what the CTA underneath is asking the visitor to do.
 *
 * The rail is horizontal on desktop and vertical on mobile, so the same idea
 * survives the layout change instead of being dropped on small screens.
 *
 * Under `prefers-reduced-motion` no timeline is built at all and every step
 * renders in its lit state — the information is in the copy, not the motion.
 */
export default function Process() {
  const rootRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root)
      const rails = gsap.utils.toArray<HTMLElement>('[data-rail]', root)
      if (!steps.length) return

      // Everything starts dim; the rail lights it up on the way past.
      gsap.set(steps, { opacity: 0.42 })
      gsap.set(rails, { scaleX: 0, scaleY: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 72%',
          end: 'bottom 78%',
          scrub: 0.7,
        },
      })

      steps.forEach((step, i) => {
        tl.to(step, { opacity: 1, duration: 0.35, ease: 'none' }, i * 0.9)
        const rail = rails[i]
        if (rail) tl.to(rail, { scaleX: 1, scaleY: 1, duration: 0.9, ease: 'none' }, i * 0.9)
      })
    }, root)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="process"
      className="silver-deep relative overflow-hidden px-5 py-32 sm:px-8 lg:py-48"
    >
      <AmbientWord position="start" className="bottom-6">
        מכאן
      </AmbientWord>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={PROCESS.eyebrow} title={PROCESS.title} />

        <ol ref={rootRef} className="mt-24 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {PROCESS.steps.map((step, i) => (
            <li
              key={step.title}
              data-step
              className="group relative transition-opacity duration-300"
            >
              {/* Rail + node. The rail is the segment leading to the NEXT step,
                  so the last one has none. origin-right: RTL draws right→left. */}
              <div className="mb-7 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="amber-fill relative z-1 block h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-silver-2 transition-transform duration-300 group-hover:scale-125"
                />
                {i < PROCESS.steps.length - 1 && (
                  <span aria-hidden="true" className="relative h-px flex-1 bg-line">
                    <span
                      data-rail
                      className="amber-fill absolute inset-0 block origin-right"
                    />
                  </span>
                )}
              </div>

              <span
                aria-hidden="true"
                className="amber-text display block text-4xl leading-none"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="h-item mt-4 text-ink">{step.title}</h3>
              <p className="body-lg mt-3 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 flex justify-start">
          <WhatsAppCTA />
        </div>
      </div>
    </section>
  )
}
