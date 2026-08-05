'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHeading from '@/components/SectionHeading'
import { fill, type Dictionary } from '@/lib/i18n'

/**
 * Section 4 — the room coming to life.
 *
 * Desktop: the visual is pinned and the three build stages cross-fade as you
 * scroll (ScrollTrigger pin + scrub), with the caption swapping in step.
 *
 * Mobile / reduced-motion: no pin at all — the same three stages render as a
 * plain stacked list. Pinning on a phone fights the address-bar resize and the
 * story reads fine as a static sequence, so we simply don't build the timeline.
 */
export default function StudioSequence({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const { space } = dict
  const stage = (i: number) =>
    fill(space.stageLabel, { n: i + 1, total: space.steps.length })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // matchMedia keeps the pinned timeline desktop-only and tears it down cleanly
    // when the viewport crosses the breakpoint.
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const frames = gsap.utils.toArray<HTMLElement>('[data-frame]', root)
      const captions = gsap.utils.toArray<HTMLElement>('[data-caption]', root)
      const progress = gsap.utils.toArray<HTMLElement>('[data-dot]', root)
      if (frames.length < 2) return

      // Start state: only the first stage is visible.
      gsap.set(frames.slice(1), { autoAlpha: 0, scale: 1.06 })
      gsap.set(frames[0], { autoAlpha: 1, scale: 1 })
      gsap.set(captions.slice(1), { autoAlpha: 0, y: 18 })
      gsap.set(captions[0], { autoAlpha: 1, y: 0 })
      gsap.set(progress[0], { scaleX: 1 })
      gsap.set(progress.slice(1), { scaleX: 0 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          // One viewport of scroll per transition between stages.
          end: () => `+=${window.innerHeight * (frames.length - 1)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      frames.forEach((frame, i) => {
        if (i === 0) return
        const at = i - 1
        tl.to(frames[i - 1], { autoAlpha: 0, scale: 0.98, duration: 1 }, at)
          .to(frame, { autoAlpha: 1, scale: 1, duration: 1 }, at)
          .to(captions[i - 1], { autoAlpha: 0, y: -18, duration: 0.45 }, at)
          .to(captions[i], { autoAlpha: 1, y: 0, duration: 0.45 }, at + 0.45)
          .to(progress[i], { scaleX: 1, duration: 1 }, at)
      })

      return () => {
        tl.scrollTrigger?.kill()
        tl.kill()
      }
    })

    ScrollTrigger.refresh()
    return () => mm.revert()
  }, [])

  return (
    <section id="space" className="silver-light">
      <div className="mx-auto max-w-6xl px-5 pt-28 sm:px-8 lg:pt-40">
        <SectionHeading eyebrow={space.eyebrow} title={space.title} lead={space.lead} />
      </div>

      {/* ---------- Desktop: pinned cross-fade sequence ---------- */}
      <div
        ref={rootRef}
        className="hidden lg:flex lg:h-screen lg:items-center lg:overflow-hidden"
      >
        {/* The caption column is first in DOM order, so grid places it on the
            reading edge in either language: right in Hebrew, left in English.
            No direction-specific override needed. */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[24rem_1fr] items-center gap-14 px-8">
          <div className="relative">
            {/* Stage progress rail */}
            <ol className="mb-8 flex gap-2" aria-hidden="true">
              {space.steps.map((step) => (
                <li key={step.title} className="h-0.5 flex-1 overflow-hidden rounded-pill bg-line">
                  {/* Fills along the reading direction in each language. */}
                  <span
                    data-dot
                    className="amber-fill block h-full origin-left rtl:origin-right"
                  />
                </li>
              ))}
            </ol>

            {/* Captions are stacked; only one is visible at a time. */}
            <div className="relative min-h-44">
              {space.steps.map((step, i) => (
                <div
                  key={step.title}
                  data-caption
                  className="gpu absolute inset-x-0 top-0"
                  aria-hidden={i > 0 ? 'true' : undefined}
                >
                  <p className="eyebrow mb-4">{stage(i)}</p>
                  <h3 className="h-item text-[clamp(1.5rem,2.4vw,2rem)] text-ink">{step.title}</h3>
                  <p className="body-lg mt-4 text-muted">{step.caption}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-16/10 overflow-hidden rounded-hero bg-surface shadow-float-lg">
            {space.steps.map((step, i) => (
              <div key={step.title} data-frame className="gpu absolute inset-0">
                <Image
                  src={`${step.image}.webp`}
                  alt={step.alt}
                  fill
                  sizes="60vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Mobile / reduced-motion: plain stacked sequence ---------- */}
      <ol className="mx-auto mt-16 grid max-w-6xl gap-16 px-5 pb-28 sm:px-8 lg:hidden">
        {space.steps.map((step, i) => (
          <li key={step.title}>
            {/* Alternating tilt so the stack reads as scattered frames, not a grid. */}
            <div
              className={
                'relative aspect-4/3 overflow-hidden rounded-card bg-surface shadow-float ' +
                (i % 2 === 0 ? '-rotate-1' : 'rotate-1')
              }
            >
              <Image
                src={`${step.image}.webp`}
                alt={step.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <p className="eyebrow mt-7">{stage(i)}</p>
            <h3 className="h-item mt-2 text-2xl text-ink">{step.title}</h3>
            <p className="body-lg mt-3 text-muted">{step.caption}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
