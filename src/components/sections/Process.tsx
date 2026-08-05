'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHeading from '@/components/SectionHeading'
import AmbientWord from '@/components/AmbientWord'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import type { Dictionary } from '@/lib/i18n'

/**
 * Section 7a — the four steps as a JOURNEY, not a table.
 *
 * A single rail is drawn from step 01 to step 04 as the section scrolls, and
 * each step lights up the moment the rail reaches it. That turns four equal
 * columns into something with direction, which is what the CTA underneath is
 * asking the visitor to do.
 *
 * Under `prefers-reduced-motion` no timeline is built and every step renders
 * lit — the information is in the copy, not the motion.
 */
export default function Process({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLOListElement>(null)
  const { process } = dict

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root)
      const rails = gsap.utils.toArray<HTMLElement>('[data-rail]', root)
      if (!steps.length) return

      gsap.set(steps, { opacity: 0.42 })
      gsap.set(rails, { scaleX: 0, scaleY: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 72%', end: 'bottom 78%', scrub: 0.7 },
      })

      steps.forEach((step, i) => {
        tl.to(step, { opacity: 1, duration: 0.35, ease: 'none' }, i * 0.9)
        const rail = rails[i]
        if (rail) tl.to(rail, { scaleX: 1, scaleY: 1, duration: 0.9, ease: 'none' }, i * 0.9)
      })
    }, root)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [dict])

  return (
    <section
      id="process"
      className="silver-deep relative overflow-hidden px-5 py-32 sm:px-8 lg:py-48"
    >
      <AmbientWord position="start" className="bottom-6">
        {process.ambient}
      </AmbientWord>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow={process.eyebrow} title={process.title} />

        <ol ref={rootRef} className="mt-24 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {process.steps.map((step, i) => (
            <li key={step.title} data-step className="group relative transition-opacity duration-300">
              {/* Rail + node. The rail leads to the NEXT step, so the last has
                  none. `origin-inline-start` draws it along the reading
                  direction: right→left in Hebrew, left→right in English. */}
              <div className="mb-7 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="amber-fill relative z-1 block h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-silver-2 transition-transform duration-300 group-hover:scale-125"
                />
                {i < process.steps.length - 1 && (
                  <span aria-hidden="true" className="relative h-px flex-1 bg-line">
                    <span
                      data-rail
                      className="amber-fill absolute inset-0 block origin-left rtl:origin-right"
                    />
                  </span>
                )}
              </div>

              <span aria-hidden="true" className="amber-text display text-4xl leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="h-item mt-4 text-ink">{step.title}</h3>
              <p className="body-lg mt-3 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 flex justify-start">
          <WhatsAppCTA cta={dict.cta} />
        </div>
      </div>
    </section>
  )
}
