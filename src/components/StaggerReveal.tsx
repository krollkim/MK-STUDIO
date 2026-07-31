'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  /** Grid columns — resets the stagger each row (LP-style cascade). */
  columns?: number
  /** Delay between cards within a row (seconds). LP uses 0.15. */
  stagger?: number
}

/**
 * Card "wave" reveal — ported 1:1 from the NUTZ-LP landing page.
 *
 * Mechanism (identical to LP): each card has its OWN GSAP ScrollTrigger
 * (`trigger: card`, `start: 'top 88%'`, `toggleActions: 'play none none none'`).
 * ScrollTrigger is driven by GSAP's ticker so it stays glued to the scroll and
 * feels smooth — the same engine our (smooth) ScrollReveal uses. Earlier this
 * component used an IntersectionObserver, which felt detached/"stuck".
 *
 * Within a row the cards cascade by `(i % columns) * stagger`, so the delay
 * resets each row (no long cumulative tail).
 *
 * RTL: cards animate in DOM order; first DOM child sits right → wave flows
 * right→left (Hebrew reading direction).
 */
export default function StaggerReveal({
  children,
  className = '',
  columns = 3,
  stagger = 0.15,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = Array.from(el.children) as HTMLElement[]
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      items.forEach((card, i) => {
        // The Card has `transition-all` (for hover). Disable it during the GSAP
        // entrance so the CSS transition doesn't fight GSAP's per-frame updates
        // on opacity/transform (that conflict caused the "two-stage" feel).
        // Restored on complete so hover keeps working.
        card.style.transition = 'none'
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          duration: 0.7,
          y: 30,
          opacity: 0,
          ease: 'power2.out',
          delay: (i % columns) * stagger,
          onComplete: () => {
            card.style.transition = ''
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [columns, stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
